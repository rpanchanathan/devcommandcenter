# DevCommandCenter - Session Handover

## Session Metadata
- Date: 2025-11-25 17:35 IST
- Duration: ~2 hours
- Thread Context: Project portal + iTerm profiles setup

## Current Status
Project Portal deployed to GitHub Pages. iTerm profiles working. **Pending: inline editing of Next Steps via GitHub API.**

## Exact Position
- ✅ iTerm dynamic profiles (14 projects, unique colors, clear on startup)
- ✅ `iterm <profile>` shell command in ~/bin
- ✅ React dashboard with search, filters, project cards
- ✅ GitHub Pages deployment with auto-deploy on push
- ⏸️ Inline editing of Next Steps (user wants to edit on web, auto-persist)
- ⏭️ Next: Add GitHub API integration to edit projects.ts from web UI

## Critical Context
1. User wants to edit Next Steps directly on the portal (not manually editing projects.ts)
2. localStorage won't work across domains (localhost vs GitHub Pages)
3. Use GitHub API to commit edits to projects.ts → auto-deploy via Actions (~1 min)
4. User is OUT of Supabase free tier - avoid new paid services
5. URL scheme `iterm://` doesn't work reliably (osacompile bug) - using shell command instead
6. ~/bin added to PATH in ~/.zshrc for `iterm` command

## Decisions Made
- **Decision:** Use shell command `iterm <profile>` instead of URL scheme
  **Rationale:** AppleScript URL handlers via osacompile don't reliably receive `on open location` events

- **Decision:** Use GitHub API to edit projects.ts directly (not Supabase)
  **Rationale:** Zero cost, version controlled, no new service, user out of Supabase free tier

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
"Continue devcommandcenter project at ~/code/devcommandcenter. Portal live at rpanchanathan.github.io/devcommandcenter. Add inline editing of Next Steps using GitHub API to commit changes to projects.ts (NOT Supabase - user out of free tier). Flow: edit on web → GitHub API commits → Actions auto-deploys. Read HANDOVER.md for full context."
