import { useEffect, useState } from 'react';

export default function useDateDashFormet(time: string): string {
  if (!time) return '';
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    const formattedDate = `${time.slice(0, 4)}-${time.slice(4, 6)}-${time.slice(6)}`;
    setValue(formattedDate.split(' ')[0]);
  }, [time]);

  return value;
}
