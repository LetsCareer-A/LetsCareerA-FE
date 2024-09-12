// getMidReviewData.ts
import axios from 'axios';

export const getMidReviewData = async (scheduleId: number, stageId: number) => {
  const response = await axios.get(`/api/mid-review`, {
    params: {
      scheduleId,
      stageId,
    },
  });
  return response.data;
};

export default getMidReviewData;
