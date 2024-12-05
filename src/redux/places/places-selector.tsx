import { RootState } from "../root-reducer";

export const selectPlacePhotos = (state: RootState) => state.places.place.photos;