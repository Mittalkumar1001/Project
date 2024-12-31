import React from 'react';
import { LocationModal } from './components/LocationModal';
import { AddressForm } from './components/AddressForm';
import { AddressList } from './components/AddressList';
import { useLocationStore } from './store/locationStore';
import { MapPin } from 'lucide-react';

function App() {
  const { toggleLocationModal } = useLocationStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Location Manager</h1>
            <button
              onClick={toggleLocationModal}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <MapPin size={20} />
              <span>Add Location</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <LocationModal />
        <AddressForm />
        <AddressList />
      </main>
    </div>
  );
}

export default App;