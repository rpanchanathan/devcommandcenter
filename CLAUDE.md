# DevCommandCenter - Project Guidelines

## What This Is
Personal project portal/dashboard for tracking 14+ GenWise projects. Shows status, next steps, quick links to prod/GitHub/iTerm.

## GitHub API Access
- **Account**: rpanchanathan
- **PAT**: See user-level `~/CLAUDE.md` (GitHub Access section)
- **Scope**: repo
- **Use**: Inline editing commits to projects.ts via web UI

## Architecture

### Stack
- React 18 + TypeScript + Vite
- Tailwind CSS (dark theme)
- GitHub Pages hosting (free)
- GitHub API for inline editing (no backend needed)

### Data Model
- `src/data/projects.ts` - Source of truth for project metadata
- Edits via web UI commit directly to GitHub → auto-deploy

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

### Update Next Steps (Web UI)
1. Go to project detail page
2. Click Edit in Next Steps section
3. Enter PAT if prompted (see GitHub API Access above)
4. Modify steps → Save
5. Auto-commits to GitHub → deploys in ~1 min
