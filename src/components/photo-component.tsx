export const Photo = ({photoObject}) => {
    // console.log(photoObject);
    const {photo} = photoObject

    return (
        <div className="w-[150px] h-[100px] cursor-pointer">
            <img src={`http://localhost:5000/temporary-photos/${photo}`} className="rounded-2xl w-full h-full object-fit"></img>
        </div>
    );
};
