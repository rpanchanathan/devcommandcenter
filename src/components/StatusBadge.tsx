import type { ProjectStatus } from '../data/projects';

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const statusStyles = {
    Active: 'bg-green-500/10 text-green-400 border-green-500/20',
    Maintenance: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Blocked: 'bg-red-500/10 text-red-400 border-red-500/20',
    Dormant: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded border ${statusStyles[status]} ${className}`}
    >
      {status}
    </span>
  );
}
