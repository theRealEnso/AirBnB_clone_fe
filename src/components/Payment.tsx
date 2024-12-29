import { useState, FormEvent } from "react";

import { useStripe, useElements, PaymentElement, } from "@stripe/react-stripe-js";
import { Layout, LayoutObject } from "@stripe/stripe-js";

import { MoonLoader } from "react-spinners";

//define stripe typescript types for the PaymentElement component
type PaymentElementProps = {
    layout: Layout | LayoutObject | undefined;
}

export const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<null | string | undefined>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const paymentElementOptions: PaymentElementProps = {
        layout: "accordion"
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if(!stripe || !elements){
            return;
        };

        setIsLoading(true);

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:5173/account/bookings"
            }
        });

        if(error.type === "card_error" || error.type === "validation_error") {
            setErrorMessage(error.message);
        } else {
            setErrorMessage("An unexpected error occurred.")
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>

            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button 
                disabled={isLoading || !stripe || !elements} id="submit"
                className="bg-primary text-white font-sans font-semibold text-base rounded-md border-0 px-4 py-3 cursor-pointer block transition-all duration-200 ease-in-out shadow-md shadow-black/10 w-full hover:contrast-115 disabled:opacity-50 disabled:cursor-default"
                >
                <span id="button-text">
                    {isLoading ? <MoonLoader></MoonLoader> : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {errorMessage && <div id="payment-message">{errorMessage}</div>}

        </form>
    );
};