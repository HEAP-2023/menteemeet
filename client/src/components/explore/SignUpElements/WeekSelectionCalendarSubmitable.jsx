import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import "./FullCalendar.css"
import { useRef, useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";


const WeekSelectionCalendarSubmitable = ({admin=false, programmeStart}) => {
    const {control} = useFormContext();
    const calendar = useRef()
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




    return (
    <Controller
    name="availabilities"
    control={control}
    render={({field}) => {

        const {value} = field; 
        return (<FullCalendar 
        ref={calendar}
        {...calendarOptions} 
        selectable={!admin}
        editable={!admin}
        initialDate={programmeStart}
        eventsSet={(e) => {
            const availableTimes = e.map(event => ({start : event.startStr, end :event.endStr}))
            console.log(availableTimes)
            field.onChange(availableTimes)
        }}
        eventClick={handleEventClick}
        initialEvents={events}
        />)
    }
}
    />)
}

export default WeekSelectionCalendarSubmitable;


