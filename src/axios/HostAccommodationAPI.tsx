import { useEffect, useState } from 'react';
import client from './client';
import useHostAccommoDeleteStore from '../stores/useHostAccommoDelete';

interface Accommodation {
  id: 0;
  name: string;
  image: string;
  address: string;
}

export default function HostAccommodationAPI() {
  const [accommoData, setAccommoData] = useState<Accommodation[]>([]);
  const [, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string | null | unknown>(null);
  const { isAccommoDeleted} = useHostAccommoDeleteStore();
  const url = '/api/v1/host/accommodation/list/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await client.get<Accommodation[]>(url);
        setAccommoData(response.data);
      } catch (error) {
        console.error('Fetching Error:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAccommoDeleted]);
  return { accommoData, setAccommoData };
}
