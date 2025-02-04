
import { useState, useEffect, useRef, MouseEvent,} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//import redux selector
import { selectCurrentUser, } from "../../redux/user/user-selectors";

// import components
import ProfileWidget from "./ProfileWidget";

const Navbar = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const {access_token} = currentUser;

    const [isProfileHovered, setIsProfileHovered] = useState<boolean>(false);
    const [isWorldHovered, setIsWorldHovered] = useState<boolean>(false);
    const [isYourHomeHovered, setIsYourHomeHovered] = useState<boolean>(false);
    const [isWidgetHovered, setIsWidgetHovered] = useState<boolean>(false);
    const [showProfileWidget, setShowProfileWidget] = useState<boolean>(false);

    const profileWidgetRef = useRef<HTMLDivElement | null | undefined>(null);

    const toggleProfileWidget = (event: MouseEvent) => {
        event.stopPropagation();
        setShowProfileWidget((previousValue) => !previousValue);
        // console.log(showProfileWidget);
    };

    const returnToHome = () => {
        navigate("/");
    };

    //css styles for animating the ProfileWidget component
    const slideDown = "opacity-100 pointer-events-auto -translate-x-20 translate-y-2 transition-all";
    const hideMenu =  "opacity-0 pointer-events-none -translate-x-20 -translate-y-10";

    useEffect(() => {
        const handleOutsideMenuClick = (event) => {
            if(profileWidgetRef.current && !profileWidgetRef.current.contains(event.target)){
                setShowProfileWidget(false);
            }
        };

        document.body.addEventListener("click", handleOutsideMenuClick);

        return () => document.body.removeEventListener("click", handleOutsideMenuClick);
    },[showProfileWidget]);


    return (
        <div className="flex items-center justify-between border-b mb-8 mt-2 py-4 mx-24">
            <div>
                <a href="" className="flex shrink items-center gap-1 space-x-2" onClick={returnToHome}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 -rotate-90">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>

                    <span className="font-bold text-xl">AirBnB</span>
                </a>
            </div>

            <div 
                className={`flex shrink space-x-4 items-center cursor-pointer border rounded-full p-2 shadow-md shadow-gray-300 ${isWidgetHovered ? "shadow-lg shadow-gray-400" : ""}`}
                onMouseEnter={() => setIsWidgetHovered(true)}
                onMouseLeave={() => setIsWidgetHovered(false)}
                >
                <div className="border-r-2 px-2 font-medium">Anywhere</div>
                <div className="border-r-2 pr-4 font-medium">Any week</div>
                <div className="text-gray-500 font-medium">Add guests</div>

                <button className="bg-primary rounded-full text-white flex items-center justify-center p-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

                </button>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-2">
                <button 
                    className={`p-2 font-bold text-sm ${isYourHomeHovered ? "bg-slate-100 rounded-full" : ""}`}
                    onMouseEnter={() => setIsYourHomeHovered(true)}
                    onMouseLeave={() => setIsYourHomeHovered(false)}
                    >
                    Airbnb your home
                </button>

                <button 
                    className={`p-2 ${isWorldHovered ? "bg-slate-100 rounded-full" : ""}`}
                    onMouseEnter={() => setIsWorldHovered(true)}
                    onMouseLeave={() => setIsWorldHovered(false)}

                    >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
                    </svg>

                </button>

                <div className="cursor-pointer relative" onClick={toggleProfileWidget}>
                    <div 
                        className={`flex shrink p-2 space-x-2 border rounded-full items-center ${isProfileHovered ? "shadow-md" : ""}`}
                        onMouseEnter={() => setIsProfileHovered(true)}
                        onMouseLeave={() => setIsProfileHovered(false)}
                        >
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                            </svg>
                        </span>

                        <span className="">
                            {
                                currentUser && currentUser.picture || access_token && access_token.length > 0
                                    ? (
                                        
                                        <img src={currentUser && currentUser.picture} alt="profile picture" className="w-[30px] h-[30px] object-fit rounded-full"></img>
                                    )
                                    : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                        </svg>
                                    ) 
                            }

                        </span>

                    </div>
                    <div className={`absolute z-1000 bg-white w-[200px] border-white shadow-lg rounded-lg ${showProfileWidget ? `${slideDown}` : `${hideMenu}`}`}>
                        {
                            showProfileWidget && <ProfileWidget showProfileWidget={showProfileWidget} profileWidgetRef={profileWidgetRef}></ProfileWidget>
                        } 
                    </div>

                </div>
            </div>

        </div>
    )
};

export default Navbar;