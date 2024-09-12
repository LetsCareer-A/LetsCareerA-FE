import axiosInstance from '..';

export const getIntDetail = async (scheduleId: number, stageId: number) => {
  try {
    const response = await axiosInstance.get(`/schedules/${scheduleId}/stages/${stageId}/interview`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting interview details:', error);
    throw error;
  }
};

//4.4 면접 상세 조회