import API from './AxiosInterceptor';

// Function to register a user
export const registerUser = async (userData: { username: string; password: string }) => {
  try {
    const response = await API.post(`/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Function to log in a user
export const loginUser = async (credentials: { username: string; password: string }) => {
  try {
    const response = await API.post(`/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Function to log out a user
export const logoutUser = async (token: string) => {
  try {
    const response = await API.post(`/auth/logout`, { refreshToken: token });
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const refreshTokenApi = async (refreshToken: string) => {
  try {
    const response = await API.post(`/auth/refresh-token`, { refreshToken: refreshToken });
    return response.data;
  } catch (error) {
    console.error('Error refresh out:', error);
    throw error;
  }
};
