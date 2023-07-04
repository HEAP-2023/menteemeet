import {createSlice} from '@reduxjs/toolkit'

const fetchUserType = () => {
    // go fetch 
    return "organiser";
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

const fetchDetails = () => {
     return ({
        acctID : "mentor123",
        lastName : "Neo",
        password: "hello123"
     })
}


const initialState = {
    loginOverlay : false,
    profileOverlay : false,
    userType : fetchUserType(), // organiser, mentee, mentor
    userTypes : fetchAllProfiles(), //{mentor : true, mentee : true}
    programmesEnrolled : fetchProgrammesEnrolled(),
    programmesCreated : fetchProgrammesCreated(),
    tasks : fetchTasks(),
    userDetails : fetchDetails(),
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
            state.userType = action.payload.type;
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
        addCreated : (state, action) => {
            state.programmesCreated = [...state.programmesCreated, action.payload.programme]
        },
        removeCreated : (state, action) => {
            state.programmesCreated = state.programmesCreated.filter(p => p.id !== action.payload.programme.id)
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
    swap,addCreated,
    removeCreated, 
    addTasks, removeTask,
    dragToggle,
    addToParking, removeFromParking} = userSlice.actions;
export default userSlice.reducer



