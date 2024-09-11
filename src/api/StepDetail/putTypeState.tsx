import axiosInstance from '..';

export const putTypeState = async (scheduleId: string, stageId: string, status: string) => {
  try {
    const response = await axiosInstance.put(
      `/schedules/${scheduleId}/stages/${stageId}`,
      { status } 
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error putting type state:', error);
    throw error;
  }
};


//4.6 전형 단계별 상태 수정