import axios from 'axios';

// Lấy biến môi trường đúng cách cho React
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // gửi cookie chứa refresh token
});

// Gắn access token cho tất cả request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (!API_BASE_URL) {
      throw new Error('API_BASE_URL is not defined');
    }
    // Không cần cộng lại baseURL nếu đã có trong axios.create
    // config.url = API_BASE_URL + config.url; // Xóa dòng này
    return config;
  },
  (error) => Promise.reject(error)
);

type FailedRequest = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

// Xử lý tự động refresh token khi gặp lỗi 401
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu bị lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return API(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Gửi refresh token (trong cookie) để lấy access token mới
        const res = await axios.post(API_BASE_URL + '/auth/refresh-token', {}, { withCredentials: true });

        const newAccessToken = res.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        API.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;
