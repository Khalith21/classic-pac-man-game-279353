import { DIRECTIONS } from '../constants';

// PUBLIC_INTERFACE
export function isWall(maze, x, y) {
  return maze[y] && maze[y][x] === 0;
}

// PUBLIC_INTERFACE
export function isGate(maze, x, y) {
  return maze[y] && maze[y][x] === 4;
}

// PUBLIC_INTERFACE
export function isInside(maze, x, y) {
  return y >= 0 && y < maze.length && x >= 0 && x < maze[0].length;
}

// PUBLIC_INTERFACE
export function tileHasDot(maze, x, y) {
  return maze[y] && maze[y][x] === 1;
}

// PUBLIC_INTERFACE
export function tileHasPower(maze, x, y) {
  return maze[y] && maze[y][x] === 3;
}

// PUBLIC_INTERFACE
export function removeDot(maze, x, y) {
  if (!isInside(maze, x, y)) return maze;
  if (maze[y][x] === 1 || maze[y][x] === 3) {
    const copy = maze.map((row, yi) =>
      row.map((cell, xi) => (xi === x && yi === y ? 2 : cell))
    );
    return copy;
  }
  return maze;
}

// PUBLIC_INTERFACE
export function countRemainingDots(maze) {
  let count = 0;
  for (let y = 0; y < maze.length; y += 1) {
    for (let x = 0; x < maze[0].length; x += 1) {
      if (maze[y][x] === 1) count += 1;
      if (maze[y][x] === 3) count += 1;
    }
  }
  return count;
}

// PUBLIC_INTERFACE
export function getValidDirections(maze, x, y, allowGate = false) {
  // Return directions that are not blocked by walls (and optionally by gates)
  const options = [];
  const dirs = [DIRECTIONS.LEFT, DIRECTIONS.RIGHT, DIRECTIONS.UP, DIRECTIONS.DOWN];
  dirs.forEach((d) => {
    const nx = x + d.x;
    const ny = y + d.y;
    if (!isInside(maze, nx, ny)) return;
    if (isWall(maze, nx, ny)) return;
    if (!allowGate && isGate(maze, nx, ny)) return;
    options.push(d);
  });
  return options;
}

// PUBLIC_INTERFACE
export function wrapPosition(maze, x, y) {
  // Optional wrap-around if moving off the sides; keep inside grid
  const width = maze[0].length;
  const height = maze.length;
  let nx = x;
  let ny = y;
  if (x < 0) nx = width - 1;
  if (x >= width) nx = 0;
  if (y < 0) ny = height - 1;
  if (y >= height) ny = 0;
  return { x: nx, y: ny };
}
