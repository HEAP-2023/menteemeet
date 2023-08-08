import { Box, Stack, Typography, Input, TextField} from "@mui/material"
import SectionHeader from "../SectionHeader";
import { Controller } from "react-hook-form";
import StandardTextField from "../StandardTextField";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Duration from "./formComponents/Duration"
import Capacity from "./formComponents/Capacity";
import Deadline from "./formComponents/Deadline";
import Intro from "./formComponents/Intro";
// import MatchingCriterias from "./formComponents/MatchingCriterias";
import useActiveElement from "../../hooks/non-route/useActiveElement";
const MainForm = () => {
    const {control, watch, formState : {errors}} = useFormContext();
    const imagePreview = useRef();
    const focusedElement = useActiveElement()
    useEffect(() => {
        if (focusedElement) {
            focusedElement.scrollIntoView({block : "center", behavior: "smooth"})
        }
     }, [focusedElement])

    const imgUploaded = watch("display_image", false)
    return (
    <Box width="100%" p="40px" m="20px 0" display="flex" flexDirection="column" pt="0px">
        {/* <SectionHeader margin="0 20px" text="Tell us the basic information of your program"/> */}
            
            {/* name */}
            <Box display="flex" flexDirection="column" width="100%" gap="20px" p="20px">
            <Typography fontWeight="bold" mb="10px">Tell us the basic information of your program</Typography>
                <Box display="flex" width="100%">
                        <Controller
                        name="name"
                        control={control}
                        render={({field: { ref, ...field }, fieldState}) => 
                    <StandardTextField errors={errors} field={field} inputRef={ref}
                    name="name" label="Programme Name" />
                    }
                        />
                </Box>


            {/* duration */}
            <Duration/>

            {/* capacity */}
            <Capacity/>

            {/* deadline */}
            <Deadline/>

            {/* intro */}
            <Intro/>


            <Stack display="flex" width="100%" >
                    <Controller
                    name="display_image"
                    control={control}
                    render={({field}) => {
                    const {value, ...others} = field; 
                    return (
                    <Stack width="50%">
                        <Typography fontWeight="bold" m="10px 0">Add a cover image for your programme</Typography>
                        <TextField {...others} type="file" 
                        inputProps={{accept : "image/*"}} 
                        InputProps={{endAdornment:<UploadFileIcon/>}} 
                        error={errors["display_image"] !== undefined} 
                        helperText={errors["display_image"]?.message} 
                        variant="outlined"
                        onChange={(e) => {
                            const [file] = e.target.files
                            if (file) {
                                const blob = URL.createObjectURL(file)
                                imagePreview.current.src = blob
                                field.onChange(file);
                            }
                        }}
                        />
                        <img ref={imagePreview} alt="Image format is not supported" 
                        src="#" hidden={!imgUploaded}
                        style={{height: "300px", objectFit : "scale-down" ,width: "auto"}}/>
                    </Stack>)}
                }
                    />
            </Stack>

            {/* matching criteria */}
            {/* <MatchingCriterias/> */}
            </Box>
        </Box>);
}

export default MainForm;



