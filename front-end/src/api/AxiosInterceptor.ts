import axios from 'axios';
import { store } from '../stores';
import { logout, setTokens } from '../stores/slices/authSlice';
import { AuthState } from '../types';
import { isTokenExpired } from '../utils/isTokenExpired';
import { navigateTo } from '../utils/navigation';
import { refreshTokenApi } from './auth';

// Lấy biến môi trường đúng cách cho React
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // gửi cookie chứa refresh token
});

// Gắn access token cho tất cả request
API.interceptors.request.use(
  async (config) => {
    const { accessToken, refreshToken } = store.getState().auth as AuthState;
    let accessTokenLocal = accessToken;

    // Nếu request hiện tại là refresh-token thì bỏ qua
    if (config.url?.includes('/refresh-token')) {
      return config;
    }

    // Nếu token hết hạn → gọi API refresh
    if (accessToken && isTokenExpired(accessToken)) {
      try {
        const res = await refreshTokenApi(refreshToken);
        const token = res.accessToken;

        // Lưu token mới vào redux
        store.dispatch(setTokens({ accessToken: token, refreshToken }));
        accessTokenLocal = token; // cập nhật token mới để gắn vào request hiện tại
      } catch (error) {
        store.dispatch(logout());
        navigateTo('/login');
        return Promise.reject(error);
      }
    }

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessTokenLocal}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response, // nếu OK thì trả về luôn
  async (error) => {
    const status = error.response?.status;

    if (status === 500) {
      navigateTo('/error');
    } else if (status === 404) {
      navigateTo('/not-found');
    }

    return Promise.reject(error);
  }
);

export default API;
