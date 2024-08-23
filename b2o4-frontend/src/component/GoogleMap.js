import React, { useEffect, useRef, useState } from "react";
import "../css/GoogleMap.css"; // CSS 파일을 가져와서 스타일링을 적용

const Map = () => {
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null); // 검색 상자를 위한 useRef 추가
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA0upEXkG-mdcVzsV8dJ2yVYma-YuHkYG8&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;
        window.initMap = initMap;
        document.head.appendChild(script);
      } else {
        initMap();
      }
    };

    const initMap = () => {
      if (!window.google || !window.google.maps) {
        console.error("Google Maps API가 로드되지 않았습니다.");
        return;
      }

      const initialPosition = { lat: 0, lng: 0 };

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center: initialPosition,
      });

      setMap(mapInstance);

      // 검색 상자(SearchBox) 초기화
      const searchBox = new window.google.maps.places.SearchBox(searchBoxRef.current);
      mapInstance.controls[window.google.maps.ControlPosition.TOP_LEFT].push(searchBoxRef.current);

      // 검색 결과가 나오면 지도의 위치를 업데이트
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }

        // 지도 중심을 첫 번째 검색 결과로 이동
        const bounds = new window.google.maps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.error("검색 결과에 위치 정보가 없습니다.");
            return;
          }

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });

        mapInstance.fitBounds(bounds);
      });
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (map) {
      if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newPosition = { lat: latitude, lng: longitude };

            map.setCenter(newPosition);
          },
          (error) => {
            console.error("위치 정보를 가져오는데 오류가 발생했습니다: ", error);
          }
        );

        return () => {
          navigator.geolocation.clearWatch(watchId);
        };
      } else {
        alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
      }
    }
  }, [map]);

  return (
    <div>
      <h3>현재 위치</h3>
      <input
        ref={searchBoxRef}
        type="text"
        placeholder="장소를 검색하세요"
        className="search-box"
        style={{ margin: '10px', padding: '10px', width: '400px' }}
      />
      <div ref={mapRef} className="map-container" />
    </div>
  );
};

export default Map;
