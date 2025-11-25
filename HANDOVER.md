# DevCommandCenter - Session Handover

## Session Metadata
- Date: 2025-11-25 17:35 IST
- Duration: ~2 hours
- Thread Context: Project portal + iTerm profiles setup

## Current Status
Project Portal deployed to GitHub Pages. iTerm profiles working. **Pending: inline editing of Next Steps with Supabase persistence.**

## Exact Position
- ✅ iTerm dynamic profiles (14 projects, unique colors, clear on startup)
- ✅ `iterm <profile>` shell command in ~/bin
- ✅ React dashboard with search, filters, project cards
- ✅ GitHub Pages deployment with auto-deploy on push
- ⏸️ Inline editing of Next Steps (user wants to edit on web, auto-persist)
- ⏭️ Next: Add Supabase for Next Steps persistence + inline editing UI

## Critical Context
1. User wants to edit Next Steps directly on the portal (not projects.ts)
2. localStorage won't work across domains (localhost vs GitHub Pages)
3. Need Supabase for real persistence that syncs everywhere
4. URL scheme `iterm://` doesn't work reliably (osacompile bug) - using shell command instead
5. ~/bin added to PATH in ~/.zshrc for `iterm` command

## Decisions Made
- **Decision:** Use shell command `iterm <profile>` instead of URL scheme
  **Rationale:** AppleScript URL handlers via osacompile don't reliably receive `on open location` events

- **Decision:** Store project data in projects.ts (source of truth) + Supabase (editable fields)
  **Rationale:** User wants inline editing but also version control for core project info

- **Decision:** GitHub Pages for hosting (rpanchanathan/devcommandcenter)
  **Rationale:** Free, auto-deploy, personal dashboard not GenWise product

## Blockers/Risks
- [ ] Supabase integration needed for inline editing (est: 1 hour)
- [ ] iTerm profiles use Monaco 16 font - verify it exists on system

## Files Created This Session
- `~/Library/Application Support/iTerm2/DynamicProfiles/genwise-projects.json` - 14 project profiles
- `~/bin/iterm` - shell command to open iTerm profiles
- `~/code/devcommandcenter/` - React project portal
- `.github/workflows/deploy.yml` - auto-deploy to GitHub Pages

## Live URLs
- GitHub: https://github.com/rpanchanathan/devcommandcenter
- Portal: https://rpanchanathan.github.io/devcommandcenter/

## Handover Prompt
"Continue devcommandcenter project. Portal deployed at rpanchanathan.github.io/devcommandcenter. User wants inline editing of Next Steps on the web portal with auto-save to Supabase (not localStorage). Read HANDOVER.md in ~/code/devcommandcenter for context. Start by adding Supabase table for project_updates and edit UI."
