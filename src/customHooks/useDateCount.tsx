import { useEffect, useState } from 'react';

export default function useDateCount(startDay: string, lastDay: string) {
  const [value, setValue] = useState<number>();
  const regex = /[^0-9]/g;
  let startDayRegex = startDay.replace(regex, '');
  let lastDayRegex = lastDay.replace(regex, '');

  const formetDate = (date: string): Date => {
    const year = parseInt(date.slice(0, 4), 10); // 연도
    const month = parseInt(date.slice(4, 6), 10) - 1; // 월 (0부터 시작)
    const day = parseInt(date.slice(6, 8), 10); // 일
    return new Date(year, month, day);
  };
  useEffect(() => {
    const oldDate = new Date(formetDate(startDayRegex));
    const newDate = new Date(formetDate(lastDayRegex));
    const differenceInTime = newDate.getTime() - oldDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // 밀리초 -> 일로 변환

    setValue(differenceInDays);
  }, [startDay, lastDay]);

  return value;
}
