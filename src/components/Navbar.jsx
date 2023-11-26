import { Link, useNavigate } from "react-router-dom";
import { useUserAuthContext } from "../providers/AuthProvider";
import { useState } from "react";
import { LogoutPopup } from "./LogoutPopup";

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
        <div className = "navbar">
            <div className = "navbar-right">
                <Link className="navbar-button" to="/">Home</Link>
                <Link className="navbar-button" to="/business-address-table">Reports</Link>
                <Link className="navbar-button" to="/merchant-administration">Merchant Administration</Link>
                <Link className="navbar-button" to="/developer-administration">Developer Administration</Link>
            </div>
            <div className="navbar-left">
                {users ? (
                    <div>
                        <em>Hello {users.user}</em>
                        <button onClick={() => setOpenLogout(true)}>Logout</button>
                        <LogoutPopup openLogout={openLogout} setOpenLogout={setOpenLogout} handleLogout={handleLogout}/>
                    </div>
                ) : (
                    <>
                        <Link className="navbar-button" to="/login">Login</Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar;