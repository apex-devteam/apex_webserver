import { Link, useNavigate } from "react-router-dom";
import { useUserAuthContext } from "../providers/AuthProvider";
import { useState } from "react";
import { LogoutPopup } from "./popups/LogoutPopup";

const Navbar = () => {
    const { users, setUsers, setLogin } = useUserAuthContext()
    const [ openLogout, setOpenLogout ] = useState(false)
    const navigate = useNavigate();

    const handleLogout = () => {
        setOpenLogout(false)
        setUsers([])
        setLogin(false)
        window.localStorage.removeItem("userLoggedIn")
        navigate("/")
    }

    return (
        <nav className = "flex items-center justify-between flex-wrap p-6">
            <div className = "navbar-right">
                <Link className="navbar-button" to="/">Home</Link>
                <Link className="navbar-button" to="/business-address-table">Reports</Link>
                <Link className="navbar-button" to="/merchant-administration">Merchant Administration</Link>
                <Link className="navbar-button" to="/developer-administration">Developer Administration</Link>
            </div>
            <div className="navbar-left">
                {users ? (
                    <div className="flex justify-between items-center">
                        <div className="mr-2">Hello {users.user}</div>
                        <button className="btn"onClick={() => setOpenLogout(true)}>Logout</button>
                        <LogoutPopup openLogout={openLogout} setOpenLogout={setOpenLogout} handleLogout={handleLogout}/>
                    </div>
                ) : (
                    <>
                        <Link className="navbar-button" to="/login">Login</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;