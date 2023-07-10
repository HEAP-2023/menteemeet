import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import './FullCalendar.css';
import { useState } from 'react';
import EventPopover from './EventPopover';
import AddEventPopover from './AddEventPopover';


const MainCalendar = () => {
    const [events, setEvents] = useState([
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
        {
            id: 4,
            title: 'Event 4',
            start: '2023-07-08T09:30:00',
            end: '2023-07-08T13:00:00',
            mentorshipProgramme: 'XYZ Programme'
        },
        {
            id: 5,
            title: 'Event 5',
            start: '2023-07-08T14:30:00',
            end: '2023-07-08T16:00:00',
            mentorshipProgramme: 'XYZ Programme'
        },
    ]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isPopOpen, setIsPopOpen] = useState(false);
    const [selectedEventElement, setSelectedEventElement] = useState(null);
    const [selectedDateInfo, setSelectedDateInfo] = useState(null);
    const [isDateSelected, setIsDateSelected] = useState(false);
    
    const eventDidMount = (info) => {
        const eventElement = info.el;
        eventElement.setAttribute('id', info.event._def.publicId);    
    }

    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
        setIsPopOpen(true);
        const eventElement = info.el;
        setSelectedEventElement(eventElement);
    }
    
    const calendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
        initialView: "dayGridMonth",
        firstDay: 1, // first day is a Monday
        headerToolbar: {
            start: 'dayGridMonth,timeGridWeek,listMonth', // will normally be on the left. if RTL, will be on the right
            center: 'title',
            end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
        },
        selectMirror: true,
        selectable: true,
        dateClick: function(info){
            setSelectedDateInfo(info);
            setIsDateSelected(true);
            // https://fullcalendar.io/docs/dateClick
        },
        eventDidMount: eventDidMount,
        events: events,
        eventClick: handleEventClick,
        dayMaxEventRows: true,
    }

    const addEvent = (newEvent) => {
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        console.log(events);
    }
    return (
        <>
            <FullCalendar {...calendarOptions} />
            {isPopOpen &&
                <EventPopover isOpen={isPopOpen} onRequestClose={() => setIsPopOpen(false)} event={selectedEvent} anchorEl={selectedEventElement}/>}
            {isDateSelected && 
            <AddEventPopover isOpen={isDateSelected} onRequestClose={() => setIsDateSelected(false)} selectedDateInfo={selectedDateInfo}
                addEvent={addEvent}
            />}
        </>
    )
}

export default MainCalendar