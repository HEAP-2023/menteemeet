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

        return (<FullCalendar 
        ref={calendar}
        {...calendarOptions} 
        selectable={!admin}
        slotDuration='04:00:00'
        allDaySlot={false}
        expandRows={true}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        slotLabelFormat= {(date) => getStartLabelText(date.date.hour)}
        editable={!admin}
        initialDate={programmeStart}
        eventsSet={(e) => {
            console.log(e)
            // e.map(event => console.log(event.start.getDay()))
            const availableTimes = e.map(event => {
                console.log(event.start.getDay())
                return {
                    start : {
                        day : event.start.getDay(),
                        time : getStartLabelText(event.start.getHours())
                    },
                    end : {
                        day : event.end.getDay(),
                        time : getEndLabelText(event.end.getHours())
                    },
                }
            })
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


const getStartLabelText = (start) => {
    
    if(start === 8){
        return "morning"
    }
    if(start === 12){
        return "afternoon"
    }
    if(start === 16){
        return "evening"
    }
    return "undefined"
}

const getEndLabelText = (end) => {
    
    if(end === 12){
        return "morning"
    }
    if(end === 16){
        return "afternoon"
    }
    if(end === 20){
        return "evening"
    }
    return "undefined"
}


// const template = 
// {
//    day :  {
//         mon : {
//             morning : false,
//             afternoon : false, 
//             evening : false,
//         },
//         tue : {
//             morning : false,
//             afternoon : false, 
//             evening : false,
//         },
//         wed : {
//             morning : false,
//             afternoon : false, 
//             evening : false,
//         },
//         thu : {
//             morning : false,
//             afternoon : false, 
//             evening : false,
//         },
//         fri : {
//             morning : false,
//             afternoon : false, 
//             evening : false,
//         },
//         sat : {
//             morning : false,
//             afternoon : false, 
//             evening : false,
//         },
//         sun : {
//             morning : false,
//             afternoon : false, 
//             evening : false,
//         },
//         mon : {
//             morning : false,
//             afternoon : false, 
//             evening : false,
//         },
//     }
// }