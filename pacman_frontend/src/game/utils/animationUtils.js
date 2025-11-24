//
// Utility helpers for animations to keep rendering code simple and testable.
//

/**
 * PUBLIC_INTERFACE
 * Map a normalized oscillating phase (0..1) to a mouth opening angle in radians.
 * Uses a triangle-wave mapping so that 0 -> 0 (closed), 0.5 -> max (open), 1 -> 0 (closed).
 * @param {number} phase - normalized phase between 0 and 1 (values outside are wrapped)
 * @param {number} maxDeg - maximum opening in degrees (e.g., 35)
 * @returns {number} angle in radians (0..max)
 */
export function mouthPhaseToAngle(phase, maxDeg) {
  const safeMaxDeg = Number.isFinite(maxDeg) ? Math.max(0, maxDeg) : 0;
  if (!Number.isFinite(phase)) return 0;
  // wrap to [0,1)
  const p = ((phase % 1) + 1) % 1;
  // triangle wave: rises 0->1 on [0,0.5], falls 1->0 on (0.5,1)
  const tri = p <= 0.5 ? p / 0.5 : (1 - p) / 0.5; // 0..1..0
  const deg = tri * safeMaxDeg;
  return (deg * Math.PI) / 180;
}

/**
 * PUBLIC_INTERFACE
 * Given a direction name, return the base heading angle in radians that Pac-Man faces.
 * RIGHT: 0, LEFT: PI, UP: -PI/2, DOWN: PI/2. Defaults to 0 if unknown.
 * @param {string} dirName - direction name
 * @returns {number} radians
 */
export function directionToHeading(dirName) {
  switch (dirName) {
    case 'LEFT':
      return Math.PI;
    case 'UP':
      return -Math.PI / 2;
    case 'DOWN':
      return Math.PI / 2;
    case 'RIGHT':
    default:
      return 0;
  }
}
