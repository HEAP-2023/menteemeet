import { Box, TextField, Typography } from "@mui/material"
import SectionHeader from "../../components/SectionHeader";
import { Controller } from "react-hook-form";
import StandardTextField from "../StandardTextField";
import AvailabilitySection from "./createForm/AvailabilitySection";
import SkillSection from "./createForm/SkillSection";
import moment from "moment";


const Step3 = ({control,errors, watch}) => {
    const criteriaSelected = watch("matchingCriteria")
    const watchStartDate = watch("programmeStart");
    const watchEndDate = watch("programmeEnd");
    const frequency = watch("frequency");
    const programmeName = watch("programmeName");

    const startDate = moment(watchStartDate["$d"]).format('DD/MM/YYYY');
    const endDate = moment(watchEndDate["$d"]).format('DD/MM/YYYY');


    return (
    <Box width="100%" p="40px" m="20px 0" display="flex" flexDirection="column" bgcolor="#F1F1F1" >
        <SectionHeader margin="0" text="Step 3 - Sign Up Form"/>
        <SectionHeader margin="0" text="Compose your sign up form for both mentors and mentees"/>

        <Box p="20px">
            <Box display="flex" flexDirection="column" width="100%" gap="20px">
                
                <Box width="100%">
                    <Controller
                    name="introPara"
                    control={control}
                    render={({field}) => 
                <StandardTextField errors={errors} field={field} multiline rows={4}
                    name="introPara" label="Introduction Paragraph" />
                }
                    />
                </Box>

                <Typography>{programmeName} will be conducted from {startDate} to {endDate} {frequency !== "na" && `it will be conducted on a ${frequency} basis`}</Typography>
                
                <Box width="100%">
                    {criteriaSelected.includes("availability") &&
                        <AvailabilitySection startDate={startDate} endDate={endDate} frequency={frequency}/>
                    }
                </Box>

                <Box width="100%">
                    {criteriaSelected.includes("skill") &&
                        <SkillSection/>
                    }
                </Box>

                <Box width="100%">
                    {criteriaSelected.includes("interest") &&
                        <Typography>interest section</Typography>
                    }
                </Box>

                <Box width="100%">
                    {criteriaSelected.includes("mentorGrouping") &&
                        <Typography>mentor grouping section</Typography>
                    }
                </Box>

                <Box width="100%">
                    {criteriaSelected.includes("menteeGrouping") &&
                        <Typography>mentee grouping section section</Typography>
                    }
                </Box>

            </Box>
        </Box>
    </Box>);
}

export default Step3;