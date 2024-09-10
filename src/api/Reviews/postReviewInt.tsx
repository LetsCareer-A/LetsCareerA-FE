import axiosInstance from '..';

export const postReviewInt = async (scheduleId: string, stageId: string, details: string, qa: string, feel: string) => {
  try {
    const response = await axiosInstance.post(`/schedules/${scheduleId}/stages/${stageId}/reviews/interview`, {
      details,
      qa,
      feel
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
