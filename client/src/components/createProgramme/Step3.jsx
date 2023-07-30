// import { Box, TextField } from "@mui/material"
// import SectionHeader from "../../components/SectionHeader";
// import { Controller } from "react-hook-form";
// import AvailabilitySection from "./createForm/AvailabilitySection";
// import SkillSection from "./createForm/SkillSection";
// import InterestSection from "./createForm/InterestSection";
// import MentorGroupingSection from "./createForm/MentorGroupingSection";
// import MenteeGroupingSection from "./createForm/MenteeGroupingSection";
// import { useFormContext } from "react-hook-form";


// const Step3 = () => {
//     const {control, watch, formState : {errors}} = useFormContext();

//     const criteriaSelected = watch("matching_criteria")
//     const startDate = watch("programmeStart");
//     const endDate = watch("programmeEnd");
//     const frequency = watch("frequency");

    


//     return (
//     <Box width="100%" p="40px" m="20px 0" display="flex" flexDirection="column" bgcolor="#F1F1F1" >
//         <SectionHeader margin="0" text="Step 3 - Sign Up Form"/>
//         <SectionHeader margin="0" text="Compose your sign up form for both mentors and mentees"/>

//         <Box p="20px">
//             <Box display="flex" flexDirection="column" width="100%" gap="20px">
                
                
//                 <Box width="100%">
//                     {criteriaSelected.includes("availability") &&
//                         <AvailabilitySection startDate={startDate} endDate={endDate} frequency={frequency}/>
//                     }
//                 </Box>

//                 <Box width="100%">
//                     {criteriaSelected.includes("skill") &&
//                         <SkillSection />
//                     }
//                 </Box>

//                 <Box width="100%">
//                     {criteriaSelected.includes("interest") &&
//                         <InterestSection />
//                     }
//                 </Box>

//                 <Box width="100%">
//                     {criteriaSelected.includes("mentorGrouping") &&
//                         <MentorGroupingSection admin={true}/>
//                     }
//                 </Box>

//                 <Box width="100%">
//                     {criteriaSelected.includes("menteeGrouping") &&
//                         <MenteeGroupingSection admin={true}/>
//                     }
//                 </Box>

//             </Box>
//         </Box>
//     </Box>);
// }

// export default Step3;