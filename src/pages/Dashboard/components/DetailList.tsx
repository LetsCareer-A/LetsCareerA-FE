import { useState, useEffect } from 'react';
import { Box, Typography, Pagination } from '@mui/material';
import typography from '../../../styles/typography';
import Chip from '../../../components/Chips'; // Import the Chip component
import colors from '../../../styles/colors';
import { getDetailSchedule } from '../../../api/Dashboard/getDetailSchedule';
import useCalendarStore from '../../../store/calendarStore'; 

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

const ITEMS_PER_PAGE = 5;

const DetailList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [allSchedules, setAllSchedules] = useState<Schedule[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const { selectedDate } = useCalendarStore();

  const currentDate = selectedDate || new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await getDetailSchedule(currentDate);
        if (response.code === 200) {
          const fetchedSchedules = response.data.schedules;
          setAllSchedules(fetchedSchedules);
          setTotalCount(response.data.totalCount);

          const startIndex = (page - 1) * ITEMS_PER_PAGE;
          const endIndex = startIndex + ITEMS_PER_PAGE;
          setSchedules(fetchedSchedules.slice(startIndex, endIndex));
        }
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, [currentDate, page]);

  useEffect(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setSchedules(allSchedules.slice(startIndex, endIndex));
  }, [page, allSchedules]);

  useEffect(() => {
    setPage(1);
  }, [currentDate]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const getCurrentDateWithDay = () => {
    const today = new Date(currentDate);
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = daysOfWeek[today.getDay()];

    return { date: `${month}월 ${day}일`, dayOfWeek: `${dayOfWeek}` };
  };

  const { date, dayOfWeek } = getCurrentDateWithDay();

  const getDdayText = (dday: number) => {
    if (dday > 0) {
      return `D+${dday}`;
    } else if (dday === 0) {
      return `D-DAY`;
    } else {
      return `D${dday}`;
    }
  };

  return (
    <Box
      sx={{
        width: 370,
        padding: 2,
        background: 'white',
        height: '576px'
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
          {schedules.length === 0 ? (
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' mt='188px'>
              <Typography style={typography.xSmallBold} color={colors.neutral[10]}>
                아직 등록된 취업 일정이 없어요!
              </Typography>
              <Typography style={typography.xxSmallReg} color={colors.neutral[45]}>
                새로운 지원 일정을 등록해볼까요?
              </Typography>
            </Box>
          ) : (
            schedules.map(item => (
              <Box
                key={item.scheduleId}
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: 1,
                  mb: '8px',
                  p: '12px',
                }}
              >
                <Typography mb='8px' style={typography.xSmall2Bold}>
                  {item.company} | {item.department}
                </Typography>
                <Chip text={getDdayText(item.dday)} backgroundColor='rgba(81, 119, 255, 0.10)' textColor={colors.system.PositiveBlue} />
              </Box>
            ))
          )}
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
