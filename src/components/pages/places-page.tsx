import { Link, useParams } from "react-router-dom";

//import components
import { NewAccomodationForm } from "./new-accomodation-form";

export const PlacesPage = () => {
    const {action} = useParams();
    console.log(action);
  return (
    <div>
        {
            action !== "new" && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to="/account/places/new">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
        
                        Add a new place
                    </Link>
                </div>
            )
        }

        {
            action === "new" && <NewAccomodationForm></NewAccomodationForm>
        }
    </div>
  );
};
