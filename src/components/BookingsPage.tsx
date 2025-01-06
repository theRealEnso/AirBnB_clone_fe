import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//import redux selectors
import { selectCurrentUser } from "../redux/user/user-selectors";

//import redux actions
import { setExistingBookings } from "../redux/bookings/booking-reducer";

//import components
import { AccountNavigation } from "./AccountNavigation";
import { BookingCard } from "./BookingCard";

import { useGetMyBookingsQuery } from "../api/api-slice";

//import typescript types
import { Place } from "../redux/places/places-reducer";


//define types for booking
type Address = {
  line1: string | null;
  line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  _id: string;
}

export type BookingProps = {
  place: Place;
  bookingDetails: {
    address: Address,
    name: string;
    _id: string;
  },
  checkInDate: string;
  checkOutDate: string;
  customerId: string;
  customerName: string;
  email: string;
  finalTotal: string;
  numberOfAdults: number;
  numberOfChildren: number | null;
  numberOfInfants: number | null;
  numberOfPets: number | null;
  numberOfNights: number | null;
  _id: string;
  createdAt: string;
}

export const BookingsPage = () => {
  const dispatch = useDispatch();

  const {id} = useSelector(selectCurrentUser);
  // console.log(id);

  const {data: myBookings} = useGetMyBookingsQuery(id);

  useEffect(() => {
    if(myBookings){
      dispatch(setExistingBookings(myBookings));
    }
  },[myBookings, dispatch]);

  console.log(myBookings);
  return (
    <>
      <AccountNavigation></AccountNavigation>
      <div className="mx-24 px-28 grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        {
          myBookings && myBookings.map((booking: BookingProps) => {
            return <BookingCard booking={booking} key={booking._id}></BookingCard>
          })
        }
     </div>
    </>

  );
};
