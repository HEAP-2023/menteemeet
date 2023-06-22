import { Box } from "@mui/material"
import {useDroppable} from '@dnd-kit/core';


const Droppable = ({id, children,width="100%",height="100%", bgcolor="#f0f0ff", hoverColor="#AEAEFF"}) => {
    const {isOver, setNodeRef} = useDroppable({
        id: id,
      });
      const style = {
        background: isOver ? hoverColor : bgcolor,
        width : width,
        height : height,
      };

      return (<div  ref={setNodeRef} style={style}>
        {children}
      </div>)
}
export default Droppable;
