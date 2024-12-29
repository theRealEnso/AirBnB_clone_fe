import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

//import components to setup redux
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.tsx';
import { PersistGate } from 'redux-persist/integration/react';

//import stripe components
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

//import components and functions to set up Routing
import { createBrowserRouter, RouterProvider,} from 'react-router-dom';

//import components
import { ProtectedRoute } from './api/ProtectedRoute.tsx';
import RootLayout from './RootLayout.tsx';
import ErrorPage from './error-page.tsx';
import App from './App.tsx';
import RegisterForm from './components/authentication/RegisterForm.tsx';
import LoginForm from './components/authentication/LoginForm.tsx';
import { ProfilePage } from './components/pages/ProfilePage.tsx';
import { BookingsPage } from './components/BookingsPage.tsx';
import { AccomodationFormPage } from './components/pages/AccomodationFormPage.tsx';
import { PlacesPage } from './components/pages/PlacesPage.tsx';
import { PlaceDetails } from './components/PlaceDetails.tsx';
import { BookingSummary } from './components/BookingSummary.tsx';

//environment variables
const stripe_publishable_key = import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY;

export const stripePromise = loadStripe(stripe_publishable_key);


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <App></App>

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
            <AccomodationFormPage></AccomodationFormPage>
          </ProtectedRoute>
        )
      },

      {
        path: `/account/places/:placeId`,
        element: (
          <ProtectedRoute>
            <AccomodationFormPage></AccomodationFormPage>
          </ProtectedRoute>
        )
      },

      {
        path: `/places/:placeId`,
        element: <PlaceDetails></PlaceDetails>
      },

      {
        path: '/places/:placeId/reserve',
        element: (
          <ProtectedRoute>
            <BookingSummary></BookingSummary>
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
        <Elements stripe={stripePromise}>
          <RouterProvider router={router}></RouterProvider>
        </Elements>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
