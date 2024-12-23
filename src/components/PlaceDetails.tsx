import { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

//import redux action
import { setPlace } from "../redux/places/places-reducer";

//import redux selector
import { selectPlace } from "../redux/places/places-selector";

//import components
import { PhotoViewer } from "./PhotoViewer";
import { GuestsMenu } from "./GuestsMenu";

//import material UI components
import BasicDatePicker from "./BasicDatePicker";


//import query function from api to get details about a specific place
import { useGetPlaceDetailsQuery } from "../api/api-slice";

export const PlaceDetails = () => {
    const dispatch = useDispatch();
    const {placeId} = useParams();
    console.log(placeId);

    const [showPhotos, setShowPhotos] = useState<boolean>(false);
    const [displayGuestsMenu, setDisplayGuestsMenu] = useState<boolean>(false);
    const [numberOfAdults, setNumberOfAdults] = useState<number>(1);
    const [numberOfChildren, setNumberOfChildren] = useState<number>(0);
    const [numberOfInfants, setNumberOfInfants] = useState<number>(0);
    const [numberOfPets, setNumberOfPets] = useState<number>(0);

    const currentPlace = useSelector(selectPlace);

    const {data: placeDetails, isLoading, isSuccess, isError, error} = useGetPlaceDetailsQuery(placeId);

    // console.log(placeDetails);

    const guestsMenuRef = useRef<HTMLDivElement | null>(null);

    const toggleGuestMenu = (event) => {
        event.stopPropagation();
        setDisplayGuestsMenu(!displayGuestsMenu);
    }

    useEffect(() => {
        if(isSuccess || placeDetails){
            dispatch(setPlace(placeDetails));
        }
    }, [dispatch, placeDetails, isSuccess]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if(guestsMenuRef.current && !guestsMenuRef.current.contains(event.target)){
                setDisplayGuestsMenu(false);
            }
        }
        document.body.addEventListener("click", handleOutsideClick);

        return () => document.body.removeEventListener("click", handleOutsideClick);

    },[setDisplayGuestsMenu]);
    

    return (
        <>
            {
                showPhotos ? <PhotoViewer currentPlace={currentPlace} setShowPhotos={setShowPhotos}></PhotoViewer> :
                placeDetails ? (
                    (() => {
                        const {title, address, description, photos, price, checkIn, checkOut, maxGuests} = placeDetails;

                        return (
                            <div className="mt-2 max-w-[1000px] mx-auto min-h-screen">
                                <div className="mb-2">
                                    <h1 className="text-2xl">
                                        {isLoading ? "Loading" : title}
                                    </h1>
                                    
                                    <div className="flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
        
                                        <a 
                                            className="font-semibold underline block" 
                                            target="_blank" 
                                            href={`https://maps.google.com/?q=${address.city}`}>
                                                {`${address.city}, ${address.country}`}
                                        </a>
                                    </div>
                                </div>
                
                
                                {/* Display images */}
                                <div className="grid gap-2 grid-cols-2 rounded-lg overflow-hidden relative" onClick={() => setShowPhotos(true)}>
                                    {/* left image */}
                                    <div className="w-full h-full aspect-square cursor-pointer overflow-hidden">
                                        <img src={`http://localhost:5000/photo-uploads/${photos[0].photo}`} className="object-cover w-full h-full rounded-lg transition-all duration-500 ease-in-out hover:scale-110"></img> 
                                    </div>
        
                                    {/* right 2x2 grid */}
                                    <div className="grid grid-cols-2 gap-2 overflow-hidden">
                                        {
                                            photos.slice(1, 5).map((photo) => {
                                                return (
                                                    <div key={photo.photo} className="aspect-square overflow-hidden cursor-pointer">
                                                        <img src={`http://localhost:5000/photo-uploads/${photo.photo}`} className="object-cover w-full h-full rounded-lg transition-all duration-500 ease-in-out hover:scale-110"></img>
                                                    </div>
                                                        
                                                )
                                            })
                                        }
                                    </div>
        
                                    <button className="absolute flex gap-2 bg-gray-100 rounded-lg p-2 cursor-pointer right-[20px] bottom-[20px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
                                        </svg>
                                        <p>Show all photos</p>
                                    </button>
                                </div>
        
                                {/* description */}
                                <div className="my-4">
                                    <h2 className="font-semibold text-2xl">Description</h2>
                                    {description}
                                </div>
        
                                {/*check in and out  */}
                                <div className="grid grid-cols-2">
                                        <div>
                                            Check-in: {checkIn} <br />
                                            Check-out: {checkOut} <br />
                                            Max number of guests: {maxGuests}
                                        </div>
                                        <div className="bg-white shadow-md p-4 rounded-2xl flex flex-col">
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
        
                                            <button className="bg-primary rounded-lg text-white p-2">Book place</button>
                                        </div>
                                </div>
                            </div>
                        )
                    })()
                ) : (
                    <p>Loading...</p>
                )
            }
        </>
    )
};
