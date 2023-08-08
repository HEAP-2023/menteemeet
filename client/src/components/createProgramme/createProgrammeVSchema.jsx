import * as yup from "yup"
import { isAfter } from 'date-fns';


export const createProgrammeSchema = yup.object()
    .shape(
        {
            name : yup.string()
                            .required("This field is required"),
            programmeStart : yup.date()
                                .typeError("Invalid Date") 
                                .required("This field is required"),
            programmeEnd : yup.date()
                            .typeError("Invalid Date") 
                            .min(
                                yup.ref('programmeStart'),
                                "End date cannot be before start date"
                            )
                            .required("This field is required"),
            mentorCapacity : yup.string()
                            .required("This field is required"),
            menteeCapacity : yup.string()
                            .required("This field is required"),
            // matching_criteria : yup.array()
            //                         .of(yup.string())
            //                         .min(1, "this field is required"),
            description : yup.string()
                            .required("This field is required"),

            deadline : yup.date()
                            .typeError("Invalid Date") 
                            .max(
                                yup.ref('programmeStart'),
                                "application deadline cannot be after start date"
                            )
                            .required("This field is required"),
            // display_image : yup.string()
            //             .required("this field is required"),
        }
    ).required("Form not filled in yet") 





//     category : yup.string()
//     .when('matching_criteria',{
//         is : (matching_criteria) => {
//             return matching_criteria.includes("interest");
//         },
//         then : () =>  yup.string()
//                 .required("this field is required")
//     }),
// skills : yup.array()
//     .when('matching_criteria',{
//         is : (matching_criteria) => {
//             return matching_criteria.includes("skill");
//         },
//         then : () => yup.array()
//                         .of(yup.object())
//                         .min(1, "this field is required"),
//     }),