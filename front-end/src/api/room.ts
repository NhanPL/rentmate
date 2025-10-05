import { Room } from '../types/Room';
import API from './AxiosInterceptor';

// get all Room by Apartment ID
export const getRoomsByAparmentId = async (id: string) => {
  try {
    const response = await API.get('/room/apartment/' + id);
    return response.data;
  } catch (error) {
    console.error('Error fetching room:', error);
    throw error;
  }
};

// get Room by ID
export const getRoomByID = async (id: string) => {
  try {
    const response = await API.get('/room/' + id);
    return response.data;
  } catch (error) {
    console.error('Error fetching room:', error);
    throw error;
  }
};
// create Room
export const createRoom = async (data: Room) => {
  try {
    const response = await API.post('/room', data);
    return response.data;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};

// update Room
export const updateRoom = async (id: string, data: Room) => {
  try {
    const response = await API.put('/room/' + id, data);
    return response.data;
  } catch (error) {
    console.error('Error updating room:', error);
    throw error;
  }
};

// delete Room
export const deleteRoom = async (id: string) => {
  try {
    const response = await API.delete('/room/' + id);
    return response.data;
  } catch (error) {
    console.error('Error deleting room:', error);
    throw error;
  }
};
