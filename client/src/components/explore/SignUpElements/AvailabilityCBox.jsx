import { Box, Grid, Typography} from "@mui/material"
import CheckboxGroup from "./CheckboxGroup"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
const AvailabilityCBox = () => {
    const {control, setValue, formState : {errors}} = useFormContext();
    const [state, setState] = useState({
        Monday : eachDay,
        Tuesday : eachDay,
        Wednesday : eachDay,
        Thursday : eachDay,
        Friday : eachDay,
        Saturday : eachDay,
        Sunday : eachDay,
    })

    const filterFn = useCallback((input) => {
        const filtered = Object.entries(input)
              .filter(([key, value]) => value.dirty)
        const formatted = filtered.map(([key, values]) => {
            const arr = values.children
            const timings = Object.keys(arr).filter((key) => arr[key])
            return {[key] : timings}
        })
        return formatted
    })

    useEffect(() => {
        setValue("availability", filterFn(state))
    })
    return (
        <Box mt="20px">
            <Typography fontWeight="700">Availability</Typography>
            <Grid container columns={12}>
                {
                    days.map(day => (
                        <Grid item key={day}>
                            <CheckboxGroup pLabel={day} state={state} setState={setState}/>
                        </Grid>
                        ))
                }
            </Grid>
        </Box>
    )
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
export default AvailabilityCBox

const eachDay = {
    dirty : false,
    children : { 
        Morning : false,
        Afternoon : false,
        Evening : false,
    }
}