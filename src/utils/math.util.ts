export const sumArray = (array: number[]) =>
  array.reduce((prev, next) => prev + next, 0);

export const getRandomNumberBetween = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1) - Number.EPSILON);
