import { Box } from "@mui/material"
import { DataGrid  } from '@mui/x-data-grid';
import { useCallback } from "react";
import { generateColors } from "../../../theme";
import { useSelector } from "react-redux";

const GroupingTable = ({api, rows, columns, editable=false }) => {
    const colors = generateColors();
    const acctID = useSelector((state) => state.user.userBasicDetails.account_id)
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
        return newRow;
    } 
    // https://mui.com/x/react-data-grid/editing/

   
    return ( <Box sx={{ width: '70%' }}>
    <DataGrid
      apiRef={api}
      rows={rows}
      columns={columns}
      getRowSpacing={getRowSpacing}
      getRowHeight={() => 'auto'}
      isCellEditable={() => true}
      editMode="row"
      processRowUpdate={(newRow, oldRow) => handleDataChange(newRow, oldRow)}
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




