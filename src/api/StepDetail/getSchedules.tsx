import axiosInstance from '..';

export const getSchedules = async (scheduleId: number) => {
  try {
    const response = await axiosInstance.get(`/schedules/${scheduleId}/stages`);
    console.log('API Response:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error fetching review details:', error);
    throw error;
  }
};
