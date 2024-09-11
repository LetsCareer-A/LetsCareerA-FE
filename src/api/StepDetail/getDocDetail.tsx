import axiosInstance from '..';

export const getDocDetail = async (scheduleId: number, stageId: number) => {
  try {
    const response = await axiosInstance.get(`/schedules/${scheduleId}/stages/${stageId}/document`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting document details:', error);
    throw error;
  }
};

//4.2 서류 상세 조회