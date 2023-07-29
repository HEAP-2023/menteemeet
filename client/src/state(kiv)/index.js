import {createSlice} from '@reduxjs/toolkit'
import { decodeJWT } from '../functions';
import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
//to change userType go to initialState (3 functions below) change account_type


const fetchTasks = () => {
    // go fetch
    return ([

    ]);
}

// const getAccountType = () => {
//     const jwt = localStorage.getItem("jwt")
//     if(!jwt){
//         return;
//     } 
//     const details = decodeJWT(jwt)
//     return details
// }

const initialState = {
    loginOverlay : false,
    profileOverlay : false,
    programmes : [],
    tasks : fetchTasks(),
    userBasicDetails :  {name : "default", email : "defaultEmail", account_type : undefined},
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
            return initialState;
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
        },
        updateProgrammes : (state, action) => {
            state.programmes = [...action.payload]
        }
    }
})


export const {loginOverlayToggle ,
    profileOverlayToggle,
    logOut, updateDetails,
    addTasks, removeTask,
    dragToggle, modifyDetails,
    updateProgrammes, 
    addToParking, removeFromParking} = userSlice.actions;



    
    const persistConfig = {
        key: 'user',
        blacklist : ["dragParking"],
        storage,
    };

    export const userReducer = persistReducer(persistConfig, userSlice.reducer);

    export const store = configureStore({
        reducer : { user : userReducer},
        middleware: [thunk]
    })



export default store;