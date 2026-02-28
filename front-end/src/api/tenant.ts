import { Tenant } from '../types';
import API from './AxiosInterceptor';

// get all Tenants
export const getAllTenants = async () => {
  try {
    const response = await API.get('/tenants');
    return response.data;
  } catch (error) {
    console.error('Error fetching Tenants:', error);
    throw error;
  }
};

// get Tenant by ID
export const getTenantByID = async (id: string) => {
  try {
    const response = await API.get('/tenants/' + id);
    return response.data;
  } catch (error) {
    console.error('Error fetching Tenants:', error);
    throw error;
  }
};

// get Tenant by ID
export const getInfoRentalTenantById = async (id: string) => {
  try {
    const response = await API.get('/tenants/detail/' + id);
    return response.data;
  } catch (error) {
    console.error('Error fetching Tenants:', error);
    throw error;
  }
};

// add new Tenant
export const addTenant = async (data: Tenant) => {
  try {
    const response = await API.post('/tenants', data);
    return response.data;
  } catch (error) {
    console.error('Error adding Tenant:', error);
    throw error;
  }
};

// update existing Tenant
export const updateTenant = async (id: string, data: Tenant) => {
  try {
    const response = await API.put(`/tenants/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating tenant:', error);
    throw error;
  }
};
