export interface Room {
  id: string;
  apartmentId: string;
  name: string;
  type: string;
  price: number;
  size: string;
  status: 'availabled' | 'occupied' | 'maintenance';
}
