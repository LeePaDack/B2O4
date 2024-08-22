import React, { useEffect, useRef, useState } from "react";

const Map = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    // Google Maps 스크립트 로드
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA0upEXkG-mdcVzsV8dJ2yVYma-YuHkYG8&callback=initMap`;
        script.async = true;
        script.defer = true;
        window.initMap = initMap;
        document.head.appendChild(script);
      } else {
        initMap();
      }
    };

    // 지도 초기화 함수
    const initMap = () => {
      if (!window.google || !window.google.maps) {
        console.error("Google Maps API가 로드되지 않았습니다.");
        return;
      }

      const initialPosition = { lat: 0, lng: 0 }; // 초기 위치 (0,0)

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center: initialPosition,
      });

      const markerInstance = new window.google.maps.Marker({
        position: initialPosition,
        map: mapInstance,
      });

      setMap(mapInstance);
      setMarker(markerInstance);
    };

    // Google Maps API 스크립트 로드
    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (map && marker) {
      if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newPosition = { lat: latitude, lng: longitude };

            // 마커 위치 업데이트
            marker.setPosition(newPosition);
            // 지도 중심 업데이트
            map.setCenter(newPosition);
          },
          (error) => {
            console.error("위치 정보를 가져오는데 오류가 발생했습니다: ", error);
          }
        );

        // 컴포넌트 언마운트 시 위치 추적 정리
        return () => {
          navigator.geolocation.clearWatch(watchId);
        };
      } else {
        alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
      }
    }
  }, [map, marker]);

  return (
    <div>
      <h3>현재 위치</h3>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100vh", border: "1px solid black" }}
      />
    </div>
  );
};

export default Map;
