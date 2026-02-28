import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  exp: number; // expiration time (unix timestamp, seconds)
  iat?: number; // issued at
  [key: string]: unknown;
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;
    const now = Date.now() / 1000; // giây
    return decoded.exp < now;
  } catch {
    return true; // token hỏng coi như hết hạn
  }
};
