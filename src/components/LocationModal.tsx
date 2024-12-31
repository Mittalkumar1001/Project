import React, { useEffect, useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { useLocationStore } from '../store/locationStore';

export const LocationModal: React.FC = () => {
  const { isLocationModalOpen, toggleLocationModal } = useLocationStore();
  const [locationPermission, setLocationPermission] = useState<PermissionState>();

  useEffect(() => {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((result) => setLocationPermission(result.state));
  }, []);

  const handleEnableLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Handle successful location retrieval
        toggleLocationModal();
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  };

  if (!isLocationModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Enable Location Services</h2>
          <button
            onClick={toggleLocationModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex items-center justify-center py-6">
          <MapPin size={48} className="text-blue-500" />
        </div>
        
        <p className="text-gray-600 mb-6 text-center">
          Allow access to your location to help us serve you better with accurate delivery information.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={handleEnableLocation}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Enable Location
          </button>
          <button
            onClick={toggleLocationModal}
            className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Search Manually
          </button>
        </div>
      </div>
    </div>
  );
};