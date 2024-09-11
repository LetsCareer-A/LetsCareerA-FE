import axiosInstance from '..';

export const putIntroduction = async (scheduleId: string, stageId: string, selfIntros: Array<{ sequence: number, title: string, content: string }>) => {
  try {
    const response = await axiosInstance.put(
      `/schedules/${scheduleId}/stages/${stageId}/self-intro`, 
      { selfIntros } 
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error putting introduction:', error); 
    throw error;
  }
};



//4.10 자기소개서 저장