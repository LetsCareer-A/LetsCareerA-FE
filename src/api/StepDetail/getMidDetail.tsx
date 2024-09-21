import axiosInstance from '..';

export const getMidDetail = async (scheduleId: number, stageId: number) => {
  try {
    const response = await axiosInstance.get(`/schedules/${scheduleId}/stages/${stageId}/mid`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting mid details:', error);
    throw error;
  }
};

//4.3 중간 상세 조회