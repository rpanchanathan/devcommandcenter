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
    lastTouched: '2025-12-03',
    techStack: ['React', 'TypeScript', 'Supabase', 'GCP Cloud Run'],
    prodUrl: 'https://parent.genwise.in',
    githubUrl: 'https://github.com/rpanchanathan/genwise-post-sales-portal',
    localPath: '/Users/rajeshpanchanathan/code/post-sales',
    itermProfile: 'post-sales',
    currentStatus: 'Course name bug RESOLVED. Webhook now uses deal.products[0].name. 4 students fixed. Cloud Scheduler paused.',
    nextSteps: [
      'Manual sync available: npx tsx scripts/sync-course-names.ts --fix',
      'Wait for trial/test parents to share portal experience',
      'Augment "Support a Child" tab - waiting for Eklavya collateral',
      'Build out "Digital Archive" tab'
    ],
    recentDecisions: [
      'Course names from products[0].name, not custom fields (Dec 3, 2025)',
      'Cloud Scheduler paused - root cause fixed, nightly sync unnecessary'
    ]
  },
  {
    id: 'pre-sales',
    name: 'Pre-Sales Monitoring',
    status: 'Active',
    description: 'GSP26 lead pipeline: Google Forms → Master Sheet → FreshSales CRM sync with Slack notifications.',
    lastTouched: '2025-12-03',
    techStack: ['Node.js', 'Google Sheets API', 'FreshSales API', 'Google Apps Script', 'PM2'],
    prodUrl: 'https://dashboard.giftedworld.org',
    githubUrl: 'https://github.com/GenWise/pre-sales-monitoring',
    localPath: '/Users/rajeshpanchanathan/code/pre-sales-monitoring',
    itermProfile: 'pre-sales',
    currentStatus: 'Production stable. Hourly CRM sync, form-bound scripts for 4 forms, Slack notifications (noise reduced).',
    nextSteps: [
      'Monitor Slack channel for reduced noise',
      'Add daily digest summary option'
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
    id: 'resume-screening',
    name: 'Resume Screening',
    status: 'Active',
    description: 'SKCH teacher recruitment screening tool. Vision API extraction, AI scoring, Sonnet narratives, batch processing.',
    lastTouched: '2025-12-16',
    techStack: ['Python', 'Streamlit', 'Claude API', 'SQLite', 'Digital Ocean'],
    prodUrl: 'https://skchscreen.genwise.in',
    localPath: '/Users/rajeshpanchanathan/code/skch/resume_processing',
    itermProfile: 'resume-screening',
    currentStatus: 'Live on DO. 129 candidates processed. Sonnet uses pre_computed as authoritative source, multi-board awareness.',
    nextSteps: [
      'Supplement missing form fields from Vision CV',
      'Monitor Sonnet narrative accuracy',
      'Export to Excel with hyperlinks working'
    ],
    recentDecisions: [
      'pre_computed is authoritative source for Sonnet - no recalculating tenures (Dec 16, 2025)',
      'Multi-board awareness: CBSE, ICSE, State (PUC/SSLC) - evaluate against applied board (Dec 16, 2025)'
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
    description: 'Static pages (TNP365, etc.) hosted via GitHub Pages + WordPress iframe. Includes form submission API.',
    lastTouched: '2025-12-04',
    techStack: ['HTML', 'CSS', 'GitHub Pages', 'Python', 'Flask', 'SMTP2GO'],
    prodUrl: 'https://genwise.in/tnp365',
    githubUrl: 'https://github.com/GenWise/static-pages',
    localPath: '/Users/rajeshpanchanathan/code/websites/static-pages',
    itermProfile: 'websites',
    currentStatus: 'TNP365 form now auto-sends emails via SMTP2GO API (no more mailto). API at tnp-form.genwise.in on DO droplet.',
    nextSteps: [
      'Monitor form submissions in siddharth@genwise.in inbox',
      'Add more static pages as needed'
    ],
    recentDecisions: [
      'Form API on DO droplet + SMTP2GO instead of mailto - reliable delivery (Dec 4, 2025)',
      'WordPress.com strips CSS - use GitHub Pages + iframe pattern instead (Nov 12, 2025)'
    ]
  },
  {
    id: 'devcommandcenter',
    name: 'Command Center',
    status: 'Active',
    description: 'Personal project portal/dashboard. Tracks 15 projects with status, next steps, quick links. Inline editing via GitHub API.',
    lastTouched: '2025-11-26',
    techStack: ['React', 'TypeScript', 'Vite', 'GitHub API', 'GitHub Pages'],
    prodUrl: 'https://rpanchanathan.github.io/devcommandcenter/',
    githubUrl: 'https://github.com/rpanchanathan/devcommandcenter',
    localPath: '/Users/rajeshpanchanathan/code/devcommandcenter',
    itermProfile: 'commandcenter',
    currentStatus: 'Live with inline editing. Edit Next Steps on web → commits to GitHub → auto-deploys.',
    nextSteps: [
      'Add Current Status inline editing',
      'Add localStorage option for PAT persistence',
      'Consider adding project reordering'
    ],
    recentDecisions: [
      'GitHub API for edits instead of Supabase - zero cost, version controlled (Nov 25, 2025)',
      'sessionStorage for PAT - security over convenience (Nov 25, 2025)'
    ]
  },
  {
    id: 'chimplyfun',
    name: 'Chimply Fun Website',
    status: 'Active',
    description: 'Preschool website. Nature-friendly, Waldorf/Montessori-inspired. GitHub Pages hosting with Cloudflare DNS.',
    lastTouched: '2025-12-03',
    techStack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages', 'Cloudflare'],
    prodUrl: 'https://chimplyfun.com',
    githubUrl: 'https://github.com/chimplyfun/website',
    localPath: '/Users/rajeshpanchanathan/code/chimplyfun/website',
    itermProfile: 'chimplyfun',
    currentStatus: 'Live on chimplyfun.com. DNS via Cloudflare, SSL working, GitHub Pages auto-deploys.',
    nextSteps: [
      'Content updates as needed',
      'Add contact form functionality',
      'SEO optimization'
    ],
    recentDecisions: [
      'Cloudflare DNS over GoDaddy - avoids locked forwarding records, full control (Dec 3, 2025)',
      'GitHub Pages over custom hosting - simple, free, auto-deploys on push'
    ]
  }
];
