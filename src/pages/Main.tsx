import { useEffect, useState } from 'react';
import { getLoad } from '../axios/mainApi';

interface Card {
  img: string;
  title: string;
  price: number;
}

export default function Main() {
  const dumy: Card[] = [{ img: '이미지', title: '숙소', price: 111 }];

  const [accmoInfoList, setAccmoInfoList] = useState(dumy);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLoad = async () => {
      const data = await getLoad();
      setAccmoInfoList(data);
      setLoading(false);
    };
    fetchLoad();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {accmoInfoList.map((accmoInfo, index) => (
        <div key={index}>
          <h3>{accmoInfo.title}</h3>
          <p>Price: {accmoInfo.price}</p>
          <img src={accmoInfo.img} alt={accmoInfo.title} />
        </div>
      ))}
    </div>
  );
}
