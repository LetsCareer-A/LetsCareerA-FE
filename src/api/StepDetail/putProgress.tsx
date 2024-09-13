import axiosInstance from '..';

export const putProgress = async (scheduleId: string, progress: string) => {
  try {
    const response = await axiosInstance.put(
      `/schedules/${scheduleId}`,
      { progress }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error putting progress:', error);
    throw error;
  }
};


//4.7 지원공고 상태 수정