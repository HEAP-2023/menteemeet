import { Box } from "@mui/material"
import { DataGrid  } from '@mui/x-data-grid';
import { useCallback } from "react";
import { generateColors } from "../../../theme";
import { useSelector } from "react-redux";

const SessionTable = ({rows, columns, checkbox=false, color="#EBEBEB", editable=false }) => {
    // console.log(apiRef)
    const colors = generateColors()
    const hoverColor = (color === "#EBEBEB" ? colors.primary[500] : "#AEAEFF");
    const acctID = useSelector((state) => state.user.userDetails.acctID)
    const getRowSpacing = useCallback((params) => {
        return {
          top: (params.isFirstVisible && params.isLastVisible) ? 0 : 5,
        };
      }, []);
    

    //   --------------------------------------- !!---------------------------------------------------
    const putInDB = (data) => {
        console.log("the following will be sent to db"); 
        console.log(data)
        console.log("modified by: ")
        console.log(acctID)
    }
    const handleDataChange = (newRow, oldRow) => {
        if(newRow.action === "save"){
            // might need some validation somewhere before sending  --> yup
            putInDB(newRow)
            return newRow
        }
        return oldRow;
    } 
    // https://mui.com/x/react-data-grid/editing/

    return ( <Box sx={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      getRowSpacing={getRowSpacing}
      isCellEditable={() => editable}
      processRowUpdate={(newRow, oldRow) => handleDataChange(newRow, oldRow)}
      editMode="row"
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
        columns: {
            columnVisibilityModel: {
                // id column invinsible
                id : false,
                actions : editable
            },
          },
      }}
      pageSizeOptions={[5]}
      checkboxSelection={checkbox}
      disableRowSelectionOnClick
      sx = {{"& .MuiDataGrid-row" : {backgroundColor : color , 
                                    borderRadius:"20px",
                                    ":hover" :  {backgroundColor : hoverColor}
                                }, 
      border : "hidden" }}
    />
  </Box>);
}
export default SessionTable;




