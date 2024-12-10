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
    <div className="mt-2 gap-2 flex flex-auto mb-2">
      {
        photos.map((photoObject, idx) => {
          // console.log(photoObject);
          const {tempId} = photoObject;
          return <Photo photoObject={photoObject} key={tempId} index={idx}></Photo>
        })
      }
    </div>
  );
};
