# Project Conventions (HandBetting)

## Code Conventions
- Prefer existing components/patterns over creating new abstractions.
- Keep behavior changes isolated from visual-only changes where possible.
- Do not silently modify core game rules.
- Keep engine/state/ui boundaries clear:
  - `engine/` for rules
  - `store/` for orchestration
  - `pages/components/` for rendering

## Styling Conventions
- Preserve casino palette/token direction.
- Reuse existing utility classes and badge/CTA patterns.
- Keep instruction text near actions for clarity.

## Delivery Conventions
- Always run targeted lint on touched files.
- Run tests when logic/state contracts are touched.
- Summarize exactly what changed and why.
