import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// import redux action(s)
import { logout } from "../../redux/user/user-reducer";
import { setNumberOfAdults, setNumberOfChildren, setNumberOfInfants, setNumberOfPets, setCheckInDate, setCheckOutDate } from "../../redux/bookings/booking-reducer";

type ProfileWidgetRefProps = {
    profileWidgetRef: React.RefObject<HTMLDivElement | null | undefined>
}

const ProfileWidget = ({profileWidgetRef}: ProfileWidgetRefProps) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const navigateToRegister = () => {
        navigate("/register");
    };

    const navigateToLogin = () => {
        navigate("/login");
    };

    const navigateToAccountPlaces = () => {
        navigate("/account/places")
    }

    const signOut = () => {
        dispatch(setNumberOfAdults(1));
        dispatch(setNumberOfChildren(0));
        dispatch(setNumberOfInfants(0));
        dispatch(setNumberOfPets(0));
        dispatch(setCheckInDate(""));
        dispatch(setCheckOutDate(""));
        dispatch(logout());
        navigate("/");
    }

    return (
        <div
            ref={profileWidgetRef}
            className={``}>
            <ul className="w-full text-left list-none px-2 space-y-2 bg-cover">
                <li className="w-full px-4 py-2 hover:bg-gray-100" onClick={navigateToRegister}>Sign up</li>
                <li className="w-full px-4 py-2 hover:bg-gray-200" onClick={navigateToLogin}>Log in</li>
                <li className="w-full px-4 py-2 hover:bg-gray-200 border-b" onClick={signOut}>Sign out</li>
                <li className="w-full px-4 py-2 hover:bg-gray-200">Gift cards</li>
                <li className="w-full px-4 py-2 hover:bg-gray-200" onClick={navigateToAccountPlaces}>Airbnb your home</li>
                <li className="w-full px-4 py-2 hover:bg-gray-200">Host an experience</li>
                <li className="w-full px-4 py-2 hover:bg-gray-200">Help Center</li>
            </ul>
        </div>
    );
};

export default ProfileWidget;
