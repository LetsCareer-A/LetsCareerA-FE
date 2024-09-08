import { useState, useEffect } from 'react';
import { Box, Typography, Pagination } from '@mui/material';
import typography from '../../../styles/typography';
import Chip from '../../../components/Chips';
import colors from '../../../styles/colors';
import { getDetailSchedule } from '../../../api/Dashboard/getDetailSchedule';

interface Schedule {
  scheduleId: number;
  stageId: number;
  company: string;
  department: string;
  type: string;
  deadline: string;
  dday: number;
  progress: string;
}

const ITEMS_PER_PAGE = 4;

const DetailList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        const response = await getDetailSchedule(formattedDate);
        if (response.code === 200) {
          setSchedules(response.data.schedules);
          setTotalCount(response.data.totalCount);
        }
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, [page]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

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
        width: 370,
        padding: 2,
        background: 'white',
      }}
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
    >
      <Box>
        <Box display="flex" alignItems="center" mb={2} justifyContent='space-between'>
        <Typography style={typography.smallBold}>세부 일정</Typography>
        <Box display='flex'>
          <Typography mr='8px' style={typography.smallBold}>
            {date}
          </Typography>
          <Typography sx={{ color: 'gray', display: 'flex', alignItems: 'center' }} style={typography.xSmallMed}>
            {dayOfWeek}
          </Typography>
        </Box>
      </Box>
      <Box>
        {schedules.map(item => (
        <Box
          key={item.scheduleId}
          sx={{
            border: '1px solid #ddd',
            borderRadius: 1,
            mb: '8px',
            p: 2,
          }}
        >
          <Typography mb='8px' style={typography.xSmall2Bold}>
            {item.company} | {item.department}
          </Typography>
          <Chip text={`서류 마감까지 D${item.dday}`} backgroundColor='rgba(81, 119, 255, 0.10)' textColor={colors.system.PositiveBlue} />
        </Box>
      ))}
      </Box>
      </Box>
      

      

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(totalCount / ITEMS_PER_PAGE)}
          page={page}
          onChange={handlePageChange}
          sx={{
            '& .MuiPaginationItem-root': {
              fontSize: '14px',
            },
          }}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default DetailList;
