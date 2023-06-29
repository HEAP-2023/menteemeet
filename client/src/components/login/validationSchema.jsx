import * as yup from "yup"


const getCharacterValidationError = (str) => {
    return `Your password must have at least 1 ${str} character`;
  };


export const loginSchema = yup.object()
                    .shape(
                        {
                            email : yup.string()
                                    .email("invalid email format")
                                    .required("this field is required"),
                            password : yup.string()
                                        .required("this field is required")
                        }
                    ).required() 

export const signUpSchema = yup.object()
                    .shape(
                        {
                            firstname : yup.string()
                                            .required("this field is required"),
                            lastname : yup.string().
                                            required("this field is required"),
                            email : yup.string()
                                    .email("invalid email format")
                                    .required("this field is required"),
                            password : yup.string()
                                        .required("this field is required")
                                        .min(8, "Password must have at least 8 characters")
                                        .matches(/[0-9]/, getCharacterValidationError("digit"))
                                        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
                                        .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
                            confirmPassword : yup.string()
                                                .required("this field is required")
                                                .oneOf([yup.ref('password'), null], 'Passwords must match')
                        }
                    ).required() 