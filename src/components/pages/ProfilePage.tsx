import { useSelector, useDispatch } from 'react-redux';

//import redux selector
import { selectCurrentUser } from '../../redux/user/user-selectors';

//import redux actions
import { logout } from '../../redux/user/user-reducer';

//import components
import { AccountNavigation } from '../AccountNavigation';

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const signOut = () => dispatch(logout())

  return (
    <div>
        <AccountNavigation></AccountNavigation>

        <div className="flex flex-col items-center justify-center max-w-lg mx-auto">
            <h1>{`Logged in as ${currentUser.firstName} ${currentUser.lastName} (${currentUser.email})`}</h1>
            <button className="bg-primary text-white rounded-lg mt-2 w-[60%] py-1" onClick={signOut}>Log out</button>
        </div>


    </div>
  );
};
