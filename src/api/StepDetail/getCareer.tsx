import axiosInstance from '..';

export const getCareers = async () => {
  try {
    const response = await axiosInstance.get('/careers/all');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting careers:', error);
    throw error;
  }
};