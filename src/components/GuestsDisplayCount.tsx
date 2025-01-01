import { MouseEvent } from "react"

type GuestsDisplayCountProps = {
    displayGuestsMenu?: boolean;
    toggleGuestMenu?: (event: MouseEvent<HTMLButtonElement>) => void;
    numberOfAdults: number;
    numberOfChildren: number;
    numberOfInfants: number;
    numberOfPets: number;
}

export const GuestsDisplayCount = ({ displayGuestsMenu, toggleGuestMenu, numberOfAdults, numberOfChildren, numberOfInfants, numberOfPets,}: GuestsDisplayCountProps) => {
  return (
    <>
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
    </>
  )
}
