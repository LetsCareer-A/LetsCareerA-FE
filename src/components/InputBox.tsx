import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';

const InputBox: React.FC = () => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false); // 입력 상태 관리
  const [isHovered, setIsHovered] = useState(false); // 호버 상태 관리
  const [isBlurred, setIsBlurred] = useState(false);  // 입력된 채로 포커스가 사라진 상태 관리
  const [hasError, setHasError] = useState(false);  // 오류 상태 관리

    {/* 오류 상태 경우 */}
  const checkError = () => {
    // 글자수 초과
    if (value.length > 500) { 
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsBlurred(false);
  };

  const handleBlur = () => {
    if (value === '') {
      setIsFocused(false);
      setIsBlurred(false);
    } else {
      setIsFocused(false);
      setIsBlurred(true); 
    }
    checkError();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    checkError();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        width: 341,
        height: 62,
        backgroundColor: hasError ? 'rgba(246, 78, 57, 0.10)' : (isFocused || isHovered || isBlurred ? '#EDEEFE' : '#f8f8f8'), //상황에 따라 색이 바뀜
        borderRadius: '8px',
        border: `1px solid ${hasError ? '#F64E39' : (isFocused ? '#9499F9' : isHovered ? '#CACCFC' : '#e7e7e7')}`,
        position: 'relative',
        padding: '11px 12px',
      }}
    >
      {/* 텍스트필드 입력 */}
      <TextField
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={isFocused ? '' : '텍스트텍스트'}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          style: {
            fontSize: '0.75rem',
            color: isFocused || isBlurred ? '#2a2d34' : '#7a7d84',
            fontFamily: 'Pretendard',
            height: '100%',
          },
        }}
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}
      />
    </Box>
  );
};

export default InputBox;
