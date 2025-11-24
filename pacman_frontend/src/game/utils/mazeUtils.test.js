import {
  countRemainingDots,
  isInside,
  removeDot,
  tileHasDot,
  tileHasPower,
} from './mazeUtils';

test('dot counting and removal works', () => {
  const maze = [
    [0,1,2,3],
    [2,2,1,2],
  ];
  expect(countRemainingDots(maze)).toBe(3); // two dots and one power
  expect(tileHasDot(maze, 1, 0)).toBe(true);
  expect(tileHasPower(maze, 3, 0)).toBe(true);

  const updated = removeDot(maze, 1, 0);
  expect(tileHasDot(updated, 1, 0)).toBe(false);
  expect(countRemainingDots(updated)).toBe(2);
});

test('isInside returns false for out of bounds', () => {
  const maze = [[0]];
  expect(isInside(maze, -1, 0)).toBe(false);
  expect(isInside(maze, 0, -1)).toBe(false);
  expect(isInside(maze, 1, 0)).toBe(false);
  expect(isInside(maze, 0, 1)).toBe(false);
});
