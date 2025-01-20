'use client';

import { useState, useEffect, ChangeEvent } from 'react';

interface Location {
  lat: number;
  lng: number;
}

export default function Home() {
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.log('Erro ao obter a localização');
        }
      );
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      setLatitude(userLocation.lat.toFixed(6));
      setLongitude(userLocation.lng.toFixed(6));
    }
  }, [userLocation]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'latitude') {
      setLatitude(value);
    } else if (id === 'longitude') {
      setLongitude(value);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-semibold text-center text-gray-700 mb-6">Insira sua localização</h1>

      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="latitude" className="block text-lg font-medium mb-2 text-gray-600">
            Latitude:
          </label>
          <input
            type="text"
            id="latitude"
            value={latitude}
            onChange={handleInputChange}
            placeholder="Latitude"
            className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="longitude" className="block text-lg font-medium mb-2 text-gray-600">
            Longitude:
          </label>
          <input
            type="text"
            id="longitude"
            value={longitude}
            onChange={handleInputChange}
            placeholder="Longitude"
            className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {userLocation && (
        <div id="map" className="mt-8 h-96 w-full">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyDSWc8mCBZFiPEYWoIrTaGYNElBwGWUpXY&center=${userLocation.lat},${userLocation.lng}&zoom=14`}
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}