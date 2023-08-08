import { Box, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { generateColors } from "../../../theme";
import { useCallback } from "react";
import { getAllFeedbackByUsers } from '../../../services/organiser/organiserServices';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
const FeedbackTable = () => {
    const { id } = useParams(); // progID
    const [rows, setRows] = useState([]);
    useEffect(() => {
        getAllFeedbackByUsers(id)
            .then(res => {
                console.log("res:", res)
                setRows(res.data.reviewFeedbackObj)
            })
            .catch(err => console.log("ERROR:", err))
    }, [])
    const colors = generateColors();
    const getRowSpacing = useCallback((params) => {
        return {
            top: (params.isFirstVisible && params.isLastVisible) ? 0 : 5,
        };
    }, []);


    let array = rows.map((value, index) => rows[index].comment.length);
    console.log(array);
    const feedbackWidth = Math.max(...(array));
    console.log("feedbackWidth:", feedbackWidth)
 // to make the feedback column width adjusted to the max input feedback length
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'groupNo', headerName: 'Group No.', width: 90 },
        { field: 'name', headerName: 'Name', width: 300 },
        { field: 'role', headerName: 'Role', width: 100 },
        { field: 'comment', headerName: 'Feedback', minWidth: 700, width: feedbackWidth * 7 }
    ]
    return (
        <Box>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowSpacing={getRowSpacing}
                getRowId={(row) => row.organiser_review_id}
                // getRowHeight={() => 'auto'}
                rowHeight={50}
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
                            id: false,
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



