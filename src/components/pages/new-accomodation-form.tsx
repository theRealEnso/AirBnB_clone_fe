import { useState, useRef, ChangeEvent,} from 'react';
import { useSelector, useDispatch } from 'react-redux';

//import redux selector
import { selectPlacePhotos } from '../../redux/places/places-selector';

//import redux action
import { addPhotos } from '../../redux/places/places-reducer';

//import function to upload photo using link to our back end api endpoint
import { useUploadPhotoFromLinkMutation, useUploadPhotoFromDeviceMutation } from '../../api/api-slice';

//import components
import { PhotosPreview } from '../photos-preview';
import { PerksComponent } from '../perks-component';
import { RingLoader } from 'react-spinners';

//import utility function
import { getErrorMessage } from '../../utils';

export const NewAccomodationForm = () => {

    const dispatch = useDispatch();
    const photos = useSelector(selectPlacePhotos);

    const uploadImageButtonRef = useRef<HTMLInputElement | null>(null);

    const [photoUrl, setPhotoUrl] = useState<string>("");

    const [uploadPhotoFromLink, {isLoading: isLoadingFromLink, isSuccess: isSuccessFromLink, isError: isErrorFromLink, error: errorFromLink}] = useUploadPhotoFromLinkMutation();
    const [uploadPhotoFromDevice, {isLoading: isLoadingFromDevice, isSuccess: isSuccessFromDevice, isError: isErrorFromDevice, error: errorFromDevice}] = useUploadPhotoFromDeviceMutation();

    const [fileError, setFileError] = useState<string>("");

    const uploadPhotoByLink = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        try {
            await uploadPhotoFromLink({link: photoUrl});
            setPhotoUrl("");
        } catch(error) {
            console.error(error)
        }
    };

    const toggleImageSelector = (event: ChangeEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if(uploadImageButtonRef.current){
            uploadImageButtonRef.current.click();
        }
    };

    const handleImageSelectionAndUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const filesObject = event.target.files;
        // console.log(filesObject);
        // console.log(filesObject.length);

        if(filesObject && filesObject.length > 0){
            let files = Array.from(filesObject);
            // console.log(files);

            const formData = new FormData();

            for (const photo of files){
                if(photo.type !== "image/webp" && photo.type !== "image/png" && photo.type && photo.type !== "image/jpeg"){
                    files = files.filter((item) => item.name !== photo.name);
                    setFileError("Only jpg, png, and webp files are supported");
                } else if (photo.size > 1024 * 1024 * 5){
                    files = files.filter((item) => item.name !== photo.name);
                    setFileError("File size cannot exceed 5 MB");
                } else {
                    formData.append("photos", photo)
                }
            }

            if(!fileError || fileError.length === 0){
                try {
                    await uploadPhotoFromDevice(formData);
                } catch(error){
                    console.error(error)
                }
            }
        }
    };

    // console.log(photoUrl);
    console.log(photos);
  return (
    <div>
        <form className="flex flex-col space-y-2" encType="multipart/form-data">
            <div>
                <h2 className="text-2xl mt-4">Title</h2>
                <p className="text-gray-500 text-sm">{`add a cute and catchy title for your place! :)`}</p>
                <input className="w-full rounded-lg border p-2" type="text" placeholder="title, ex: My lovely apartment!"></input>
            </div>

            <div>
                <h2 className="text-2xl mt-4">Address</h2>
                <p className="text-gray-500 text-sm">{`Address to this place`}</p>
                <input className="w-full rounded-lg border p-2" type="text" placeholder="address"></input>
            </div>

            <div>
                <h2 className="text-2xl mt-4">Photos</h2>
                <p className="text-gray-500 text-sm">{`Add photos. More = better!`}</p>

                {isErrorFromLink && <span className="text-red-500">{getErrorMessage(errorFromLink)}</span>}

                {isSuccessFromLink && <span className="text-green-500">Image link uploaded successfully! </span>}

                <div className="flex gap-2">
                    <input className="w-full rounded-lg border p-2" type="text" placeholder="Add photos using a link . . . .jpg links only" name="photoUrl" value={photoUrl} onChange={(event) => setPhotoUrl(event.target.value)}></input>
                    <button className="bg-primary text-white rounded-2xl p-2 px-4" onClick={uploadPhotoByLink}>
                        {
                            isLoadingFromLink ? <RingLoader size={10} color="white"></RingLoader> : "Add Photo"
                        }
                    </button>
                </div>

                {
                    isSuccessFromDevice && <span className="text-green-500">Image successfully uploaded from device!</span>
                }

                <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
                    {
                        photos && photos.length > 0 && <PhotosPreview photosToDisplay={photos}></PhotosPreview>
                    }

                    <input type="file" hidden accept="image/jpeg image/webp image/png" multiple name="place-photo" ref={uploadImageButtonRef} onChange={handleImageSelectionAndUpload}></input>
                    <button  onClick={toggleImageSelector} className="flex justify-center items-center border bg-transparent rounded-2xl p-2 text-md text-gray-600">
                        {
                            isLoadingFromDevice 
                            ? <RingLoader size={10} color="green"></RingLoader>
                            : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                                    <path d="M9.97.97a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 0 1-1.06-1.06l3-3ZM9.75 6.75v6a.75.75 0 0 0 1.5 0v-6h3a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3h3Z" />
                                    <path d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h7.5a3 3 0 0 0 3-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 0 1-4.5 4.5H7.151Z" />
                                </svg>
                            )
                        }

                        Upload from your device

                    </button>
                    {
                        isErrorFromDevice && <span className="text-red-500">{getErrorMessage(errorFromDevice)}</span>
                    }
                </div>
            </div>

            <div>
                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-500 text-sm">{`description of the place`}</p>
                <textarea className="w-full h-[100px] outline-none border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-teal-500"></textarea>
            </div>

            {/* perks component */}
            <PerksComponent></PerksComponent>

            <div>
                <h2 className="text-2xl mt-4">Extra info</h2>
                <p className="text-gray-500 text-sm">{`house rules, etc`}</p>
                <textarea className="w-full h-[100px] outline-none border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-teal-500"></textarea>
            </div>

            <div>
                <h2 className="text-2xl mt-4">Check in / check out times, max guests</h2>
                <p className="text-gray-500 text-sm">{`add check in and out times. Remember to account for extra cleaning time in between guests `}</p>
                <div className="grid gap-2 sm:grid-cols-3">
                    <div className="space-y-2">
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input className="rounded-lg p-1 border" type="text" placeholder="14:00"></input>
                    </div>
                    <div className="space-y-2">
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input className="rounded-lg p-1 border" type="text"></input>
                    </div>
                    <div className="space-y-2">
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input className="rounded-lg p-1 border" type="text"></input>
                    </div>
                </div>
            </div>

            
            <button className="bg-primary text-white rounded-lg my-4 py-2">Save</button>
           

        </form>
    </div>
  );
};
