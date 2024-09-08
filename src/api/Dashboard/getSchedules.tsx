import axiosInstance from '..';

export const getSchedules = async (month: number, page: number = 1, size: number = 4) => {
  try {
    const response = await axiosInstance.get('/schedules/coming', {
      params: {
        month,
        page,
        size
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error get schedules:', error);
    throw error;
  }
};
