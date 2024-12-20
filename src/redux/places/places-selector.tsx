import { RootState } from "../root-reducer";

export const selectPlacePhotos = (state: RootState) => state.places.place.photos;

export const selectUserPlaces = (state: RootState) => state.places.listedPlaces;

export const selectPlace = (state: RootState) => state.places.place;