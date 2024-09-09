import axiosInstance from '..';

export const getReviewInt = async (scheduleId: number, stageId: number, intReviewId: number) => {
  try {
    const response = await axiosInstance.get('/review/int', {
      params: { scheduleId, stageId, intReviewId }
    });
    console.log('API Response:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error fetching review details:', error);
    throw error;
  }
};