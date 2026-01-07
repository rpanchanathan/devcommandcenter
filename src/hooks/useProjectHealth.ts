import { useState, useEffect } from 'react';

export type HealthStatus = 'healthy' | 'warning' | 'error' | 'unknown';

export interface ProjectHealth {
  health: HealthStatus;
  message: string;
  lastCheck: string;
  lastSuccess: string;
}

export interface ProjectHealthMap {
  [projectId: string]: ProjectHealth;
}

interface StatusResponse {
  projects: ProjectHealthMap;
  lastUpdated: string;
}

const STATUS_URL = import.meta.env.BASE_URL + 'status.json';

export function useProjectHealth() {
  const [healthData, setHealthData] = useState<ProjectHealthMap>({});
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHealth() {
      try {
        // Add cache-busting param to avoid stale data
        const response = await fetch(`${STATUS_URL}?t=${Date.now()}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch status: ${response.status}`);
        }
        const data: StatusResponse = await response.json();
        setHealthData(data.projects);
        setLastUpdated(data.lastUpdated);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load health status');
        // Don't clear existing data on error - show stale data with error
      } finally {
        setLoading(false);
      }
    }

    fetchHealth();

    // Refresh every 5 minutes
    const interval = setInterval(fetchHealth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getHealth = (projectId: string): ProjectHealth => {
    return healthData[projectId] || {
      health: 'unknown',
      message: 'No status data',
      lastCheck: '',
      lastSuccess: '',
    };
  };

  const getErrorCount = (): number => {
    return Object.values(healthData).filter(h => h.health === 'error').length;
  };

  const getWarningCount = (): number => {
    return Object.values(healthData).filter(h => h.health === 'warning').length;
  };

  const getProjectsWithIssues = (): Array<{ id: string; health: ProjectHealth }> => {
    return Object.entries(healthData)
      .filter(([, health]) => health.health === 'error' || health.health === 'warning')
      .map(([id, health]) => ({ id, health }))
      .sort((a, b) => {
        // Errors first, then warnings
        if (a.health.health === 'error' && b.health.health !== 'error') return -1;
        if (a.health.health !== 'error' && b.health.health === 'error') return 1;
        return 0;
      });
  };

  return {
    healthData,
    lastUpdated,
    loading,
    error,
    getHealth,
    getErrorCount,
    getWarningCount,
    getProjectsWithIssues,
  };
}
