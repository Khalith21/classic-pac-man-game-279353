//
// Game constants and configuration for Pac-Man.
// PUBLIC_INTERFACE
export const TILE_SIZE = 24; // px, used for rendering

// PUBLIC_INTERFACE
export const DIRECTIONS = Object.freeze({
  NONE: { x: 0, y: 0, name: 'NONE' },
  LEFT: { x: -1, y: 0, name: 'LEFT' },
  RIGHT: { x: 1, y: 0, name: 'RIGHT' },
  UP: { x: 0, y: -1, name: 'UP' },
  DOWN: { x: 0, y: 1, name: 'DOWN' },
});

// Level definitions: 0-wall, 1-dot, 2-empty, 3-power, 4-ghost house gate
// PUBLIC_INTERFACE
export const DEFAULT_MAZE = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1,0],
  [0,3,0,0,0,1,0,0,1,1,1,1,0,0,1,0,0,0,3,0],
  [0,1,1,1,1,1,1,1,1,4,4,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,1,0,0,0,4,4,0,0,0,1,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,4,4,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,1,0,0,1,1,1,1,0,0,1,0,0,0,1,0],
  [0,1,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

// PUBLIC_INTERFACE
export const INITIAL_PACMAN = { x: 1, y: 1, dir: DIRECTIONS.NONE };

// Ghost colors for variety
// PUBLIC_INTERFACE
export const GHOSTS = [
  { name: 'Blinky', color: '#FF0000', x: 9, y: 4 },
  { name: 'Pinky', color: '#FFC0CB', x: 10, y: 4 },
  { name: 'Inky', color: '#00FFFF', x: 9, y: 5 },
  { name: 'Clyde', color: '#FFA500', x: 10, y: 5 },
];

// PUBLIC_INTERFACE
export const GAME_SPEEDS = {
  // milliseconds per tick; reduced by level
  baseTick: 140,
  minTick: 70,
};

// PUBLIC_INTERFACE
export const POWER_DURATION_MS = 7000;

// PUBLIC_INTERFACE
export const SCORE_VALUES = Object.freeze({
  DOT: 10,
  POWER: 50,
  GHOST: 200,
});

// PUBLIC_INTERFACE
export const MAX_LIVES = 3;
