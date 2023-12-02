import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const HeaderLayout = () => {
    return (
      <>
        <nav className="bg-gray-800 text-white p-4 top-0 w-full">
          <Navbar/>
        </nav>
        <div className="mt-8 p-4 flex justify-center items-start min-h-screen">
          <Outlet/>
        </div>
      </>
    )
}

export default HeaderLayout;