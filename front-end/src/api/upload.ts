import API from './AxiosInterceptor';

// Upload a file
export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const token = localStorage.getItem('accessToken');
    const response = await API.post('/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Update a file
export const updateFile = async (id: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await API.put(`/api/upload/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating file:', error);
    throw error;
  }
};

// Delete a file
export const deleteFile = async (id: string) => {
  try {
    const response = await API.delete(`/api/upload/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};
