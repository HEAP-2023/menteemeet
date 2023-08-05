import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import './FullCalendar.css';
import { useState, useEffect } from 'react';
import EventPopover from './EventPopover';
import AddEventPopover from './AddEventPopover';
import { format } from 'date-fns';
import CalendarFilter from './CalendarFilter';
import { Box } from '@mui/material';
import { getAllSessions } from '../../services/user/userServices';
import { useSelector } from 'react-redux';
const MainCalendar = () => {
    const programmes = useSelector((state) => state.user.programmes);
    console.log("programmes:", programmes);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getAllSessions()
        .then(res => {
            // setEvents(res.data.sessionsWithRole);
            const sessions = res.data.sessionsWithRole;
            console.log("sessions:", res)
            const eventSessions = sessions.map((session) => {
                const programme = programmes.find((prog) => prog.programme_id === session.programme_id);
                const eventTitle = programme.name;
                
                return {
                    id: session.session_id,
                    title: `${eventTitle} mentoring session`,
                    start: `${session.date}T${session.start_time}`,
                    end: `${session.date}T${session.end_time}`,
                    extendedProps:{
                        group_id: session.group_id,
                        role: session.role,
                        programme_id: session.programme_id,
                        topic: session.topic,
                        programme_name: eventTitle
                    }
                }
            })
            setEvents(eventSessions);
            console.log("eventSessions:", eventSessions);
        })
        .catch(err => {
            console.log("ERROR:", err);
        })
    },[])


    const [showEvents, setShowEvents] = useState(events);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isPopOpen, setIsPopOpen] = useState(false);
    const [selectedEventElement, setSelectedEventElement] = useState(null);
    const [selectedDateInfo, setSelectedDateInfo] = useState(null);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState(null);

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

    const handleEventChange = (info) => {
        const data = { ...info.event }
        console.log(data)
        const start = format(new Date(data._instance.range.start), 'yyyy-MM-dd');
        const end = format(new Date(data._instance.range.end), 'yyyy-MM-dd');
        const updatedEvent = {
            id: data._def.publicId,
            title: data._def.title,
            start: start,
            end: end
        }
        console.log(updatedEvent);
        setEvents((prevEvents) => {
            const updatedEvents = prevEvents.map((event) =>
                event.id == data._def.id ? updatedEvent : event
            );
            return updatedEvents;
        });
        console.log(events)
    }

    const calendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
        initialView: "dayGridMonth",
        firstDay: 1, // first day is a Monday
        headerToolbar: {
            start: 'dayGridMonth,timeGridWeek,listYear', // will normally be on the left. if RTL, will be on the right
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
        events: showEvents,
        eventClick: handleEventClick,
        eventChange: handleEventChange,
        editable: true,
        dayMaxEventRows: true,
    }

    useEffect(() => {
        setShowEvents(events);
    }, [events]);

    const addEvent = (newEvent) => {
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        const filteredEvents = events.filter((event) => {
            console.log(`${event.mentorshipProgramme}: ` + selectedFilters[event.mentorshipProgramme]);
            return selectedFilters[event.mentorshipProgramme];
        })
        setShowEvents(filteredEvents);
        console.log(events);
        console.log(showEvents);
    }

    const deleteEvent = (eventId) => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id != eventId));
        const filteredEvents = events.filter((event) => {
            console.log(`${event.mentorshipProgramme}: ` + selectedFilters[event.mentorshipProgramme]);
            return selectedFilters[event.mentorshipProgramme];
        })
        setShowEvents(filteredEvents);
        console.log(events);
    }

    const handleFiltersChange = (filters) => {
        setSelectedFilters(filters);
        // console.log(`selected filters: ` + selectedFilters);
        console.log("FILTERS:", JSON.stringify(filters));
        const filteredEvents = events.filter((event) => {
            // console.log(`${event.extendedProps.programme_name}: ` + filters[event.extendedProps.programme_name]);
            return filters[event.extendedProps.programme_name];
        })
        setShowEvents(filteredEvents);
    }
    return (
        <>
            <Box sx={{ flex: '20%', justifyContent: 'left' }}>
                <CalendarFilter onFiltersChange={handleFiltersChange} />
            </Box>
            <Box sx={{ flex: '80%', marginRight: "100px", marginY: '2%' }}>
                <FullCalendar {...calendarOptions} />
            </Box>
            {isPopOpen &&
                <EventPopover isOpen={isPopOpen} onRequestClose={() => setIsPopOpen(false)} event={selectedEvent} anchorEl={selectedEventElement} deleteEvent={deleteEvent} />}
            {/* {isDateSelected &&
                <AddEventPopover isOpen={isDateSelected} onRequestClose={() => setIsDateSelected(false)} selectedDateInfo={selectedDateInfo}
                    addEvent={addEvent}
                />} */}
        </>
    )
}

export default MainCalendar