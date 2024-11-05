import { useEffect, useState } from 'react';
import client from './client';
import useHostActionStore from '../stores/useHostActionStore';

interface AmountDataType {
  date: string;
  total_bookings: number;
}

interface HostTotalProps {
  currentMonth?: number | null;
}

const HostTotalManagementAmountAPI = ({ currentMonth }: HostTotalProps) => {
  // amountData는 API에서 받아온 예약 데이터를 저장
  const [amountData, setAmountData] = useState<AmountDataType[] | undefined>();
  const { action } = useHostActionStore();

  // 비동기 함수로 API 호출
  const getTotalData = async (currentMonth: number | null) => {
    try {
      const response = await client.get(
        `/api/v1/host/totalbookingcount/?month=${currentMonth}`
      );
      setAmountData(response.data); // API 응답 데이터를 amountData에 저장
    } catch (error) {
      // console.error('Fetching Error:', error);
    }
  };

  // currentMonth가 변경될 때마다 API 호출
  useEffect(() => {
    if (currentMonth) {
      getTotalData(currentMonth);
    }
  }, [currentMonth, action]);

  return amountData; // amountData 반환
};

export default HostTotalManagementAmountAPI;
