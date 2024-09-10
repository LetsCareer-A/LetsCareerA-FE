import axiosInstance from '..'; 

interface AddStatePayload {
  type: string; 
  mid_name: string; 
  date: string; 
}

export const postAddType = async (scheduleId: string, payload: AddStatePayload) => {
  try {
    const response = await axiosInstance.post(`/schedules/${scheduleId}/stages`, payload);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};


