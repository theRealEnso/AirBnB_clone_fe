import { useState, useEffect } from "react";
import { useSelector, } from "react-redux";

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

import { selectPlace } from "../redux/places/places-selector";

//import components
import { SummaryViewer } from "./SummaryViewer";
import { ServiceAnimalNotice } from "./ServiceAnimalNotice";
import { PaymentForm } from "./PaymentForm";

//import components from stripe
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../main";

import { useCreatePaymentIntentMutation } from "../api/api-slice";

export const BookingSummary = () => {
    const {firstName, lastName, email, id} = useSelector(selectCurrentUser);
    console.log(id);

    const checkInDate = useSelector(selectCheckInDate);
    const checkOutDate = useSelector(selectCheckOutDate);
    const numberOfAdults = useSelector(selectNumberOfAdults);
    const numberOfChildren = useSelector(selectNumberOfChildren);
    const numberOfInfants = useSelector(selectNumberOfInfants);
    const numberOfPets = useSelector(selectNumberOfPets);
    const finalTotal = useSelector(selectFinalTotal);
    const currentPlace = useSelector(selectPlace);

    // console.log(finalTotal);
    console.log(currentPlace);

    const [showServiceAnimal, setShowServiceAnimal] = useState<boolean>(false);
    const [clientSecret, setClientSecret] = useState<string>("");

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

                            <span className="underline font-semibold cursor-pointer">Edit</span>
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
                                                : numberOfPets > 1 ? `${numberOfPets} pets`
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

                            <span className="underline font-semibold cursor-pointer">Edit</span>
                        </div>
                    </div>
                </div>

                {/* payment component */}
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

            {/* right side */}
            <div>
                <SummaryViewer></SummaryViewer>
            </div>
        </div>
    </div>
  )
};
