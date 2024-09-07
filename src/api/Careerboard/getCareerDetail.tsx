import axiosInstance from '..';

export const getCareerDetail = async (careerId: string) => {
  try {
    const response = await axiosInstance.get(`/careers/${careerId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting careers:', error);
    throw error;
  }
};
