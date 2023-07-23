import { Button } from "@mui/material";

const CustomButton = ({ buttonName, height, endIcon }) => {
    let content;
    if (buttonName === "Edit" || buttonName === "Change") {
        content =
            <Button
                sx={{
                    color: "black",
                    backgroundColor: "#EBEBEB",
                    ml:1,
                    mt:1,
                    ":hover": {
                        backgroundColor: "#EBEBEB",
                        opacity: 0.6
                    },
                    height: height
                }}
            >{buttonName}</Button>

    }else if(buttonName === "Add"){
        content = <Button
        sx={{
            color: "white",
            backgroundColor: "#333D55",
            ml:1,
            mt:1,
            ":hover": {
                backgroundColor: "#333D55",
                opacity: 0.6
            },
            height: height
        }}
        endIcon={endIcon}
    >{buttonName}</Button>
    }else if (buttonName === "Submit" || buttonName === 'Save') {
        content = <Button
            sx={{
                color: "white",
                backgroundColor: "#333D55",
                ml:1,
                mt:1,
                ":hover": {
                    backgroundColor: "#333D55",
                    opacity: 0.6
                },
                height: height
            }}
            type="submit"
        >{buttonName}</Button>
    }
    return (
        <>{content}</>
    );
}

export default CustomButton;