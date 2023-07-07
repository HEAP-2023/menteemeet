import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import './FullCalendar.css';
import { useState } from 'react';
import EventPopover from './EventPopover';


const MainCalendar = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isPopOpen, setIsPopOpen] = useState(false);
    const [selectedEventElement, setSelectedEventElement] = useState(null);
    
    const eventDidMount = (info) => {
        const eventElement = info.el;
        eventElement.setAttribute('id', info.event._def.publicId);    
    }

    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
        setIsPopOpen(true);
        const eventElement = info.el;
        setSelectedEventElement(eventElement);
        console.log(selectedEvent);
        console.log(selectedEvent);
    }
    
    const calendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
        initialView: "dayGridMonth",
        firstDay: 1, // first day is a Monday
        headerToolbar: {
            start: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth', // will normally be on the left. if RTL, will be on the right
            center: 'title',
            end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
        },
        selectable: true,
        select: function (start) {
            // console.log(start)
        },
        eventDidMount: eventDidMount,
        events: events,
        eventClick: handleEventClick,
        dayMaxEventRows: true,
    }
    return (
        <>
            <FullCalendar {...calendarOptions} />
            {isPopOpen &&
                <EventPopover isOpen={isPopOpen} onRequestClose={() => setIsPopOpen(false)} event={selectedEvent} anchorEl={selectedEventElement}/>}

        </>
    )
}

export default MainCalendar

const events = [
    {
        id: 1,
        title: 'Event 1',
        start: '2023-07-07T10:30:00',
        end: '2023-07-07T11:00:00',
        mentorshipProgramme: 'ABC Programme'
    },
    {
        id: 2,
        title: 'Event 2',
        start: '2023-07-07T10:45:00',
        end: '2023-07-07T11:20:00',
        mentorshipProgramme: 'DEF Programme'
    },
    {
        id: 3,
        title: 'Event 3',
        start: '2023-07-08T09:30:00',
        end: '2023-07-08T13:00:00',
        mentorshipProgramme: 'XYZ Programme'
    },
    // {    
    //     title: 'Event 1',
    //     start: '2023-07-07T10:30:00',
    //     end: '2023-07-07T11:00:00',
    // },
    // {
    //     title: 'Event 1',
    //     start: '2023-07-07T10:30:00',
    //     end: '2023-07-07T11:00:00',
    // },
]