const REPO_OWNER = 'rpanchanathan';
const REPO_NAME = 'devcommandcenter';
const FILE_PATH = 'src/data/projects.ts';

interface GitHubFileResponse {
  sha: string;
  content: string;
}

// Get token from sessionStorage
export function getGitHubToken(): string | null {
  return sessionStorage.getItem('github_pat');
}

// Store token in sessionStorage
export function setGitHubToken(token: string): void {
  sessionStorage.setItem('github_pat', token);
}

// Clear token
export function clearGitHubToken(): void {
  sessionStorage.removeItem('github_pat');
}

// Get file content and SHA from GitHub
async function getFileContent(token: string): Promise<GitHubFileResponse> {
  const response = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      clearGitHubToken();
      throw new Error('Invalid GitHub token. Please re-enter.');
    }
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

// Update file on GitHub
export async function updateProjectsFile(
  newContent: string,
  commitMessage: string
): Promise<{ success: boolean; error?: string }> {
  const token = getGitHubToken();
  if (!token) {
    return { success: false, error: 'No GitHub token. Please enter your PAT.' };
  }

  try {
    // Get current file SHA
    const fileData = await getFileContent(token);

    // Commit the new content
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: commitMessage,
          content: btoa(unescape(encodeURIComponent(newContent))),
          sha: fileData.sha,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `GitHub API error: ${response.status}`);
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

// Generate updated projects.ts content with modified nextSteps
export function generateUpdatedProjectsFile(
  currentFileContent: string,
  projectId: string,
  newNextSteps: string[]
): string {
  // Parse the current file and update the specific project's nextSteps
  // This is a text-based replacement to preserve formatting

  const projectRegex = new RegExp(
    `(id:\\s*['"]${projectId}['"][\\s\\S]*?nextSteps:\\s*\\[)([\\s\\S]*?)(\\])`,
    'g'
  );

  const newNextStepsStr = newNextSteps
    .map(step => `\n      '${step.replace(/'/g, "\\'")}'`)
    .join(',') + '\n    ';

  return currentFileContent.replace(projectRegex, `$1${newNextStepsStr}$3`);
}

// Fetch current projects.ts content from GitHub
export async function fetchProjectsFile(): Promise<{ content: string; sha: string } | null> {
  const token = getGitHubToken();
  if (!token) return null;

  try {
    const fileData = await getFileContent(token);
    const content = decodeURIComponent(escape(atob(fileData.content)));
    return { content, sha: fileData.sha };
  } catch {
    return null;
  }
}
