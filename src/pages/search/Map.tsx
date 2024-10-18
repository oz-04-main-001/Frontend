// import { useEffect } from 'react';

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }
// export default function Map() {
//   useEffect(() => {
//     let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
//     let options = {
//       //지도를 생성할 때 필요한 기본 옵션
//       center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
//       level: 3, //지도의 레벨(확대, 축소 정도)
//     };

//     let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
//     for (let i = 0; i < dummy.data.length; i++) {
//       displayMarker(dummy.data[i], i);
//     }

//     function displayMarker<
//       T extends {
//         name: string;
//         location_y: number;
//         location_x: number;
//         active: boolean;
//         point: number;
//       },
//     >(data: T, i: number) {
//       // 인포윈도우 표시될 위치(좌표)
//       let iwPosition = new window.kakao.maps.LatLng(
//         data.location_y,
//         data.location_x
//       );

//       // 인포윈도우에 표출될 내용. HTML 문자열이나 document element 등이 가능하다.
//       var inactiveInfoWindow = `<div class="inactive infowindow""><span>${data.name}</span></div>`;

//       //인포윈도우
//       let infowindow;

//       infowindow = new window.kakao.maps.InfoWindow({
//         zIndex: 1,
//         position: iwPosition,
//         content: inactiveInfoWindow,
//         disableAutoPan: false,
//         map: map, //map에 해당 인포윈도우를 적용한다.
//       });
//     }

//     //중심좌표 재설정
//     var position = new window.kakao.maps.LatLng(37.586272, 127.029005);
//     map.setCenter(position);
//   }, []);

//   return <div id="map" style={{ width: '100vw', height: '100vh' }} />;
// }
