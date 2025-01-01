import dayjs, { Dayjs} from 'dayjs';

import { useState, useEffect, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

//import redux selectors
import { selectCheckInDate, selectCheckOutDate, selectNumberOfAdults, selectNumberOfChildren, selectNumberOfInfants, selectNumberOfPets } from '../redux/bookings/booking-selector';

//import redux actions
import { setCheckInDate, setCheckOutDate, setSubTotal, setFinalTotal, setTotalDays } from '../redux/bookings/booking-reducer';


// import components
import { GuestsDisplayCount } from './GuestsDisplayCount';
import { GuestsMenu } from './GuestsMenu';

//material UI component
import BasicDatePicker from './BasicDatePicker';

type BookingWidgetProps = {
    price: number;
    maxGuests: string | number;
    guestsMenuRef: React.RefObject<HTMLDivElement | null>;
    setShowServiceAnimal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BookingWidget = ({
    price,
    maxGuests,
    guestsMenuRef,
    setShowServiceAnimal,
} : BookingWidgetProps) => {
    const {placeId} = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const numberOfAdults = useSelector(selectNumberOfAdults);
    const numberOfChildren = useSelector(selectNumberOfChildren);
    const numberOfInfants = useSelector(selectNumberOfInfants);
    const numberOfPets = useSelector(selectNumberOfPets);
    const checkInDate = useSelector(selectCheckInDate);
    const checkOutDate = useSelector(selectCheckOutDate);

    const [displayGuestsMenu, setDisplayGuestsMenu] = useState<boolean>(false);
    const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
    const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
    const [stayDuration, setStayDuration] = useState<number>(0);
    const [bookingSubTotal, setBookingSubTotal] = useState<number>(0);
    const [navigationError, setNavigationError] = useState<string>("");

    const serviceFee = .125;
    const taxes = .10;
    const finalCharge = bookingSubTotal + (bookingSubTotal * taxes) + (bookingSubTotal * serviceFee);

    const toggleGuestMenu = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setDisplayGuestsMenu(!displayGuestsMenu);
    };

    const navigateToBookingSummary = () => {
        if((checkIn && checkOut) || (checkInDate && checkOutDate)){
            navigate(`/places/${placeId}/reserve`);
        } else {
            setNavigationError("Please select valid check in and out dates")
        }
    }
    useEffect(() => {
        if(checkIn && checkOut){
            setStayDuration(checkOut.diff(checkIn, "day"));
            setBookingSubTotal(stayDuration * price);
            dispatch(setCheckInDate(checkIn.format("MM/DD/YYYY")));
            dispatch(setCheckOutDate(checkOut.format("MM/DD/YYYY")));
            dispatch(setSubTotal(bookingSubTotal));
            dispatch(setTotalDays(stayDuration));
            dispatch(setFinalTotal(finalCharge))
        }
    },[checkIn, checkOut, stayDuration, price, bookingSubTotal, finalCharge, dispatch]);

    //useEffect to handle closing the menu dropdown in the booking widget when user clicks anywhere outside of it
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if(guestsMenuRef.current && !guestsMenuRef.current.contains(event.target)){
                setDisplayGuestsMenu(false);
            }
        }
        document.body.addEventListener("click", handleOutsideClick);

        return () => document.body.removeEventListener("click", handleOutsideClick);

    },[setDisplayGuestsMenu, guestsMenuRef]);

    // console.log(checkOut?.diff(checkIn, "day"));
  return (
    <div className="bg-white shadow-md p-4 rounded-2xl flex flex-col max-h-[300px]">
        <div className="text-center mb-2">
            {
                checkIn && checkOut ? `Price: $${bookingSubTotal} total` : `Price: $${price} / night`
            }
            
        </div>

        <div className="flex flex-col mb-2">
            <div className="flex">
                <div>
                    <BasicDatePicker label="Check in" value={checkInDate ? dayjs(checkInDate) : checkIn} onChange={setCheckIn}></BasicDatePicker>
                </div>
                <div>
                    <BasicDatePicker label="Check out" value={checkOutDate ? dayjs(checkOutDate) : checkOut} onChange={setCheckOut}></BasicDatePicker>
                </div>
            </div>

            <div className="relative">
                <GuestsDisplayCount 
                    numberOfAdults={numberOfAdults}
                    numberOfChildren={numberOfChildren}
                    numberOfInfants={numberOfInfants}
                    numberOfPets={numberOfPets}
                    displayGuestsMenu={displayGuestsMenu}
                    toggleGuestMenu={toggleGuestMenu}
                >
                </GuestsDisplayCount>
                {
                    displayGuestsMenu && 
                    (
                        <div className="absolute">
                            <GuestsMenu
                                displayGuestsMenu={displayGuestsMenu}
                                maxGuests={maxGuests}
                                setDisplayGuestsMenu={setDisplayGuestsMenu}
                                guestsMenuRef={guestsMenuRef}
                                setShowServiceAnimal={setShowServiceAnimal}
                                > 
                            </GuestsMenu>
                        </div>

                    )
                }
            </div>
        </div>

        <button className="bg-primary rounded-lg text-white font-semibold p-2 mt-2 tracking-wide" onClick={navigateToBookingSummary}>Reserve</button>

        <div className="text-center mt-4 flex flex-col">
            You won't be charged yet

            {
                navigationError && <span className="text-red-500">{navigationError}</span>
            }
        </div>
    </div>
  );
};
