# DevCommandCenter - Project Guidelines

## What This Is
Personal project portal/dashboard for tracking 14+ GenWise projects. Shows status, next steps, quick links to prod/GitHub/iTerm.

## Architecture

### Stack
- React 18 + TypeScript + Vite
- Tailwind CSS (dark theme)
- GitHub Pages hosting (free)
- Supabase for editable fields (pending)

### Data Model
- `src/data/projects.ts` - Source of truth for project metadata
- Supabase `project_updates` table - Editable fields (nextSteps, currentStatus)
- Merge at runtime: static data + Supabase overrides

### Deployment
- Auto-deploy on push to main via GitHub Actions
- Base path: `/devcommandcenter/`
- URL: https://rpanchanathan.github.io/devcommandcenter/

## iTerm Integration
- 14 dynamic profiles in `~/Library/Application Support/iTerm2/DynamicProfiles/genwise-projects.json`
- Shell command: `iterm <profile-name>` (requires ~/bin in PATH)
- Each profile: unique bg color, auto-cd to project, clear on startup, badge

## Quick Reference

### Add New Project
1. Add entry to `src/data/projects.ts`
2. Add iTerm profile to `genwise-projects.json`
3. Push to trigger deploy

### Update Next Steps (Current - Manual)
1. Edit `src/data/projects.ts`
2. `git add -A && git commit -m "Update" && git push`

### Update Next Steps (Planned - Web UI)
1. Edit on portal directly
2. Auto-saves to Supabase
3. No deploy needed
