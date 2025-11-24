import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DEFAULT_MAZE,
  DIRECTIONS,
  GAME_SPEEDS,
  GHOSTS,
  INITIAL_PACMAN,
  MAX_LIVES,
  POWER_DURATION_MS,
  SCORE_VALUES,
} from '../constants';
import {
  countRemainingDots,
  getValidDirections,
  removeDot,
  tileHasDot,
  tileHasPower,
  wrapPosition,
} from '../utils/mazeUtils';
import { chooseGhostDirection } from '../utils/ghostAI';

// PUBLIC_INTERFACE
export function usePacmanGame() {
  /**
   * Hook that encapsulates Pac-Man game state and logic.
   * Returns state and command handlers for UI to render the game.
   */

  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [paused, setPaused] = useState(false);
  const [maze, setMaze] = useState(DEFAULT_MAZE);
  const [poweredUntil, setPoweredUntil] = useState(0);

  const [pacman, setPacman] = useState(INITIAL_PACMAN);
  const [ghosts, setGhosts] = useState(
    GHOSTS.map((g) => ({ ...g, dir: DIRECTIONS.LEFT }))
  );

  const pendingDir = useRef(DIRECTIONS.NONE);
  const loopId = useRef(null);

  const tickInterval = useMemo(() => {
    const speed = Math.max(
      GAME_SPEEDS.minTick,
      GAME_SPEEDS.baseTick - (level - 1) * 10
    );
    return speed;
  }, [level]);

  const resetPositions = useCallback(() => {
    setPacman(INITIAL_PACMAN);
    setGhosts(GHOSTS.map((g) => ({ ...g, dir: DIRECTIONS.LEFT })));
  }, []);

  const resetGame = useCallback(() => {
    setLevel(1);
    setScore(0);
    setLives(MAX_LIVES);
    setPaused(false);
    setMaze(DEFAULT_MAZE);
    setPoweredUntil(0);
    resetPositions();
  }, [resetPositions]);

  const togglePause = useCallback(() => setPaused((p) => !p), []);

  const poweredActive = useMemo(() => Date.now() < poweredUntil, [poweredUntil]);

  const nextLevel = useCallback(() => {
    setLevel((lv) => lv + 1);
    setMaze(DEFAULT_MAZE);
    setPoweredUntil(0);
    resetPositions();
  }, [resetPositions]);

  // Handle user intent to turn; applied when at an intersection or immediately if possible
  // PUBLIC_INTERFACE
  const setIntentDirection = useCallback((dir) => {
    if (!dir || typeof dir !== 'object') return;
    pendingDir.current = dir;
  }, []);

  // Movement and collisions
  const stepPacman = useCallback(() => {
    setPacman((prev) => {
      const desired = pendingDir.current && pendingDir.current.name !== 'NONE'
        ? pendingDir.current
        : prev.dir;

      // Try apply desired direction if valid
      const validDesired = getValidDirections(maze, prev.x, prev.y, false)
        .some((d) => d.name === desired.name);
      const dir = validDesired ? desired : prev.dir;

      let nx = prev.x + (dir?.x || 0);
      let ny = prev.y + (dir?.y || 0);
      ({ x: nx, y: ny } = wrapPosition(maze, nx, ny));

      // If blocked, stay
      const allowed = getValidDirections(maze, prev.x, prev.y, false)
        .some((d) => d.x === (dir?.x || 0) && d.y === (dir?.y || 0));
      if (!allowed) {
        return { ...prev, dir: dir?.name ? dir : prev.dir };
      }

      // Dot / Power handling
      if (tileHasDot(maze, nx, ny)) {
        setScore((s) => s + SCORE_VALUES.DOT);
        setMaze((m) => removeDot(m, nx, ny));
      } else if (tileHasPower(maze, nx, ny)) {
        setScore((s) => s + SCORE_VALUES.POWER);
        setMaze((m) => removeDot(m, nx, ny));
        setPoweredUntil(Date.now() + POWER_DURATION_MS);
      }

      return { x: nx, y: ny, dir: dir?.name ? dir : prev.dir };
    });
  }, [maze]);

  const stepGhosts = useCallback(() => {
    setGhosts((prev) =>
      prev.map((g) => {
        const dir = chooseGhostDirection(maze, g, pacman, poweredActive);
        const nx = g.x + dir.x;
        const ny = g.y + dir.y;
        const wrapped = wrapPosition(maze, nx, ny);
        return { ...g, x: wrapped.x, y: wrapped.y, dir };
      })
    );
  }, [maze, pacman, poweredActive]);

  const handleCollisions = useCallback(() => {
    // If any ghost on pacman position
    const hit = ghosts.find((g) => g.x === pacman.x && g.y === pacman.y);
    if (!hit) return;

    if (poweredActive) {
      // Eat ghost: reset to house and gain score
      setScore((s) => s + SCORE_VALUES.GHOST);
      setGhosts((prev) =>
        prev.map((g) =>
          g.x === pacman.x && g.y === pacman.y
            ? { ...g, x: 9, y: 4, dir: DIRECTIONS.LEFT }
            : g
        )
      );
    } else {
      // Lose life
      setLives((l) => l - 1);
      setPoweredUntil(0);
      resetPositions();
    }
  }, [ghosts, pacman, poweredActive, resetPositions]);

  // Win condition
  useEffect(() => {
    if (countRemainingDots(maze) === 0) {
      // Level up after slight delay for UX
      const t = setTimeout(() => {
        nextLevel();
      }, 500);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [maze, nextLevel]);

  // Game loop
  useEffect(() => {
    if (paused || lives <= 0) return undefined;

    loopId.current = setInterval(() => {
      stepPacman();
      stepGhosts();
      handleCollisions();
    }, tickInterval);

    return () => {
      if (loopId.current) {
        clearInterval(loopId.current);
      }
    };
  }, [paused, lives, stepPacman, stepGhosts, handleCollisions, tickInterval]);

  // Keyboard handler
  useEffect(() => {
    const onKey = (e) => {
      const key = e.key;
      if (key === 'ArrowLeft' || key === 'a' || key === 'A') setIntentDirection(DIRECTIONS.LEFT);
      else if (key === 'ArrowRight' || key === 'd' || key === 'D') setIntentDirection(DIRECTIONS.RIGHT);
      else if (key === 'ArrowUp' || key === 'w' || key === 'W') setIntentDirection(DIRECTIONS.UP);
      else if (key === 'ArrowDown' || key === 's' || key === 'S') setIntentDirection(DIRECTIONS.DOWN);
      else if (key === ' ' || key === 'Spacebar' || key === 'Space') togglePause();
      else if (key === 'r' || key === 'R') resetGame();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [resetGame, setIntentDirection, togglePause]);

  const touchStartRef = useRef({ x: 0, y: 0 });
  // Basic swipe for mobile
  const onTouchStart = useCallback((e) => {
    if (!e.touches || e.touches.length === 0) return;
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  }, []);
  const onTouchEnd = useCallback(
    (e) => {
      const start = touchStartRef.current;
      if (!start || !e.changedTouches || e.changedTouches.length === 0) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 10) setIntentDirection(DIRECTIONS.RIGHT);
        else if (dx < -10) setIntentDirection(DIRECTIONS.LEFT);
      } else {
        if (dy > 10) setIntentDirection(DIRECTIONS.DOWN);
        else if (dy < -10) setIntentDirection(DIRECTIONS.UP);
      }
    },
    [setIntentDirection]
  );

  const gameOver = lives <= 0;

  return {
    // state
    maze,
    pacman,
    ghosts,
    score,
    lives,
    level,
    paused,
    poweredActive,
    gameOver,
    // actions
    setIntentDirection,
    togglePause,
    resetGame,
    onTouchStart,
    onTouchEnd,
  };
}
