import React, { useState, useEffect } from 'react';
import { Box, Checkbox, Typography } from '@mui/material';
import { NormalButton } from '../../../components/CustomButton';
import Delete from '../../../assets/delete.svg';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import Textfield from '../../../components/Textfield';
import { postTodo } from '../../../api/Dashboard/postTodos'; 
import { getTodo } from '../../../api/Dashboard/getTodos'; 
import { delTodo } from '../../../api/Dashboard/delTodo'; 

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<{ id: number, text: string, completed: boolean }[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getTodo();
        console.log('Fetched todos:', response);

        if (response.code === 200 && response.data?.todos) {
          const loadedTodos = response.data.todos.map((todo: { todo: string, isChecked: boolean }, index: number) => ({
            id: index + 1, 
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
  };

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
  
    try {
      console.log('Adding todo:', newTodo);
  
      const response = await postTodo(newTodo);
      console.log('Server response:', response);
  
      const newTask = {
        id: Date.now(), 
        text: newTodo,
        completed: false,
      };
  
      setTodos([...todos, newTask]);
      setNewTodo('');
      setIsAdding(false);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = async (id: number) => {
    try {
      await delTodo(id);
      setTodos(todos.filter(todo => todo.id !== id)); 
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const isAddButtonDisabled = todos.length >= 10;

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
          disabled={isAddButtonDisabled}
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
        <Box display="flex" alignItems="center" mt='20px'>
          <Checkbox checked={false} disabled /> 
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
          <NormalButton
            onClick={addTodo}
            style={typography.xxSmallSemibold}
            disabled={isAddButtonDisabled}
          >
            추가
          </NormalButton>
        </Box>
      )}
    </Box>
  );
};

export default TodoList;
