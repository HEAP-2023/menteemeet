import {createSlice} from '@reduxjs/toolkit'
import { decodeJWT } from '../functions';

//to change userType go to initialState (3 functions below) change_type

const fetchProgrammesEnrolled = () => {
        // go fetch
    return ([

    ]);
}
const fetchProgrammesCreated = () => {
     // go fetch
     return ([

     ]);
}

const fetchTasks = () => {
    // go fetch
    return ([

    ]);
}

const getAccountType = () => {
    const jwt = localStorage.getItem("jwt")
    if(!jwt){
        return {name : "default", email : "defaultEmail", account_type : undefined};
    } 
    const details = decodeJWT(jwt)
    return details
}

const initialState = {
    loginOverlay : false,
    profileOverlay : false,
    // userType : fetchUserType(), // organiser, mentee, mentor
    programmesEnrolled : fetchProgrammesEnrolled(),
    programmesCreated : fetchProgrammesCreated(),
    tasks : fetchTasks(),
    userBasicDetails : getAccountType(),
// structure after logging in should be
// account_id
// account_type
// contact_no
// email
// group_id
// json_tokenID
// name
// telegram_username
// user_id

    disableDrag : true,
    dragParking : [],
}


export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        loginOverlayToggle : (state) => {
            state.loginOverlay = !state.loginOverlay; 
        },
        profileOverlayToggle : (state) => {
            state.profileOverlay = !state.profileOverlay; 
        },
        logOut : (state) => {
            state.userBasicDetails.account_type = undefined;
        },
        updateDetails : (state, action) => {
            state.userBasicDetails = {...action.payload}
        },
        modifyDetails : (state, action) => {
            state.userBasicDetails = {...state.userBasicDetails, ...action.payload}
        },
        addTasks : (state, action) => {
            state.tasks = [...state.tasks, action.payload.task]
        },
        removeTask : (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id)
        },
        dragToggle : (state) => {
            state.disableDrag = !state.disableDrag; 
        },
        addToParking : (state, action) => {
            state.dragParking = [...state.dragParking, action.payload.user]
        },
        removeFromParking : (state, action) => {
            state.dragParking = state.dragParking.filter((x) => {
                return (x.id !== action.payload.id)})
        }
    }
})


export const {loginOverlayToggle ,
    profileOverlayToggle,
    logOut, updateDetails,
    addTasks, removeTask,
    dragToggle, modifyDetails,
    addToParking, removeFromParking} = userSlice.actions;
export default userSlice.reducer



