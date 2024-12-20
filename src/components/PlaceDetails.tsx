import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

//import redux action
import { setPlace } from "../redux/places/places-reducer";

//import redux selector
import { selectPlace } from "../redux/places/places-selector";

//import components
import { PhotoViewer } from "./PhotoViewer";

//import query function from api to get details about a specific place
import { useGetPlaceDetailsQuery } from "../api/api-slice";

export const PlaceDetails = () => {
    const dispatch = useDispatch();
    const {placeId} = useParams();
    console.log(placeId);

    const [showPhotos, setShowPhotos] = useState<boolean>(false);

    const currentPlace = useSelector(selectPlace);

    const {data: placeDetails, isLoading, isSuccess, isError, error} = useGetPlaceDetailsQuery(placeId);

    // console.log(placeDetails);

    useEffect(() => {
        if(isSuccess || placeDetails){
            dispatch(setPlace(placeDetails));
        }
    }, [dispatch, placeDetails, isSuccess])
    

    return (
        <>
            {
                showPhotos ? <PhotoViewer currentPlace={currentPlace} setShowPhotos={setShowPhotos}></PhotoViewer> :
                placeDetails ? (
                    <div className="mt-2 max-w-[1000px] mx-auto relative" onClick={() => setShowPhotos(true)}>
                        <div className="">
                            <h1 className="text-2xl">
                                {isLoading ? "Loading" : placeDetails.title}
                            </h1>
                            <a 
                                className="font-semibold underline block" 
                                target="_blank" 
                                href={`https://maps.google.com/?q=${placeDetails?.address}`}>
                                    {placeDetails.address}
                            </a>
                        </div>
        
        
                        {/* Display images */}
                        <div className="grid gap-2 grid-cols-2 rounded-lg">
                            {/* left image */}
                            <div className="w-full h-full aspect-square cursor-pointer opacity-95 hover:opacity-100">
                                <img src={`http://localhost:5000/photo-uploads/${placeDetails.photos[0].photo}`} className="object-cover w-full h-full rounded-lg"></img> 
                            </div>

                            {/* right 2x2 grid */}
                            <div className="grid grid-cols-2 gap-2">
                                {
                                    placeDetails.photos.slice(1, 5).map((photo) => {
                                        return (
                                            <div key={photo.photo} className="aspect-square">
                                                <img src={`http://localhost:5000/photo-uploads/${photo.photo}`} className="object-cover w-full h-full rounded-lg cursor-pointer overflow-hidden opacity-95 hover:opacity-100"></img>
                                            </div>
                                                
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className="absolute flex gap-2 bg-gray-100 rounded-lg p-2 cursor-pointer right-[20px] bottom-[20px]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
                            </svg>
                            <p>Show all photos</p>
                        </div>
                    </div>
                ) : <p>Loading...</p>
            }
        </>
    )
};
