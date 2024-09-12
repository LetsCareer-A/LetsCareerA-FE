import axiosInstance from '..';

export const getCareers = async (scheduleId: number, stageId: number) => {
  try {
    const response = await axiosInstance.get(`/schedules/${scheduleId}/stages/${stageId}/careers/all`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting careers:', error);
    throw error;
  }
};
