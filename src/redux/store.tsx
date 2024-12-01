import { configureStore } from "@reduxjs/toolkit";

//imports from redux-persist to store the state in local storage. Assists with rehydrating the store on with desired data on load / reload
import {persistReducer, persistStore, PersistConfig} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";

//import the root reducer that contains our combined reducers
import { rootReducer, RootState } from "./root-reducer";

//import apiSlice to update middlewares in the store
import { apiSlice } from "../api/api-slice";

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
};

//saveUserOnlyFilter + persistConfig--
//goal is to persist the user so that the user state is not lost when a user refreshes the page or closes the browser
//createFilter takes 2 arguments: 1.) `reducerKey`, which is the key of the reducer to be filtered and 2.) `whitelist`, which is an array of keys within the specified reducer to be included in the filtered state
//the filter will only be applied to the slice of the Redux state corresponding to the `user` reducer, and only the "user" key inside of the user reducer is persisted
//filter restricts state persistence and retrieval to only the "user" key within the 'user' reducer slice, enabling more focused and efficient state management.
const saveUserOnlyFilter = createFilter("user", ["user"]);

//define configuration object specifying how to persist the state
const persistConfig: ExtendedPersistConfig = {
    key: "user",
    storage,
    whitelist: ["user"],
    transforms: [saveUserOnlyFilter],
};

//wrap the reducer for persistence. Creates version of the reducer that knows how to persist and rehydrate the state
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware),
    devTools: true,
});

export const persistor = persistStore(store);