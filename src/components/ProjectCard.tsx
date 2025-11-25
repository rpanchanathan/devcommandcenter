import { Link } from 'react-router';
import { StatusBadge } from './StatusBadge';
import { QuickLinks } from './QuickLinks';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all hover:shadow-lg group">
      <Link to={`/project/${project.id}`} className="block mb-3">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-gray-100 group-hover:text-[#3399ff] transition-colors">
            {project.name}
          </h3>
          <StatusBadge status={project.status} />
        </div>
        <p className="text-gray-400 text-sm mb-3">{project.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Last touched: {formatDate(project.lastTouched)}</span>
        </div>
      </Link>

      <div className="flex items-center justify-between pt-3 border-t border-gray-800">
        <div className="flex gap-1.5 flex-wrap">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded text-xs font-mono"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-0.5 text-gray-500 text-xs">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
        <QuickLinks
          prodUrl={project.prodUrl}
          githubUrl={project.githubUrl}
          localPath={project.localPath}
          itermProfile={project.itermProfile}
        />
      </div>
    </div>
  );
}
