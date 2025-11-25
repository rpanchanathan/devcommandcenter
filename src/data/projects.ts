export type ProjectStatus = 'Active' | 'Maintenance' | 'Blocked' | 'Dormant';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  description: string;
  lastTouched: string;
  techStack: string[];
  prodUrl?: string;
  githubUrl?: string;
  localPath: string;
  itermProfile?: string;
  currentStatus: string;
  nextSteps: string[];
  recentDecisions?: string[];
}

export const projects: Project[] = [
  {
    id: 'post-sales',
    name: 'Post-Sales Portal',
    status: 'Active',
    description: 'Parent portal for GSP 2025 - multi-tab forms, document uploads, payment integration, CRM sync.',
    lastTouched: '2025-11-25',
    techStack: ['React', 'TypeScript', 'Supabase', 'GCP Cloud Run'],
    prodUrl: 'https://post-sales.genwise.in',
    githubUrl: 'https://github.com/rpanchanathan/genwise-post-sales-portal',
    localPath: '/Users/rajeshpanchanathan/code/post-sales',
    itermProfile: 'post-sales',
    currentStatus: 'Production ready. Multi-tab forms, document uploads working. Payment integration complete.',
    nextSteps: [
      'Monitor parent submissions',
      'Add analytics dashboard',
      'Optimize form validation UX'
    ]
  },
  {
    id: 'pre-sales',
    name: 'Pre-Sales Monitoring',
    status: 'Active',
    description: 'Lead tracking dashboard. Google Forms → Sheets aggregation, status tracking, owner assignments.',
    lastTouched: '2025-10-19',
    techStack: ['Node.js', 'Express', 'Google Sheets API', 'PM2'],
    prodUrl: 'https://dashboard.giftedworld.org',
    githubUrl: 'https://github.com/GenWise/pre-sales-monitoring',
    localPath: '/Users/rajeshpanchanathan/code/pre-sales-monitoring',
    itermProfile: 'pre-sales',
    currentStatus: 'Stable in production. Dashboard shows lead status across multiple Google Forms sources.',
    nextSteps: [
      'Add email notifications for new leads',
      'Implement lead scoring',
      'Create conversion funnel view'
    ]
  },
  {
    id: 'pv-reviews',
    name: 'PV Reviews',
    status: 'Active',
    description: 'Google Reviews automation for Paati Veedu restaurant. Scrapes reviews, generates AI responses, posts to GMB.',
    lastTouched: '2025-11-20',
    techStack: ['Python', 'Supabase', 'Claude API', 'SMTP2GO'],
    githubUrl: 'https://github.com/rpanchanathan/PV_Reviews',
    localPath: '/Users/rajeshpanchanathan/Library/Mobile Documents/com~apple~CloudDocs/Documents/Documents - Mac/PythonWork/PV_Reviews',
    itermProfile: 'pv-reviews',
    currentStatus: 'Running on DO cron. Auto-responds to new reviews with AI-generated responses.',
    nextSteps: [
      'Add sentiment analysis dashboard',
      'Implement response templates by rating',
      'Clean up 4GB log files'
    ]
  },
  {
    id: 'zoom-extraction',
    name: 'Zoom Extraction System',
    status: 'Maintenance',
    description: 'Automated Zoom recording extraction from 4 accounts. Downloads videos, transcripts, AI summaries to Google Drive.',
    lastTouched: '2025-11-09',
    techStack: ['Python', 'Zoom API', 'Google Drive API', 'Claude API'],
    githubUrl: 'https://github.com/GenWise/zoom-extraction-system',
    localPath: '/Users/rajeshpanchanathan/Documents/genwise/projects/zoom-extraction-system',
    itermProfile: 'zoom-extraction',
    currentStatus: 'Running on DO cron. 4 Zoom accounts configured. AI summaries generating correctly.',
    nextSteps: [
      'Monitor for API rate limits',
      'Add transcript search functionality'
    ],
    recentDecisions: [
      'Disabled duplicate LaunchAgent emails (Nov 9, 2025)'
    ]
  },
  {
    id: 'ei-ats',
    name: 'EI ATS Status',
    status: 'Active',
    description: 'EI ATS registration dashboard. Scrapes source daily, shows registration metrics.',
    lastTouched: '2025-11-15',
    techStack: ['Node.js', 'Express', 'JSON cache', 'PM2'],
    prodUrl: 'https://internalapps.giftedworld.org/ei-ats',
    localPath: '/Users/rajeshpanchanathan/code/ei-ats-status',
    itermProfile: 'ei-ats',
    currentStatus: 'Running on DO. Scrapes EI ATS registrations daily, displays metrics.',
    nextSteps: [
      'Push to GitHub',
      'Add historical trend charts',
      'Implement email alerts for capacity'
    ]
  },
  {
    id: 'gsp26-chatbot',
    name: 'GSP26 Chatbot',
    status: 'Active',
    description: 'RAG chatbot for GSP 2026 inquiries. Claude 200K context, no vector DB.',
    lastTouched: '2025-11-20',
    techStack: ['Python', 'FastAPI', 'Claude API', 'GCP Cloud Run'],
    prodUrl: 'https://genwise.in/gsp-2026-may',
    localPath: '/Users/rajeshpanchanathan/code/gsp26',
    itermProfile: 'gsp26-chatbot',
    currentStatus: 'Embedded in WordPress via iframe. Answers parent inquiries about GSP 2026.',
    nextSteps: [
      'Push to GitHub',
      'Add conversation analytics',
      'Implement handoff to human agent'
    ]
  },
  {
    id: 'bridge',
    name: 'Bridge System App',
    status: 'Active',
    description: 'Interactive workspace for bridge partnerships to build bidding systems. Visual tables, hyperlinks.',
    lastTouched: '2025-11-24',
    techStack: ['React', 'TypeScript', 'IndexedDB (Dexie)', 'Vite'],
    githubUrl: 'https://github.com/rpanchanathan/bridge-system-app',
    localPath: '/Users/rajeshpanchanathan/code/bridge-system-app',
    itermProfile: 'bridge',
    currentStatus: 'Local MVP working. Interactive bidding table with hyperlinks and annotations.',
    nextSteps: [
      'Add cloud sync for partnerships',
      'Implement export to PDF',
      'Deploy to production'
    ]
  },
  {
    id: 'faces',
    name: 'Faces Recognition',
    status: 'Maintenance',
    description: 'Face detection/recognition for photo organization. 4,713 embeddings, clustering UI.',
    lastTouched: '2025-10-15',
    techStack: ['Python', 'SQLite', 'face_recognition', 'React'],
    githubUrl: 'https://github.com/GenWise/faces',
    localPath: '/Users/rajeshpanchanathan/code/faces',
    itermProfile: 'faces',
    currentStatus: 'Local only. Face clustering working, 4,713 face embeddings processed.',
    nextSteps: [
      'Improve clustering accuracy',
      'Add face naming UI',
      'Export organized photos'
    ]
  },
  {
    id: 'youtube-mcp',
    name: 'YouTube MCP',
    status: 'Active',
    description: 'MCP server for YouTube uploads from Google Drive. Dual-auth, Whisper transcription.',
    lastTouched: '2025-11-22',
    techStack: ['TypeScript', 'MCP', 'YouTube API', 'OpenAI Whisper'],
    localPath: '/Users/rajeshpanchanathan/code/youtube-mcp',
    itermProfile: 'youtube-mcp',
    currentStatus: 'Working locally. Uploads videos from Shared Drives, auto-transcribes for chapters.',
    nextSteps: [
      'Push to GitHub',
      'Add batch upload support',
      'Implement chapter timestamp editor'
    ],
    recentDecisions: [
      'Dual-auth pattern: OAuth for YouTube + Service Account for Drive'
    ]
  },
  {
    id: 'skch',
    name: 'SKCH Resumes',
    status: 'Dormant',
    description: 'Resume processing for SKCH teacher recruitment. Vision API extraction, 469 resumes.',
    lastTouched: '2025-09-30',
    techStack: ['Python', 'Google Vision API', 'SQLite'],
    localPath: '/Users/rajeshpanchanathan/code/skch',
    itermProfile: 'skch',
    currentStatus: 'One-off project complete. 469 resumes processed and data extracted.',
    nextSteps: [
      'Archive or delete if no longer needed'
    ]
  },
  {
    id: 'schoolname',
    name: 'School Name Normalization',
    status: 'Dormant',
    description: 'School name normalization. Maps 1,146 schools to 32 groups for alumni pages.',
    lastTouched: '2025-09-15',
    techStack: ['Python', 'pandas', 'CSV/Excel'],
    localPath: '/Users/rajeshpanchanathan/code/schoolname',
    itermProfile: 'schoolname',
    currentStatus: 'One-off project complete. 1,146 schools mapped to 32 normalized groups.',
    nextSteps: [
      'Archive or push to GitHub for reference'
    ]
  },
  {
    id: 'mycliniq',
    name: 'myCliniq',
    status: 'Dormant',
    description: 'Health profile management. Document uploads, React frontend.',
    lastTouched: '2025-08-01',
    techStack: ['React', 'Node.js'],
    localPath: '/Users/rajeshpanchanathan/code/myCliniq',
    itermProfile: 'mycliniq',
    currentStatus: 'Development stalled. Local frontend exists.',
    nextSteps: [
      'Evaluate if project should continue',
      'Define MVP requirements if yes'
    ]
  },
  {
    id: 'obsidian',
    name: 'Obsidian Integration',
    status: 'Maintenance',
    description: 'Credential extraction from Obsidian/Notes. Generates grouped credential dashboard.',
    lastTouched: '2025-10-20',
    techStack: ['Python', 'JSON'],
    localPath: '/Users/rajeshpanchanathan/code/obsidian_integration',
    itermProfile: 'obsidian',
    currentStatus: 'Working locally. Extracts and organizes credentials from Obsidian vault.',
    nextSteps: [
      'Add encryption for exported credentials',
      'Implement automatic sync'
    ]
  },
  {
    id: 'websites',
    name: 'Websites / Static Pages',
    status: 'Active',
    description: 'Static pages (TNP365, etc.) hosted via GitHub Pages + WordPress iframe.',
    lastTouched: '2025-11-12',
    techStack: ['HTML', 'CSS', 'GitHub Pages'],
    prodUrl: 'https://genwise.github.io/static-pages',
    githubUrl: 'https://github.com/genwise/websites',
    localPath: '/Users/rajeshpanchanathan/code/websites',
    itermProfile: 'websites',
    currentStatus: 'TNP365 page deployed. GitHub Pages + WordPress iframe pattern working.',
    nextSteps: [
      'Add more static pages as needed',
      'Document the deployment pattern'
    ],
    recentDecisions: [
      'WordPress.com strips CSS - use GitHub Pages + iframe pattern instead (Nov 12, 2025)'
    ]
  }
];
