import React, { useState } from 'react';
import { Box, Typography, Pagination } from '@mui/material';

interface DetailItem {
  id: number;
  title: string;
  description: string;
}

const data: DetailItem[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  title: `일정 ${index + 1}`,
  description: `상세 설명 ${index + 1}`,
}));

const ITEMS_PER_PAGE = 5;

const DetailList: React.FC = () => {
  const [page, setPage] = useState(1);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

  const getCurrentDateWithDay = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = daysOfWeek[today.getDay()];

    return { date: `${month}월 ${day}일`, dayOfWeek: `${dayOfWeek}` };
  };

  const { date, dayOfWeek } = getCurrentDateWithDay();

  return (
    <Box
      sx={{
        width: 369,
        padding: 2,
        background: 'white'
      }}
    >
      <Box display="flex" alignItems="center" mb={2} justifyContent='space-between'>
        <Typography variant="h6">세부 일정</Typography>
        <Box display='flex'>
          <Typography mr='8px'>
            {date}
          </Typography>
          <Typography sx={{ color: 'gray' }}>
            {dayOfWeek}
          </Typography>
        </Box>
      </Box>
    
        {currentData.map(item => (
          <Box
            key={item.id}
            sx={{
              border: '1px solid #ddd',
              borderRadius: 1,
              mb: 2, 
              p: 2,
            }}
          >
            <Typography variant="h6">{item.title}</Typography>
            <Typography>{item.description}</Typography>
          </Box>
        ))}
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(data.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default DetailList;
