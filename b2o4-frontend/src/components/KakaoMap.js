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
          { name: '로꼬풋살스타디움잠실 제타플렉스점', lat: 37.513272, lng: 127.100168 }
        ];

        locations.forEach((location) => {
          const markerPosition = new window.kakao.maps.LatLng(
            location.lat,
            location.lng
          );
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            title: location.name, 
          });
          marker.setMap(map);
        });
      });
    };
  }, []);

  return (
    <div className="map-container">
      <div id="map" />
      <div className="map-control">
        <div className="search-bar">

        </div>
      </div>
    </div>
  );
};

export default KakaoMap;
