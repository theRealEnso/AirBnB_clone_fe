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

        bookingDetails: {
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

    },

    existingBookings: [],

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

        bookingDetails: {
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
    },

    existingBookings: [],
};

export const bookingSlice = createSlice({
    name: "booking",
    initialState: BOOKING_INITIAL_STATE,
    reducers: {
        setNumberOfAdults: (state, action) => {
            state.reservation.bookingDetails.numberOfAdults = action.payload;
        },
        setNumberOfChildren: (state, action) => {
            state.reservation.bookingDetails.numberOfChildren = action.payload;
        },
        setNumberOfInfants: (state, action) => {
            state.reservation.bookingDetails.numberOfInfants = action.payload;
        },
        setNumberOfPets: (state, action) => {
            state.reservation.bookingDetails.numberOfPets = action.payload;
        },

        setCheckInDate: (state, action) => {
            state.reservation.bookingDetails.checkInDate = action.payload;
        },

        setCheckOutDate: (state, action) => {
            state.reservation.bookingDetails.checkOutDate = action.payload;
        },

        setSubTotal: (state, action) => {
            state.reservation.bookingDetails.subTotal = action.payload;
        },

        setFinalTotal: (state, action) => {
            state.reservation.bookingDetails.finalTotal = action.payload;
        },

        setTotalDays: (state, action) => {
            state.reservation.bookingDetails.totalDays = action.payload;
        },

        setExistingBookings: (state, action) => {
            state.existingBookings = action.payload;
        }
    }
});

export const bookingReducer = bookingSlice.reducer;

export const {setNumberOfAdults, setNumberOfChildren, setNumberOfInfants, setNumberOfPets, setCheckInDate, setCheckOutDate, setSubTotal, setFinalTotal, setTotalDays, setExistingBookings} = bookingSlice.actions;