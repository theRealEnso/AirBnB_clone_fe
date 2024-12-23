import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//import redux selectors
// import { selectCurrentUser } from "../../redux/user/user-selectors";
import { selectUserPlaces } from "../../redux/places/places-selector";

//import redux action
import { setUserPlaces, clearPhotos } from "../../redux/places/places-reducer";
import { Link, useNavigation } from "react-router-dom";

//import components
import { AccountNavigation } from "../AccountNavigation";
import { PlaceSummary } from "../PlaceSummary";

//import RTK query function that targets back end api endpoint that fetches all places belonging to the user
import { useGetAllUserPlacesQuery } from "../../api/api-slice";

export const PlacesPage = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation(); // useNavigation !== useNavigate. useNavigation only provides info about the app's current navigation process(loading, submitting, or idle)
    // const currentUser = useSelector(selectCurrentUser);

    // console.log(currentUser);
    // const {id} =  currentUser;

    const {data: places, refetch, isSuccess, isLoading, isError, error} = useGetAllUserPlacesQuery();

    console.log(places);

    useEffect(() => {
        if(isSuccess || places){
            dispatch(setUserPlaces(places));
        }
    },[isSuccess, places, dispatch]);

    // console.log("places page rendered!");

    useEffect(() => {
        //possible values of navigation.state are either "idle", "loading", or "submitting"
        if(navigation.state === "idle"){ //idle means the user completed the transition to PlacesPage, and the page has finished rendering
            refetch();
            dispatch(clearPhotos());
        }
    }, [navigation.state, refetch, dispatch]);

  return (
    <div className="mx-24">
        <AccountNavigation></AccountNavigation>

        <div className="text-center">
            <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to="/account/places/new">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>

                Add a new place
            </Link>
        </div>

        <div>
            {
                places && places.length > 0 && places.map((place) => <PlaceSummary place={place} key={place._id}></PlaceSummary>)
            }
        </div>
    </div>
  );
};
