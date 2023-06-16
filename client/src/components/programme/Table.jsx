import { Box } from "@mui/material"
import { DataGrid  } from '@mui/x-data-grid';
import { useCallback } from "react";
import { generateColors } from "../../theme";

const Table = ({rows, columns, checkbox=false, color="#EBEBEB"}) => {
    const colors = generateColors()
    const hoverColor = (color === "#EBEBEB" ? colors.primary[500] : "#AEAEFF")
    const getRowSpacing = useCallback((params) => {
        return {
          top: params.isFirstVisible ? 0 : 10,
          bottom: params.isLastVisible ? 0 : 5,
        };
      }, []);
    

    return ( <Box sx={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      getRowSpacing={getRowSpacing}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
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
export default Table;