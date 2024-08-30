import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateClickArg, EventClickArg } from '@fullcalendar/core';
import '../../styles/calendar.css';

interface Event {
  title: string;
  date: string;
}

const Calendar: React.FC = () => {
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
    <div className="calendar-container">
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
