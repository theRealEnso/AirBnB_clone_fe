import { useDispatch, useSelector } from "react-redux";

//import redux selectors;
import { selectNumberOfAdults, selectNumberOfChildren, selectNumberOfInfants, selectNumberOfPets, } from "../redux/bookings/booking-selector";

//import redux actions;
import { setNumberOfAdults, setNumberOfChildren, setNumberOfInfants, setNumberOfPets, } from "../redux/bookings/booking-reducer";

type GuestsMenuProps = {
    maxGuests: string | number;
    setDisplayGuestsMenu: React.Dispatch<React.SetStateAction<boolean>>;
    guestsMenuRef?: React.RefObject<HTMLDivElement | null>;
    setShowServiceAnimal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GuestsMenu = ({
    maxGuests,
    setDisplayGuestsMenu,
    guestsMenuRef,
    setShowServiceAnimal,
}: GuestsMenuProps) => {
        const dispatch = useDispatch();
        const numberOfAdults = useSelector(selectNumberOfAdults);
        const numberOfChildren = useSelector(selectNumberOfChildren);
        const numberOfInfants = useSelector(selectNumberOfInfants);
        const numberOfPets = useSelector(selectNumberOfPets);

        const incrementAdults = () => {
            dispatch(setNumberOfAdults(numberOfAdults + 1));
        };

        const decrementAdults = () => {
            if(numberOfAdults > 0){
                dispatch(setNumberOfAdults(numberOfAdults - 1));
            }
        };
        const incrementChildren = () => {
            dispatch(setNumberOfChildren(numberOfChildren + 1));
        };

        const decrementChildren = () => {
            if(numberOfChildren > 0){
                dispatch(setNumberOfChildren(numberOfChildren - 1));
            }
        };
        const incrementInfants = () => {
            dispatch(setNumberOfInfants(numberOfInfants + 1));
        };

        const decrementInfants = () => {
            if(numberOfInfants > 0){
                dispatch(setNumberOfInfants(numberOfInfants - 1));
            }
        };
        const incrementPets = () => {
            dispatch(setNumberOfPets(numberOfPets + 1));
        };

        const decrementPets = () => {
            if(numberOfPets > 0){
                dispatch(setNumberOfPets(numberOfPets - 1));
            }
        };

        const closeGuestsMenu = () => {
            setDisplayGuestsMenu(false);
        };

        const buttonStyles = `flex items-center justify-center border rounded-full w-7 h-7 text-lg text-center`;
        const activeButtonStyles = `text-gray-500 border-gray-500 hover:text-black hover:border-black cursor-pointer`;
        const disabledButtonStyles = `text-gray-200 border-gray-200 cursor-not-allowed`;

        // console.log(numberOfAdults);

    return (
        <div className={`bg-white w-full p-4 rounded-lg shadow-md space-y-4`} ref={guestsMenuRef}>
            {/* adults */}
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <span className="font-medium">Adults</span>
                    <span className="font-light">Age 13+</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <button 
                        className={`${buttonStyles} ${numberOfAdults === 1 ? `${disabledButtonStyles}` : `${activeButtonStyles}`}`} 
                        disabled={numberOfAdults === 1} 
                        onClick={decrementAdults}>
                            -
                    </button>
                    <span className="text-lg h-12 w-12 flex items-center justify-center">{numberOfAdults}</span>
                    <button 
                        className={`${buttonStyles} ${numberOfAdults + numberOfChildren === Number(maxGuests) ? `${disabledButtonStyles}` : `${activeButtonStyles}`}`} 
                        disabled={numberOfAdults + numberOfChildren === Number(maxGuests) ? true : false}
                        onClick={incrementAdults}>
                        +
                    </button>
                </div>
            </div>

            {/* children */}
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <span className="font-medium">Children</span>
                    <span className="font-light">Ages 2-12</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <button 
                        className={`${buttonStyles} ${numberOfChildren === 0 ? `${disabledButtonStyles}`: `${activeButtonStyles}`}`} 
                        disabled={numberOfChildren === 0} 
                        onClick={decrementChildren}
                        >-
                    </button>
                    <span className="text-lg h-12 w-12 flex items-center justify-center">{numberOfChildren}</span>
                    <button 
                        className={`${buttonStyles} ${numberOfAdults + numberOfChildren === Number(maxGuests) ? `${disabledButtonStyles}` : `${activeButtonStyles}`}`} 
                        onClick={incrementChildren} 
                        disabled={numberOfAdults + numberOfChildren === Number(maxGuests)}
                        >+
                    </button>
                </div>
            </div>

            {/* infants */}
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <span className="font-medium">Infants</span>
                    <span className="font-light">Under 2</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <button className={`${buttonStyles} ${numberOfInfants === 0 ? `${disabledButtonStyles}` : `${activeButtonStyles}`}`} onClickCapture={decrementInfants}>-</button>
                    <span className="text-lg h-12 w-12 flex items-center justify-center">{numberOfInfants}</span>
                    <button className={`${buttonStyles} ${numberOfInfants >= 0 ? `${activeButtonStyles}` : `${disabledButtonStyles}`}`} onClick={incrementInfants}>+</button>
                </div>
            </div>

            {/* pets */}
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <span className="font-medium">Pets</span>
                    <span className="text-sm font-extrabold underline cursor-pointer" onClick={() => setShowServiceAnimal(true)}>Bringing a service animal?</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <button 
                        className={`${buttonStyles} ${numberOfPets === 0 ? `${disabledButtonStyles}`: `${activeButtonStyles}`}`} 
                        onClick={decrementPets}
                        disabled={numberOfPets === 0}
                        >-
                    </button>
                    <span className="text-lg h-12 w-12 flex items-center justify-center">{numberOfPets}</span>
                    <button 
                        className={`${buttonStyles} ${numberOfPets >= 0 ? `${activeButtonStyles}` : `${disabledButtonStyles}`}`} 
                        onClick={incrementPets}
                        >
                            +
                    </button>
                </div>
            </div>

            <p>This place has a maximum of {maxGuests} guests, not including infants. If you're bringing more than 2 pets, please let your host know. </p>

            <div className="flex justify-end cursor-pointer" onClick={closeGuestsMenu}>
                <p className="underline font-bold">Close</p>
            </div>
        </div>
    );
};
