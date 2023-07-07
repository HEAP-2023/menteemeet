import * as yup from "yup"

export const createProgrammeSchema = yup.object()
    .shape(
        {
            programmeName : yup.string()
                            .required("this field is required"),
            programmeStart : yup.string()
                            .required("this field is required"),
            programmeEnd : yup.string()
                            .required("this field is required"),
            fixedDates : yup.string()
                            .required("this field is required"),
            frequency : yup.string()
                            .required("this field is required"),
            duration : yup.string()
                            .required("this field is required"),
            mentorCapacity : yup.string()
                            .required("this field is required"),
            menteeCapacity : yup.string()
                            .required("this field is required"),
            matchingCriteria : yup.array()
                                    .of(yup.string())
                                    .min(1, "this field is required"),
            description : yup.string()
                            .required("this field is required"),
            interestField : yup.string()
                            .when('matchingCriteria',{
                                is : (matchingCriteria) => {
                                    return matchingCriteria.includes("interest");
                                },
                                then : () =>  yup.string()
                                        .required("this field is required")
                            }),
            skills : yup.array()
                            .when('matchingCriteria',{
                                is : (matchingCriteria) => {
                                    return matchingCriteria.includes("skill");
                                },
                                then : () => yup.array()
                                                .of(yup.string())
                                                .min(1, "this field is required"),
                            }),
        }
    ).required("form not filled in yet") 