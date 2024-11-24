import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const ProfileWidget = forwardRef<HTMLDivElement>(({showProfileWidget}, ref) => {

    const navigate = useNavigate();

    const navigateToRegister = () => {
        navigate("/register");
    };

    return (
        <div
            ref={ref}
            className={`absolute w-[200px] border-white shadow-lg rounded-lg z-10 ${showProfileWidget ? "opacity-100 pointer-events-auto -translate-x-32 translate-y-2 transition-all" : "opacity-0 pointer-events-none -translate-x-32 -translate-y-10"}`}>
            <ul className="w-full text-left list-none px-2 space-y-2 bg-cover">
                <li className="w-full px-4 py-2 hover:bg-gray-100" onClick={navigateToRegister}>Sign up</li>
                <li className="w-full px-4 py-2 hover:bg-gray-200 border-b">Log in </li>
                <li className="w-full px-4 py-2 hover:bg-gray-200">Gift cards</li>
                <li className="w-full px-4 py-2 hover:bg-gray-200">Airbnb your home</li>
                <li className="w-full px-4 py-2 hover:bg-gray-200">Host an experience</li>
                <li className="w-full px-4 py-2 hover:bg-gray-200">Help Center</li>
            </ul>
        </div>
    );
});

export default ProfileWidget;
