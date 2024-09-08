import axiosInstance from '..';

export const postTodo = async (todo: string) => {
  try {
    const response = await axiosInstance.post('/todos', {
      todo,
    });
    return response.data;
  } catch (error) {
    console.error('Error posting todo:', error);
    throw error;
  }
};  