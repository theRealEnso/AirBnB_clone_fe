import { useState, FormEvent} from 'react';
import { useSelector, useDispatch} from 'react-redux';

//import redux selector
import { selectPlacePhotos } from '../../redux/places/places-selector';
import { selectCurrentUser } from '../../redux/user/user-selectors';

//import redux action
import { clearPhotos } from '../../redux/places/places-reducer';

import { useNavigate } from 'react-router-dom';

//import components
import { PhotosUploader } from '../PhotosUploader';
import { PerksComponent } from '../Perks';
import { RingLoader } from 'react-spinners';

//import function to send form data to api endpoint that creates a new place
import { useCreateNewPlaceMutation } from '../../api/api-slice';

//import helper function
import { getErrorMessage } from '../../utils';

export const NewAccomodationForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const photos = useSelector(selectPlacePhotos);
    const currentUser = useSelector(selectCurrentUser);
    const owner_id = currentUser.id;
    
    //define all state variables used on the form
    const [title, setTitle] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [perks, setPerks] = useState<string[]>([]);
    const [extraInfo, setExtraInfo] = useState<string>("");
    const [checkInTime, setCheckInTime] = useState<number | string>(0);
    const [checkOutTime, setCheckOutTime] = useState<number | string>(0);
    const [maxGuests, setMaxGuests] = useState<number | string>(0);

    const [createNewPlace, {isLoading, isSuccess, isError, error}] = useCreateNewPlaceMutation();

    //function for final form submission
    const submitAccomodationForm = async (event: FormEvent) => {
        event.preventDefault();

        const data = {
            owner: owner_id,
            title,
            address,
            photos,
            description,
            perks,
            extraInfo,
            checkIn: checkInTime,
            checkOut: checkOutTime,
            maxGuests
        }

        try {
            const result = await createNewPlace(data);
            console.log(result);
            await dispatch(clearPhotos());

            if(isSuccess || result.data.place){
                navigate("/account/places");
            }
        } catch(error){
            console.log(error);
        }
    };

    // console.log(photoUrl);
    // console.log(photos);
    // console.log(title);
    console.log(currentUser);
  return (
    <div>
        {
            isError && <span className="text-red-500">{getErrorMessage(error)}</span>
        }
        <form className="flex flex-col space-y-2" encType="multipart/form-data" onSubmit={submitAccomodationForm}>
            <div>
                <h2 className="text-2xl mt-4">Title</h2>
                <p className="text-gray-500 text-sm">{`add a cute and catchy title for your place! :)`}</p>
                <input className="w-full rounded-lg border p-2" type="text" placeholder="title, ex: My lovely apartment!" name="title" value={title} onChange={(event) => setTitle(event.target.value)}></input>
            </div>

            <div>
                <h2 className="text-2xl mt-4">Address</h2>
                <p className="text-gray-500 text-sm">{`Address to this place`}</p>
                <input className="w-full rounded-lg border p-2" type="text" name="address" value={address} placeholder="address" onChange={(event) => setAddress(event.target.value)}></input>
            </div>

            {/* photos uploader component */}
            <PhotosUploader photos={photos}></PhotosUploader>

            <div>
                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-500 text-sm">{`description of the place`}</p>
                <textarea className="w-full h-[100px] outline-none border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-teal-500" name="description" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
            </div>

            {/* perks component */}
            <PerksComponent perks={perks} setPerks={setPerks}></PerksComponent>

            <div>
                <h2 className="text-2xl mt-4">Extra info</h2>
                <p className="text-gray-500 text-sm">{`house rules, etc`}</p>
                <textarea className="w-full h-[100px] outline-none border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-teal-500" name="extra-info" value={extraInfo} onChange={(event) => setExtraInfo(event.target.value)}></textarea>
            </div>

            <div>
                <h2 className="text-2xl mt-4">Check in / check out times, max guests</h2>
                <p className="text-gray-500 text-sm">{`add check in and out times. Remember to account for extra cleaning time in between guests `}</p>
                <div className="grid gap-2 sm:grid-cols-3">
                    <div className="space-y-2">
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input className="rounded-lg p-1 border" type="text" placeholder="14:00" name="check-in" value={checkInTime} onChange={(event) => setCheckInTime(event.target.value)}></input>
                    </div>
                    <div className="space-y-2">
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input className="rounded-lg p-1 border" type="text" name="check-out" value={checkOutTime} onChange={(event) => setCheckOutTime(event.target.value)}></input>
                    </div>
                    <div className="space-y-2">
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input className="rounded-lg p-1 border" type="text" name="max-guests" value={maxGuests} onChange={(event) => setMaxGuests(event.target.value)}></input>
                    </div>
                </div>
            </div>

            <button className="bg-primary text-white rounded-lg my-4 py-2">
                {
                    isLoading ? <RingLoader size={10} color="white"></RingLoader> : "Save"
                }
            </button>
           
        </form>
    </div>
  );
};
