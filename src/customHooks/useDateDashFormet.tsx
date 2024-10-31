import { useEffect, useState } from 'react';

export default function useDateDashFormet(time: string): string {
  if (!time) return '';
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    const parseDate = (dateStr: string): Date | null => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return new Date(dateStr);
      } else if (/^\d{8}\s\w+$/.test(dateStr)) {
        const year = parseInt(dateStr.slice(0, 4), 10);
        const month = parseInt(dateStr.slice(4, 6), 10) - 1;
        const day = parseInt(dateStr.slice(6, 8), 10);
        return new Date(year, month, day);
      } else if (/^\d{4}\.\d{2}\.\d{2}\s\w+$/.test(dateStr)) {
        const [year, month, day] = dateStr.split(' ')[0].split('.').map(Number);
        return new Date(year, month - 1, day);
      } else if (/^\d{8}\s?[가-힣]+$/.test(dateStr)) {
        const year = parseInt(dateStr.slice(0, 4), 10);
        const month = parseInt(dateStr.slice(4, 6), 10) - 1;
        const day = parseInt(dateStr.slice(6, 8), 10);
        return new Date(year, month, day);
      }
      console.error('Unrecognized date format:', dateStr);
      return null;
    };
    const formattedDate = `${time.slice(0, 4)}-${time.slice(4, 6)}-${time.slice(6)}`;
    setValue(formattedDate.split(' ')[0]);
  }, [time]);

  return value;
}
