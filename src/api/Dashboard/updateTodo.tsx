import axiosInstance from '..';

export const updateTodo = async (id: number, isChecked: boolean) => {
  try {
    const response = await axiosInstance.patch(`/todos/${id}`, {
      isChecked
    });
    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};
