import { useRef } from "react";

export const PictureInput = ({readablePicture, setReadablePicture, setPictureError}) => {
    const pictureInputRef = useRef<HTMLInputElement | null>(null);

    const togglePictureInput = () => {
        if(pictureInputRef.current){
            pictureInputRef.current.click();
        }
    };

    const changePicture = () => {
        setReadablePicture("");
        togglePictureInput();
    };

    const handleImageSelection = (event) => {
        // console.log(event.target.files);
        // console.log(typeof event.target.files);

        let files = Array.from(event.target.files);
        // console.log(files);

        const selectedPicture = files[0];
        console.log(selectedPicture);
        if(selectedPicture.type !== "image/webp" && selectedPicture.type !== "image/png" && selectedPicture.type !== "image/jpeg"){
            setPictureError("Only png, jpeg, and webp file types are supported!");
        } else if (selectedPicture.size > 1024 * 1024 * 5){
            setPictureError(`${(selectedPicture.size / 1000000).toFixed(2)} MB exceeds 5 MB file size limit`)
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(selectedPicture);
            reader.onload = (event) => {
                const dataURL = event.target && event.target.result;
                // console.log(dataURL);
                setReadablePicture(dataURL);
                };
            }
        };

    return (
        <div className="py-4 cursor-pointer">
            {
                readablePicture ? 
                (
                    <div className="flex items-center space-x-2">
                        <img src={readablePicture} className="w-[50px] h-[50px] object-fit rounded-full"></img>
                        <span className="font-bold tracking-wide text-gray-400 hover:underline hover:text-primary" onClick={changePicture}>Change picture</span>
                    </div>
                ) 
                : (
                    <div className="cursor-pointer" onClick={togglePictureInput}>
                        <span className="text-gray-400 font-bold tracking-wide">Upload a picture (optional)</span>
                    </div>
                )
            }

            <input 
                type="file" 
                accept="image/webp image/png image/jpeg"
                hidden
                ref={pictureInputRef}
                onChange={handleImageSelection}
                >
                            
            </input>
        </div>
    );
};
