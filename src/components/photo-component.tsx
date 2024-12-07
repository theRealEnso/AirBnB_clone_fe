import { useState } from "react";
import { useDispatch } from "react-redux";

import { removePhoto } from "../redux/places/places-reducer";

export const Photo = ({photoObject, index}) => {
    // console.log(photoObject);
    const {photo} = photoObject;

    const dispatch = useDispatch();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const removeFile = () => dispatch(removePhoto(index))

    return (
        <div 
            style={{
                backgroundImage: `url(http://localhost:5000/temporary-photos/${photo})`
            }}
            className={`cursor-pointer relative w-[150px] h-[100px] rounded-2xl bg-cover bg-center bg-no-repeat`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
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
