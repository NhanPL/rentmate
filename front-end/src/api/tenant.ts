import API from './AxiosInterceptor';
import type { TenantDTO, TenantPayload } from '../pages/tenants/types';

// get all Tenants
export const getAllTenants = async () => {
  try {
    const response = await API.get<TenantDTO[]>('/tenants');
    return response.data;
  } catch (error) {
    console.error('Error fetching Tenants:', error);
    throw error;
  }
};

// get Tenant by ID
export const getTenantByID = async (id: string, signal?: AbortSignal) => {
  try {
    const response = await API.get<TenantDTO>(`/tenants/${id}`, { signal });
    return response.data;
  } catch (error) {
    console.error('Error fetching Tenant by id:', error);
    throw error;
  }
};

// get Tenant detail by ID
export const getInfoRentalTenantById = async (id: string) => {
  try {
    const response = await API.get<TenantDTO>(`/tenants/detail/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Tenants:', error);
    throw error;
  }
};

// add new Tenant
export const addTenant = async (data: TenantPayload) => {
  try {
    const response = await API.post<TenantDTO>('/tenants', data);
    return response.data;
  } catch (error) {
    console.error('Error adding Tenant:', error);
    throw error;
  }
};

// update existing Tenant
export const updateTenant = async (id: string, data: TenantPayload) => {
  try {
    const response = await API.put<TenantDTO>(`/tenants/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating tenant:', error);
    throw error;
  }
};
