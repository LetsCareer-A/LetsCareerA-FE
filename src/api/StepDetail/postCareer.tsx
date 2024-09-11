import axiosInstance from '..';

export const postCareer = async (scheduleId: string, stageId: string, careerIds: number[]) => {
  try {
    const response = await axiosInstance.post(
      `/schedules/${scheduleId}/stages/${stageId}/career`,
      { careers: careerIds } 
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting career:', error); 
    throw error;
  }
};

//4.11 어필할 커리어 등록