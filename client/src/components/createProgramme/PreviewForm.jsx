import { Box, Divider, Modal, Stack, TextField, Typography } from "@mui/material"
import PageHeader from "../PageHeader"
import SectionHeader from "../SectionHeader"
import NonFormTextField from "../NonFormTextField"
import SkillUsers from "./SkillUsers"

const PreviewForm = ({open, setPreview, getValues}) => {
    const programmeName = getValues("programmeName")
    const programmeDesc = getValues("description")

    const programmeStart = getValues("programmeStart")
    const programmeEnd = getValues("programmeEnd")
    const applicationDeadline = getValues("deadline")
    const frequency = getValues("frequency")

    const matchingCriteria = getValues("matchingCriteria")
    const skills = getValues("skills")
    const interestField = getValues("interestField")

    console.log(interestField)
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
                <PageHeader text={programmeName} margin="20px 0"/>

                <SectionHeader text="About the Programme: " margin="20px 0 0 0"/>
                <Divider/>
                <Box>
                    <Typography>{programmeDesc}</Typography>
                </Box>

                <SectionHeader text="Programme Details: " margin="20px 0 0 0"/>
                <Divider/>
                <Box>
                    <Typography>{programmeName} is conducted from {programmeStart} to {programmeEnd} {frequency !== "na" && `and it will be conducted on a ${frequency} basis`}</Typography>
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
                {matchingCriteria.includes("availability") &&
                    <Stack>
                        <Typography>calendar select kiv</Typography>
                         {/* insert calendar */}
                    </Stack>
                }

                {matchingCriteria.includes("skill") &&
                    <Stack>
                        {
                            skills.map(skill => {
                                console.log(skill.skillName)
                                return (
                                <SkillUsers>
                                    <Typography fontWeight="700">{skill.skillName}</Typography>
                                </SkillUsers>)
                            })
                        }
                    </Stack>
                }

                {matchingCriteria.includes("interest") && 
                <Stack>
                    <Typography fontWeight="700">Interest</Typography>
                    <Typography>Select the top 3 areas you are interested in with relevance to {interestField}</Typography>
                </Stack>
                }
            </Box>
        </Box>
    </Modal>
    )
}
export default PreviewForm