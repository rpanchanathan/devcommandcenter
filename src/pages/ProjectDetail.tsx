import { useParams, Link } from 'react-router';
import { ArrowLeft, ChevronDown, ChevronUp, ExternalLink, Github, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import { StatusBadge } from '../components/StatusBadge';
import { projects } from '../data/projects';

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [decisionsExpanded, setDecisionsExpanded] = useState(false);

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

        {/* Current Status Section */}
        <div className="mb-8 bg-[#161b22] border border-gray-800 rounded-lg p-6">
          <h2 className="text-gray-100 mb-3">Current Status</h2>
          <p className="text-gray-300 leading-relaxed">{project.currentStatus}</p>
        </div>

        {/* Next Steps Section */}
        <div className="mb-8 bg-[#161b22] border border-gray-800 rounded-lg p-6">
          <h2 className="text-gray-100 mb-3">Next Steps</h2>
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
          Last updated: {new Date(project.lastTouched).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
    </div>
  );
}
