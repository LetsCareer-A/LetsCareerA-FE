import React from 'react';
import FullCalendar, { EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Typography, useTheme } from '@mui/material';
import '../../../styles/calendar.css';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';

interface Event {
  title: string;
  date: string;
  company: string;
  department: string;
}

interface CalendarProps {
  events: Event[];
  docCount: number;
  midCount: number;
  interviewCount: number;
  setCurrentMonth: (month: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({ events, docCount, midCount, interviewCount, setCurrentMonth }) => {
  const theme = useTheme();

  const handleDateClick = (arg: any) => {
    const newEventTitle = prompt('Enter event title');
    if (newEventTitle) {
      // 여기서 이벤트를 추가하려면 상위 컴포넌트에 함수를 전달해야 합니다.
      // 현재 구조에서는 바로 추가할 수 없으므로 추후 구현 필요
    }
  };

  const handleEventClick = (arg: any) => {
    alert(`Event: ${arg.event.title}`);
  };

  const handleDatesSet = (info: any) => {
    const month = info.view.currentStart.getMonth() + 1; 
    setCurrentMonth(month);
  };

  return (
    <div
      className="calendar-container"
      style={{
        background: 'white',
        width: '669px',
        padding: '0 24px 16px 24px',
        boxSizing: 'border-box',
      }}
    >
      <Box
        display="flex"
        gap="10px"
        sx={{
          position: 'relative',
          top: '42px',
          justifyContent: 'flex-end',
        }}
      >
        <Box
          display="flex"
          height="20px"
          padding="2px 5px 1px 4px"
          gap="25px"
          borderRadius="4px"
          sx={{
            background: 'rgba(81, 119, 255, 0.10)',
            color: colors.system.PositiveBlue,
            position: 'relative',
          }}
        >
          <Typography style={typography.xxSmall2}>서류 마감</Typography>
          <Typography style={typography.xxSmallBold}>{docCount}건</Typography>
        </Box>
        <Box
          display="flex"
          height="20px"
          padding="2px 5px 1px 4px"
          gap="25px"
          borderRadius="4px"
          sx={{
            background: colors.neutral[85],
            color: colors.neutral[20],
          }}
        >
          <Typography style={typography.xxSmall2}>중간 단계</Typography>
          <Typography style={typography.xxSmallBold}>{midCount}건</Typography>
        </Box>
        <Box
          display="flex"
          height="20px"
          padding="2px 5px 1px 4px"
          gap="25px"
          borderRadius="4px"
          sx={{
            background: 'rgba(27, 196, 125, 0.10)',
            color: theme.palette.secondary.main,
          }}
        >
          <Typography style={typography.xxSmall2}>면접</Typography>
          <Typography style={typography.xxSmallBold}>{interviewCount}건</Typography>
        </Box>
      </Box>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events as EventInput[]} 
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable
        selectable
        locale="ko"
        headerToolbar={{
          left: 'prev title next',
          center: '',
          right: '',
        }}
        datesSet={handleDatesSet}
      />
    </div>
  );
};

export default Calendar;
