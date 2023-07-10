import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import "../../calendar/FullCalendar.css"
import { useFormContext } from 'react-hook-form';
import { useRef, useMemo, useState } from 'react';

const formatDate = (date) => {
    return date.split("/").reverse().join("-") 
}

const WeekSelectionCalendar = ({admin=false}) => {
    const methods = useFormContext();
    const {watch, formState : {dirtyFields} } = methods
    const startFilled = Object.keys(dirtyFields).includes("programmeStart")
    const calendar = useRef()

    const start = useMemo(() => {
        const date = startFilled ? formatDate(watch("programmeStart")) : formatDate(new Date().toISOString())
        if(calendar.current){
            calendar.current.calendar.gotoDate(date)
        }
        return date
    }, [startFilled, watch("programmeStart")])

    const [id, setId] = useState(1)
    const [events, setEvents] = useState([])

    const handleSelect = (data) => {
        const calendarAPI = data.view.calendar
        const newEvent = {
            id : id ,
            title : "available",
            start : data.startStr,
            end : data.endStr
        }
        calendarAPI.addEvent(newEvent)
        setEvents([...events, newEvent])
        setId(x => x + 1)
    }
    
    const calendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
        initialView: "timeGridWeek",
        firstDay: 1, // first day is a Monday
        headerToolbar: {
            start: '', // will normally be on the left. if RTL, will be on the right
            center: 'title',
            end: '' // will normally be on the right. if RTL, will be on the left
        },
        selectMirror: true,
        select : handleSelect
    }

    const handleEventClick = (selected) => {
        const yes = window.confirm("Are you sure you want to delete the event?");
        if (yes){
            selected.event.remove();
        }
    }




    return <FullCalendar 
    ref={calendar}
    {...calendarOptions} 
    selectable={!admin}
    editable={!admin}
    initialDate={start}
    eventsSet={(events) => setEvents(events)}
    eventClick={handleEventClick}
    initialEvents={events}
    />
}

export default WeekSelectionCalendar;


