export interface Apartment {
  id: string;
  name: string;
  address: string;
  size: string; // e.g., "1200 sqft"
  rentAmount: number;
  status?: 'availabled' | 'occupied' | 'maintenance'; // Example status
}
