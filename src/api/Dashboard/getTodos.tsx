import axiosInstance from '..';

export const getTodo = async () => {
  try {
    const response = await axiosInstance.get('/todos');
    return response.data;
  } catch (error) {
    console.error('Error posting todo:', error);
    throw error;
  }
};