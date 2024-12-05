export const Photo = ({photoName}) => {
    console.log(photoName);

    return (
        <div className="w-[150px] h-[100px] cursor-pointer">
            <img src={`http://localhost:5000/photo-uploads/${photoName}`} className="rounded-2xl w-full h-full object-fit"></img>
        </div>
    );
};
