import axiosInstance from '..';

export const getReviewMid = async (scheduleId: number, stageId: number, midReviewId: number) => {
  try {
    const response = await axiosInstance.get('/review/mid', {
      params: { scheduleId, stageId, midReviewId }
    });
    console.log('API Response:', response.data);  // 응답 확인용 로그
    return response.data;
  } catch (error) {
    console.error('Error fetching review details:', error);
    throw error;
  }
};