import axiosInstance from '..';

export const getCalendar = async (month: number) => {
  try {
    const response = await axiosInstance.get('/schedules/calendar', {
      params: {
        month,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching schedules:', error);
    throw error;
  }
};
