# Adding MMM Chatbot Projects to Command Center

## Project 1: MMM Chatbot

```typescript
{
  id: 'mmm-chatbot',
  name: 'MMM Chatbot',
  status: 'Active',
  description: 'AI chatbot for My Misconception Mentor landing page. Claude Haiku, D1 analytics, Cloudflare Pages.',
  detailedDescription: `An AI-powered chatbot embedded on the My Misconception Mentor (MMM) teacher development program landing page at genwise.in/my-misconception-mentor.

Built with React + Vite + Tailwind, the chatbot uses Claude 3.5 Haiku to answer teacher inquiries about the MMM program. The system prompt includes full program content (schedule, pricing, topics, faculty credentials) eliminating the need for RAG/vector databases.

Architecture:
- Frontend: React chatbot widget (900px tall, floating button with GenWise W logo)
- Backend: Cloudflare Worker function (/api/chat) proxying Claude API
- Database: Cloudflare D1 (SQLite) logging all interactions with session tracking
- Hosting: Cloudflare Pages with WordPress iframe embedding

Key Features:
- Session tracking via cookies (24-hour sessions)
- User agent logging for device analytics
- Multi-chatbot ready (chatbot_name column for future bots)
- Response time tracking
- Post-processing to remove incomplete sentences
- Strict brevity constraints (max_tokens: 175, aggressive system prompt)
- Hyperlinks to page sections without showing full URLs
- Password-protected analytics dashboard at /dashboard

The chatbot replaced keyword-based FAQ with true AI conversation while staying constrained to page content only. Responses are concise (2-4 sentences typical) and professional.`,
  lastTouched: '2026-01-30',
  techStack: ['React', 'TypeScript', 'Claude API', 'Cloudflare Pages', 'Cloudflare Workers', 'Cloudflare D1', 'Vite', 'Tailwind'],
  prodUrl: 'https://genwise.in/my-misconception-mentor/',
  localPath: '/Users/rajeshpanchanathan/code/websites/genwise/MMM',
  itermProfile: 'mmm-chatbot',
  currentStatus: 'Live on genwise.in. AI-powered with Claude Haiku, D1 analytics tracking, 500+ teachers stat, 99% completion rate.',
  nextSteps: [
    'Monitor chatbot interactions via analytics dashboard',
    'Adjust system prompt based on user questions',
    'Consider adding more chatbots (GenAI for Educators, etc.)'
  ],
  recentDecisions: [
    'Claude Haiku over Sonnet - Sonnet models had API access issues, Haiku works reliably (Jan 30, 2026)',
    'max_tokens 175 with post-processing - removes incomplete sentences, looks professional (Jan 30, 2026)',
    'D1 over Google Sheets - more scalable, free tier generous, built into Cloudflare (Jan 30, 2026)',
    'Direct context inclusion over RAG - page content fits in prompt, simpler and faster (Jan 30, 2026)'
  ]
}
```

## Project 2: Chatbot Analytics Dashboard

```typescript
{
  id: 'chatbot-analytics',
  name: 'Chatbot Analytics Dashboard',
  status: 'Active',
  description: 'Analytics dashboard for all chatbot interactions. Tracks Q&A, sessions, response times across multiple chatbots.',
  detailedDescription: `A centralized analytics dashboard tracking all chatbot interactions across GenWise chatbots (currently MMM, expandable to GenAI for Educators, GSP, etc.).

The dashboard is a password-protected Cloudflare Pages Function at /dashboard that queries Cloudflare D1 database for chatbot logs. Displays real-time stats, full conversation history, and allows CSV export.

Database Schema (chatbot_interactions table):
- id, timestamp, chatbot_name, session_id, user_agent
- question, answer, response_time_ms, created_at

Dashboard Features:
- **Stats Cards:** Total interactions, unique sessions, avg response time
- **Search/Filter:** Search questions/answers by keyword, filter by chatbot name
- **Export:** CSV export of all data for deeper analysis
- **Session Tracking:** Group conversations by session ID to track multi-turn interactions
- **Device Analytics:** User agent logging shows mobile vs desktop usage

Access: https://[deployment-url]/dashboard?password=genwise2026

The dashboard future-proofs for multiple chatbots - all interactions logged to one table with chatbot_name discriminator. When new chatbots launch, they automatically appear in the filter dropdown.`,
  lastTouched: '2026-01-30',
  techStack: ['TypeScript', 'Cloudflare Pages Functions', 'Cloudflare D1', 'HTML/CSS'],
  prodUrl: 'https://85f62322.misconception-mentor.pages.dev/dashboard?password=genwise2026',
  localPath: '/Users/rajeshpanchanathan/code/websites/genwise/MMM',
  itermProfile: 'mmm-chatbot',
  currentStatus: 'Live with password protection. Tracking MMM chatbot, ready for multiple chatbots.',
  nextSteps: [
    'Add date range filtering',
    'Add conversation threading view (group by session_id)',
    'Add charts for interaction volume over time',
    'Consider adding sentiment analysis'
  ],
  recentDecisions: [
    'Cloudflare D1 free tier - 100k writes/day, 5M reads/day, perfect for chatbot analytics (Jan 30, 2026)',
    'Session ID tracking - 24-hour cookies enable multi-turn conversation analysis (Jan 30, 2026)',
    'Password in URL for simplicity - avoids separate auth system, good enough for internal tool (Jan 30, 2026)',
    'Multi-chatbot schema from day 1 - chatbot_name column allows easy expansion (Jan 30, 2026)'
  ]
}
```
