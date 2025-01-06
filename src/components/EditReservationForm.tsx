import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";

//import redux actions
import { setNumberOfAdults, setNumberOfChildren, setNumberOfInfants, setNumberOfPets, setCheckInDate, setCheckOutDate, setPrice, setFinalTotal, setTotalDays, } from "../redux/bookings/booking-reducer";

//import redux selectors
import { 
    selectCheckInDate, 
    selectCheckOutDate, 
    selectNumberOfAdults, 
    selectNumberOfChildren, 
    selectNumberOfInfants, 
    selectNumberOfPets,
    selectFinalTotal
} from "../redux/bookings/booking-selector";

import { selectCurrentUser } from "../redux/user/user-selectors";

import { selectMaxGuests } from "../redux/places/places-selector";

//import components
import { SummaryViewer } from "./SummaryViewer";
import { ServiceAnimalNotice } from "./ServiceAnimalNotice";
import { DateSelector } from "./DateSelector";
import { GuestsDisplayCount } from "./GuestsDisplayCount";
import { GuestsMenu } from "./GuestsMenu";
import { PaymentForm } from "./PaymentForm";

//import components from stripe
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../main";

import { useCreatePaymentIntentMutation, useGetBookingDetailsQuery, useGetReservedDatesQuery } from "../api/api-slice";

