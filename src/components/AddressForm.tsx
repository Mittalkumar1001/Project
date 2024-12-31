import React, { useState } from 'react';
import { Home, Building2, Users } from 'lucide-react';
import { useLocationStore } from '../store/locationStore';
import { Map } from './Map';
import { Location } from '../types/location';

export const AddressForm: React.FC = () => {
  const { addAddress } = useLocationStore();
  const [location, setLocation] = useState<Location>({
    lat: 0,
    lng: 0,
  });
  const [formData, setFormData] = useState({
    type: 'home' as const,
    houseNumber: '',
    area: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({
      ...formData,
      location,
      formattedAddress: `${formData.houseNumber}, ${formData.area}`,
      isFavorite: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-4">
      <div>
        <h2 className="text-xl font-semibold mb-4">Enter Address Details</h2>
        <Map center={location} onLocationChange={setLocation} />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            House/Flat/Block No.
          </label>
          <input
            type="text"
            value={formData.houseNumber}
            onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Apartment/Road/Area
          </label>
          <input
            type="text"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Save as
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'home' })}
              className={`p-3 rounded-lg flex flex-col items-center ${
                formData.type === 'home' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'
              }`}
            >
              <Home size={24} />
              <span className="text-sm mt-1">Home</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'office' })}
              className={`p-3 rounded-lg flex flex-col items-center ${
                formData.type === 'office' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'
              }`}
            >
              <Building2 size={24} />
              <span className="text-sm mt-1">Office</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'other' })}
              className={`p-3 rounded-lg flex flex-col items-center ${
                formData.type === 'other' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'
              }`}
            >
              <Users size={24} />
              <span className="text-sm mt-1">Other</span>
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Save Address
      </button>
    </form>
  );
};