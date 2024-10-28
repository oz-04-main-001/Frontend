import { useEffect, useState } from 'react';
import client from './client';
import useManagementFilterStore from '../stores/useManagementFilterStore';

interface Accommodation {
  id: 0;
  name: string;
  image: string;
  address: string;
}

export default function HostAccommodationAPI() {
  const [accommoData, setAccommoData] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null | unknown>(null);
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
  }, []);
  return { accommoData };
}
