import { Link } from "react-router-dom"

//import typescript types
import { Place } from "../redux/places/places-reducer";

type PlaceProps = {
    place: Place
}

export const PlaceSummary = ({place}: PlaceProps) => {

    const animateBorderColorStyles = `border-2 border-transparent hover:border-primary transition-colors`;
    const addGlowEffectStyles = `transition-shadow hover:shadow-primary/50 hover:scale-[1.02] transition-transform`
    // console.log(place)
    // console.log(place._id);
  return (
    <div className={`mt-4 rounded-2xl shadow-xl ${addGlowEffectStyles} ${animateBorderColorStyles}`}>
        <Link to={`/account/places/${place._id}`} className="flex items-center bg-gray-200 p-4 rounded-2xl gap-4">
            {
                place.photos && place.photos.length > 0 && 
                (
                    <div className="w-32 h-32 grow shrink-0">
                        <img 
                            src={`http://localhost:5000/photo-uploads/${place.photos[0].photo}`} 
                            className="w-full h-full rounded-2xl transform transition-transform duration-500 hover:scale-110">

                        </img>
                    </div>
                )
            }
            <div className="flex flex-col">
                <h1 className="text-xl tracking-wide">{place.title}</h1>
                <h3 className="text-md">{`${place.address.street}, ${place.address.postalCode}, ${place.address.city}, ${place.address.country}`}</h3>

                <div className="border-t-4">
                    <p className="text-sm">{place.description}</p>
                </div>
                
            </div>

        </Link>
    </div>
  );
};
