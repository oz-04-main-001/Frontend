import { useEffect, useRef, useState } from 'react';
import {
  SearchRoom,
  useSearchRoomStore,
} from '../../stores/useSearchRoomStore';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapCenter {
  center: {
    lat: number;
    lng: number;
  };
}

export default function Map() {
  const [mapCenter, setMapCenter] = useState<MapCenter>({
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
  });
  const { accommodation_data } = useSearchRoomStore();
  const mapContainer = useRef<HTMLDivElement>(null);
  const kakaoMapRef = useRef<any>(null);

  const markerSize = new window.kakao.maps.Size(16, 16);
  const markerImage = '/marker.png';

  const handleMapInfo = () => {
    if (kakaoMapRef.current) {
      const centerLatLng = kakaoMapRef.current.getCenter();

      console.log({
        centerLatLng,
      });
    }
  };

  useEffect(() => {
    const mapRef = mapContainer.current;
    if (mapRef && window.kakao) {
      const options = {
        center: new window.kakao.maps.LatLng(
          mapCenter.center.lat,
          mapCenter.center.lng
        ),
        level: 5,
      };
      const map = new window.kakao.maps.Map(mapRef, options);
      map.setZoomable(false);
      kakaoMapRef.current = map;

      window.kakao.maps.event.addListener(map, 'idle', handleMapInfo);

      accommodation_data?.forEach((el: SearchRoom) => {
        new window.kakao.maps.Marker({
          map: map,
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
          handleMapInfo
        );
      }
    };
  }, [mapCenter, accommodation_data]);

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
