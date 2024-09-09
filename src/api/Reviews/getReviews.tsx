import axiosInstance from '..';

export const getReviews = async (page: number, size: number) => {
  try {
    const response = await axiosInstance.get('/schedules/reviews/company', {
      params: {
        page: page,
        size: size
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting reviews:', error);
    throw error;
  }
};