import axiosInstance from '..';

export const getCareers = async (pageNum: number, sizeNum: number) => {
  try {
    const response = await axiosInstance.get('/careers', {
      params: {
        page: pageNum,
        size: sizeNum
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting careers:', error);
    throw error;
  }
};