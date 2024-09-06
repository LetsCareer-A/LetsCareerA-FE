import axiosInstance from '..';

export const delTodo = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/todos/${id}`);
    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
