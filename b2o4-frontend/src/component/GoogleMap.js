import React, { useEffect, useRef, useState } from "react";
import "../css/GoogleMap.css"; // CSS 파일을 가져와서 스타일링을 적용

const Map = () => {
  // mapRef는 지도를 렌더링할 DOM 요소를 참조하기 위한 useRef 훅
  const mapRef = useRef(null);
  // map 상태는 Google Maps 인스턴스를 저장
  const [map, setMap] = useState(null);
  // marker 상태는 지도에 표시될 마커 인스턴스를 저장
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    // Google Maps API 스크립트를 동적으로 로드하는 함수
    const loadGoogleMapsScript = () => {
      // window 객체에 google 객체가 없다면 (Google Maps API가 로드되지 않았다면)
      if (!window.google) {
        // script 태그를 생성하여 Google Maps API를 동적으로 로드
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA0upEXkG-mdcVzsV8dJ2yVYma-YuHkYG8&callback=initMap`;
        script.async = true; // 스크립트를 비동기로 로드
        script.defer = true; // 스크립트 로드가 완료된 후 실행되도록 설정
        window.initMap = initMap; // Google Maps API 로드 후 initMap 함수를 호출
        document.head.appendChild(script); // 스크립트를 document의 head에 추가
      } else {
        // Google Maps API가 이미 로드된 경우, 즉시 initMap 함수를 호출
        initMap();
      }
    };

    // 지도를 초기화하는 함수
    const initMap = () => {
      // Google Maps API가 로드되지 않았을 경우 오류 처리
      if (!window.google || !window.google.maps) {
        console.error("Google Maps API가 로드되지 않았습니다.");
        return;
      }

      // 초기 위치를 (위도: 0, 경도: 0)으로 설정
      const initialPosition = { lat: 0, lng: 0 };

      // Google Maps 인스턴스를 생성하고 mapRef에 참조된 요소에 연결
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: 15, // 줌 레벨 설정
        center: initialPosition, // 초기 위치를 지도의 중심으로 설정
      });

      // 마커 인스턴스를 생성하고 지도의 초기 위치에 설정
      const markerInstance = new window.google.maps.Marker({
        position: initialPosition, // 마커의 초기 위치
        map: mapInstance, // 마커를 표시할 지도 인스턴스
      });

      // map 상태와 marker 상태를 각각 mapInstance와 markerInstance로 업데이트
      setMap(mapInstance);
      setMarker(markerInstance);
    };

    // Google Maps API 스크립트를 로드하여 지도 초기화를 시작
    loadGoogleMapsScript();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  useEffect(() => {
    // 지도와 마커가 초기화된 후에 위치 추적을 시작
    if (map && marker) {
      // 브라우저에서 Geolocation API를 지원하는지 확인
      if (navigator.geolocation) {
        // 사용자의 위치를 지속적으로 추적하는 watchPosition 호출
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newPosition = { lat: latitude, lng: longitude };

            // 마커 위치를 사용자의 현재 위치로 업데이트
            marker.setPosition(newPosition);
            // 지도의 중심을 사용자의 현재 위치로 업데이트
            map.setCenter(newPosition);
          },
          (error) => {
            // 위치 정보를 가져오는 데 오류가 발생할 경우 처리
            console.error("위치 정보를 가져오는데 오류가 발생했습니다: ", error);
          }
        );

        // 컴포넌트가 언마운트될 때 위치 추적을 중지
        return () => {
          navigator.geolocation.clearWatch(watchId);
        };
      } else {
        // 브라우저가 위치 정보를 지원하지 않을 경우 사용자에게 알림
        alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
      }
    }
  }, [map, marker]); // map과 marker가 변경될 때마다 이 useEffect가 실행

  return (
    <div>
      <h3>현재 위치</h3>
      {/* mapRef를 div 요소에 연결하여 Google Maps가 이 요소에 렌더링 되도록 설정 */}
      <div ref={mapRef} className="map-container" />
    </div>
  );
};

export default Map;
