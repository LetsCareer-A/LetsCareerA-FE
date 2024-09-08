import React, { useState, useEffect } from 'react';
import { Box, Checkbox, Typography } from '@mui/material';
import { NormalButton, PrimaryButton } from '../../../components/CustomButton';
import Delete from '../../../assets/delete.svg';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import Textfield from '../../../components/Textfield';
import { postTodo } from '../../../api/Dashboard/postTodos'; 
import { getTodo } from '../../../api/Dashboard/getTodos'; 
import { delTodo } from '../../../api/Dashboard/delTodo'; 
import { updateTodo } from '../../../api/Dashboard/updateTodo';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<{ id: number, text: string, completed: boolean }[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getTodo();
        console.log('Fetched todos:', response);

        if (response.code === 200 && response.data?.todos) {
          const loadedTodos = response.data.todos.map((todo: { todoId: number, todo: string, isChecked: boolean }) => ({
            id: todo.todoId, 
            text: todo.todo,
            completed: todo.isChecked,
          }));
          setTodos(loadedTodos);
        }
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
    setIsAddButtonDisabled(event.target.value.trim() === ''); 
  };

  const addTodo = async () => {
    if (newTodo.trim() === '') return;

    try {
      console.log('Adding todo:', newTodo);

      await postTodo(newTodo);
      setNewTodo('');
      setIsAdding(false);
      setIsAddButtonDisabled(true);
      
      const response = await getTodo();
      console.log('Fetched todos after adding new:', response);

      if (response.code === 200 && response.data?.todos) {
        const loadedTodos = response.data.todos.map((todo: { todoId: number, todo: string, isChecked: boolean }) => ({
          id: todo.todoId, 
          text: todo.todo,
          completed: todo.isChecked,
        }));
        setTodos(loadedTodos);
      }
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const toggleTodo = async (id: number) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    try {
      await updateTodo(id, !todoToUpdate.completed);
    } catch (error) {
      console.error('Failed to update todo:', error);
      setTodos(todos);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await delTodo(id);
      console.log('Server response after delete:', response);
      
      setTodos(todos.filter(todo => todo.id !== id)); 
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <Box
      sx={{
        width: 657,
        height: 622,
        flexShrink: 0,
        borderRadius: 2, 
        border: '1px solid #EFEFEF', 
        backgroundColor: '#FFF',
        boxShadow: '0px 0px 25px 0px rgba(0, 0, 0, 0.02)',
        padding: '16px',
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography style={typography.small2Bold}>Todo</Typography> 
        <NormalButton
          onClick={() => setIsAdding(true)}
          style={typography.xxSmallSemibold}
          disabled={todos.length >= 10}
        >
          Todo 추가하기 +
        </NormalButton>
      </Box>
      <Typography style={typography.xxSmallReg} mb={2} color='#7A7D84'>
        지원 과정에서 필요한 Todo를 직접 입력하고 체크해요!
      </Typography> 
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          p: 0,
          m: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {todos.map(todo => (
          <Box
            component="li"
            key={todo.id}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              borderBottom: '1px solid #EFEFEF',
              borderRadius: '8px',
              background: todo.completed ? colors.primary[10] : colors.neutral[95], 
            }}
          >
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <Typography
                variant="body1"
                sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                style={typography.xSmallMed}
                color='#2A2D34'
              >
                {todo.text}
              </Typography>
            </Box>
            <img
              src={Delete}
              alt="Delete"
              onClick={() => deleteTodo(todo.id)}
              style={{ cursor: 'pointer', marginRight: '12px' }}
            />
          </Box>
        ))}
      </Box>

      {isAdding && (
        <Box display="flex" alignItems="center" mt='20px'gap='8px'>
          <Box sx={{ flexGrow: 1 }}>
            <Textfield
              value={newTodo}
              onChange={handleNewTodoChange}
              showCharCount={false}
              placeholder="Todo를 입력해주세요."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addTodo();
                }
              }}
            />
          </Box>
          <PrimaryButton
            onClick={addTodo}
            style={typography.xxSmallSemibold}
            disabled={isAddButtonDisabled}
            width="44px"
            height="48px"
            padding='0'
          >
            +
          </PrimaryButton>
        </Box>
      )}
    </Box>
  );
};

export default TodoList;
