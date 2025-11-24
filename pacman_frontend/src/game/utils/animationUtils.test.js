import { mouthPhaseToAngle, directionToHeading } from './animationUtils';

function radToDeg(r) {
  return (r * 180) / Math.PI;
}

test('mouthPhaseToAngle triangular mapping works', () => {
  const maxDeg = 40; // easier to assert
  const eps = 0.0001;
  expect(radToDeg(mouthPhaseToAngle(0, maxDeg))).toBeCloseTo(0, 4);
  expect(radToDeg(mouthPhaseToAngle(0.25, maxDeg))).toBeCloseTo(20, 3);
  expect(radToDeg(mouthPhaseToAngle(0.5, maxDeg))).toBeCloseTo(40, 3);
  expect(radToDeg(mouthPhaseToAngle(0.75, maxDeg))).toBeCloseTo(20, 3);
  expect(radToDeg(mouthPhaseToAngle(1, maxDeg))).toBeCloseTo(0, 3);
  // wrapping
  expect(radToDeg(mouthPhaseToAngle(1.25, maxDeg))).toBeCloseTo(20, 3);
  expect(Math.abs(mouthPhaseToAngle(Number.NaN, maxDeg)) < eps).toBe(true);
});

test('directionToHeading returns expected base angles', () => {
  expect(directionToHeading('RIGHT')).toBeCloseTo(0);
  expect(directionToHeading('LEFT')).toBeCloseTo(Math.PI);
  expect(directionToHeading('UP')).toBeCloseTo(-Math.PI / 2);
  expect(directionToHeading('DOWN')).toBeCloseTo(Math.PI / 2);
  expect(directionToHeading('NONE')).toBeCloseTo(0);
  expect(directionToHeading('UNKNOWN')).toBeCloseTo(0);
});
