import { useEffect, useRef, useState } from 'react';
import {
  SearchRoom,
  useSearchRoomStore,
} from '../../stores/useSearchRoomStore';
import { useSearchStore } from '../../stores/useSearchStore';
import useDateDashFormet from '../../customHooks/useDateDashFormet';
import { getMapLoad } from '../../axios/searchApi';
import { AxiosError } from 'axios';
import { redirect } from 'react-router-dom';
const VITE_KAKAO_API = import.meta.env.VITE_KAKAO_API;

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const { accommodation_data } = useSearchRoomStore();
  const { search } = useSearchStore();
  const { actions: roomActions } = useSearchRoomStore();

  const checkInDate = search.date.checkIn
    ? useDateDashFormet(search.date.checkIn)
    : '';
  const checkOutDate = search.date.checkOut
    ? useDateDashFormet(search.date.checkOut)
    : '';
  const [initialCenter, setInitialCenter] = useState([
    accommodation_data && accommodation_data.length > 0
      ? accommodation_data[0].location[0]
      : 37.49676871972202,
    accommodation_data && accommodation_data.length > 0
      ? accommodation_data[0].location[1]
      : 127.02474726969814,
  ]);

  const mapContainer = useRef<HTMLDivElement>(null);
  const kakaoMapRef = useRef<any>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dynamic script loading for Kakao Maps API
  const loadKakaoMap = () => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${VITE_KAKAO_API}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        initializeMap();
      });
    };
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapContainer.current || !window.kakao || !accommodation_data) return;

    const options = {
      center: new window.kakao.maps.LatLng(initialCenter[0], initialCenter[1]),
      level: 8,
    };

    const map = new window.kakao.maps.Map(mapContainer.current, options);
    map.setZoomable(false);
    kakaoMapRef.current = map;

    // Event listener for map idle state
    window.kakao.maps.event.addListener(map, 'idle', () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        const centerLatLng = map.getCenter();
        const point = `${centerLatLng.La},${centerLatLng.Ma}`;
        setInitialCenter([centerLatLng.getLat(), centerLatLng.getLng()]);
        fetchGetLoad(point);
      }, 500);
    });

    // Adding markers
    accommodation_data.forEach((el: SearchRoom) => {
      new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(el.location[0], el.location[1]),
        title: el.name,
        image: new window.kakao.maps.MarkerImage(
          '/marker.png',
          new window.kakao.maps.Size(16, 16)
        ),
      });
    });
  };

  useEffect(() => {
    if (!window.kakao) {
      loadKakaoMap();
    } else {
      initializeMap();
    }

    return () => {
      if (kakaoMapRef.current) {
        window.kakao.maps.event.removeListener(
          kakaoMapRef.current,
          'idle',
          () => {}
        );
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [accommodation_data]);

  const fetchGetLoad = async (point: string) => {
    try {
      const loadCard = await getMapLoad(
        point,
        checkInDate,
        checkOutDate,
        search.personnel.adult
      );
      roomActions.setSearchData(loadCard);
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        const statusCode = axiosError.response.status;
        switch (statusCode) {
          case 401:
            redirect('/user/login');
            break;
          default:
            console.log('요청 에러');
            break;
        }
      } else {
        console.error('Network or other error:', axiosError);
      }
    }
  };

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
