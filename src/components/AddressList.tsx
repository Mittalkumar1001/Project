import React from 'react';
import { Home, Building2, Users, Star, Trash2, MapPin } from 'lucide-react';
import { useLocationStore } from '../store/locationStore';
import { Address } from '../types/location';

export const AddressList: React.FC = () => {
  const { addresses, deleteAddress, updateAddress } = useLocationStore();

  const getIcon = (type: Address['type']) => {
    switch (type) {
      case 'home':
        return <Home size={24} />;
      case 'office':
        return <Building2 size={24} />;
      case 'other':
        return <Users size={24} />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="bg-white rounded-lg shadow-md p-4 flex items-start justify-between"
          >
            <div className="flex items-start space-x-4">
              <div className="text-blue-500">{getIcon(address.type)}</div>
              <div>
                <h3 className="font-medium capitalize">{address.type}</h3>
                <p className="text-gray-600 text-sm">{address.formattedAddress}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => updateAddress(address.id, { isFavorite: !address.isFavorite })}
                className={`p-2 rounded-full ${
                  address.isFavorite ? 'text-yellow-500' : 'text-gray-400'
                } hover:bg-gray-100`}
              >
                <Star size={20} fill={address.isFavorite ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={() => deleteAddress(address.id)}
                className="p-2 rounded-full text-red-500 hover:bg-gray-100"
              >
                <Trash2 size={20} />
              </button>
              <button className="p-2 rounded-full text-blue-500 hover:bg-gray-100">
                <MapPin size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};