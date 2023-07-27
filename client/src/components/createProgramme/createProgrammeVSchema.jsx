import * as yup from "yup"

export const createProgrammeSchema = yup.object()
    .shape(
        {
            name : yup.string()
                            .required("this field is required"),
            programmeStart : yup.string()
                            .required("this field is required"),
            programmeEnd : yup.string()
                            .required("this field is required"),
            // duration : yup.string()
            //                 .required("this field is required"),
            mentorCapacity : yup.string()
                            .required("this field is required"),
            menteeCapacity : yup.string()
                            .required("this field is required"),
            matching_criteria : yup.array()
                                    .of(yup.string())
                                    .min(1, "this field is required"),
            description : yup.string()
                            .required("this field is required"),

            deadline : yup.string()
                            .required("this field is required"),

            // display_image : yup.string()
            //             .required("this field is required"),
        }
    ).required("form not filled in yet") 





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