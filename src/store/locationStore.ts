import { create } from 'zustand';
import { LocationState, Address } from '../types/location';

export const useLocationStore = create<LocationState>((set) => ({
  addresses: [],
  selectedAddress: null,
  isLocationModalOpen: false,
  
  addAddress: (address) => set((state) => ({
    addresses: [...state.addresses, { ...address, id: crypto.randomUUID() }]
  })),
  
  updateAddress: (id, updatedAddress) => set((state) => ({
    addresses: state.addresses.map(addr => 
      addr.id === id ? { ...addr, ...updatedAddress } : addr
    )
  })),
  
  deleteAddress: (id) => set((state) => ({
    addresses: state.addresses.filter(addr => addr.id !== id)
  })),
  
  setSelectedAddress: (address) => set({ selectedAddress: address }),
  
  toggleLocationModal: () => set((state) => ({ 
    isLocationModalOpen: !state.isLocationModalOpen 
  }))
}));