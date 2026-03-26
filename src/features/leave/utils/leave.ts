export const addMinutes = (time: string, minutes: number): string => {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const clampedTotal = Math.min(total, 23 * 60 + 59);
  const hh = String(Math.floor(clampedTotal / 60)).padStart(2, "0");
  const mm = String(clampedTotal % 60).padStart(2, "0");
  return `${hh}:${mm}`;
};
