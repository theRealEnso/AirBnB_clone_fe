import { Dayjs} from 'dayjs';

import { useState, useEffect, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

//import redux selectors
import { selectNumberOfAdults, selectNumberOfChildren, selectNumberOfInfants, selectNumberOfPets } from '../redux/bookings/booking-selector';

//import redux actions
import { setCheckInDate, setCheckOutDate, setSubTotal, setFinalTotal, setTotalDays } from '../redux/bookings/booking-reducer';


// import components
import { GuestsMenu } from './GuestsMenu';

//material UI component
import BasicDatePicker from './BasicDatePicker';

type BookingWidgetProps = {
    price: number;
    displayGuestsMenu: boolean;
    setDisplayGuestsMenu: React.Dispatch<React.SetStateAction<boolean>>;
    maxGuests: string | number;
    guestsMenuRef: React.RefObject<HTMLDivElement | null>;
    setShowServiceAnimal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BookingWidget = ({
    price,
    displayGuestsMenu,
    setDisplayGuestsMenu,
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
        if(checkIn && checkOut){
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
                    <BasicDatePicker label="Check in" value={checkIn} onChange={setCheckIn}></BasicDatePicker>
                </div>
                <div>
                    <BasicDatePicker label="Check out" value={checkOut} onChange={setCheckOut}></BasicDatePicker>
                </div>
            </div>

            <div className="relative">
                <button className="border-2 p-4 w-full text-left flex justify-between" onClick={toggleGuestMenu}>
                    <div className="flex">
                        <span> 
                            {
                                
                                numberOfAdults + numberOfChildren === 1 ? `1 guest`
                                : numberOfAdults + numberOfChildren > 1 ? `${numberOfAdults + numberOfChildren} guests`
                                : null
                            }
                        </span>
                        <span>
                            {
                                numberOfInfants === 1 ? `, 1 infant`
                                : numberOfInfants > 1 ? `, ${numberOfInfants} infants`
                                : null
                            }
                        </span>
                        <span>
                            {
                                numberOfPets === 1 ? `, 1 pet`
                                : numberOfPets > 1 ? `, ${numberOfPets} pets`
                                : null
                            }
                        </span>
                    </div>
                    

                    {
                        displayGuestsMenu ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                            </svg>   
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        )
                    }                                                 

                </button>

                {
                    displayGuestsMenu && 
                    (
                        <GuestsMenu
                            maxGuests={maxGuests}
                            setDisplayGuestsMenu={setDisplayGuestsMenu}
                            guestsMenuRef={guestsMenuRef}
                            setShowServiceAnimal={setShowServiceAnimal}
                            > 
                        </GuestsMenu>
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
