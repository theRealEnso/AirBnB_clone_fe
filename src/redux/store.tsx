import { configureStore } from "@reduxjs/toolkit";

//imports from redux-persist to store the state in local storage. Assists with rehydrating the store on with desired data on load / reload
import {persistReducer, persistStore, PersistConfig} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";

//import the root reducer that contains our combined reducers
import { rootReducer, RootState } from "./root-reducer";

//import apiSlice to update middlewares in the store
import { userApiSlice, placesApiSlice, bookingsApiSlice } from "../api/api-slice";

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
};

//saveUserOnlyFilter + saveCurrentPlaceFilter + persistConfig--
//goal is to persist the user and the place so that the user + place state is not lost when a user refreshes the page or closes the browser
//createFilter takes 2 arguments: 1.) `reducerKey`, which is the key of the reducer to be filtered and 2.) `whitelist`, which is an array of keys within the specified reducer to be included in the filtered state
//the filter will only be applied to the slice of the Redux state corresponding to the `user` reducer, and only the "user" key inside of the user reducer is persisted. Likewise, the filter will be applied to the slice of the Redux state corresponding to the "places" reducer, and only the `place` key inside of the "places" reducer will be persisted
//filter restricts state persistence and retrieval to only the "user" key within the 'user' reducer slice, enabling more focused and efficient state management.
const saveUserOnlyFilter = createFilter("user", ["user"]);
const saveCurrentPlaceFilter = createFilter("places", ["place"]);

//define configuration object specifying how to persist the state
const persistConfig: ExtendedPersistConfig = {
    key: "app",
    storage,
    whitelist: ["user", "places", "booking"],
    transforms: [saveUserOnlyFilter, saveCurrentPlaceFilter],
};

//wrap the reducer for persistence. Creates version of the reducer that knows how to persist and rehydrate the state
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(userApiSlice.middleware).concat(placesApiSlice.middleware).concat(bookingsApiSlice.middleware),
    devTools: true,
});

export const persistor = persistStore(store);