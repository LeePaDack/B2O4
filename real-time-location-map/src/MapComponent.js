import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const MapComponent = () => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });

  useEffect(() => {
    // 사용자의 현재 위치를 추적
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({
        lat: latitude,
        lng: longitude,
      });
    };

    const error = () => {
      console.log("위치 정보를 가져올 수 없습니다.");
    };

    // 위치 추적 옵션
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    // 실시간 위치 추적
    const watchId = navigator.geolocation.watchPosition(
      success,
      error,
      options
    );

    // 컴포넌트가 언마운트될 때 위치 추적 중지
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyA0upEXkG-mdcVzsV8dJ2yVYma-YuHkYG8">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={currentPosition}
        zoom={15}
      >
        <Marker position={currentPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
