import { Photo } from "./photo-component";

export const PhotosPreview = ({photosToDisplay}) => {
  if (!Array.isArray(photosToDisplay)) {
    console.error("photosToDisplay is not an array:", photosToDisplay);
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {
        photosToDisplay.map((photoObject) => {
          // console.log(photoObject);
          return <Photo photoObject={photoObject} key={photoObject}></Photo>
        })
      }
    </div>
  );
};
