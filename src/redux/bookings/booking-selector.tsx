//import typescript type
import { RootState } from "../root-reducer";

export const selectNumberOfAdults = (state: RootState) => state.booking.reservation.bookingDetails.numberOfAdults;

export const selectNumberOfChildren = (state: RootState) => state.booking.reservation.bookingDetails.numberOfChildren;

export const selectNumberOfInfants = (state: RootState) => state.booking.reservation.bookingDetails.numberOfInfants;

export const selectNumberOfPets = (state: RootState) => state.booking.reservation.bookingDetails.numberOfPets;

export const selectCheckInDate = (state: RootState) => state.booking.reservation.bookingDetails.checkInDate;

export const selectCheckOutDate = (state: RootState) => state.booking.reservation.bookingDetails.checkOutDate;

export const selectPrice = (state: RootState) => state.booking.reservation.bookingDetails.price;

export const selectSubTotal = (state: RootState) => state.booking.reservation.bookingDetails.subTotal;

export const selectFinalTotal = (state: RootState) => state.booking.reservation.bookingDetails.finalTotal;


export const selectTotalDays = (state: RootState) => state.booking.reservation.bookingDetails.totalDays;