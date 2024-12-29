import { createSlice } from "@reduxjs/toolkit";

//import typescript props
import { Place } from "../places/places-reducer";

type BookingProps = {
    reservation: {
        place: Place,
        user: {
            firstName: string;
            lastName: string;
            id: string;
        },
        phoneNumber: string;
        checkInDate: string;
        checkOutDate: string;
        price: number;
        subTotal: number;
        finalTotal: number;
        totalDays: number;
        numberOfAdults: number;
        numberOfChildren: number;
        numberOfInfants: number;
        numberOfPets: number;
    }

}

const BOOKING_INITIAL_STATE: BookingProps = {
    reservation: {
        place: {
            owner: "",
            price: 0,
            title: "",
            address: {
                street: "",
                postalCode: "",
                city: "",
                country: "",
            },
            photos: [],
            description: "",
            perks: [],
            extraInfo: "",
            checkIn: 0,
            checkOut: 0,
            maxGuests: 0,
            _id: "",
        },
        user: {
            firstName: "",
            lastName: "",
            id: "",
        },
        phoneNumber: "",
        checkInDate: "",
        checkOutDate: "",
        price: 0,
        subTotal: 0,
        finalTotal: 0,
        totalDays: 0,
        numberOfAdults: 1,
        numberOfChildren: 0,
        numberOfInfants: 0,
        numberOfPets: 0,

    }
};

export const bookingSlice = createSlice({
    name: "booking",
    initialState: BOOKING_INITIAL_STATE,
    reducers: {
        setNumberOfAdults: (state, action) => {
            state.reservation.numberOfAdults = action.payload;
        },
        setNumberOfChildren: (state, action) => {
            state.reservation.numberOfChildren = action.payload;
        },
        setNumberOfInfants: (state, action) => {
            state.reservation.numberOfInfants = action.payload;
        },
        setNumberOfPets: (state, action) => {
            state.reservation.numberOfPets = action.payload;
        },

        setCheckInDate: (state, action) => {
            state.reservation.checkInDate = action.payload;
        },

        setCheckOutDate: (state, action) => {
            state.reservation.checkOutDate = action.payload;
        },

        setSubTotal: (state, action) => {
            state.reservation.subTotal = action.payload;
        },

        setFinalTotal: (state, action) => {
            state.reservation.finalTotal = action.payload;
        },

        setTotalDays: (state, action) => {
            state.reservation.totalDays = action.payload;
        },
    }
});

export const bookingReducer = bookingSlice.reducer;

export const {setNumberOfAdults, setNumberOfChildren, setNumberOfInfants, setNumberOfPets, setCheckInDate, setCheckOutDate, setSubTotal, setFinalTotal, setTotalDays} = bookingSlice.actions;