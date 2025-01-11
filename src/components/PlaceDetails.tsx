import { useEffect, useState, useRef} from "react";

import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

//import redux selector
import { selectPlace } from "../redux/places/places-selector";

//import components
import { PhotoViewer } from "./PhotoViewer";
import { BookingWidget } from "./BookingWidget";
import { ExtraInformation } from "./ExtraInformation";
import { ServiceAnimalNotice } from "./ServiceAnimalNotice";

import dayjs, { Dayjs } from "dayjs";

//import query function from api to get details about a specific place
import { useGetPlaceDetailsQuery, useGetReservedDatesQuery } from "../api/api-slice";

//import utility function
import { truncateString } from "../utils";

export type PhotoProps = {
    tempId: string;
    photo: string;
};

export const PlaceDetails = () => {
    const currentPlace = useSelector(selectPlace);
    const {placeId} = useParams();
    // console.log(placeId);


    const {data: placeDetails, isLoading,} = useGetPlaceDetailsQuery(placeId);
    // console.log(placeDetails);

    const {data: reservedDatesArray} = useGetReservedDatesQuery(placeId);
    console.log(reservedDatesArray);

    const [reservedDates, setReservedDates] = useState<Dayjs[]>([]);
    const [showPhotos, setShowPhotos] = useState<boolean>(false);
    const [showMore, setShowMore] = useState<boolean>(false);
    const [isSticky, setIsSticky] = useState(false);
    const [showServiceAnimal, setShowServiceAnimal] = useState<boolean>(false);

    const guestsMenuRef = useRef<HTMLDivElement | null>(null);
    const imagesRef = useRef<HTMLDivElement | null>(null);
    const bookingWidgetRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(reservedDatesArray){
            const formattedDatesArray = reservedDatesArray.map((date: Dayjs | null) => {
                return dayjs(date);
            });

            setReservedDates(formattedDatesArray);
        }

    }, [reservedDatesArray])

    //to handle sticky
    useEffect(() => {
        const handleScroll = () => {
            if (imagesRef.current && bookingWidgetRef.current) {
                const imagesTop = imagesRef.current.getBoundingClientRect().top;
                // When the images block is scrolled past, make the BookingWidget sticky
                // console.log('imagesTop:', imagesTop); // Debugging line
                setIsSticky(imagesTop <= -410);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // console.log(isSticky);
    return (
        <>
            {
                showPhotos ? <PhotoViewer currentPlace={currentPlace} setShowPhotos={setShowPhotos}></PhotoViewer> :
                placeDetails ? (
                    (() => {
                        const {title, address, description, photos, price, extraInfo, checkIn, checkOut, maxGuests} = placeDetails;

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
                                <div 
                                    className="grid gap-2 grid-cols-2 rounded-lg relative mb-8" 
                                    onClick={() => setShowPhotos(true)}
                                    ref={imagesRef}
                                    >
                                    {/* left image */}
                                    <div className="w-full h-full aspect-square cursor-pointer overflow-hidden">
                                        <img src={`http://localhost:5000/photo-uploads/${photos[0].photo}`} className="object-cover w-full h-full rounded-lg transition-all duration-500 ease-in-out hover:scale-110"></img> 
                                    </div>
        
                                    {/* right 2x2 grid */}
                                    <div className="grid grid-cols-2 gap-2">
                                        {
                                            photos.slice(1, 5).map((photo: PhotoProps) => {
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
        
                                <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-12 relative">
                                    <div className="">
                                    {/* description */}
                                        <div className="my-4">
                                            <h2 className="font-semibold text-2xl mb-2">Description</h2>
                                            <p style={{whiteSpace: 'pre-wrap'}}>{description}</p>
                                        </div>

                                        {/* check in and check out times */}
                                        <div>
                                            Check-in: {checkIn} <br />
                                            Check-out: {checkOut} <br />
                                            Max number of guests: {maxGuests}
                                        </div>
                                        {/* extra info / house rules, etc */}
                                        <div className="mt-4 border-y-2 relative">
                                            <h1 className="font-bold text-2xl my-4">Extra information</h1>
                                            <p style={{whiteSpace: 'pre-wrap'}}>{truncateString(extraInfo, 500)}</p>
                                            <div className="mt-4 flex items-center gap-2 cursor-pointer" onClick={() => setShowMore(true)}>
                                                <button className="font-bold tracking-wide underline">Show more</button>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                </svg>
                                            </div>
                                            
                                            {
                                                showMore && 
                                                    (
                                                        // top div creates the dark overlay
                                                        <div
                                                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"
                                                        onClick={() => setShowMore(false)}>
                                                            {/* inner div creates the modal / white area to display the full text */}
                                                            <div
                                                                className="bg-white p-8 rounded-lg max-w-4xl w-[90%] max-h-[80vh] overflow-y-auto transition-transform transform animate-slide-up"
                                                                onClick={(e) => e.stopPropagation()}>
                                                                <ExtraInformation extraInfo={extraInfo} setShowMore={setShowMore} />
                                                            </div>
                                                        </div>
                                                    )
                                            }
                                        </div>
                                    </div>

                                    {/* booking widget component */}
                                    {
                                        reservedDates && (
                                            <div className={`${isSticky ? "sticky z-10" : ""}`} ref={bookingWidgetRef}>
                                                <BookingWidget
                                                    price={price} 
                                                    maxGuests={maxGuests}
                                                    reservedDates={reservedDates}
                                                    guestsMenuRef={guestsMenuRef}
                                                    setShowServiceAnimal={setShowServiceAnimal}
                                                    >
                                                </BookingWidget>
                                            </div>
                                        )
                                    }


                                    {
                                        showServiceAnimal && 
                                            (
                                                // top div creates the dark overlay. 
                                                // inset-0 = top: 0; right: 0; bottom: 0; left: 0. This ensures the overlay stretches to cover the entire viewport
                                                // position fixed ensures the overlay remains fixed during scrolling
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
                        )
                    })()
                ) : (
                    <p>Loading...</p>
                )
            }
        </>
    )
};
