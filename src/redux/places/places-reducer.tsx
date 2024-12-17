import { createSlice} from "@reduxjs/toolkit";

export type Place = {
    owner: string;
    title: string;
    address: string;
    photos: string[],
    description: string;
    perks: string[];
    extraInfo: string;
    checkIn: number | string;
    checkOut: number | string;
    maxGuests: number | string;
    _id?: string;  
}

type PlaceProps = {
    place: Place;
    listedPlaces: Place[];
};

const PLACES_INITIAL_STATE: PlaceProps = {
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
        _id: "",
    },
    listedPlaces: [],
};

export const placesSlice = createSlice({
    name: "places",
    initialState: PLACES_INITIAL_STATE,
    reducers: {
        addPhotoFromLink: (state, action) => {
            state.place.photos = [...state.place.photos, action.payload];
        },

        addPhotosFromDevice: (state, action) => {
            state.place.photos = [...state.place.photos, ...action.payload];
        },

        removePhoto: (state, action) => {
            const i = action.payload;
            const photosArray = [...state.place.photos];
            
            const updatedPhotos = photosArray.filter((_, index) => index !== i);

            state.place.photos = updatedPhotos;
        },

        setMainPhoto: (state, action) => {
            const i = action.payload;
            const photosArray = [...state.place.photos];
            const selectedPhoto = photosArray.find((_, index) => index === i);

            const updatedPhotos = photosArray.filter((_, index) => index !== i);
            updatedPhotos.unshift(selectedPhoto);

            state.place.photos = updatedPhotos;
        },

        clearPhotos: (state) => {
            state.place.photos = [];
        },

        setPhotos: (state, action) => {
            state.place.photos = [...action.payload];
        },

        setUserPlaces: (state, action) => {
            state.listedPlaces = action.payload;
        },

        setPlace: (state, action) => {
            state.place = action.payload;
        }
    },

    // extraReducers: (builder) => {
        
    //     builder.addMatcher(
    //         isAnyOf(
    //             placesApiSlice.endpoints.uploadPhotoFromLink.matchPending, 
    //             placesApiSlice.endpoints.uploadPhotoFromDevice.matchPending,
    //             placesApiSlice.endpoints.getAllUserPlaces.matchPending,
    //         ), (state) => {
    //             state.status = "loading"
    //         }
    //     );

    //     builder.addMatcher(
    //         isAnyOf(placesApiSlice.endpoints.uploadPhotoFromLink.matchFulfilled,), (state, action) => {
    //             state.status = "success";
    //             state.place.photos = [...state.place.photos, action.payload];
    //         }
    //     );

    //     builder.addMatcher(
    //         isAnyOf(placesApiSlice.endpoints.uploadPhotoFromDevice.matchFulfilled), (state, action) => {
    //             state.status = "success";
    //             state.place.photos = [...state.place.photos, ...action.payload];
    //         }
    //     );

    //     builder.addMatcher(
    //         isAnyOf(placesApiSlice.endpoints.getAllUserPlaces.matchFulfilled), (state, action) => {
    //             state.listedPlaces = action.payload;
    //         }
    //     )

    //     builder.addMatcher(
    //         isAnyOf(
    //             placesApiSlice.endpoints.uploadPhotoFromLink.matchRejected, 
    //             placesApiSlice.endpoints.uploadPhotoFromDevice.matchRejected,
    //             placesApiSlice.endpoints.getAllUserPlaces.matchRejected,
    //         ), (state) => {
    //             state.status = "failed";
    //         }
    //     );
    // }
});

export const placesReducer = placesSlice.reducer;

export const {addPhotoFromLink, addPhotosFromDevice, removePhoto, setPhotos, setMainPhoto, clearPhotos, setUserPlaces, setPlace} = placesSlice.actions;