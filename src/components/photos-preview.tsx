import { Photo } from "./photo-component";

export const PhotosPreview = ({photosToDisplay}) => {
  if (!Array.isArray(photosToDisplay)) {
    console.error("photosToDisplay is not an array:", photosToDisplay);
    return null;
  }

  return (
    <div className="mt-2 gap-2 flex flex-auto">
      {
        photosToDisplay.map((photoObject, idx) => {
          // console.log(photoObject);
          const {tempId} = photoObject;
          return <Photo photoObject={photoObject} key={tempId} index={idx}></Photo>
        })
      }
    </div>
  );
};
