//import typescript type
import { RootState } from "../root-reducer";

export const selectNumberOfAdults = (state: RootState) => state.booking.reservation.numberOfAdults;

export const selectNumberOfChildren = (state: RootState) => state.booking.reservation.numberOfChildren;

export const selectNumberOfInfants = (state: RootState) => state.booking.reservation.numberOfInfants;

export const selectNumberOfPets = (state: RootState) => state.booking.reservation.numberOfPets;

export const selectCheckInDate = (state: RootState) => state.booking.reservation.checkInDate;

export const selectCheckOutDate = (state: RootState) => state.booking.reservation.checkOutDate;

export const selectTotal = (state: RootState) => state.booking.reservation.total;

export const selectTotalDays = (state: RootState) => state.booking.reservation.totalDays;