export const EditReservationForm = () => {
    const dispatch = useDispatch();
    const {bookingId} = useParams();

    const [showEditDates, setShowEditDates] = useState<boolean>(false);
    const [displayGuestsMenu, setDisplayGuestsMenu] = useState<boolean>(false);
    const [showServiceAnimal, setShowServiceAnimal] = useState<boolean>(false);
    const [clientSecret, setClientSecret] = useState<string>("");
    const [placeId, setPlaceId] = useState<string>("");

    const {data: bookingDetails} = useGetBookingDetailsQuery(bookingId);
    console.log(bookingDetails);

    useEffect(() => {
        if(bookingDetails){
            setPlaceId(bookingDetails.place._id);
            dispatch(setNumberOfAdults(bookingDetails.numberOfAdults));
            dispatch(setNumberOfChildren(bookingDetails.numberOfChildren));
            dispatch(setNumberOfInfants(bookingDetails.numberOfInfants));
            dispatch(setNumberOfPets(bookingDetails.numberOfPets));
            dispatch(setCheckInDate(bookingDetails.checkInDate));
            dispatch(setCheckOutDate(bookingDetails.checkOutDate));
            dispatch(setPrice(bookingDetails.place.price));
            dispatch(setFinalTotal(bookingDetails.finalTotal));
        }
    }, [bookingDetails, dispatch])

    const {data: reservedDates} = useGetReservedDatesQuery(placeId);

    const {firstName, lastName, email, id} = useSelector(selectCurrentUser);
    console.log(id);


    // console.log(finalTotal);
 
    const checkInDate = useSelector(selectCheckInDate);
    const checkOutDate = useSelector(selectCheckOutDate);
    const numberOfAdults = useSelector(selectNumberOfAdults);
    const numberOfChildren = useSelector(selectNumberOfChildren);
    const numberOfInfants = useSelector(selectNumberOfInfants);
    const numberOfPets = useSelector(selectNumberOfPets);
    const finalTotal = useSelector(selectFinalTotal);
    const maxGuests = useSelector(selectMaxGuests);

    const [createPaymentIntent] = useCreatePaymentIntentMutation();

    useEffect(() => {
        const fetchClientSecret = async () => {
            if(finalTotal){
                const response = await createPaymentIntent({
                    amount: finalTotal,
                    currency: "usd",
                });

                if(response){
                    // console.log(response);
                    const {data: {client_secret}} = response;
                    // console.log(client_secret);
                    setClientSecret(client_secret);
                }
            }
        }

        fetchClientSecret();
    },[createPaymentIntent, finalTotal]);

  return (
    <div className="mx-24 px-16">
        <div className="flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            <h1 className="text-2xl font-bold tracking-wide">Confirm and pay</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-40">
            {/* left side */}
            <div className="">
                <div>
                    <div className="flex flex-col border-b-2 pb-8">
                        <h2 className="text-xl font-semibold mt-4">Your trip</h2>
                        <div className="flex justify-between">
                            <div className="mt-4 space-y-2">
                                <h4 className="text-md font-medium">Dates</h4>
                                <p className="text-sm">{`${checkInDate} - ${checkOutDate}`}</p>
                            </div>

                            <span className="underline font-semibold cursor-pointer" onClick={() => setShowEditDates(true)}>Edit</span>

                            {
                                showEditDates && 
                                    (
                                        // top div creates the dark overlay. 
                                        // inset-0 = top: 0; right: 0; bottom: 0; left: 0. This ensures the overlay stretches to cover the entire viewport
                                        // position fixed ensures the overlay remains fixed during scrolling
                                        <div
                                            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"
                                            onClick={() => setShowEditDates(false)} // to close the overlay when clicked
                                            >
                                            {/* inner div creates the modal / white area to display the full text */}
                                            <div
                                                className="bg-white p-8 rounded-lg max-w-[500px] w-[90%] max-h-[80vh] overflow-y-auto transition-transform transform animate-slide-up"
                                                onClick={(e) => e.stopPropagation()} // to prevent event bubbling up when user clicks inside this div, which executes the setShowEditDates(false) from executing, which closes the overlay right away
                                                >
                                                <DateSelector setShowEditDates={setShowEditDates} reservedDates={reservedDates} />
                                            </div>
                                        </div>
                                    )
                                }
                        </div>
                        <div className="flex justify-between">
                            <div className="mt-4 space-y-2">
                                <h4 className="text-md font-medium">Guests</h4>
                                <div className="flex flex-col space-y-1">
                                    <div className="flex">
                                        <p className="text-sm">
                                            {
                                                numberOfAdults + numberOfChildren === 1 ? `1 guest`
                                                : numberOfAdults + numberOfChildren > 1 ? `${numberOfAdults + numberOfChildren} guests`
                                                : null
                                            }
                                        </p>
                                        <p className="text-sm">
                                            {
                                                numberOfInfants === 1 ? `, 1 infant`
                                                : numberOfInfants> 1 ? `, ${numberOfInfants} infants`
                                                : null
                                            }
                                        </p>
                                        <p className="text-sm">
                                            {
                                                numberOfPets === 1 ? `, 1 pet`
                                                : numberOfPets > 1 ? `, ${numberOfPets} pets`
                                                : null
                                            }
                                        </p>
                                    </div>

                                    {
                                        numberOfPets ? (
                                            <p 
                                                className="text-sm font-bold underline cursor-pointer" 
                                                onClick={() => setShowServiceAnimal(true)}
                                                >
                                                    Bringing a service animal?
                                            </p>
                                        ) : null
                                    }

                                    {
                                        showServiceAnimal && 
                                            (
                                                // top div creates the dark overlay
                                                <div
                                                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"
                                                    onClick={() => setShowServiceAnimal(false)} // to close the overlay when clicked
                                                    >
                                                    {/* inner div creates the modal / white area to display the full text */}
                                                    <div
                                                        className="bg-white p-8 rounded-lg max-w-[500px] w-[90%] max-h-[80vh] overflow-y-auto transition-transform transform animate-slide-up"
                                                        onClick={(e) => e.stopPropagation()} // to prevent event bubbling up when user clicks inside this div, which executes the setShowServiceAnimal(false) from executing, which closes the overlay right away
                                                        >
                                                        <ServiceAnimalNotice setShowServiceAnimal={setShowServiceAnimal} />
                                                    </div>
                                                </div>
                                            )
                                    }
                                </div>
                                
                            </div>

                            <span className="underline font-semibold cursor-pointer" onClick={() => setDisplayGuestsMenu(true)}>Edit</span>
                            {
                               displayGuestsMenu && 
                                    (
                                        <div 
                                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 z-50" 
                                            onClick={() => setDisplayGuestsMenu(false)}
                                            >
                                            <div 
                                                className="bg-white rounded-lg animate-slide-up p-8 max-w-[500px] w-[90%] max-h-[80vh] transition-transform transform"
                                                onClick={(event) => event.stopPropagation()}
                                                >
                                                
                                                    <GuestsDisplayCount 
                                                        numberOfAdults={numberOfAdults}
                                                        numberOfChildren={numberOfChildren}
                                                        numberOfInfants={numberOfInfants}
                                                        numberOfPets={numberOfPets}
                                                        >
                                                    </GuestsDisplayCount>

                                                    <GuestsMenu 
                                                        maxGuests={maxGuests}
                                                        setDisplayGuestsMenu={setDisplayGuestsMenu} 
                                                        setShowServiceAnimal={setShowServiceAnimal}
                                                        >
                                                    </GuestsMenu>


                                            </div>
                                        </div>
                                    ) 
                            }
                        </div>
                    </div>
                </div>

                {/* conditionally render the payment component only if the client secret is available*/}
                {
                    clientSecret && (
                        <div className="mt-8">
                            {/* ok to reinitialize the elements provider and pass client secret as options locally in the component even though it already wraps the entire app in main.tsx file */}
                            <Elements stripe={stripePromise} options={{clientSecret}}>
                                <PaymentForm firstName={firstName} lastName={lastName} email={email} id={id}></PaymentForm>
                            </Elements>
                            
                        </div>
                    )
                }

            </div>

            {/* right side. Conditioanlly render the summary viewer only if place detail data from the query is available */}
            {
                bookingDetails && (
                    <div>
                        <SummaryViewer bookingDetails={bookingDetails}></SummaryViewer>
                    </div>
                )
            }

        </div>
    </div>
  )
};
