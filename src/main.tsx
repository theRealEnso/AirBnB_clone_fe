import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

//import components to setup redux
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.tsx';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';

//import components
import { ProtectedRoute } from './api/ProtectedRoute.tsx';
import RootLayout from './RootLayout.tsx';
import ErrorPage from './error-page.tsx';
import App from './App.tsx';
import RegisterForm from './components/authentication/RegisterForm.tsx';
import LoginForm from './components/authentication/LoginForm.tsx';
import { ProfilePage } from './components/pages/ProfilePage.tsx';
import { BookingsPage } from './components/BookingsPage.tsx';
import { PlacesPage } from './components/pages/PlacesPage.tsx';
import { NewAccomodationForm } from './components/pages/NewAccomodationForm.tsx';

//import components and functions to set up Routing
import { createBrowserRouter, RouterProvider,} from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <App></App>
          </ProtectedRoute>
        )
      },

      {
        path: "/register",
        element: <RegisterForm></RegisterForm>
      },

      {
        path: "/login",
        element: <LoginForm></LoginForm>
      },

      {
        path: "/account",
        element: (
          <ProtectedRoute>
            <ProfilePage></ProfilePage>
          </ProtectedRoute>
        )
      },

      {
        path: "/account/bookings",
        element: (
          <ProtectedRoute>
            <BookingsPage></BookingsPage>
          </ProtectedRoute>
        )
      },

      {
        path: "/account/places",
        element: (
          <ProtectedRoute>
            <PlacesPage></PlacesPage>
          </ProtectedRoute>
        )
      },

      {
        path: "/account/places/new",
        element: (
          <ProtectedRoute>
            <NewAccomodationForm></NewAccomodationForm>
          </ProtectedRoute>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router}></RouterProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
