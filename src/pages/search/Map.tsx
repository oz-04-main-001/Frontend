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
  const markerSize = new window.kakao.maps.Size(16, 16);
  const markerImage = '/marker.png';

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!accommodation_data) return;
    const mapRef = mapContainer.current;
    if (mapRef && window.kakao) {
      const options = {
        center: new window.kakao.maps.LatLng(
          initialCenter[0],
          initialCenter[1]
        ),
        level: 8,
      };

      const map = new window.kakao.maps.Map(mapRef, options);
      map.setZoomable(false);
      kakaoMapRef.current = map;

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

      accommodation_data?.forEach((el: SearchRoom) => {
        new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(
            el.location[0],
            el.location[1]
          ),
          title: el.name,
          image: new window.kakao.maps.MarkerImage(markerImage, markerSize),
        });
      });
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
