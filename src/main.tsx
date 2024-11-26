import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

//imoort components
import RootLayout from './RootLayout.tsx';
import ErrorPage from './error-page.tsx';
import App from './App.tsx';
import RegisterForm from './components/authentication/register-form.tsx';
import LoginForm from './components/authentication/login-form.tsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
