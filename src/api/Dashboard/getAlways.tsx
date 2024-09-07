import axiosInstance from '..';

export const getAlways = async (page: number = 1, size: number = 4) => {
  try {
    const response = await axiosInstance.get(`/schedules/always?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching always schedules:', error);
    throw error;
  }
};
