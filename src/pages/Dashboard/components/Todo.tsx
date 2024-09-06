import React, { useState } from 'react';
import { Box, Checkbox, Typography, TextField } from '@mui/material';
import { NormalButton } from '../../../components/CustomButton';
import Delete from '../../../assets/delete.svg';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import Textfield from '../../../components/Textfield';

const TodoList: React.FC = () => {
  const initialTodos = [
    { id: 1, text: '체크리스트 항목 1', completed: false },
    { id: 2, text: '체크리스트 항목 2', completed: false },
    { id: 3, text: '체크리스트 항목 3', completed: false },
    { id: 4, text: '체크리스트 항목 4', completed: false },
    { id: 5, text: '체크리스트 항목 5', completed: false },
    { id: 6, text: '체크리스트 항목 6', completed: false },
    { id: 7, text: '체크리스트 항목 7', completed: false },
    { id: 8, text: '체크리스트 항목 8', completed: false },
    { id: 9, text: '체크리스트 항목 9', completed: false },
  ];

  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [isAdding, setIsAdding] = useState(false); // 할 일 추가 입력 필드 상태

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const addTodo = () => {
    if (newTodo.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, newTask]);
    setNewTodo('');
    setIsAdding(false); // 추가 후 텍스트 필드를 숨김
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
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
          onClick={() => setIsAdding(true)} // 추가하기 버튼을 누르면 입력 필드 표시
          style={typography.xxSmallSemibold}
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
          <NormalButton onClick={addTodo} style={typography.xxSmallSemibold}>
            추가
          </NormalButton>
        </Box>
      )}

    </Box>
  );
};

export default TodoList;
