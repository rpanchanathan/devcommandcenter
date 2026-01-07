import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { ProjectCard } from '../components/ProjectCard';
import { HealthAlertBanner } from '../components/HealthIndicator';
import { useProjectHealth } from '../hooks/useProjectHealth';
import { projects } from '../data/projects';
import type { ProjectStatus } from '../data/projects';

export function Summary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'All'>('All');
  const { getHealth, getErrorCount, getWarningCount, getProjectsWithIssues } = useProjectHealth();

  // Map project IDs to names for the alert banner
  const projectNames = useMemo(() => {
    return projects.reduce((acc, p) => {
      acc[p.id] = p.name;
      return acc;
    }, {} as Record<string, string>);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery === '' ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesStatus = statusFilter === 'All' || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const statusCounts = useMemo(() => {
    const counts: Record<ProjectStatus | 'All', number> = {
      All: projects.length,
      Active: 0,
      Maintenance: 0,
      Blocked: 0,
      Dormant: 0,
    };

    projects.forEach((project) => {
      counts[project.status]++;
    });

    return counts;
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#ff8d39] to-[#3399ff] rounded-lg flex items-center justify-center">
                <span className="text-white">G</span>
              </div>
              <h1 className="text-gray-100">Project Portal</h1>
            </div>
            <div className="text-gray-400 text-sm">{currentDate}</div>
          </div>
        </header>

        {/* Health Alert Banner */}
        <HealthAlertBanner
          errorCount={getErrorCount()}
          warningCount={getWarningCount()}
          projectsWithIssues={getProjectsWithIssues()}
          projectNames={projectNames}
        />

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161b22] border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#3399ff] transition-colors"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {(['All', 'Active', 'Maintenance', 'Blocked', 'Dormant'] as const).map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg transition-all text-sm ${
                    statusFilter === status
                      ? 'bg-[#3399ff] text-white'
                      : 'bg-[#161b22] text-gray-400 hover:bg-gray-800 border border-gray-800'
                  }`}
                >
                  {status} ({statusCounts[status]})
                </button>
              )
            )}
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} health={getHealth(project.id)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No projects found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
