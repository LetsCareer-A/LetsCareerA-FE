import axiosInstance from '..';

export const getCareers = async (pageNum: number, sizeNum: number, categories: string[]) => {
  try {
    const response = await axiosInstance.get('/careers', {
      params: {
        page: pageNum,
        size: sizeNum,
        category: categories.join(',')
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting careers:', error);
    throw error;
  }
};
