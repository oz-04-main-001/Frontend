import { useEffect } from 'react';
import { getData } from '../axiosClient';
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Main() {
  useEffect(() => {
    const getDetailCommon = async () => {
      const axiosData = await getData(VITE_SERVER_URL);
      console.log(axiosData);
      getDetailCommon();
    };
  }, []);

  return <>Main</>;
}
