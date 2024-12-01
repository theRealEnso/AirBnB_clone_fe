import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom'

//import redux selector
import { selectCurrentUser } from '../../redux/user/user-selectors';

//import redux actions
import { logout } from '../../redux/user/user-reducer';

//import components
import { PlacesPage } from './places-page';

export const AccountPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    let {subpage} = useParams();
    console.log(subpage);

    if(subpage === undefined){
        subpage = "profile";
    };

    const focusedStyles = (str = null) => {
        let classes = "inline-flex gap-2 py-2 px-6";

        if(str === subpage){
            classes += " bg-primary text-white rounded-full";
        } else {
            classes += " shadow-md rounded-full hover:shadow-lg"
        }

        return classes;
    };

    const signOut = () => dispatch(logout())

  return (
    <div>
        <nav className="w-full flex justify-center mt-8 mb-8 gap-2">
            <Link className={focusedStyles("profile")} to="/account">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>

                My profile
            </Link>

            <Link className={focusedStyles("bookings")} to="/account/bookings">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                </svg>

                My bookings
            </Link>

            <Link className={focusedStyles("places")} to="/account/places">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" />
                    <path fillRule="evenodd" d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z" clipRule="evenodd" />
                </svg>
                
                My accomodations
            </Link>
        </nav>

        {
            subpage === "profile" && (
                <div className="flex flex-col items-center justify-center max-w-lg mx-auto">
                    <h1>{`Logged in as ${currentUser.firstName} ${currentUser.lastName} (${currentUser.email})`}</h1>
                    <button className="bg-primary text-white rounded-lg mt-2 w-[60%] py-1" onClick={signOut}>Log out</button>
                </div>
            )
        }

        {
            subpage === "places" && <PlacesPage></PlacesPage>
        }
    </div>
  );
};
