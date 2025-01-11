import { useState, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//import redux selectors
import { selectPlace } from "../redux/places/places-selector";
import { 
    selectCheckInDate, 
    selectCheckOutDate, 
    selectFinalTotal, 
    selectTotalDays, 
    selectNumberOfAdults, 
    selectNumberOfChildren, 
    selectNumberOfInfants, 
    selectNumberOfPets, 
} from "../redux/bookings/booking-selector";

//import redux actions
import { 
    setNumberOfAdults, 
    setNumberOfChildren, 
    setNumberOfInfants, 
    setNumberOfPets, 
    setCheckInDate, 
    setCheckOutDate,
    setTotalDays,
    setSubTotal,
    setFinalTotal, 
} from "../redux/bookings/booking-reducer";

//import components from Stripe
import { useStripe, useElements, PaymentElement, AddressElement} from "@stripe/react-stripe-js";
import { StripeAddressElementOptions,} from "@stripe/stripe-js"; // typescript type for Address Element
import { Layout, LayoutObject } from "@stripe/stripe-js";

//import components
import { MoonLoader } from "react-spinners";

import { useCreateBookingMutation } from "../api/api-slice";

// ** typescript types **
import { BookingDetails } from "./SummaryViewer";

//define stripe typescript types for the PaymentElement component
type PaymentElementProps = {
    layout: Layout | LayoutObject | undefined;
    defaultValues: {
        billingDetails: {
            name: string;
            email: string;
        }
    }
};

//define typescript types for Payment Props
type PaymentFormProps = {
    firstName: string,
    lastName: string,
    email: string,
    id: string;
    bookingDetails?: BookingDetails;
};

export const PaymentForm = ({firstName, lastName, email, id, bookingDetails}: PaymentFormProps) => {
    console.log(id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [createBooking] = useCreateBookingMutation();

    const currentPlace = useSelector(selectPlace);
    const checkInDate = useSelector(selectCheckInDate);
    const checkOutDate = useSelector(selectCheckOutDate);
    const finalTotal = useSelector(selectFinalTotal);
    const totalDays = useSelector(selectTotalDays);
    const numberOfAdults = useSelector(selectNumberOfAdults);
    const numberOfChildren = useSelector(selectNumberOfChildren);
    const numberOfInfants = useSelector(selectNumberOfInfants);
    const numberOfPets = useSelector(selectNumberOfPets);

    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<null | string | undefined>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [addressData, setAddressData] = useState({
    //     name: "",
    //     address: {
    //       line1: "",
    //       line2: null,
    //       city: "",
    //       state: "",
    //       country: 'US',
    //       postal_code: ""
    //     }
    //   });
    
    //address options object to feed into the options prop of the AddressElement
    const addressElementOptions: StripeAddressElementOptions = {
        mode: "billing",
        autocomplete: {
            mode: "disabled"
        },
        defaultValues: {
            name: `${firstName} ${lastName}`
        },
        fields: {
            phone: "always",
        }
    };

    //payment options to feed into the options prop of the PaymentElement
    const paymentElementOptions: PaymentElementProps = {
        layout: "accordion",
        defaultValues: {
            billingDetails: {
                name: `${firstName} ${lastName}`,
                email: email,
            },
        }

    };

    const clearFields = async () => {
        dispatch(setNumberOfAdults(1));
        dispatch(setNumberOfChildren(0));
        dispatch(setNumberOfInfants(0));
        dispatch(setNumberOfPets(0));
        dispatch(setCheckInDate(""));
        dispatch(setCheckOutDate(""));
        dispatch(setSubTotal(0));
        dispatch(setFinalTotal(0));
        dispatch(setTotalDays(0));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if(!stripe || !elements){
            return;
        };

        setIsLoading(true);

        try {
            //get values from user inputs in the AddressElement
            const addressElement = elements.getElement(AddressElement);

            if (!addressElement) {
                setErrorMessage("Address element is not available.");
                setIsLoading(false);
                return;
            }
        
            const addressData = await addressElement.getValue();
        
            if (!addressData.complete) {
                setErrorMessage("Please complete all required address fields.");
                setIsLoading(false);
                return;
            }

            const {name, address, phone} =  addressData.value;

            const billingDetails = {
                name,
                address,
            };
            
            // payment submission
            const response = await stripe.confirmPayment({
                elements,
                // confirmParams: {
                //     return_url: "http://localhost:5173/account/bookings"
                // }
                redirect: "if_required",
            });

            console.log(response);

            if(response.error){
                if(response.error.type === "card_error" || response.error.type === "validation_error") {
                    setErrorMessage(response.error.message);
                } else {
                    setErrorMessage("An unexpected error occurred.")
                }
            } else if (response.paymentIntent && response.paymentIntent.status === "succeeded"){
                //payment was successful, send data to backend to create a booking to save to the database
                console.log("Payment successful!", response.paymentIntent);

                const bookingResponse = await createBooking({
                    place: currentPlace,
                    customerName: `${firstName} ${lastName}`,
                    customerId: id,
                    email,
                    phoneNumber: phone,
                    billingDetails,
                    checkInDate,
                    checkOutDate,
                    finalTotal,
                    numberOfNights: totalDays,
                    numberOfAdults,
                    numberOfChildren,
                    numberOfInfants,
                    numberOfPets,
                    paymentIntentId: response.paymentIntent.id,
                }).unwrap();

                if(bookingResponse){
                    console.log(bookingResponse);
                    await clearFields();
                    navigate("/account/bookings");
                } else {
                    console.error(bookingResponse.error)
                }
            } else {
                console.error("Something went wrong")
            }
        } catch(error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <div className="mb-4">
                <h1 className="my-4 font-bold tracking-wide text-2xl">Billing Details</h1>
                <AddressElement options={addressElementOptions}></AddressElement>
            </div>

            <div>
                <h1 className="my-4 font-bold tracking-wide text-2xl">Choose how to pay</h1>
                <PaymentElement options={paymentElementOptions} />
            </div>


            <button 
                disabled={isLoading || !stripe || !elements} id="submit"
                className="bg-primary text-white font-sans font-semibold text-base rounded-md border-0 px-4 py-3 cursor-pointer block transition-all duration-200 ease-in-out shadow-md shadow-black/10 w-full hover:contrast-115 disabled:opacity-50 disabled:cursor-default flex items-center justify-center"
                >
                <span id="button-text">
                    {
                        isLoading 
                        ? <MoonLoader size={10}></MoonLoader>
                        : bookingDetails ? "Save Changes" 
                        : "Pay now"
                    }
                </span>
            </button>
            {/* Show any error or success messages */}
            {errorMessage && <div id="payment-message">{errorMessage}</div>}

        </form>
    );
};