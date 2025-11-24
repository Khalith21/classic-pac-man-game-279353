# Pac-Man React Frontend

A classic Pac-Man game built with a lightweight React template.

## Features
- Playable Pac-Man with keyboard and touch controls
- Maze rendering with dots and power pellets
- Ghost AI with chase/evade behavior
- Scoring, lives, levels with increasing speed
- Pause/Reset, responsive layout, accessible UI

## Scripts

- `npm start` – start dev server at http://localhost:3000
- `npm test` – run tests
- `npm run build` – production build

## Controls
- Arrow keys / WASD – Move
- Space – Pause/Resume
- R – Reset
- Swipe – Move (mobile)

## Env Variables
See `.env.example` for available variables. Do not commit secrets.

## Architecture
- `src/game/constants.js` – game constants
- `src/game/utils/*.js` – grid utilities and ghost AI
- `src/game/hooks/usePacmanGame.js` – game loop, movement, collisions
- `src/game/components/*` – UI components
- `src/GamePage.jsx` – page composition

Security: No secrets are hardcoded; environment variables are referenced via `process.env`. Inputs are handled safely and no dangerous eval/exec patterns are used.
