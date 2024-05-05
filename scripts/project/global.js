function lerp(start, end, amt) {
  // Simple helper function for linear interpolation

  return (1 - amt) * start + amt * end;
}

function dist2D(x1, y1, x2, y2) {
  // Simple helper function to calculate distance between 2 points in 2D space

  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function setMinMaxRange(min, max, currentNumber) {
  return Math.min(max, Math.max(min, currentNumber));
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { lerp, dist2D, setMinMaxRange, delay };
