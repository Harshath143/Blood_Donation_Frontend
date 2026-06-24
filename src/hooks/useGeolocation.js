import { useState, useEffect } from 'react';

const CHENNAI_COORDS = { lat: 13.0827, lng: 80.2707 };

export const useGeolocation = () => {
  const [location, setLocation] = useState({
    coordinates: CHENNAI_COORDS,
    error: null,
    loading: true,
    isFallback: true
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: "Geolocation is not supported by your browser.",
        loading: false
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          error: null,
          loading: false,
          isFallback: false
        });
      },
      (error) => {
        let errorMsg = "Failed to retrieve location.";
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = "Location permission denied. Using default location (Chennai).";
        }
        setLocation({
          coordinates: CHENNAI_COORDS,
          error: errorMsg,
          loading: false,
          isFallback: true
        });
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, []);

  return location;
};
