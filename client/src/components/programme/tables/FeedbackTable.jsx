import { Box, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { generateColors } from "../../../theme";
import { useCallback } from "react";

const FeedbackTable = () => {
    const colors = generateColors();
    const getRowSpacing = useCallback((params) => {
        return {
          top: (params.isFirstVisible && params.isLastVisible) ? 0 : 5,
        };
      }, []);

    console.log("start");
    let array = rows.map((value, index) => {
        return (rows[index].feedback.length)
    });
    console.log(array);
    const feedbackWidth = Math.max(...(array));
    columns[4].width = feedbackWidth * 7; // to make the feedback column width adjusted to the max input feedback length

    return (
        <Box>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowSpacing={getRowSpacing}
                getRowHeight={() => 'auto'}
                disableRowSelectionOnClick
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
                sx={{
                    "& .MuiDataGrid-row": {
                        backgroundColor: "none",
                        borderRadius: "20px",
                    },
                    "& .MuiDataGrid-columnHeaders": { backgroundColor: `${colors.primary[500]}` },
                    border: "hidden"
                }}
            />
        </Box>
    )
}

export default FeedbackTable;

const rows = [
    { id: 1, groupNo: 1, name: 'Jon Snow', role: 'Mentor', feedback: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno' },
    { id: 2, groupNo: 1, name: 'Cersei Lannister', role: 'Mentee', feedback: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor' },
    { id: 3, groupNo: 1, name: 'Jaime Lannister', role: 'Mentee', feedback: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor' },
    { id: 4, groupNo: 2, name: 'Arya Stark', role: 'Mentor', feedback: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor' },
    { id: 5, groupNo: 2, name: 'Kelly Melisandre', role: 'Mentee', feedback: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta)' },
    { id: 6, groupNo: 2, name: 'Rossini Frances', role: 'Mentee', feedback: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de ' },
]
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'groupNo', headerName: 'Group No.', width: 90 },
    { field: 'name', headerName: 'Name', width: 300},
    { field: 'role', headerName: 'Role', width: 100 },
    { field: 'feedback', headerName: 'Feedback', width: 500 }
]


