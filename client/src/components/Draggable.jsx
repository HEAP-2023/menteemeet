import { Box } from "@mui/material"
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';


const Draggable = ({id, name, role, children, availability, disableDrag=true}) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id,
        data : {
            id : id,
            name : name,
            role : role,
            availability : availability,
        },
        disabled : disableDrag,
    })

    const style = {  
        transform: CSS.Translate.toString(transform),
    };
    

    return <Box ref={setNodeRef} style={style} {...listeners} {...attributes} >
        {children}
    </Box>
}

export default Draggable;