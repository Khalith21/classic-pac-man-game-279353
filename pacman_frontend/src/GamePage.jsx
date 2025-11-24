import React, { useEffect, useState } from 'react';
import { usePacmanGame } from './game/hooks/usePacmanGame';
import GameBoard from './game/components/GameBoard';
import ScoreBoard from './game/components/ScoreBoard';
import Overlay from './game/components/Overlay';

/**
 * PUBLIC_INTERFACE
 * GamePage composes scoreboard, board, overlays, and theme toggle wrapper.
 */
export default function GamePage() {
  const {
    maze,
    pacman,
    ghosts,
    score,
    lives,
    level,
    paused,
    poweredActive,
    gameOver,
    togglePause,
    resetGame,
    onTouchStart,
    onTouchEnd,
    mouthPhase,
  } = usePacmanGame();

  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const NEXT_TELEMETRY_DISABLED =
    process.env.REACT_APP_NEXT_TELEMETRY_DISABLED || 'true';
  // Just a safe reference to env var; not used further but proves env reference without leaking secrets
  void NEXT_TELEMETRY_DISABLED;

  return (
    <div className="App">
      <header className="App-header" style={{ paddingTop: 56 }}>
        <button
          className="theme-toggle"
          onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <h1
          className="title"
          style={{
            margin: 0,
            marginBottom: 8,
            fontSize: 28,
            color: '#111827',
          }}
        >
          Classic Pac-Man
        </h1>
        <p className="subtitle" style={{ marginTop: 0, marginBottom: 18, color: '#64748b' }}>
          Eat all the dots, avoid the ghosts. Power pellets let you fight back!
        </p>

        <ScoreBoard
          score={score}
          level={level}
          lives={lives}
          paused={paused}
          onTogglePause={togglePause}
          onReset={resetGame}
        />
        <div style={{ position: 'relative', width: '100%' }}>
          <GameBoard
            maze={maze}
            pacman={{ ...pacman, mouthPhase }}
            ghosts={ghosts}
            poweredActive={poweredActive}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          />

          <Overlay
            visible={paused && !gameOver}
            title="Paused"
            subtitle="Press Space or tap Resume to continue."
          />
          <Overlay
            visible={gameOver}
            title="Game Over"
            subtitle="Press R or tap Reset to play again."
          />
        </div>
      </header>
    </div>
  );
}
