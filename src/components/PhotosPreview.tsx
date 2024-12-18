//import components
import { Photo } from "./Photo";

//import typescript types
import { PhotosProps } from "./PhotosUploader";

export const PhotosPreview = ({photos}: PhotosProps) => {
  if (!Array.isArray(photos)) {
    console.error("photos is not an array:", photos);
    return null;
  }

  return (
    <div className="mt-2 gap-4 mb-2 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] overflow-hidden">
      {
        photos && photos.map((photoObject, idx) => {
          // console.log(photoObject);
          if(photoObject){
            const {tempId} = photoObject;
            return <Photo photoObject={photoObject} key={tempId} index={idx}></Photo>
          }
        })
      }
    </div>
  );
};
