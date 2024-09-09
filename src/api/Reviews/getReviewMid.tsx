import axios from 'axios';

export const getReviewMid = async (scheduleId: number, stageId: number, midReviewId: number) => {
  try {
    const response = await axios.get(`/review/mid`, {
      params: { scheduleId, stageId, midReviewId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching review details:', error);
    throw error;
  }
};