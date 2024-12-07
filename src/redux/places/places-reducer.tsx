import { createSlice, isAnyOf} from "@reduxjs/toolkit";
import { placesApiSlice } from "../../api/api-slice";

type PlaceProps = {
    status: string;
    place: {
        owner: string;
        title: string;
        address: string;
        photos: string[],
        description: string;
        perks: [];
        extraInfo: string;
        checkIn: number;
        checkOut: number;
        maxGuests: number;
    }
};

const PLACES_INITIAL_STATE: PlaceProps = {
    status: "",
    place: {
        owner: "",
        title: "",
        address: "",
        photos: [],
        description: "",
        perks: [],
        extraInfo: "",
        checkIn: 0,
        checkOut: 0,
        maxGuests: 0,
    }
};

export const placesSlice = createSlice({
    name: "places",
    initialState: PLACES_INITIAL_STATE,
    reducers: {
        addPhotos: (state, action) => {
            state.place.photos = [...state.place.photos, action.payload];
        },
    },

    extraReducers: (builder) => {
        builder.addMatcher(
            isAnyOf(placesApiSlice.endpoints.uploadPhotoFromLink.matchPending, placesApiSlice.endpoints.uploadPhotoFromDevice.matchPending,), (state) => {
                state.status = "loading"
            }
        );

        builder.addMatcher(
            isAnyOf(placesApiSlice.endpoints.uploadPhotoFromLink.matchFulfilled,), (state, action) => {
                state.status = "success";
                state.place.photos = [...state.place.photos, action.payload];
            }
        );

        builder.addMatcher(
            isAnyOf(placesApiSlice.endpoints.uploadPhotoFromDevice.matchFulfilled), (state, action) => {
                state.status = "success";
                state.place.photos = [...state.place.photos, ...action.payload];
            }
        );

        builder.addMatcher(
            isAnyOf(placesApiSlice.endpoints.uploadPhotoFromLink.matchRejected, placesApiSlice.endpoints.uploadPhotoFromDevice.matchRejected,), (state) => {
                state.status = "failed";
            }
        );
    }
});

export const placesReducer = placesSlice.reducer;

export const {addPhotos} = placesSlice.actions;