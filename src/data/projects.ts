export type ProjectStatus = 'Active' | 'Maintenance' | 'Blocked' | 'Dormant';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  description: string;
  detailedDescription?: string;
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
    detailedDescription: `A comprehensive parent portal that serves as the primary touchpoint for GenWise Summer Program families after enrollment. Parents access personalized dashboards showing their child's course details, batch schedules, and program information.

The portal handles the complete post-enrollment journey: document collection (ID proofs, medical forms), payment tracking with Razorpay integration, and real-time sync with FreshSales CRM. A webhook system automatically updates parent records when deals close, ensuring data consistency across systems.

Built with React/TypeScript frontend on GCP Cloud Run, backed by Supabase for data persistence. Features include multi-child support, document upload with validation, and automated email notifications for key milestones.`,
    lastTouched: '2025-12-31',
    techStack: ['React', 'TypeScript', 'Supabase', 'GCP Cloud Run'],
    prodUrl: 'https://parent.genwise.in',
    githubUrl: 'https://github.com/rpanchanathan/genwise-post-sales-portal',
    localPath: '/Users/rajeshpanchanathan/code/post-sales',
    itermProfile: 'post-sales',
    currentStatus: 'Admin portal enhanced: payment stats dashboard (₹18L total, ₹7L collected), staff filtering (13 real parents), payment history bug fixed. Revision 00051.',
    nextSteps: [
      'CSV export for Students/Parents tables',
      'PDF export for Medical Details form',
      'PDF export for Terms & Conditions',
      'Augment "Support a Child" tab - waiting for Eklavya collateral'
    ],
    recentDecisions: [
      'Fixed payment history FK join bug - PostgREST PGRST200 on created_by (Dec 31, 2025)',
      'Staff filtered from admin stats/tables via admin_users exclusion (Dec 31, 2025)',
      'Payment stats added to admin dashboard (Dec 31, 2025)'
    ]
  },
  {
    id: 'pre-sales',
    name: 'Pre-Sales Monitoring',
    status: 'Active',
    description: 'GSP26 lead pipeline: Google Forms → Master Sheet → FreshSales CRM sync with Slack notifications.',
    detailedDescription: `An automated lead management pipeline that captures inquiries from multiple Google Forms (website, WhatsApp, referrals) and funnels them into a unified sales workflow.

Form submissions trigger Google Apps Scripts that normalize data and append to a Master Google Sheet. A Node.js service running on Digital Ocean (via PM2) performs hourly syncs to FreshSales CRM, creating contacts and deals with proper lifecycle stages. Slack notifications alert the sales team of new leads in real-time.

The system includes duplicate detection, lead source attribution, and automatic field mapping. A dashboard at dashboard.giftedworld.org provides visibility into pipeline health and conversion metrics.`,
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
    detailedDescription: `An automated reputation management system for Paati Veedu, a family restaurant. The system monitors Google Business Profile for new reviews and generates contextually appropriate AI responses.

A Python script runs on Digital Ocean cron, scraping new reviews via unofficial GMB APIs. Each review is analyzed for sentiment and key themes (food quality, service, ambiance). Claude API generates personalized responses that acknowledge specific feedback while maintaining the restaurant's warm, family-oriented voice.

Responses are queued for human approval via email (SMTP2GO), then auto-posted to Google. Review data is stored in Supabase for trend analysis. The system has handled 200+ reviews with consistent 4.5+ star maintenance.`,
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
    detailedDescription: `A multi-account Zoom recording archival system that automatically extracts, processes, and organizes meeting recordings for GenWise's educational programs.

The system monitors 4 Zoom accounts (different program leads) via Zoom API, detecting new cloud recordings. Videos and auto-generated transcripts are downloaded, then processed through Claude API to generate structured summaries with key discussion points, action items, and participant insights.

All assets are uploaded to organized Google Drive folders with consistent naming conventions. A daily cron job on Digital Ocean handles the extraction pipeline, with email notifications for failures. The archive serves as institutional memory for program reviews and parent communications.`,
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
    detailedDescription: `A monitoring dashboard that tracks registration status for Eklavya India's Admission Test Series (ATS), providing real-time visibility into enrollment numbers across test centers.

The Node.js service scrapes the official EI ATS registration portal daily, extracting seat availability, registration counts by center, and capacity utilization. Data is cached in JSON files for fast dashboard rendering, with historical snapshots enabling trend analysis.

The Express-based dashboard at internalapps.giftedworld.org displays key metrics with color-coded capacity indicators. GenWise uses this to time their promotional campaigns around registration windows and identify high-demand centers for targeted outreach.`,
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
    detailedDescription: `An AI-powered chatbot that answers parent inquiries about GenWise Summer Program 2026, embedded directly on the program landing page at genwise.in.

Unlike traditional RAG systems, this chatbot leverages Claude's 200K context window to load the entire program knowledge base (FAQs, schedules, pricing, policies) in a single prompt. This eliminates vector database complexity while ensuring accurate, contextual responses.

The FastAPI backend runs on GCP Cloud Run with auto-scaling. The chat widget is embedded in WordPress via iframe, styled to match the GenWise brand. Conversations are logged for analysis, helping identify common parent concerns and content gaps. The bot handles 50+ daily inquiries during peak enrollment season.`,
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
    detailedDescription: `A specialized tool for contract bridge players to document and share their bidding systems with partners. Bridge partnerships develop complex agreements about what each bid means - this app makes those systems navigable and maintainable.

The interface presents bidding sequences as interactive tables where each cell can contain explanations, exceptions, and hyperlinks to related sequences. IndexedDB (via Dexie) provides offline-first storage, ensuring systems are available during tournaments without internet.

Built with React/TypeScript and Vite for fast development. The app supports multiple system documents, import/export functionality, and a clean print layout for reference cards. Designed for serious bridge players who need more than spreadsheets but less than full convention card software.`,
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
    detailedDescription: `A photo organization tool that uses facial recognition to automatically group photos by person, making it easy to find and organize family/event photos across large collections.

The Python backend uses the face_recognition library (built on dlib) to detect faces and generate 128-dimensional embeddings. These embeddings are stored in SQLite for fast similarity searches. A clustering algorithm groups similar faces, suggesting which photos contain the same person.

A React UI displays face clusters for manual review and naming. Once faces are labeled, users can search for photos by person name or export organized albums. Currently processing 4,713 face embeddings from family photo archives, with room to scale to larger collections.`,
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
    detailedDescription: `A Model Context Protocol (MCP) server that enables Claude to upload videos from Google Drive Shared Drives to YouTube, with automatic transcription and chapter generation.

The server implements dual authentication: OAuth 2.0 for YouTube Data API (upload permissions) and Service Account for Google Drive API (access to Shared Drives). This allows uploading videos from team drives without requiring individual user consent for each file.

OpenAI Whisper integration automatically transcribes uploaded videos, generating accurate timestamps. These are formatted as YouTube chapters and appended to video descriptions. The MCP interface allows natural language commands like "upload the March workshop recording to the GenWise channel with chapters."`,
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
    detailedDescription: `The original batch processing pipeline that extracted structured data from 469 teacher resumes for Sri Kumaran Children's Home recruitment. This was the data extraction phase before the screening tool was built.

Google Vision API processed PDF resumes, extracting text with OCR for scanned documents. Custom regex patterns identified degrees, teaching experience, schools worked, and certifications. Results were stored in SQLite with evidence spans for verification.

This phase established the canonical data model (schools, colleges, qualifications) and identified extraction challenges (table parsing, date ambiguity) that informed the Vision API hybrid approach in the screening tool.`,
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
    detailedDescription: `An evidence-based teacher recruitment screening system for Sri Kumaran Children's Home (SKCH), one of Bangalore's top K-12 schools. The tool processes application forms and CVs to generate ranked candidate recommendations with AI-powered narratives.

The pipeline uses Claude Vision API for structured extraction from forms (qualifications, experience, salary expectations) and CVs (detailed work history, credentials). A scoring engine evaluates candidates on subject match, B.Ed qualification, CBSE experience, school quality, and location proximity to SKCH campuses.

Claude Sonnet generates professional 3-4 line narratives for each candidate, highlighting strengths and concerns. The Streamlit interface supports batch processing, human review workflows, and Excel export with hyperlinks. Multi-board awareness ensures candidates are evaluated against their applied board (CBSE, ICSE, or State), not assumed defaults.`,
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
    detailedDescription: `A data cleaning utility that normalizes inconsistent school name entries from alumni databases into canonical groups for display on GenWise's alumni pages.

Alumni self-report their schools in free-text fields, resulting in variations like "DPS Bangalore", "Delhi Public School, B'lore", "DPS BLR". This tool uses fuzzy matching and manual mapping rules to consolidate 1,146 unique entries into 32 recognized school groups.

The output feeds into alumni directory pages, enabling filtering and grouping by school. The mapping rules and canonical names are maintained in CSV/Excel for easy updates as new variations appear.`,
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
    name: 'MyCliniQ',
    status: 'Active',
    description: 'Telemedicine platform - BETA READY. Video consultations, prescriptions, family booking all working. Deployed on Cloud Run + Cloudflare Pages + Turso.',
    detailedDescription: `A comprehensive telemedicine platform enabling patients to book video/audio consultations with doctors, manage health records, and track prescriptions. Built as a full-stack application with role-based dashboards.

**Architecture:**
- Frontend: React + TypeScript + Tailwind + shadcn/ui on Cloudflare Pages
- Backend: Express + Prisma on GCP Cloud Run (asia-south1)
- Database: Turso (SQLite-compatible edge database)
- Storage: Cloudflare R2 for documents
- Video: 100ms.live for consultations
- Auth: JWT tokens with bcrypt password hashing

**Working Features (Beta Ready):**
- Patient dashboard with health score, appointments, quick actions
- Doctor dashboard with patient queue, schedule management
- Video consultations via 100ms.live (HMSPrebuilt)
- Appointment booking with Razorpay payment (test mode)
- Family member management (add dependents, book for family)
- Indian prescription format with PDF generation
- Doctor self-signup with multi-step wizard
- Lab test workflow (request → upload → view)
- Document upload to Cloudflare R2
- Chat messaging between patient/doctor
- Nutritional assessment (24-hour dietary recall)
- Consultation notes and diagnosis

**Key Tables:** users, doctor_profiles, patient_profiles, appointments, prescriptions, medications, documents, family_members, lab_tests, notifications, nutritional_assessments

**Deployment Commands:**
- Backend: cd backend && npm run build && cd .. && gcloud run deploy mycliniq-backend --source backend --region asia-south1
- Frontend: npm run build && npx wrangler pages deploy dist --project-name=mycliniq-frontend
- Seed DB: node backend/seed-turso.js (with TURSO env vars)`,
    lastTouched: '2025-12-31',
    techStack: ['React', 'TypeScript', 'Express', 'Prisma', 'Turso', 'GCP Cloud Run', 'Cloudflare Pages', 'Tailwind', '100ms.live', 'Cloudflare R2'],
    prodUrl: 'https://master.mycliniq-frontend.pages.dev',
    localPath: '/Users/rajeshpanchanathan/code/myCliniq',
    itermProfile: 'mycliniq',
    currentStatus: 'BETA READY. All core features working: video consultations, prescriptions, family booking, lab tests, document upload. E2E tested. Razorpay in test mode.',
    nextSteps: [
      'Enable Razorpay live mode for real payments',
      'Add email notifications (SMTP2GO)',
      'Add Claude Vision OCR for prescription parsing',
      'Production hardening - error handling, edge cases',
      'Add push notifications'
    ],
    recentDecisions: [
      '100ms.live for video - HMSPrebuilt zero-config UI, free 10K mins/mo (Dec 28, 2025)',
      'Cloudflare R2 for document storage - S3-compatible, free egress (Dec 28, 2025)',
      'Indian prescription format with clinic header, Rx table, signature (Dec 31, 2025)',
      'Doctor self-signup to allow organic growth (Dec 31, 2025)'
    ]
  },
  {
    id: 'obsidian',
    name: 'Obsidian Integration',
    status: 'Maintenance',
    description: 'Credential extraction from Obsidian/Notes. Generates grouped credential dashboard.',
    detailedDescription: `A utility that extracts and organizes API keys, passwords, and service credentials scattered across Obsidian notes into a structured, searchable dashboard.

The Python script parses markdown files from an Obsidian vault, identifying credential patterns (API keys, tokens, passwords) using regex and contextual hints. Extracted credentials are grouped by service/category and output as a JSON structure for the dashboard.

The tool solves the "where did I put that API key?" problem without requiring a dedicated password manager for development credentials. Currently used to maintain a personal credential inventory with ~50 services tracked.`,
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
    detailedDescription: `A collection of standalone web pages that integrate with GenWise's WordPress.com site via iframe embedding, bypassing WordPress.com's CSS limitations while maintaining brand consistency.

The pattern emerged from WordPress.com's aggressive CSS stripping on direct HTML posts. Static pages are developed locally with full styling control, pushed to GitHub Pages for hosting, then embedded in WordPress pages via iframe. This achieves pixel-perfect Figma designs without WordPress Business plan costs.

Includes TNP365 landing page with a Flask-based form submission API on Digital Ocean. Forms submit to the API, which sends emails via SMTP2GO (bypassing DO's SMTP port blocking) and logs submissions. The architecture supports adding new pages without WordPress constraints.`,
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
    detailedDescription: `A personal project management dashboard that provides a single-pane view of all active development projects, their status, and next actions. Think of it as a developer's portfolio meets task tracker.

Each project card displays status (Active/Maintenance/Dormant), tech stack, quick links (Production, GitHub, local path), current status summary, and next steps. The detail view adds recent architectural decisions and an "About" section explaining what the project does.

The killer feature is inline editing: update Next Steps directly on the web, which commits changes to GitHub via API, triggering auto-deployment. No local edits needed for task updates. Built with React/TypeScript, hosted free on GitHub Pages.`,
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
    detailedDescription: `A marketing website for Chimply Fun, a nature-focused preschool inspired by Waldorf and Montessori philosophies. The design emphasizes organic shapes, earthy colors, and imagery of children learning through nature exploration.

The site is built with pure HTML/CSS/JavaScript for simplicity and fast loading. Hosted on GitHub Pages with Cloudflare handling DNS and SSL. The Cloudflare setup was chosen over GoDaddy's DNS to avoid locked forwarding records that prevented proper subdomain configuration.

Content includes program philosophy, daily schedule, admissions process, and photo galleries. The simple tech stack means updates are straightforward: edit HTML, push to GitHub, auto-deploys in seconds.`,
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
  },
  {
    id: 'whatsapp-workflows',
    name: 'WhatsApp Workflows',
    status: 'Active',
    description: 'Personal automation repo for WhatsApp MCP integrations. Media download, video creation, message automation.',
    detailedDescription: `A personal automation toolkit for WhatsApp via MCP (Model Context Protocol). Enables Claude to interact with WhatsApp for reading messages, downloading media, and sending messages/files.

The repo consolidates patterns for WhatsApp automation including:
- Sequential media download workflow (parallel downloads overwrite due to timestamp-based filenames)
- Video creation with ffmpeg Ken Burns effects, text overlays, and background music
- Portrait vs landscape image handling for video creation
- Royalty-free music sourcing from incompetech.com

First project: Bird Screensaver - extracted 15 bird images from "The BushWalk Trust" WhatsApp group and created video screensavers for macOS and Windows with Ken Burns zoom effect, bird names, credits, and Satie's Gymnopédie No. 1 as background music.`,
    lastTouched: '2026-01-01',
    techStack: ['WhatsApp MCP', 'ffmpeg', 'Python', 'Bash'],
    localPath: '/Users/rajeshpanchanathan/code/whatsapp-workflows',
    itermProfile: 'whatsapp-workflows',
    currentStatus: 'Initial setup complete. CLAUDE.md with full WhatsApp MCP documentation, bird-screensaver project documented.',
    nextSteps: [
      'Add more automation scripts as needed',
      'Document additional WhatsApp groups in group_jids.md'
    ],
    recentDecisions: [
      'Sequential downloads required - MCP uses timestamp for filename, parallel downloads overwrite (Jan 1, 2026)',
      'Portrait images need top-crop (crop_y: 0) for bird photos - center-crop cuts off faces (Jan 1, 2026)'
    ]
  },
  {
    id: 'teacherhire-demo',
    name: 'TeacherHire Demo',
    status: 'Active',
    description: 'Demo version of teacher screening app for sales demos. Rebranded, 12 sample candidates.',
    detailedDescription: `A demonstration version of the SKCH teacher screening tool, rebranded for generic "Teacher Screening" use cases. Built for sales demos to showcase AI-powered candidate evaluation without exposing actual SKCH data.

The demo runs at teacherhire.genwise.in with 12 hand-picked candidates from the 2026 batch across 6 subjects (Biology, Chemistry, Math, Physics, English, Hindi). Each candidate has complete data: application forms, CVs, AI-generated narratives, qualification extraction, and school history.

Modified candidate_chat.py to handle the upload filename pattern (Name-hash.pdf) used by batch uploads. Hosted on the same DO droplet as production but with separate systemd service (port 8502) and nginx config.`,
    lastTouched: '2025-12-24',
    techStack: ['Python', 'Streamlit', 'Claude API', 'Digital Ocean'],
    prodUrl: 'https://teacherhire.genwise.in',
    githubUrl: 'https://github.com/GenWise/teacherhire-demo',
    localPath: '/Users/rajeshpanchanathan/code/skch/teacherhire-demo',
    itermProfile: 'teacherhire-demo',
    currentStatus: 'Live demo with 12 candidates. Form/CV links working, Quals/Schools displaying.',
    nextSteps: [
      'Test demo flow before sales call',
      'Add more candidates if needed'
    ],
    recentDecisions: [
      'Separate repo from production SKCH to avoid confusion (Dec 24, 2025)',
      'Modified candidate_chat.py for upload filename pattern (Name-hash.pdf)'
    ]
  }
];
