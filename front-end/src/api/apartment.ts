import API from './AxiosInterceptor';
import { ApartmentFormData } from '../components/form/formApartments/FormApartments';

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

// add new apartment
export const addApartment = async (data: ApartmentFormData) => {
  try {
    const response = await API.post('/apartments', data);
    return response.data;
  } catch (error) {
    console.error('Error adding apartment:', error);
    throw error;
  }
};

// update existing apartment
export const updateApartment = async (id: string, data: ApartmentFormData) => {
  try {
    const response = await API.put(`/apartments/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating apartment:', error);
    throw error;
  }
};
