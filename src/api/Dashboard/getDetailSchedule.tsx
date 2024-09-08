import axiosInstance from '..';

export const getDetailSchedule = async (date: string) => {
  try {
    const response = await axiosInstance.get('/schedules/date', {
      params: { date },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching detail schedule:', error);
    throw error;
  }
};
