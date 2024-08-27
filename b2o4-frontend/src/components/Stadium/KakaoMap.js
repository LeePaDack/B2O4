import React, { useEffect } from "react";
import '../css/KakaoMap.css'; // CSS 파일을 임포트합니다.
const KakaoMap = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=0b1640c41caed1fef96fc19812168ffe&autoload=false";
    document.head.appendChild(script);
    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.5165, 127.0194), // 기본 중심: 서울
          level: 5, // 지도 확대 레벨
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        // 미리 정의된 풋살장 위치들에 마커 추가
        const locations = [
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
          { name: '성수풋살장', lat: 37.5444, lng: 127.0565 }
        ];
        locations.forEach((location) => {
          const markerPosition = new window.kakao.maps.LatLng(
            location.lat,
            location.lng
          );
          // 마커 생성
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            title: location.name,
          });
          marker.setMap(map);
          // 마커에 마우스를 올렸을 때 표시할 인포윈도우 생성
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:12px;">${location.name}</div>`,
          });
          // 마커에 마우스 오버 이벤트 등록
          window.kakao.maps.event.addListener(marker, 'mouseover', () => {
            infowindow.open(map, marker);
          });
          // 마커에서 마우스 아웃 이벤트 등록
          window.kakao.maps.event.addListener(marker, 'mouseout', () => {
            infowindow.close();
          });
        });
        // 현재 위치로 이동하는 함수 정의
        const moveToCurrentLocation = () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const currentPos = new window.kakao.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
              );
              // 현재 위치에 마커 추가
              const currentMarker = new window.kakao.maps.Marker({
                position: currentPos,
                title: "현재 위치",
                map: map,
                zIndex: 10 // 다른 마커보다 위에 표시되도록 설정
              });
              // 지도의 중심을 현재 위치로 이동
              map.setCenter(currentPos);
            }, (error) => {
              console.error("Geolocation Error: ", error);
              alert("현재 위치를 찾을 수 없습니다.");
            });
          } else {
            alert("Geolocation을 지원하지 않는 브라우저입니다.");
          }
        };
        // 버튼 클릭 이벤트에 함수 연결
        const locateButton = document.getElementById("locate-button");
        locateButton.addEventListener("click", moveToCurrentLocation);
      });
    };
  }, []);
  return (
    <div className="map-container">
      <div id="map" />
      <div className="map-control">
        <button id="locate-button">위치</button> {/* 버튼 추가 */}
      </div>
    </div>
  );
};