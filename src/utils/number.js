export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function toDecimal(number) {
  'worklet';
  return Math.floor(number);
}
