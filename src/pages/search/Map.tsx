import { useEffect, useRef } from 'react';
import { useSearchStore } from '../../stores/useSearchStore';

declare global {
  interface Window {
    kakao: any;
  }
}
export default function Map() {
  const { search, actions } = useSearchStore();
  const mapContainer = useRef(null);
  const mapLatLng = search.city;
  console.log(mapLatLng);
  const markerdata = [
    {
      title: '콜드스퀘어',
      lat: 37.62197524055062,
      lng: 127.16017523675508,
    },
    {
      title: '하남돼지집',
      lat: 37.620842424005616,
      lng: 127.1583774403176,
    },
    {
      title: '수유리우동',
      lat: 37.624915253753194,
      lng: 127.15122688059974,
    },
    {
      title: '맛닭꼬',
      lat: 37.62456273069659,
      lng: 127.15211256646381,
    },
  ];
  useEffect(() => {
    const markerSize = new window.kakao.maps.Size(16, 16);
    const markerImage = '/marker.png';
    let options = {
      center: new window.kakao.maps.LatLng(37.6243, 127.1498), //지도의 중심좌표.
      level: 5,
    };

    let map = new window.kakao.maps.Map(mapContainer.current, options);

    markerdata.forEach(el => {
      const marker = new window.kakao.maps.MarkerImage(markerImage, markerSize);

      new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(el.lat, el.lng),
        title: el.title,
        image: marker,
      });
    });
  }, []);

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
