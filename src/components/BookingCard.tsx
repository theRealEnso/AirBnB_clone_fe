import { Link } from "react-router-dom"

import dayjs from "dayjs";

//import typescript types for booking
import { BookingProps } from "./BookingsPage";

type Booking = {
    booking: BookingProps
}

export const BookingCard = ({booking}: Booking) => {
    const {place} = booking;
    const {_id} = booking;

    const animateBorderColorStyles = `border-2 border-transparent hover:border-primary transition-colors`;
    const addGlowEffectStyles = `transition-shadow hover:shadow-primary/50 hover:scale-[1.02] transition-transform`

    const formattedDate = dayjs(booking.createdAt).format("MM/DD/YYYY");

  return (
    <div className={`mt-4 rounded-2xl shadow-xl ${addGlowEffectStyles} ${animateBorderColorStyles} w-full flex-none`}>
        <Link to={`/account/bookings/${_id}`} className="flex items-center bg-gray-200 p-6 rounded-2xl gap-8 h-full w-full flex-none">
            {
                booking.place.photos && booking.place.photos.length > 0 && 
                (
                    <div className="w-40 h-40 shrink-0">
                        <img 
                            src={`http://localhost:5000/photo-uploads/${booking.place.photos[0].photo}`} 
                            className="w-full h-full rounded-2xl transform transition-transform duration-500 hover:scale-110">

                        </img>
                    </div>
                )
            }

            {
                booking &&
                    (
                        <div className="flex flex-col">
                            <h1 className="text-xl tracking-wide font-bold">{place.title}</h1>
                            <h3 className="text-md">{`${place.address.street}, ${place.address.postalCode}, ${place.address.city}, ${place.address.country}`}</h3>
        
                            <div className="flex justify-between mt-4 gap-6">
                                <div className="border-t-4 flex flex-col space-y-2">
                                    <p className="text-sm"><span className="font-semibold">Check-in date: </span>{`${booking.checkInDate}`}</p>
                                    <p className="text-sm"><span className="font-semibold">Check-out date: </span>{`${booking.checkOutDate}`}</p>
                                    <p className="text-sm"><span className="font-semibold">Check-in time: </span>{`${booking.place.checkIn}`}</p>
                                    <p className="text-sm"><span className="font-semibold">Check-out time: </span>{`${booking.place.checkOut}`}</p>
                                </div>
                                <div className="flex flex-col space-y-4">
                                    <p><span className="font-semibold text-md tracking-wide">Total: </span>{`$${booking.finalTotal}`}</p>
                                    <p><span className="font-semibold text-md tracking-wide">Number of Guests: </span>{`${booking.numberOfAdults + booking.numberOfChildren + booking.numberOfInfants}`}</p>
                                    <p><span className="font-semibold text-md tracking-wide">Reservation date: </span>{`${formattedDate}`}</p>
                                </div>
                            </div>
                        </div>
                    )
            }

        </Link>
    </div>
  );
};
