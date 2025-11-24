import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ScoreBoard shows score, level, and lives; provides pause and reset actions.
 */
export default function ScoreBoard({
  score,
  level,
  lives,
  paused,
  onTogglePause,
  onReset,
}) {
  return (
    <div
      className="scoreboard"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 560,
        margin: '0 auto 12px',
        padding: '8px 12px',
        borderRadius: 10,
        background:
          'linear-gradient(180deg, rgba(59,130,246,0.10), rgba(243,244,246,0.6))',
        border: '1px solid rgba(59,130,246,0.25)',
        color: '#111827',
      }}
      aria-live="polite"
    >
      <div style={{ display: 'flex', gap: 18 }}>
        <div>
          <div style={{ fontSize: 12, color: '#64748b' }}>Score</div>
          <div style={{ fontWeight: 700 }}>{score}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#64748b' }}>Level</div>
          <div style={{ fontWeight: 700 }}>{level}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#64748b' }}>Lives</div>
          <div aria-label={`Lives remaining: ${lives}`} style={{ fontWeight: 700 }}>
            {'❤'.repeat(Math.max(0, lives))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          onClick={onTogglePause}
          className="btn"
          aria-pressed={paused}
          aria-label={paused ? 'Resume game' : 'Pause game'}
          style={buttonStyle(paused ? '#06b6d4' : '#3b82f6')}
        >
          {paused ? 'Resume' : 'Pause'}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="btn"
          aria-label="Reset game"
          style={buttonStyle('#ef4444')}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function buttonStyle(color) {
  return {
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid rgba(17,24,39,0.1)',
    background: color,
    color: '#ffffff',
    fontWeight: 600,
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
  };
}
