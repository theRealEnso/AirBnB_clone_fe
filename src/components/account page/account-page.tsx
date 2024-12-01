import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom'

//import redux selector
import { selectCurrentUser } from '../../redux/user/user-selectors';

import { logout } from '../../redux/user/user-reducer';

export const AccountPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    let {subpage} = useParams();
    console.log(subpage);

    if(subpage === undefined){
        subpage = "profile";
    };

    const focusedStyles = (str = null) => {
        let classes = "py-2 px-6";

        if(str === subpage){
            classes += " bg-primary text-white rounded-full";
        }

        return classes;
    };

    const signOut = () => dispatch(logout())

  return (
    <div>
        <nav className="w-full flex justify-center mt-8 mb-8 gap-2">
            <Link className={focusedStyles("profile")} to="/account">My profile</Link>
            <Link className={focusedStyles("bookings")} to="/account/bookings">My bookings</Link>
            <Link className={focusedStyles("places")} to="/account/places">My accomodations</Link>
        </nav>

        {
            subpage === "profile" && (
                <div className="flex flex-col items-center justify-center max-w-lg mx-auto">
                    <h1>{`Logged in as ${currentUser.firstName} ${currentUser.lastName} (${currentUser.email})`}</h1>
                    <button className="bg-primary text-white rounded-lg mt-2 w-[60%] py-1" onClick={signOut}>Log out</button>
                </div>
            )
        }
    </div>
  )
}
