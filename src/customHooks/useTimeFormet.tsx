export default function useTimeFormet(time: string) {
  const [hours, minutes] = time.split(':');
  const hoursAndMinutes = `${hours}:${minutes}`;
  return hoursAndMinutes;
}
