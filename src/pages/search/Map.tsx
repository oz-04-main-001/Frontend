import { useEffect, useRef, useState } from 'react';
import { useSearchStore } from '../../stores/useSearchStore';
import {
  SearchRoom,
  useSearchRoomStore,
} from '../../stores/useSearchRoomStore';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Info {
  title: string;
  location: number[];
}

interface MapCenter {
  center: {
    lat: number;
    lng: number;
  };
}
const { accommodation_data, kakao_place_data } = useSearchRoomStore();

const markerdata = [
  {
    title: '콜드스퀘어',
    location: [37.62197524055062, 127.16017523675508],
  },
  {
    title: '하남돼지집',
    location: [37.620842424005616, 127.1583774403176],
  },
  {
    title: '수유리우동',
    location: [37.624915253753194, 127.15122688059974],
  },
  {
    title: '맛닭꼬',
    location: [37.62456273069659, 127.15211256646381],
  },
];

export default function Map() {
  const [mapCenter, setMapCenter] = useState<MapCenter>({
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
  });
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
      map.setZoomable(true);
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
  }, [mapCenter]);

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
