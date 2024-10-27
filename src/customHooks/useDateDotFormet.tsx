export default function useDateDotFormet(time: string) {
  const formattedDate = `${time.slice(0, 4)}.${time.slice(4, 6)}.${time.slice(6)}`;

  return formattedDate;
}
