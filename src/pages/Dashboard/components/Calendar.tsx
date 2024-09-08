import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Typography, useTheme } from '@mui/material';
import '../../../styles/calendar.css';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import { getCalendar } from '../../../api/Dashboard/getCalendar';
import useCalendarStore from '../../../store/calendarStore';
import { EventInput } from '@fullcalendar/core';

const Calendar: React.FC = () => {
  const theme = useTheme();
  const { 
    events, 
    docCount, 
    midCount, 
    interviewCount, 
    currentMonth, 
    setEvents, 
    setDocCount, 
    setMidCount, 
    setInterviewCount, 
    setCurrentMonth, 
    setSelectedDate 
  } = useCalendarStore();
  
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (month: number) => {
      setLoading(true);
      try {
        const response = await getCalendar(month);
        if (response.code === 200) {
          const groupedEvents: { [key: string]: EventInput[] } = response.data.schedules.reduce((acc: any, item: any) => {
            const key = item.deadline;
            let backgroundColor: string;
            let textColor: string;

            switch (item.type) {
              case '서류':
                backgroundColor = 'rgba(81, 119, 255, 0.20)';
                textColor = colors.system.PositiveBlue;
                break;
              case '중간':
                backgroundColor = colors.neutral[90];
                textColor = colors.neutral[20];
                break;
              case '면접':
                backgroundColor = colors.secondary[10];
                textColor = colors.secondary.normal;
                break;
              default:
                backgroundColor = '#000000';
                textColor = '#FFFFFF';
            }

            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push({
              title: `${item.company} ${item.department}`,
              date: item.deadline,
              backgroundColor,
              textColor,
            });
            return acc;
          }, {});

          const mainEvents: EventInput[] = [];
          const moreEvents: EventInput[] = [];

          Object.values(groupedEvents).forEach((events: EventInput[]) => {
            if (events.length > 2) {
              mainEvents.push(...events.slice(0, 2));
              moreEvents.push({
                title: `+${events.length - 2}건`,
                date: events[0].date,
                backgroundColor: '#CCCCCC',
                textColor: '#000000'
              });
            } else {
              mainEvents.push(...events);
            }
          });

          setEvents([...mainEvents, ...moreEvents]);
          setDocCount(response.data.docCount);
          setMidCount(response.data.midCount);
          setInterviewCount(response.data.interviewCount);
        }
      } catch (error) {
        console.error('Failed to fetch schedules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(currentMonth);
  }, [currentMonth, setEvents, setDocCount, setMidCount, setInterviewCount]);

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
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

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
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
      )}
    </div>
  );
};

export default Calendar;
