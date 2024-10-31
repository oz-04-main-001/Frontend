export default function useDateDotFormet(time: string) {
  let timeData = time;

  if (time.includes('-')) {
    timeData = time.replace(/-/g, '');
  }
  const formattedDate = `${timeData.slice(0, 4)}.${timeData.slice(4, 6)}.${timeData.slice(6)}`;

  return formattedDate;
}
