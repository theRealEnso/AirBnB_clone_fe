import { Outlet } from "react-router-dom";

//import components
import Navbar from "./components/navigation-bar/Navbar";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const RootLayout = () => {
  return (
    <div className="">
      <Navbar />
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <main>
          <Outlet />
        </main>
      </LocalizationProvider>

    </div>
  );
};

export default RootLayout;