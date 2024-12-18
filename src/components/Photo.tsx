import { useState } from "react";
import { useDispatch } from "react-redux";

//import redux actions
import { removePhoto, setMainPhoto } from "../redux/places/places-reducer";

//import typescript types
import { PhotoObject } from "./PhotosUploader";

type PhotoChildProps = {
    photoObject: PhotoObject;
    index: number;
}

export const Photo = ({photoObject, index}: PhotoChildProps) => {
    // console.log(photoObject);
    const {photo} = photoObject;

    const dispatch = useDispatch();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const removeFile = () => dispatch(removePhoto(index));

    const setPhoto = () => dispatch(setMainPhoto(index))

    return (
        <div 
            style={{
                backgroundImage: `url(http://localhost:5000/photo-uploads/${photo})`
            }}
            className={`cursor-pointer relative w-full h-[100px] rounded-2xl bg-cover bg-center bg-no-repeat opacity-80 hover:opacity-100  hover:scale-[1.02] transition-all`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={setPhoto}
            >
            {/* <img src={`http://localhost:5000/temporary-photos/${photo}`} className="max-w-full max-h-full object-cover"></img> */}

            {
                hoveredIndex === index && (
                    <span 
                        className="flex items-center justify-center absolute top-[1px] right-[1px] w-[20px] h-[20px] bg-red-500 text-white font-bold rounded-full"
                        onClick={removeFile}
                        >
                            X
                    </span>
                )
            }
        </div>
    );
};
