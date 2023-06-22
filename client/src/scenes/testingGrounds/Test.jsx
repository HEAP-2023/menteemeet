import { Box, Typography, Button } from "@mui/material"
import {DndContext} from '@dnd-kit/core';
import { useState } from "react";
import Draggable from "../../components/Draggable";
import Droppable from "../../components/Droppable";

const Test = () => {
    const [parent, setParent] = useState(null)
    const [disableDrag, toggleDrag] = useState(true)
    const handleDragEnd = (event) => {
        const {over} = event;
    
        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        console.log(event)
        console.log(`draggable id = ${event.active.id} is dropped into container with id = ${event.over.id}`)
        setParent(over ? over.id : null);
    }
    
    const item = (<Draggable id={1} disableDrag={disableDrag}>
                    <Box>hello</Box>
                </Draggable>)
  return (
    <Box width="100%" height="100%" >
        <DndContext onDragEnd={handleDragEnd}>
        <Box width="100%" height="40%" display="flex" justifyContent="space-between">
            {/* dragging ground */}
            <Box width="40%" height="100%" bgcolor="primary.main">
                <Typography>dragging ground</Typography>
                {parent === null ? item : null}

            </Box>

            {/* dropping ground */}
            <Box width="40%" height="100%" bgcolor="secondary.main">
                <Typography>dropping ground</Typography>

                <Droppable id={4} height="40%" >
                    <Box width="100%" height="100%" >
                        <Typography>drop Box</Typography>
                        {parent === 4 ? item : null}
                    </Box>
                </Droppable>

                <Droppable id={5}  height="40%">
                    <Box width="100%" height="100%" >
                        <Typography>drop Box</Typography>
                        {parent === 5 ? item : null}
                    </Box>
                </Droppable>
            </Box>
        </Box>
        </DndContext>
        <Button variant="contained" onClick={()=>toggleDrag(!disableDrag)}>{disableDrag ?  "edit" : "cancel" }</Button>
    </Box>

  )
}
export default Test


