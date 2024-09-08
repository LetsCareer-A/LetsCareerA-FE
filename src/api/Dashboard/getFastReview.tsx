import axiosInstance from '..';

export const getFastReview = async (page: number, size: number) => {
  try {
    const response = await axiosInstance.get(`/schedules/reviews/fast?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error('Error :', error);
    throw error;
  }
};
