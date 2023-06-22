import { Button } from "@mui/material";

const CustomButton = ({ buttonName }) => {
    let content;
    if (buttonName === "Edit") {
        content =
            <Button
                sx={{
                    color: "black",
                    ml: 61,
                    mt: 1,
                    backgroundColor: "#EBEBEB",
                    ":hover": {
                        backgroundColor: "#EBEBEB",
                        opacity: 0.6
                    }
                }}
            >Edit</Button>

    } else if (buttonName === "Submit") {
        content = <Button
            sx={{
                color: "white",
                ml: 1,
                mt: 1,
                backgroundColor: "#333D55",
                ":hover": {
                    backgroundColor: "#333D55",
                    opacity: 0.6
                }
            }}
            type="submit"
        >Submit</Button>
    }
    return (
        <>{content}</>
    );
}

export default CustomButton;