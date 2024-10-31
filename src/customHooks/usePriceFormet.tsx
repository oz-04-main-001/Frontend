import { useEffect, useState } from 'react';

export default function usePriceFormat(
  price: string,
  checkIn: string,
  checkOut: string
) {
  const [priceData, setPriceData] = useState<number>(0);
  const [dayData, setDayData] = useState<number>(0);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const numericValue = parseFloat(price.replace(/,/g, ''));
    setPriceData(numericValue);

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

    const start = parseDate(checkIn);
    const end = parseDate(checkOut);

    if (start && end && !isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const differenceInTime = end.getTime() - start.getTime();
      const calculatedDays = differenceInTime / (1000 * 3600 * 24);
      setDayData(calculatedDays > 0 ? calculatedDays : 0);
    } else {
      console.error('Invalid date format for check-in or check-out');
    }

    const totalPrice = priceData * dayData;
    setValue(totalPrice.toLocaleString()); // 천 단위 쉼표를 추가하여 문자열로 변환
  }, [price, checkIn, checkOut, priceData, dayData]);

  return value;
}
