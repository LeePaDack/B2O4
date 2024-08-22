import React, { useEffect, useRef, useState } from "react";

const RealTimeLocationMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    // Google Maps 스크립트 로드
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA0upEXkG-mdcVzsV8dJ2yVYma-YuHkYG8&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    };

    // 지도 초기화 함수
    const initMap = () => {
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

    // 스크립트 로드
    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initMap();
    }
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
            console.error("Error retrieving location: ", error);
          }
        );

        return () => navigator.geolocation.clearWatch(watchId);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  }, [map, marker]);

  return (
    <div>
      <h3>Real-Time Location Tracking</h3>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100vh", border: "1px solid black" }}
      />
    </div>
  );
};

export default RealTimeLocationMap;
