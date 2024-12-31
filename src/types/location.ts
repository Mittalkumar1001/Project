export interface Location {
  lat: number;
  lng: number;
}

export interface Address {
  id: string;
  type: 'home' | 'office' | 'other';
  formattedAddress: string;
  houseNumber: string;
  area: string;
  location: Location;
  isFavorite: boolean;
}

export interface LocationState {
  addresses: Address[];
  selectedAddress: Address | null;
  isLocationModalOpen: boolean;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setSelectedAddress: (address: Address | null) => void;
  toggleLocationModal: () => void;
}