import { Dialog, DialogActions, DialogContent, Button, DialogTitle } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setSuccessModal, setFailureModal } from "../state(kiv)";

export const SuccessModal = ({info="Application has been successfully submitted."}) => {
    const openDialog = useSelector((state) => state.user.successModal)
    const dispatch = useDispatch()
    return (
        <Dialog open={openDialog} onClose={() => dispatch(setSuccessModal(false))}>
            <DialogTitle>Success</DialogTitle>
            <DialogContent> <p>{info}</p> </DialogContent>
            <DialogActions>
                <Button 
                color="secondary"
                onClick={() => { 
                    dispatch(setSuccessModal(false))
                }
                    }>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export const FailureModal = ({info="Failed to submit."}) => {
    const openDialog = useSelector((state) => state.user.failureModal)
    const dispatch = useDispatch()
    return (
        <Dialog open={openDialog} onClose={() => dispatch(setFailureModal(false))}>
            <DialogTitle>Failed</DialogTitle>
            <DialogContent> <p>{info}</p> </DialogContent>
            <DialogActions>
                <Button 
                color="secondary"
                onClick={() => { 
                    dispatch(setFailureModal(false))
                }
                    }>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}
