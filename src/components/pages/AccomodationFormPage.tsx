import { useState, useEffect, FormEvent, ChangeEvent} from 'react';
import { useSelector, useDispatch} from 'react-redux';

//import redux selector
import { selectPlacePhotos } from '../../redux/places/places-selector';
import { selectCurrentUser } from '../../redux/user/user-selectors';

//import redux action
import { clearPhotos, setUserPlaces, setPhotos, } from '../../redux/places/places-reducer';

import { useNavigate } from 'react-router-dom';

//import components
import { AccountNavigation } from '../AccountNavigation';
import { PhotosUploader } from '../PhotosUploader';
import { PerksComponent } from '../Perks';
import { RingLoader } from 'react-spinners';

import { useParams } from 'react-router-dom';

//import function to send form data to api endpoint that creates a new place
import { useCreateNewPlaceMutation, useGetPlaceDetailsQuery, useUpdatePlaceMutation } from '../../api/api-slice';

//import helper function
import { getErrorMessage } from '../../utils';

//import typescript types
import type { Place } from '../../redux/places/places-reducer';


export const AccomodationFormPage = () => {
    const {placeId} = useParams();
    // console.log(placeId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const photos = useSelector(selectPlacePhotos);
    const currentUser = useSelector(selectCurrentUser);
    const owner_id = currentUser && currentUser.id;
    
    //define all state variables used on the form
    const [owner, setOwner] = useState<string | null>(owner_id);
    const [price, setPrice] = useState<string | number>(100)
    const [title, setTitle] = useState<string>("");
    const [address, setAddress] = useState({
        street: "",
        postalCode: "",
        city: "",
        country: "",
    });
    const [placePhotos, setPlacePhotos] = useState([]);
    const [description, setDescription] = useState<string>("");
    const [perks, setPerks] = useState<string[]>([]);
    const [extraInfo, setExtraInfo] = useState<string>("");
    const [checkInTime, setCheckInTime] = useState<number | string>("12:00 PM");
    const [checkOutTime, setCheckOutTime] = useState<number | string>("2:00 PM");
    const [maxGuests, setMaxGuests] = useState<number | string>(5);

    const {data: placeData, refetch, isSuccess: getPlaceSuccess, isError: getPlaceError, error: placeError} = useGetPlaceDetailsQuery(placeId, {skip: !placeId}); //if placeId is undefined or doesn't exist the do not execute the query

    const [createNewPlace, {data: newPlaceData, isLoading, isSuccess, isError, error}] = useCreateNewPlaceMutation();

    const [updatePlace, {data: updatedPlaceData, isLoading: updatePlaceIsLoading, isSuccess: updatePlaceIsSuccess, isError: updatePlaceIsErorr, error: updatePlaceError,}] = useUpdatePlaceMutation();


    // console.log(placeData);

    const handleAddressInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setAddress({
            ...address,
            [name]: value,
        })
    }
    

    useEffect(() => {
        if(!placeId){
            return;
        }

        if(placeId && placeData){
            setOwner(placeData.owner);
            setPrice(placeData.price);
            setTitle(placeData.title);
            setAddress(placeData.address);
            setPlacePhotos(placeData.photos);
            setDescription(placeData.description);
            setPerks(placeData.perks);
            setExtraInfo(placeData.extraInfo);
            setCheckInTime(placeData.checkIn);
            setCheckOutTime(placeData.checkOut);
            setMaxGuests(placeData.maxGuests);

            dispatch(setPhotos(placePhotos));
        }

        if(!placeData){
            setOwner(owner);
            setPrice(0);
            setTitle("");
            setAddress("");
            setPlacePhotos([]);
            setDescription("");
            setPerks([]);
            setExtraInfo("");
            setCheckInTime("12:00 PM");
            setCheckOutTime("2:00 PM");
            setMaxGuests(5);
        }

    },[placeId, placeData, placePhotos, dispatch, owner]);

    if (getPlaceError) {
        return <p className="text-red-500">Error loading place details: {getErrorMessage(placeError)}</p>;
    }
    

    //function for final form submission
    const submitAccomodationForm = async (event: FormEvent) => {
        event.preventDefault();

        const data: Place = {
            owner,
            price,
            title,
            address,
            photos,
            description,
            perks,
            extraInfo,
            checkIn: checkInTime,
            checkOut: checkOutTime,
            maxGuests,
            _id: placeId,
        }

        try {
            if(placeId){
                await updatePlace(data).unwrap();
                refetch();
                dispatch(clearPhotos())
                navigate("/account/places");
            } else {
                await createNewPlace(data).unwrap();
                await dispatch(clearPhotos());
                // await dispatch(setUserPlaces(newPlaceData.place));
                navigate("/account/places");
            }

        } catch(error){
            console.log(error);
        }
    };

    // console.log(photoUrl);
    // console.log(photos);
    // console.log(title);
    // console.log(currentUser);
  return (
    <div className="mx-24">
        <AccountNavigation></AccountNavigation>
        {
            isError && <span className="text-red-500">{getErrorMessage(error)}</span>
        }
        <form className="flex flex-col space-y-2" encType="multipart/form-data" onSubmit={submitAccomodationForm}>
            <div className="flex flex-col justify-end w-[30%] ml-auto">
                <h2> $ / night</h2>
                <p className="text-gray-500 text-sm">set your price per night (USD)</p>
                <input 
                    type="text" 
                    className="w-full rounded-lg border p-2 outline-none border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-primary" placeholder="$100"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    >
                </input>
            </div>

            <div className="">
                <h2 className="text-2xl mt-4">Title</h2>
                <p className="text-gray-500 text-sm">{`add a cute and catchy title for your place! :)`}</p>
                <input className="w-full rounded-lg border p-2 outline-none border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-primary" type="text" placeholder="title, ex: My lovely apartment!" name="title" value={title} onChange={(event) => setTitle(event.target.value)}></input>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl mt-4">Address</h2>
                <p className="text-gray-500 text-sm">{`Address to this place`}</p>

                <div className="flex gap-2">
                    <input className="w-full rounded-lg border p-2 outline-none border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-primary" type="text" name="street" value={address.street} placeholder="Street Address" onChange={handleAddressInputChange}></input>
                    <input className="w-full rounded-lg border p-2 outline-none border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-primary" type="text" name="postalCode" value={address.postalCode} placeholder="Postal Code" onChange={handleAddressInputChange}></input>
                </div>

                <div className="flex gap-2">
                    <input className="w-full rounded-lg border p-2 outline-none border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-primary" type="text" name="city" value={address.city} placeholder="City" onChange={handleAddressInputChange}></input>
                    <input className="w-full rounded-lg border p-2 outline-none border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-primary" type="text" name="country" value={address.country} placeholder="Country" onChange={handleAddressInputChange}></input>
                </div>

            </div>

            {/* photos uploader component */}
            <PhotosUploader photos={photos}></PhotosUploader>

            <div>
                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-500 text-sm">{`description of the place`}</p>
                <textarea className="w-full h-[140px] outline-none border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-primary" name="description" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
            </div>

            {/* perks component */}
            <PerksComponent perks={perks} setPerks={setPerks}></PerksComponent>

            <div>
                <h2 className="text-2xl mt-4">Extra info</h2>
                <p className="text-gray-500 text-sm">{`house rules, etc`}</p>
                <textarea className="w-full h-[140px] outline-none rounded-lg p-2 border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-primary" name="extra-info" value={extraInfo} onChange={(event) => setExtraInfo(event.target.value)}></textarea>
            </div>

            <div>
                <h2 className="text-2xl mt-4">Check in / check out times, max guests</h2>
                <p className="text-gray-500 text-sm">{`add check in and out times. Remember to account for extra cleaning time in between guests `}</p>
                <div className="grid gap-2 sm:grid-cols-3">
                    <div className="space-y-2">
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input className="rounded-lg p-1 outline-none border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-primary" type="text" placeholder="14:00" name="check-in" value={checkInTime} onChange={(event) => setCheckInTime(event.target.value)}></input>
                    </div>
                    <div className="space-y-2">
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input className="rounded-lg p-1 outline-none border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-primary" type="text" name="check-out" value={checkOutTime} onChange={(event) => setCheckOutTime(event.target.value)}></input>
                    </div>
                    <div className="space-y-2">
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input className="rounded-lg p-1 outline-none border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-primary" type="text" name="max-guests" value={maxGuests} onChange={(event) => setMaxGuests(event.target.value)}></input>
                    </div>
                </div>
            </div>

            <button className="flex items-center justify-center bg-primary text-white rounded-lg my-4 py-2 w-[50%] mx-auto">
                {
                    isLoading ? <RingLoader size={10} color="white"></RingLoader> : "Save"
                }
            </button>
           
        </form>
    </div>
  );
};
