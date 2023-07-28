import { Box, Divider, Modal, Stack, TextField, Typography } from "@mui/material"
import PageHeader from "../PageHeader"
import SectionHeader from "../SectionHeader"
import NonFormTextField from "../NonFormTextField"
import WeekSelectionCalendar from "./createForm/WeekSelectionCalendar"
import AvailabilityCBox from "./formComponents/AvailabilityCBox"

const PreviewForm = ({open, setPreview, getValues}) => {
    const name = getValues("name")
    const programmeDesc = getValues("description")

    const programmeStart = getValues("programmeStart")
    const programmeEnd = getValues("programmeEnd")
    const applicationDeadline = getValues("deadline")

    const matchingCriteria = getValues("matching_criteria")
    

    return (
    <Modal 
    sx={{
    width:"100%", height:"100%",
    display:"flex", justifyContent:"center",
    alignItems : "center"}} 
    open={open}
    onClose={() => {setPreview(false)}}
    >
        <Box bgcolor="#ffffff" width="45%" height="90%" overflow="scroll" p="20px">
            {/* about the programme */}
            <Box>
                <PageHeader text={name} margin="20px 0"/>

                <SectionHeader text="About the Programme: " margin="20px 0 0 0"/>
                <Divider/>
                <Box>
                    <Typography>{programmeDesc}</Typography>
                </Box>

                <SectionHeader text="Programme Details: " margin="20px 0 0 0"/>
                <Divider/>
                <Box>
                    <Typography>{name} is conducted from {programmeStart} to {programmeEnd} </Typography>
                    <Typography>Application deadline: {applicationDeadline}</Typography>
                </Box>
            </Box>

            {/* personal details */}
            <Box>
                <SectionHeader text="Personal Details" margin="20px 0 0 0"/>
                <Divider/>
                <Stack direction="row" gap="20px" mt="10px">
                    <NonFormTextField label="Name"/>
                    <NonFormTextField label="Email"/>
                    <NonFormTextField label="Telegram handle"/>
                </Stack>
            </Box>

            {/* Selection Criteria */}
            <Box>
                <SectionHeader text="Selection Criteria" margin="20px 0 0 0"/>
                <Divider/>

                <Stack>
                    <Typography fontWeight="700">Skills</Typography>
                    <Typography>Select the top 3 relevant skill</Typography>

                    <Box display="flex" gap="20px">
                    <TextField fullWidth
                        select
                        value=""
                        label="Skill 1"
                        variant="outlined"
                        children={[]}
                    />
                    <TextField fullWidth
                        select
                        value=""
                        label="Skill 2"
                        variant="outlined"
                        children={[]}
                    />
                    <TextField fullWidth
                        select
                        value=""
                        label="Skill 3"
                        variant="outlined"
                        children={[]}
                    />
                </Box>
                </Stack>
                


                <Stack>
                    <Typography fontWeight="700">Interest</Typography>
                    <Typography>Select the top 3 areas you are interested in </Typography>

                    <Box display="flex" gap="20px">
                    <TextField fullWidth
                        select
                        value=""
                        label="Interest 1"
                        variant="outlined"
                        children={[]}
                    />
                    <TextField fullWidth
                        select
                        value=""
                        label="Interest 2"
                        variant="outlined"
                        children={[]}
                    />
                    <TextField fullWidth
                        select
                        value=""
                        label="Interest 3"
                        variant="outlined"
                        children={[]}
                    />
                </Box>
                </Stack>

               <AvailabilityCBox/>
            </Box>
        </Box>
    </Modal>
    )
}
export default PreviewForm