import API from './AxiosInterceptor';

// get all apartments
export const getAllApartments = async () => {
  try {
    const response = await API.get('/apartments');
    return response.data;
  } catch (error) {
    console.error('Error fetching apartments:', error);
    throw error;
  }
};

// get apartment by ID
export const getApartmentByID = async (id: string) => {
  try {
    const response = await API.get('/apartments/' + id);
    return response.data;
  } catch (error) {
    console.error('Error fetching apartments:', error);
    throw error;
  }
};
