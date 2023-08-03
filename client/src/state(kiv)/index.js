import {createSlice} from '@reduxjs/toolkit'
import { decodeJWT } from '../functions';
import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

const initialState = {
    loginOverlay : false,
    profileOverlay : false,
    programmes : [],
    userBasicDetails :  {name : "default", email : "defaultEmail", account_type : undefined},
    // applications : {
    //     approved : [],
    //     pending : [],
    //     rejected : [],
    // },
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
    openNotifs : false,
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
        closeProfileOverlay : (state) => {
            state.profileOverlay = false; 
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
        },
        // updateApplications : (state, action) => {
        //     state.applications = {...state.applications, ...action.payload}
        // },
        toggleNotifs : (state) => {
            state.openNotifs = !state.openNotifs
        }
    }
})


export const {loginOverlayToggle ,
    profileOverlayToggle, closeProfileOverlay,
    logOut, updateDetails,
    dragToggle, modifyDetails,
    updateProgrammes,  updateApplications, toggleNotifs,
    addToParking, removeFromParking} = userSlice.actions;



    
    const persistConfig = {
        key: 'user',
        blacklist : ["dragParking", "loginOverlay", "profileOverlay", "disableDrag", "openNotifs"],
        storage,
    };

    export const userReducer = persistReducer(persistConfig, userSlice.reducer);

    export const store = configureStore({
        reducer : { user : userReducer},
        middleware: [thunk]
    })



export default store;