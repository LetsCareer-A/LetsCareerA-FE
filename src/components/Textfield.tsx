import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';

interface TextfieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showCharCount?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  maxLength?: number; 
  height?: string;
  placeholderVerticalAlign?: string; 
  multiline?: boolean;  
  rows?: number;       
  maxRows?: number;    
  sx?: object;
}

const Textfield: React.FC<TextfieldProps> = ({
  value,
  onChange,
  showCharCount = true,
  placeholder = '텍스트를 입력하세요.',
  maxLength = 500,
  height = 'auto',
  placeholderVerticalAlign = 'center',
  multiline = false,   // 기본값 false로 설정
  rows = 1,            // 기본값 1행
  maxRows,              // 선택적 maxRows
  sx={}
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [hasError, setHasError] = useState(false);

  const checkError = () => {
    if (value.length > maxLength) {
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
    onChange(event);
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
        backgroundColor: hasError ? 'rgba(246, 78, 57, 0.10)' : (isFocused || isHovered || isBlurred ? '#EDEEFE' : '#f8f8f8'),
        borderRadius: '8px',
        border: `1px solid ${hasError ? '#F64E39' : (isFocused ? '#9499F9' : isHovered ? '#CACCFC' : '#e7e7e7')}`,
        position: 'relative',
        padding: '11px 12px',
        height: height, 
      }}
    >
      <TextField
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={isFocused ? '' : placeholder}
        variant="standard"
        multiline={multiline}  // multiline 속성 전달
        rows={rows}            // rows 속성 전달
        maxRows={maxRows}      // maxRows 속성 전달
        InputProps={{
          disableUnderline: true,
          style: {
            fontSize: '0.75rem',
            color: isFocused || isBlurred ? '#2a2d34' : '#7a7d84',
            fontFamily: 'Pretendard',
            height: '100%', 
            display: 'flex',
            alignItems: placeholderVerticalAlign === 'top' ? 'flex-start' : placeholderVerticalAlign === 'bottom' ? 'flex-end' : 'center',
          },
        }}
        sx={{
          width: '100%',
          height: '100%', 
          backgroundColor: 'transparent',
        }}
      />
      {showCharCount && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 1,
            position: 'absolute',
            bottom: 8,
            right: 12,
          }}
        >
          <Typography
            sx={{
              color: hasError ? '#F64E39' : isFocused ? '#9499F9' : '#acafb6',
              fontSize: '0.75rem',
              fontWeight: 'medium',
              fontFamily: 'Pretendard',
              textAlign: 'right',
            }}
          >
            {value.length}
          </Typography>
          <Typography
            sx={{
              color: '#acafb6',
              fontSize: '0.75rem', 
              fontWeight: 'normal',
              fontFamily: 'Pretendard',
            }}
          >
            /{maxLength}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Textfield;
