import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateClickArg, EventClickArg } from '@fullcalendar/core';
import { Box, Typography, useTheme } from '@mui/material';
import '../../../styles/calendar.css';
import colors from '../../../styles/colors';
import typography from '../../../styles/typograhy';

interface Event {
  title: string;
  date: string;
}

const Calendar: React.FC = () => {
  const theme = useTheme();

  const [events, setEvents] = useState<Event[]>([
    { title: 'Event 1', date: '2024-08-30' },
    { title: 'Event 2', date: '2024-09-10' },
  ]);

  const handleDateClick = (arg: DateClickArg) => {
    const newEventTitle = prompt('Enter event title');
    if (newEventTitle) {
      setEvents([...events, { title: newEventTitle, date: arg.dateStr }]);
    }
  };

  const handleEventClick = (arg: EventClickArg) => {
    alert(`Event: ${arg.event.title}`);
  };

  return (
    <div className="calendar-container" style={{background:'white', width: '669px', padding: '0 24px 16px 24px', boxSizing:'border-box'}}>
      <Box display='flex' gap='10px'
      sx={{
        position: 'relative', 
        top: '42px',       
         justifyContent:'flex-end'

      }}
      > 
        <Box 
        display='flex'
        height='20px'
        padding='2px 5px 1px 4px' 
        gap='25px'
        borderRadius='4px'
        sx={{background: 'rgba(81, 119, 255, 0.10)',
          color: colors.system.PositiveBlue,
          position: 'relative', 
        }}
      >
        <Typography style={typography.xxSmall2}>
        서류 마감
        </Typography>
        <Typography style={typography.xxSmallBold}>
        32건
        </Typography>
      </Box>
      <Box 
        display='flex'
        height='20px'
        padding='2px 5px 1px 4px'
        gap='25px'
        borderRadius='4px'
        sx={{background: colors.neutral[85],
          color: colors.neutral[20]
        }}
      >
        <Typography style={typography.xxSmall2}>
        중간 단계
        </Typography>
        <Typography style={typography.xxSmallBold}>
        2건
        </Typography>
      </Box>
      <Box 
        display='flex'
        height='20px'
        padding='2px 5px 1px 4px'
        gap='25px'
        borderRadius='4px'
        color='colors.system.PositiveBlue'
        sx={{background: 'rgba(27, 196, 125, 0.10)',
          color: theme.palette.secondary.main
        }}
      >
        <Typography style={typography.xxSmall2}>
        면접
        </Typography>
        <Typography style={typography.xxSmallBold}>
        4건
        </Typography>
      </Box>
      </Box>
      
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable
        selectable
        locale="ko"
        headerToolbar={{
          left: 'prev title next',
          center: '',        
          right: ''   
        }}
        
      />
    </div>
  );
};

export default Calendar;
