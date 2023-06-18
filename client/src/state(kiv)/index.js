import {createSlice} from '@reduxjs/toolkit'

const fetchUserType = () => {
    // go fetch 
    return "mentor";
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
        lastName : "Neo"
     })
}


const initialState = {
    profileOverlay : false,
    userType : fetchUserType(), // organiser, mentee, mentor
    userTypes : fetchAllProfiles(), //{mentor : true, mentee : true}
    programmesEnrolled : fetchProgrammesEnrolled(),
    programmesCreated : fetchProgrammesCreated(),
    tasks : fetchTasks(),
    userDetails : fetchDetails(),
}


export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        overlayToggle : (state) => {
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
        }
    }
})


export const { overlayToggle, logIn, logOut, swap,addCreated, removeCreated, addTasks, removeTask} = userSlice.actions;
export default userSlice.reducer



