import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const HeaderLayout = () => {
    return (
      <>
        <nav className="bg-gray-800 text-white p-4 top-0 w-full">
          <Navbar/>
        </nav>
        <div className="mt-16 p-4 flex justify-center items-center">
          <Outlet/>
        </div>
      </>
    )
}

export default HeaderLayout;