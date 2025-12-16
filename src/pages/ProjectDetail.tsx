import { useParams, Link } from 'react-router';
import { ArrowLeft, ChevronDown, ChevronUp, ExternalLink, Github, FolderOpen, Pencil, Plus, Trash2, Save, X, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { StatusBadge } from '../components/StatusBadge';
import { GitHubTokenDialog } from '../components/GitHubTokenDialog';
import { projects as staticProjects, type Project } from '../data/projects';
import {
  getGitHubToken,
  setGitHubToken,
  fetchProjectsFile,
  generateUpdatedProjectsFile,
  updateProjectsFile,
} from '../services/github';

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [projects, setProjects] = useState(staticProjects);
  const project = projects.find((p) => p.id === id);
  const [decisionsExpanded, setDecisionsExpanded] = useState(false);

  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editedSteps, setEditedSteps] = useState<string[]>([]);
  const [showTokenDialog, setShowTokenDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Initialize editedSteps when project changes or edit mode starts
  useEffect(() => {
    if (project && isEditing) {
      setEditedSteps([...project.nextSteps]);
    }
  }, [project, isEditing]);

  const handleEditClick = () => {
    if (!getGitHubToken()) {
      setShowTokenDialog(true);
      return;
    }
    setIsEditing(true);
    setSaveStatus(null);
  };

  const handleTokenSubmit = (token: string) => {
    setGitHubToken(token);
    setShowTokenDialog(false);
    setIsEditing(true);
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...editedSteps];
    newSteps[index] = value;
    setEditedSteps(newSteps);
  };

  const handleAddStep = () => {
    setEditedSteps([...editedSteps, '']);
  };

  const handleRemoveStep = (index: number) => {
    setEditedSteps(editedSteps.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedSteps([]);
    setSaveStatus(null);
  };

  const handleSave = async () => {
    if (!project) return;

    // Filter out empty steps
    const cleanedSteps = editedSteps.filter((s) => s.trim() !== '');
    if (cleanedSteps.length === 0) {
      setSaveStatus({ type: 'error', message: 'At least one step is required' });
      return;
    }

    setIsSaving(true);
    setSaveStatus(null);

    try {
      // Fetch current file from GitHub
      const fileData = await fetchProjectsFile();
      if (!fileData) {
        setSaveStatus({ type: 'error', message: 'Failed to fetch file. Check your token.' });
        setIsSaving(false);
        return;
      }

      // Generate updated content
      const updatedContent = generateUpdatedProjectsFile(
        fileData.content,
        project.id,
        cleanedSteps
      );

      // Commit to GitHub
      const result = await updateProjectsFile(
        updatedContent,
        `Update next steps for ${project.name}`
      );

      if (result.success) {
        // Update local state immediately
        setProjects((prev) =>
          prev.map((p) =>
            p.id === project.id ? { ...p, nextSteps: cleanedSteps } : p
          )
        );
        setIsEditing(false);
        setSaveStatus({
          type: 'success',
          message: 'Saved! GitHub Actions will redeploy in ~1 min.',
        });
      } else {
        setSaveStatus({ type: 'error', message: result.error || 'Save failed' });
      }
    } catch (err) {
      setSaveStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Unknown error',
      });
    }

    setIsSaving(false);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2">Project not found</h2>
          <Link to="/" className="text-[#3399ff] hover:underline">
            Return to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>

        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-gray-100">{project.name}</h1>
            <StatusBadge status={project.status} />
          </div>

          {/* Quick Links Row */}
          <div className="flex gap-3 flex-wrap">
            {project.prodUrl && (
              <a
                href={project.prodUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-gray-800 rounded-lg text-gray-300 hover:border-[#3399ff] hover:text-[#3399ff] transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Production
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-gray-800 rounded-lg text-gray-300 hover:border-[#3399ff] hover:text-[#3399ff] transition-all"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
            {project.localPath && (
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-gray-800 rounded-lg text-gray-300 hover:border-gray-700 transition-all">
                <FolderOpen className="w-4 h-4" />
                <code className="text-xs">{project.localPath}</code>
              </button>
            )}
          </div>
        </div>

        {/* About Section */}
        {project.detailedDescription && (
          <div className="mb-8 bg-[#161b22] border border-gray-800 rounded-lg p-6">
            <h2 className="text-gray-100 mb-3">About</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{project.detailedDescription}</p>
          </div>
        )}

        {/* Current Status Section */}
        <div className="mb-8 bg-[#161b22] border border-gray-800 rounded-lg p-6">
          <h2 className="text-gray-100 mb-3">Current Status</h2>
          <p className="text-gray-300 leading-relaxed">{project.currentStatus}</p>
        </div>

        {/* Next Steps Section */}
        <div className="mb-8 bg-[#161b22] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-100">Next Steps</h2>
            {!isEditing ? (
              <button
                onClick={handleEditClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-[#3399ff] hover:bg-gray-800 rounded transition-colors"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-[#3399ff] text-white rounded hover:bg-[#2277dd] transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>
            )}
          </div>

          {/* Status message */}
          {saveStatus && (
            <div
              className={`mb-4 px-3 py-2 rounded text-sm ${
                saveStatus.type === 'success'
                  ? 'bg-green-900/30 text-green-400 border border-green-800'
                  : 'bg-red-900/30 text-red-400 border border-red-800'
              }`}
            >
              {saveStatus.message}
            </div>
          )}

          {isEditing ? (
            <div className="space-y-2">
              {editedSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    placeholder="Enter next step..."
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-200 placeholder-gray-500 focus:border-[#3399ff] focus:outline-none"
                  />
                  <button
                    onClick={() => handleRemoveStep(index)}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded transition-colors"
                    title="Remove step"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddStep}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-gray-400 hover:text-[#3399ff] hover:bg-gray-800 rounded transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add step
              </button>
            </div>
          ) : (
            <ul className="space-y-2">
              {project.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 rounded border-gray-700 bg-gray-800 text-[#3399ff] focus:ring-[#3399ff] focus:ring-offset-0"
                  />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Decisions Section */}
        {project.recentDecisions && project.recentDecisions.length > 0 && (
          <div className="mb-8 bg-[#161b22] border border-gray-800 rounded-lg">
            <button
              onClick={() => setDecisionsExpanded(!decisionsExpanded)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-900/30 transition-colors"
            >
              <h2 className="text-gray-100">Recent Decisions</h2>
              {decisionsExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {decisionsExpanded && (
              <div className="px-6 pb-6">
                <ul className="space-y-2">
                  {project.recentDecisions.map((decision, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="text-[#ff8d39] mt-1">•</span>
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Tech Stack Section */}
        <div className="bg-[#161b22] border border-gray-800 rounded-lg p-6">
          <h2 className="text-gray-100 mb-3">Tech Stack</h2>
          <div className="flex gap-2 flex-wrap">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded border border-gray-700 font-mono text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Last updated: {formatDate(project.lastTouched)}
        </div>
      </div>

      {/* Token Dialog */}
      <GitHubTokenDialog
        isOpen={showTokenDialog}
        onClose={() => setShowTokenDialog(false)}
        onSubmit={handleTokenSubmit}
      />
    </div>
  );
}
