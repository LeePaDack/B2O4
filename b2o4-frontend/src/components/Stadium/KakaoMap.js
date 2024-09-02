import React, { useEffect } from "react";
import '../css/KakaoMap.css'; // CSS 파일을 임포트합니다.
const KakaoMap = () => {
  useEffect(() => {
      // Kakao Maps API를 비동기적으로 로드하기 위한 스크립트 태그를 생성합니다.
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=0b1640c41caed1fef96fc19812168ffe&autoload=false";
    document.head.appendChild(script);
    script.onload = () => {// 스크립트가 로드된 후 실행할 콜백 함수를 정의합니다.
      if (window.kakao && window.kakao.maps) {// Kakao Maps 객체가 로드되었는지 확인합니다.
        window.kakao.maps.load(() => {// Kakao Maps API가 로드된 후 실행할 코드를 정의합니다.
          const mapContainer = document.getElementById("map");// 지도를 표시할 HTML 요소를 가져옵니다.
          const mapOption = {
            center: new window.kakao.maps.LatLng(37.5165, 127.0194), // 기본 지도의 중심 좌표를 설정합니다 (서울).
            level: 5, // 지도의 확대 레벨을 설정합니다.
          };
          const map = new window.kakao.maps.Map(mapContainer, mapOption);
          // 미리 정의된 풋살장 위치들에 마커 추가
          const locations = [
            // 서울 풋살장
            { name: '누리풋볼클럽', lat: 37.509850, lng: 127.033196 },
            { name: '피엘풋볼아카데미', lat: 37.517362, lng: 127.029288 },
            { name: '스포츠몬스터 아카데미풋살장', lat: 37.527087, lng: 127.029718 },
            { name: '로꼬풋살스타디움 도곡점', lat: 37.490768, lng: 127.058016 },
            { name: '압구정풋살 스튜디오', lat: 37.525140, lng: 127.028702 },
            { name: '워드풋살', lat: 37.484583, lng: 127.066226 },
            { name: '플레이존 풋살장', lat: 37.527455, lng: 127.035286 },
            { name: '일월에코파크풋살장', lat: 37.492895, lng: 127.081242 },
            { name: '청담자이아파트풋살장', lat: 37.522953, lng: 127.049424 },
            { name: '로꼬풋살스타디움잠실 제타플렉스점', lat: 37.513272, lng: 127.100168 },
            { name: '강동 송파 풋살장', lat: 37.5025, lng: 127.1258 },
            { name: '스타풋살장', lat: 37.4678, lng: 127.0389 },
            { name: '더베이스캠프', lat: 37.5442, lng: 127.0924 },
            { name: '잠심종합운동장제3풋살장', lat: 37.5151, lng: 127.0732 },
            { name: '반세르풋볼아카데미', lat: 37.4673, lng: 127.1276 },
            { name: '이촌한강공원풋살장', lat: 37.5196, lng: 126.9945 },
            { name: '잠실종합운동장제2풋살장', lat: 37.5151, lng: 127.0732 },
            { name: '주사랑FC풋살장 삼전점', lat: 37.5011, lng: 127.0915 },
            { name: '어반그라운드풋살', lat: 37.4944, lng: 127.1182 },
            { name: '성수풋살장', lat: 37.5444, lng: 127.0565 },
              // 경기도 풋살장
            { name: '수원월드컵경기장풋살장', lat: 37.2843, lng: 127.0194 },
            { name: '용인FC풋살파크', lat: 37.2418, lng: 127.1772 },
            { name: '안양축구센터풋살장', lat: 37.3948, lng: 126.9261 },
            { name: '고양국민체육센터풋살장', lat: 37.6563, lng: 126.8326 },
            { name: '성남종합운동장풋살장', lat: 37.4125, lng: 127.1262 },
            { name: '남양주시체육문화센터풋살장', lat: 37.6345, lng: 127.2166 },
            { name: '의정부시민풋살파크', lat: 37.7385, lng: 127.0457 },
            { name: '광명스피돔풋살장', lat: 37.4743, lng: 126.8667 },
            { name: '김포풋살클럽', lat: 37.6174, lng: 126.7159 },
            { name: '하남풋살클럽', lat: 37.5507, lng: 127.1943 },
          ];
          // 각 위치에 마커를 추가하고 인포윈도우를 설정합니다.
          locations.forEach((location) => {
            const markerPosition = new window.kakao.maps.LatLng(location.lat, location.lng);
            const marker = new window.kakao.maps.Marker({
              position: markerPosition, // 마커 위치를 설정합니다.
              title: location.name, // 마커의 타이틀(이름)을 설정합니다.
            });
            marker.setMap(map);// 지도에 마커를 추가합니다.
            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="padding:5px;font-size:12px;">${location.name}</div>`,
            });
            window.kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
            window.kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
          });
          const moveToCurrentLocation = () => {
            if (navigator.geolocation) { // Geolocation API가 지원되는지 확인합니다.
              navigator.geolocation.getCurrentPosition((position) => {
                const currentPos = new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
                const currentMarker = new window.kakao.maps.Marker({
                  position: currentPos,  // 현재 위치에 마커를 설정합니다.
                  title: "현재 위치", // 마커의 타이틀을 설정합니다.
                  map: map,
                  zIndex: 10 // 다른 마커보다 위에 표시되도록 설정합니다.
                });
                map.setCenter(currentPos); // 지도의 중심을 현재 위치로 이동합니다.
              }, (error) => {
                console.error("Geolocation Error: ", error); // 위치 정보를 가져오는 데 실패했을 때 에러 메시지를 출력합니다.
                alert("현재 위치를 찾을 수 없습니다.");// 사용자에게 경고 메시지를 표시합니다.
              });
            } else {
              alert("Geolocation을 지원하지 않는 브라우저입니다.");// Geolocation API를 지원하지 않는 경우 사용자에게 경고 메시지를 표시합니다.
            }
          };
          const locateButton = document.getElementById("locate-button");// 위치 버튼 요소를 가져옵니다.
          if (locateButton) {// 버튼이 존재하는지 확인합니다.
            locateButton.addEventListener("click", moveToCurrentLocation); // 버튼 클릭 시 현재 위치로 이동하는 함수를 호출하도록 이벤트 리스너를 추가합니다.
          }
        });
      }
    };
    // 컴포넌트 언마운트 시 스크립트를 정리하여 메모리 누수 방지
    return () => {
      document.head.removeChild(script); // 스크립트를 <head>에서 제거합니다.
    };
  }, []);
  return (
    <div className="map-container">
      <div id="map" />
      <div className="map-control">
        <button id="locate-button">위치</button> {/* 현재 위치로 이동하는 버튼 */}
      </div>
    </div>
  );
};
export default KakaoMap;