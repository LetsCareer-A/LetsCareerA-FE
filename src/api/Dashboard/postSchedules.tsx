import axiosInstance from '..'; 
import axios, { AxiosError } from 'axios'; 

interface ScheduleData {
  company: string;
  department: string;
  type: string | null;
  mid_name?: string;
  always: boolean;
  date?: string; 
  url?: string; 
}

export const postScheduleData = async (data: ScheduleData) => {
  try {
    const response = await axiosInstance.post('/schedules', {
      company: data.company,
      department: data.department,
      type: data.type,
      mid_name: data.mid_name || '',
      always: data.always,
      date: data.date || '',
      url: data.url || '',
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error posting schedule data:", (error as AxiosError).response?.data || error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    throw error;
  }
};
