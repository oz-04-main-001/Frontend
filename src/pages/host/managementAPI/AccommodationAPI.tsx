import axios from 'axios';
import { useEffect, useState } from 'react';

interface Accommodation {
  id: number;
  host: number;
  name: string;
  phone_number: string;
  description: string;
  rules: string;
  average_rating: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  accommodation_type: string | null;
  images: string[];
  gps_info: {
    city: string;
    states: string;
    road_name: string;
    address: string;
    location: string;
  };
}
export default function AccommodationAPI() {
  const [data, setData] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null | unknown>(null);

  const url = 'http://localhost/api/v1/accommodations/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Accommodation[]>(url);
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error('Fetching Error:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { data, loading, error };
}
