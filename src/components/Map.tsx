import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Location } from '../types/location';
import { GOOGLE_MAPS_DEFAULT_CENTER, GOOGLE_MAPS_DEFAULT_ZOOM } from '../config/maps';

interface MapProps {
  center?: Location;
  onLocationChange?: (location: Location) => void;
}

export const Map: React.FC<MapProps> = ({ 
  center = GOOGLE_MAPS_DEFAULT_CENTER, 
  onLocationChange 
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  if (loadError) {
    return (
      <div className="w-full h-[300px] rounded-lg bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">
          Error loading map. Please check your API key configuration.
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[300px] rounded-lg bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <GoogleMap
      zoom={GOOGLE_MAPS_DEFAULT_ZOOM}
      center={center}
      mapContainerClassName="w-full h-[300px] rounded-lg"
      onClick={(e) => {
        if (e.latLng && onLocationChange) {
          onLocationChange({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          });
        }
      }}
    >
      <Marker 
        position={center} 
        draggable={true}
        onDragEnd={(e) => {
          if (e.latLng && onLocationChange) {
            onLocationChange({
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            });
          }
        }}
      />
    </GoogleMap>
  );
};