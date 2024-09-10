import axiosInstance from '..';

export const postReviewMid = async (scheduleId: string, stageId: string, freeReview: string, goal: string) => {
  try {
    const response = await axiosInstance.post(`/schedules/${scheduleId}/stages/${stageId}/reviews/mid`, {
      free_review: freeReview,
      goal: goal
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
