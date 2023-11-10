import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const HeaderLayout = () => {
    return (
      <>
        <header>
          <Navbar/>
        </header>
        <Outlet/>
      </>
    )
}

export default HeaderLayout;