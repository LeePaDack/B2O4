import React, { useEffect, useRef, useState } from "react";
import '../css/GoogleMap.css';

const GoogleMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    const initMap = () => {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        console.error("Google Maps API가 로드되지 않았습니다.");
        return;
      }

      const initialPosition = { lat: 0, lng: 0 };

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

      const input = searchBoxRef.current;
      const searchBox = new window.google.maps.places.SearchBox(input);

      mapInstance.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }

        const place = places[0];
        if (place.geometry) {
          const newPosition = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          markerInstance.setPosition(newPosition);
          mapInstance.setCenter(newPosition);
        }
      });
    };

    if (!window.google || !window.google.maps) {
      window.initMap = initMap;
      loadGoogleMapsScript();
    } else {
      initMap();
    }

    // Cleanup Google Maps instances on component unmount
    return () => {
      if (map) {
        window.google.maps.event.clearInstanceListeners(map);
      }
    };
  }, []);

  useEffect(() => {
    if (map && marker) {
      if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newPosition = { lat: latitude, lng: longitude };

            marker.setPosition(newPosition);
            map.setCenter(newPosition);
          },
          (error) => {
            console.error("위치 정보를 가져오는데 오류가 발생했습니다: ", error);
          }
        );

        return () => navigator.geolocation.clearWatch(watchId);
      } else {
        alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
      }
    }
  }, [map, marker]);

  return (
    <div className="map-container-wrapper">
      <div className="map-header">
        <h3 className="map-title">현재 위치</h3>
        <input
          ref={searchBoxRef}
          type="text"
          placeholder="장소 검색..."
          className="map-search-box"
        />
      </div>
      <div className="map-container">
        <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
};

export default GoogleMap;
