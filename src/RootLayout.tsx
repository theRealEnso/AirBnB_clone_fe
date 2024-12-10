import { Outlet } from "react-router-dom";
import Navbar from "./components/navigation-bar/Navbar";

const RootLayout = () => {
  return (
    <div className="px-10 py-4">
      <Navbar />
      
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;