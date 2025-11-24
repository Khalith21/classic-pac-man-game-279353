import { DIRECTIONS } from '../constants';
import { getValidDirections } from './mazeUtils';

// Pick next direction for a ghost.
// Simple AI: prefer movement reducing Manhattan distance to Pac-Man when powered is false.
// When Pac-Man is powered, ghosts try to increase distance.
// Avoid reversing direction unless no alternative.
// PUBLIC_INTERFACE
export function chooseGhostDirection(maze, ghost, pacman, powered) {
  const { x, y, dir } = ghost;
  const options = getValidDirections(maze, x, y, true);
  if (options.length === 0) return DIRECTIONS.NONE;

  // Do not reverse unless necessary
  const reverse = dir && { x: -dir.x, y: -dir.y };

  const filtered = options.filter((d) => !(reverse && d.x === reverse.x && d.y === reverse.y));
  const candidates = filtered.length ? filtered : options;

  const distance = (nx, ny) => Math.abs(nx - pacman.x) + Math.abs(ny - pacman.y);

  let best = candidates[0];
  let bestScore = powered ? -Infinity : Infinity;

  candidates.forEach((d) => {
    const nx = x + d.x;
    const ny = y + d.y;
    const dist = distance(nx, ny);
    if (!powered) {
      if (dist < bestScore) {
        bestScore = dist;
        best = d;
      }
    } else {
      if (dist > bestScore) {
        bestScore = dist;
        best = d;
      }
    }
  });

  return best;
}
