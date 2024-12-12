import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";

//import redux action
import { setPlace } from "../redux/places/places-reducer";

//import components
import Navbar from "./navigation-bar/Navbar";

//import query function from api to get details about a specific place
import { useGetPlaceDetailsQuery } from "../api/api-slice";

export const PlaceDetails = () => {
    const dispatch = useDispatch();
    const {placeId} = useParams();
    console.log(placeId);

    const {data: placeDetails, isSuccess, isError, error} = useGetPlaceDetailsQuery(placeId);

    console.log(placeDetails);
    
    if(isSuccess || placeDetails){
        dispatch(setPlace(placeDetails));
    }
  return (
    <div className="min-h-screen">
        <div className="mx-56">
            <Navbar></Navbar>
        </div>
        <div className="mx-64 flex flex-col">
            <div>
                <h1 className="font-bold tracking-wide text-2xl">{placeDetails.title}</h1>
            </div>

            <div className="flex gap-2 shrink-0">
                <div className="">
                    <img src={`http://localhost:5000/photo-uploads/${placeDetails.photos[0].photo}`}></img> 
                </div>
                <div className="grid grid-cols-2">
                    {
                        placeDetails.photos.slice(1).map((photo) => {
                            return <img src={`http://localhost:5000/photo-uploads/${photo.photo}`} className="w-[500px] h-32"></img>
                        })
                    }
                </div>
            </div>
        </div>
    </div>

  );
};
