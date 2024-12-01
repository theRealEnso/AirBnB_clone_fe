import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/api-slice";

type User = {
    firstName: string;
    lastName: string;
    email: string;
    picture?: string;
    access_token: string;
};

type UserState = {
    status: string;
    error: string;
    user: User;
}

const USER_INITIAL_STATE: UserState = {
    status: "",
    error: "",
    user: {
        firstName: "",
        lastName: "",
        email: "",
        picture: "",
        access_token: "",
    }
};

export const userSlice = createSlice({
    name: "users",
    initialState: USER_INITIAL_STATE,
    reducers: {
        logout: (state) => {
            state.status = "";
            state.error = "";
            state.user = {
                firstName: "",
                lastName: "",
                email: "",
                picture: "",
                access_token: "",
            }
        }
    },

    extraReducers: (builder) => {
        builder.addMatcher(
            isAnyOf(apiSlice.endpoints.registerUser.matchPending, apiSlice.endpoints.loginUser.matchPending), 
            (state) => {
            state.status = "loading";
        });
        builder.addMatcher(
            isAnyOf(apiSlice.endpoints.registerUser.matchFulfilled, apiSlice.endpoints.loginUser.matchFulfilled),
            (state, action) => {
                state.status = "success";
                state.user = action.payload.user;
                state.error = "";
            }
        );
        builder.addMatcher(
            isAnyOf(apiSlice.endpoints.registerUser.matchRejected, apiSlice.endpoints.loginUser.matchRejected),
            (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "User registration or login failed";
            }
        )
    }
});

export const userReducer = userSlice.reducer;

export const {logout} = userSlice.actions;