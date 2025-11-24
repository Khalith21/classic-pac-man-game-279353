import React, { useEffect, useRef } from 'react';
import { TILE_SIZE } from '../constants';

/**
 * PUBLIC_INTERFACE
 * GameBoard component renders the game using a canvas for performance.
 * Props:
 * - maze: number[][]
 * - pacman: {x, y}
 * - ghosts: Array<{x, y, color}>
 * - poweredActive: boolean
 * - onTouchStart, onTouchEnd: handlers for swipe controls
 */
export default function GameBoard({
  maze,
  pacman,
  ghosts,
  poweredActive,
  onTouchStart,
  onTouchEnd,
}) {
  const canvasRef = useRef(null);
  const width = (maze[0]?.length || 0) * TILE_SIZE;
  const height = (maze.length || 0) * TILE_SIZE;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#0b1020';
    ctx.fillRect(0, 0, width, height);

    // Draw maze: walls, dots, power pellets
    for (let y = 0; y < maze.length; y += 1) {
      for (let x = 0; x < maze[0].length; x += 1) {
        const cell = maze[y][x];
        const px = x * TILE_SIZE;
        const py = y * TILE_SIZE;

        if (cell === 0) {
          ctx.fillStyle = '#2e3a8c';
          ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 2;
          ctx.strokeRect(px + 2, py + 2, TILE_SIZE - 4, TILE_SIZE - 4);
        } else if (cell === 1) {
          // dot
          ctx.fillStyle = '#fef3c7';
          ctx.beginPath();
          ctx.arc(px + TILE_SIZE / 2, py + TILE_SIZE / 2, 3, 0, Math.PI * 2);
          ctx.fill();
        } else if (cell === 3) {
          // power pellet
          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.arc(px + TILE_SIZE / 2, py + TILE_SIZE / 2, 6, 0, Math.PI * 2);
          ctx.fill();
        } else if (cell === 4) {
          // gate
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(px, py + TILE_SIZE / 2);
          ctx.lineTo(px + TILE_SIZE, py + TILE_SIZE / 2);
          ctx.stroke();
        }
      }
    }

    // Draw Pac-Man
    const pacX = pacman.x * TILE_SIZE + TILE_SIZE / 2;
    const pacY = pacman.y * TILE_SIZE + TILE_SIZE / 2;
    ctx.fillStyle = poweredActive ? '#06b6d4' : '#fbbf24';
    ctx.beginPath();
    ctx.arc(pacX, pacY, TILE_SIZE / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw Ghosts
    ghosts.forEach((g) => {
      const gx = g.x * TILE_SIZE + TILE_SIZE / 2;
      const gy = g.y * TILE_SIZE + TILE_SIZE / 2;
      ctx.fillStyle = poweredActive ? '#22c55e' : g.color;
      ctx.beginPath();
      ctx.arc(gx, gy, TILE_SIZE / 2 - 2, Math.PI, 0);
      ctx.lineTo(gx + (TILE_SIZE / 2 - 2), gy + (TILE_SIZE / 2 - 2));
      ctx.lineTo(gx - (TILE_SIZE / 2 - 2), gy + (TILE_SIZE / 2 - 2));
      ctx.closePath();
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(gx - 4, gy - 2, 3, 0, Math.PI * 2);
      ctx.arc(gx + 4, gy - 2, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1f2937';
      ctx.beginPath();
      ctx.arc(gx - 4, gy - 2, 1.5, 0, Math.PI * 2);
      ctx.arc(gx + 4, gy - 2, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [maze, pacman, ghosts, poweredActive, width, height]);

  return (
    <div
      role="application"
      aria-label="Pac-Man game board"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        display: 'inline-block',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow:
          '0 10px 25px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.2)',
      }}
    >
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
}
