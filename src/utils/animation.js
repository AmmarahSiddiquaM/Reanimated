//getting the value between lower and upperbound
export const clamp = (value, lowerBound, upperBound) => {
  'worklet';
  return Math.min(Math.max(value, lowerBound), upperBound);
};

export const getCloserTo = (value, lowerBound, upperBound) => {
  'worklet';
  return Math.abs(value - lowerBound) < Math.abs(value - upperBound)
    ? lowerBound
    : upperBound;
};

export const snapPoint = (value, velocity, points) => {
  'worklet';
  const point = value + 0.2 * velocity;
  const deltas = points.map(p => Math.abs(point - p));
  const minDelta = Math.min.apply(null, deltas);
  return points.filter(p => Math.abs(point - p) === minDelta)[0];
};
