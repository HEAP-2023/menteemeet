import { Box, Modal, Typography, Button } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import StandardTextField from "../StandardTextField"
import useDeleteProgramme from "../../hooks/programmes/organiser_authorised/useDeleteProgramme"

const DeleteProgrammeModal = ({id, open, setDeleteModal, programme_name}) => {
    const {control, formState :{errors}, handleSubmit, watch, reset } = useForm({
        defaultValues : {
            programmeName : "",
        }
    })

    const {mutate : deleteProgramme } = useDeleteProgramme()

    const handleSave = (data) => {
        console.log("to be deleted: ", id)
        console.log(data)
        deleteProgramme(id)
    }
    return (
        <Modal
        open={open}
        onClose={() => {
            setDeleteModal(false); 
            reset();
        }}
        sx={{
            display:'flex',
            justifyContent : 'center',
            alignItems : 'center'
        }}
        >
            <Box width="40%" height="25%" bgcolor="white" p="20px" display="flex" flexDirection="column" alignItems="flex-start"  gap="10px" >
                <Typography
                variant="h4"
                >Enter the name of the programme to delete</Typography>
                <Typography
                color="#ff0000"
                >Warning ! this action is irreversible</Typography>

                <form onSubmit={handleSubmit(handleSave)}>
                    <Controller
                    name="programmeName"
                    control={control}
                    render={({field}) => 
                    <StandardTextField 
                    errors={errors} 
                    field={field} 
                    name="programmeName" 
                    label="Programme Name"/>
        }
                    />

                <Button variant="contained" color="warning" type="submit"
                disabled={programme_name !== watch("programmeName")}
                >Confirm</Button>
                </form>
            </Box>
        </Modal>
    )
}
export default DeleteProgrammeModal;