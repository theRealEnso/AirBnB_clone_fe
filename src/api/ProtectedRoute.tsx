import { ReactNode } from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

//import selector(s)
import { selectCurrentUser } from "../redux/user/user-selectors";

type ProtectedRouteProps = {
    children: ReactNode
};

export const ProtectedRoute = ({children} : ProtectedRouteProps) => {
    const currentUser = useSelector(selectCurrentUser);
    const {access_token} = currentUser;

    if(!access_token){
        return <Navigate to="/login"></Navigate>
    };

    return children;
};

//notes to self:
//children as Props:

// In React, children is a special prop that is automatically passed to components, and it represents the content between the opening and closing tags of a component.

// In this case, when you write:

// <ProtectedRoute>
//   <App />
// </ProtectedRoute>

// The ProtectedRoute component will receive the App component as children inside it. In other words, children will be whatever JSX or React component is passed inside the <ProtectedRoute> tags.