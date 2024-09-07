import axiosInstance from '..';

interface CareerData {
  category: string;
  title: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}


export const postCareers = async (careerData: CareerData) => {
  try {
    const response = await axiosInstance.post('/careers', careerData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting careers:', error);
    throw error;
  }
};
