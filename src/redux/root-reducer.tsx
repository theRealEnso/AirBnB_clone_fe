import { combineReducers } from "@reduxjs/toolkit";

//import apiSlice
import { userApiSlice, placesApiSlice } from "../api/api-slice";

//import existing reducers to be combined
import { userReducer } from "./user/user-reducer";
import { placesReducer } from "./places/places-reducer";
import { bookingReducer } from "./bookings/booking-reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    places: placesReducer,
    booking: bookingReducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [placesApiSlice.reducerPath]: placesApiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;