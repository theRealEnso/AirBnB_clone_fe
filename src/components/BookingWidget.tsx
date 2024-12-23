import { MouseEvent } from 'react';

// import components
import { GuestsMenu } from './GuestsMenu';

//material UI component
import BasicDatePicker from './BasicDatePicker';

export type BookingWidgetProps = {
    price: number;
    displayGuestsMenu: boolean;
    setDisplayGuestsMenu: React.Dispatch<React.SetStateAction<boolean>>
    numberOfAdults: number;
    setNumberOfAdults: React.Dispatch<React.SetStateAction<number>>
    numberOfChildren: number;
    setNumberOfChildren: React.Dispatch<React.SetStateAction<number>>
    numberOfInfants: number;
    setNumberOfInfants: React.Dispatch<React.SetStateAction<number>>
    numberOfPets: number;
    setNumberOfPets: React.Dispatch<React.SetStateAction<number>>
    maxGuests: string | number;
    guestsMenuRef: React.RefObject<HTMLDivElement | null>
}

export const BookingWidget = ({
    price,
    displayGuestsMenu,
    setDisplayGuestsMenu,
    numberOfAdults,
    setNumberOfAdults,
    numberOfChildren,
    setNumberOfChildren,
    numberOfInfants,
    setNumberOfInfants,
    numberOfPets,
    setNumberOfPets,
    maxGuests,
    guestsMenuRef,
} : BookingWidgetProps) => {

    const toggleGuestMenu = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setDisplayGuestsMenu(!displayGuestsMenu);
    }
  return (
    <div className="bg-white shadow-md p-4 rounded-2xl flex flex-col max-h-[300px]">
        <div className="text-center mb-2">
            Price: ${price} / night
        </div>

        <div className="flex flex-col mb-2">
            <div className="flex">
                <div>
                    <BasicDatePicker label="Check in"></BasicDatePicker>
                </div>
                <div>
                    <BasicDatePicker label="Check out"></BasicDatePicker>
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
                            numberOfAdults={numberOfAdults}
                            setNumberOfAdults={setNumberOfAdults} 
                            numberOfChildren={numberOfChildren}
                            setNumberOfChildren={setNumberOfChildren}
                            numberOfInfants={numberOfInfants}
                            setNumberOfInfants={setNumberOfInfants}  
                            numberOfPets={numberOfPets}
                            setNumberOfPets={setNumberOfPets}
                            maxGuests={maxGuests}
                            setDisplayGuestsMenu={setDisplayGuestsMenu}
                            guestsMenuRef={guestsMenuRef}
                            > 
                        </GuestsMenu>
                    )
                }
            </div>
        </div>

        <button className="bg-primary rounded-lg text-white p-2 mt-2">Book place</button>

        <div className="text-center mt-4">You won't be charged yet</div>
    </div>
  );
};
