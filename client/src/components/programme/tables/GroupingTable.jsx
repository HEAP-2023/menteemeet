import { Box } from "@mui/material"
import { DataGrid  } from '@mui/x-data-grid';
import { useCallback } from "react";
import { generateColors } from "../../../theme";
import { useSelector } from "react-redux";

const GroupingTable = ({rows, columns, editable=false }) => {
    const colors = generateColors();
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

    return ( <Box sx={{ width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      getRowSpacing={getRowSpacing}
      getRowHeight={() => 'auto'}
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
                // id column invisible
                id : false,
            },
          },
      }}
      pageSizeOptions={[5]}
      disableRowSelectionOnClick
      sx = {{"& .MuiDataGrid-row" : {backgroundColor : "none" , 
                                    borderRadius:"20px",
                                }, 

            "& .MuiDataGrid-cell" : {alignItems : "flex-start"},
            "& .MuiDataGrid-columnHeaders" : {backgroundColor : `${colors.primary[500]}`},
      border : "hidden" }}
    />
  </Box>);
}
export default GroupingTable;




