import { Place } from "../redux/places/places-reducer";

type PhotoViewerProps = {
    currentPlace: Place;
    setShowPhotos: React.Dispatch<React.SetStateAction<boolean>>
}

export const PhotoViewer = ({currentPlace, setShowPhotos}: PhotoViewerProps) => {
  return (
    <div>
        <div  className="cursor-pointer" onClick={() => setShowPhotos(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg>
        </div>
        
        {
            currentPlace && currentPlace.photos.map((photo) => {
                return (
                    <div>
                        <img src={`http://localhost:5000/photo-uploads/${photo.photo}`}></img>
                    </div>
                )
            })
        }
    </div>
  );
};
