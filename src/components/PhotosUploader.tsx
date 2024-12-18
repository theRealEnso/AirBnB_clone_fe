import { useState, useRef, ChangeEvent, MouseEvent } from "react";
import { useDispatch } from "react-redux";

//import redux actions
import { addPhotoFromLink, addPhotosFromDevice } from "../redux/places/places-reducer";

//import components
import { PhotosPreview } from "./PhotosPreview";
import { RingLoader } from "react-spinners";

//import function to upload photo from user device to our backend api endpoint
import { useUploadPhotoFromLinkMutation ,useUploadPhotoFromDeviceMutation } from "../api/api-slice";

//import helper functions
import { getErrorMessage } from "../utils";

export type PhotoObject = {
    tempId: string;
    photo: string;
    message: string;
};

export type PhotosProps = {
    photos: PhotoObject[];
}

export const PhotosUploader = ({photos} : PhotosProps) => {
    // console.log(photos);
    const dispatch = useDispatch();
    const uploadImageButtonRef = useRef<HTMLInputElement | null>(null);

    const [fileError, setFileError] = useState<string>("");
    const [photoUrl, setPhotoUrl] = useState<string>("");

    const [uploadPhotoFromLink, {isLoading: isLoadingFromLink, isSuccess: isSuccessFromLink, isError: isErrorFromLink, error: errorFromLink}] = useUploadPhotoFromLinkMutation();
    const [uploadPhotoFromDevice, {isLoading: isLoadingFromDevice, isSuccess: isSuccessFromDevice, isError: isErrorFromDevice, error: errorFromDevice}] = useUploadPhotoFromDeviceMutation();

    //function to upload photo using a link or url
    const uploadPhotoByLink = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            const result = await uploadPhotoFromLink({link: photoUrl}).unwrap();
            // console.log(result);
            await dispatch(addPhotoFromLink(result));

            setPhotoUrl("");
        } catch(error) {
            console.error(error)
        }
    };

    // function to trigger file/photo selection screen
    const toggleImageSelector = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if(uploadImageButtonRef.current){
            uploadImageButtonRef.current.click();
        }
    };

    //function to handle user selected images from device and upload to server
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
                    const result = await uploadPhotoFromDevice(formData).unwrap();
                    console.log(result);
                    await dispatch(addPhotosFromDevice(result));
                } catch(error){
                    console.error(error)
                }
            }
        }
    };
  return (
    <div>
        <h2 className="text-2xl mt-4">Photos</h2>
        <p className="text-gray-500 text-sm">{`Add photos. More = better!`}</p>

        {isErrorFromLink && <span className="text-red-500">{getErrorMessage(errorFromLink)}</span>}

        {isSuccessFromLink && <span className="text-green-500">Image link uploaded successfully! </span>}

        <div className="flex gap-2">
            <input className="w-full rounded-lg p-2 outline-none border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-primary" type="text" placeholder="Add photos using a link . . . .jpg, png, and webp links only" name="photoUrl" value={photoUrl} onChange={(event) => setPhotoUrl(event.target.value)}></input>
            <button className="bg-primary text-white rounded-2xl p-2 px-4" onClick={uploadPhotoByLink}>
                {
                    isLoadingFromLink ? <RingLoader size={10} color="white"></RingLoader> : "Add Photo"
                }
            </button>
        </div>

        {
            isSuccessFromDevice && <span className="text-green-500">Image successfully uploaded from device!</span>
        }

        <div className="mt-2">
            {
                photos && photos.length > 0 && <PhotosPreview photos={photos}></PhotosPreview>
            }

            <input type="file" hidden accept="image/jpeg image/webp image/png" multiple name="place-photo" ref={uploadImageButtonRef} onChange={handleImageSelectionAndUpload}></input>
            <button onClick={toggleImageSelector} className="flex justify-center items-center border bg-transparent rounded-2xl p-2 text-md text-gray-600">
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
  )
}
