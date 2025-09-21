export interface Apartment {
  id: string;
  name: string;
  address: string;
  fileUrl?: string;
  fileId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  accessToken: string;
  refreshToken: string;
}
