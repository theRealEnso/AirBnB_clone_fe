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
      <div className="mx-24 px-28 grid md:grid-cols-2 gap-y-8">
        {
          myBookings && myBookings.map((booking) => {
            return <BookingCard booking={booking} key={booking._id}></BookingCard>
          })
        }
     </div>
    </>

  );
};
