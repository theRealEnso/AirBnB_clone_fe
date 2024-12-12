import { createSlice} from "@reduxjs/toolkit";

type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    picture?: string;
    access_token: string;
};

type UserState = {
    user: User;
}

const USER_INITIAL_STATE: UserState = {
    user: {
        id: "",
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
            state.user = {
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                picture: "",
                access_token: "",
            }
        },

        setUser: (state, action) => {
            state.user = action.payload;
        }
    },

    // extraReducers: (builder) => {
    //     builder.addMatcher(
    //         isAnyOf(userApiSlice.endpoints.registerUser.matchPending, userApiSlice.endpoints.loginUser.matchPending), 
    //         (state) => {
    //         state.status = "loading";
    //     });
    //     builder.addMatcher(
    //         isAnyOf(userApiSlice.endpoints.registerUser.matchFulfilled, userApiSlice.endpoints.loginUser.matchFulfilled),
    //         (state, action) => {
    //             state.status = "success";
    //             state.user = action.payload.user;
    //             state.error = "";
    //         }
    //     );
    //     builder.addMatcher(
    //         isAnyOf(userApiSlice.endpoints.registerUser.matchRejected, userApiSlice.endpoints.loginUser.matchRejected),
    //         (state, action) => {
    //             state.status = "failed";
    //             state.error = action.error.message || "User registration or login failed";
    //         }
    //     )
    // }
});

export const userReducer = userSlice.reducer;

export const {logout, setUser} = userSlice.actions;