import { Outlet } from "react-router-dom";
import Navbar from "./components/navigation-bar/Navbar";

const RootLayout = () => {
  return (
    <div className="">
      <Navbar />
      
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;