import * as yup from "yup"


export const applicationVschema = yup.object()
    .shape(
        {
            name : yup.string()
                    .required("this field is required"),
            email : yup.string()
                    .required("this field is required"),
            tele : yup.string()
                    .test("not empty", "input valid telegram username", (val) => val != "none")
                    .required("this field is required"),
            interests : yup.array()
                    .of(yup.object({
                        interest : yup.string().test("notEmpty", "invalid option", (val) => val != "-")
                    }))
                    .min(3, "these fields are required"),
            skills : yup.array()
                        .of(yup.object({
                            skill : yup.string().test("notEmpty", "invalid option", (val) => val != "-")
                        }))
                        .min(3, "these fields are required"),
            availability : yup.array()
                            .min(1, "this field is required"),
                    }
    ).required("form not filled in yet") 


