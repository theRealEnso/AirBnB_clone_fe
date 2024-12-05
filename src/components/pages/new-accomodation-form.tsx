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

                <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
                    {
                        photos && photos.length > 0 && <PhotosPreview photosToDisplay={photos}></PhotosPreview>
                    }

                    <input type="file" hidden accept="image/jpeg image/webp image/png" multiple name="place-photo" ref={uploadImageButtonRef} onChange={handleImageSelectionAndUpload}></input>
                    <button  onClick={toggleImageSelector} className="flex justify-center items-center border bg-transparent rounded-2xl p-2 text-md text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                            <path d="M9.97.97a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 0 1-1.06-1.06l3-3ZM9.75 6.75v6a.75.75 0 0 0 1.5 0v-6h3a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3h3Z" />
                            <path d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h7.5a3 3 0 0 0 3-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 0 1-4.5 4.5H7.151Z" />
                        </svg>

                        Upload from your device

                    </button>
                </div>
            </div>

            <div>
                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-500 text-sm">{`description of the place`}</p>
                <textarea className="w-full h-[100px] outline-none border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-teal-500"></textarea>
            </div>

            <div>
                <h2 className="text-2xl mt-4">Perks</h2>
                <p className="text-gray-500 text-sm">{`select all the perks of your place`}</p>
                <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" className="cursor-pointer"></input>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.062 0 8.25 8.25 0 0 0-11.667 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.204 3.182a6 6 0 0 1 8.486 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0 3.75 3.75 0 0 0-5.304 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182a1.5 1.5 0 0 1 2.122 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0l-.53-.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                        <span>Wifi</span>
                    </label>

                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" className="cursor-pointer"></input>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
                            <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
                            <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                        </svg>
                        <span>Free parking spot</span>
                    </label>

                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" className="cursor-pointer"></input>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M19.5 6h-15v9h15V6Z" />
                            <path fillRule="evenodd" d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 0 0 6 21h12a.75.75 0 0 0 0-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375Zm0 13.5h17.25a.375.375 0 0 0 .375-.375V4.875a.375.375 0 0 0-.375-.375H3.375A.375.375 0 0 0 3 4.875v11.25c0 .207.168.375.375.375Z" clipRule="evenodd" />
                        </svg>

                        <span>TV</span>
                    </label>

                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" className="cursor-pointer"></input>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z" clipRule="evenodd" />
                        </svg>
                        <span>Pets</span>
                    </label>

                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" className="cursor-pointer"></input>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                        <span>Private entrance</span>
                    </label>

                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" className="cursor-pointer"></input>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                        </svg>

                        <span>Exterior security cameras</span>
                    </label>

                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" className="cursor-pointer"></input>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z" clipRule="evenodd" />
                        </svg>
                        <span>Gaming consoles</span>
                    </label>

                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" className="cursor-pointer"></input>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                        </svg>

                        <span>Extended stays allowed</span>
                    </label>
                </div>
            </div>

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
