import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Overlay shows centered messages like Game Over and instructions.
 */
export default function Overlay({ visible, title, subtitle }) {
  if (!visible) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(2px)',
      }}
    >
      <div
        style={{
          padding: 24,
          background: 'white',
          color: '#111827',
          borderRadius: 12,
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          textAlign: 'center',
          width: 'min(90vw, 420px)',
          border: '1px solid rgba(59,130,246,0.25)',
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
          {title}
        </div>
        {subtitle ? (
          <div style={{ fontSize: 14, color: '#64748b' }}>{subtitle}</div>
        ) : null}
        <div
          style={{
            marginTop: 12,
            fontSize: 12,
            color: '#334155',
          }}
        >
          Controls: Arrow keys / WASD, Space to Pause, R to Reset. Swipe on
          mobile.
        </div>
      </div>
    </div>
  );
}
