import {createSlice} from '@reduxjs/toolkit'

const fetchUserType = () => {
    // go fetch 
    return undefined;
}
const fetchAllProfiles = () => {
    // go fetch
    return {
        mentor : true,
        mentee : true,
    }
}
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


const initialState = {
    loginOverlay : false,
    profileOverlay : false,
    userType : fetchUserType(), // organiser, mentee, mentor
    userTypes : fetchAllProfiles(), //{mentor : true, mentee : true}
    programmesEnrolled : fetchProgrammesEnrolled(),
    programmesCreated : fetchProgrammesCreated(),
    tasks : fetchTasks(),
    userBasicDetails : {id : "" ,name : "default", email : "defaultEmail"},
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
        logIn : (state, action) => {
            if(action.payload.type === "user"){
                state.userType = "mentee";
            }else if(action.payload.type === "organiser"){
                state.userType = "organiser";
            }
        },
        logOut : (state) => {
            state.userType = undefined;
        },
        swap : (state) => {
            if(state.userType === "mentee" && state.userTypes.mentor){
                state.userType = "mentor"
            }
            else if(state.userType === "mentor" && state.userTypes.mentee){
                state.userType = "mentee"
            }
        },
        updateDetails : (state, action) => {
            state.userBasicDetails = {...action.payload}
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
    logIn, logOut,
    swap, updateDetails,
    addTasks, removeTask,
    dragToggle,
    addToParking, removeFromParking} = userSlice.actions;
export default userSlice.reducer



