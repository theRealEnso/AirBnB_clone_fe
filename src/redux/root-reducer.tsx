import { combineReducers } from "@reduxjs/toolkit";

//import apiSlice
import { apiSlice } from "../api/api-slice";

//import existing reducers to be combined
import { userReducer } from "./user/user-reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;