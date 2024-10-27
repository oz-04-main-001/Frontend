export default function useDateDashFormet(time: string) {
  const formattedDate = `${time.slice(0, 4)}-${time.slice(4, 6)}-${time.slice(6)}`;
  const dateOnly = formattedDate.split(' ')[0];
  return dateOnly;
}
