import type { HealthStatus, ProjectHealth } from '../hooks/useProjectHealth';

interface HealthIndicatorProps {
  health: ProjectHealth;
  showMessage?: boolean;
  size?: 'sm' | 'md';
}

const healthColors: Record<HealthStatus, { bg: string; ring: string; text: string }> = {
  healthy: {
    bg: 'bg-green-500',
    ring: 'ring-green-500/30',
    text: 'text-green-400',
  },
  warning: {
    bg: 'bg-yellow-500',
    ring: 'ring-yellow-500/30',
    text: 'text-yellow-400',
  },
  error: {
    bg: 'bg-red-500',
    ring: 'ring-red-500/30',
    text: 'text-red-400',
  },
  unknown: {
    bg: 'bg-gray-500',
    ring: 'ring-gray-500/30',
    text: 'text-gray-400',
  },
};

export function HealthIndicator({ health, showMessage = false, size = 'sm' }: HealthIndicatorProps) {
  const colors = healthColors[health.health];
  const dotSize = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3';
  const ringSize = size === 'sm' ? 'ring-2' : 'ring-[3px]';

  const formatTime = (isoString: string) => {
    if (!isoString) return 'Never';
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center justify-center">
        <span
          className={`${dotSize} rounded-full ${colors.bg} ${ringSize} ${colors.ring}`}
          title={`${health.health}: ${health.message}`}
        />
        {health.health === 'error' && (
          <span className={`absolute ${dotSize} rounded-full ${colors.bg} animate-ping`} />
        )}
      </div>
      {showMessage && (
        <div className="flex flex-col">
          <span className={`text-xs ${colors.text}`}>{health.message}</span>
          <span className="text-[10px] text-gray-500">{formatTime(health.lastCheck)}</span>
        </div>
      )}
    </div>
  );
}

interface HealthAlertBannerProps {
  errorCount: number;
  warningCount: number;
  projectsWithIssues: Array<{ id: string; health: ProjectHealth }>;
  projectNames: Record<string, string>;
}

export function HealthAlertBanner({
  errorCount,
  warningCount,
  projectsWithIssues,
  projectNames,
}: HealthAlertBannerProps) {
  if (errorCount === 0 && warningCount === 0) return null;

  return (
    <div
      className={`mb-6 p-4 rounded-lg border ${
        errorCount > 0
          ? 'bg-red-500/10 border-red-500/30'
          : 'bg-yellow-500/10 border-yellow-500/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="text-xl">{errorCount > 0 ? '!' : '!'}</div>
        <div className="flex-1">
          <h3 className={`font-medium ${errorCount > 0 ? 'text-red-400' : 'text-yellow-400'}`}>
            {errorCount > 0
              ? `${errorCount} project${errorCount > 1 ? 's' : ''} with errors`
              : `${warningCount} project${warningCount > 1 ? 's' : ''} with warnings`}
          </h3>
          <div className="mt-2 space-y-1">
            {projectsWithIssues.map(({ id, health }) => (
              <div key={id} className="flex items-center gap-2 text-sm">
                <HealthIndicator health={health} size="sm" />
                <span className="text-gray-300">{projectNames[id] || id}:</span>
                <span className="text-gray-400">{health.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
