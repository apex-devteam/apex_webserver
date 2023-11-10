import { Link } from "react-router-dom";
import { useUserAuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { users, setUsers, setLogin } = useUserAuthContext()
    const naviate = useNavigate();

    const handleLogout = () => {
        setUsers([])
        setLogin(false)
        window.localStorage.removeItem("userLoggedIn")
        naviate("/")
    }
    return (
        <div className = "navbar">
            <div className = "navbar-right">
                <Link className="navbar-button" to="/">Home</Link>
                <Link className="navbar-button" to="/business-address-table">Reports</Link>
                <Link className="navbar-button" to="/Administration">Administration</Link>
            </div>
            <div className="navbar-left">
                {users ? (
                    <div>
                        <em>Hello {users.user}</em>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <Link className="navbar-button" to="/login">Login</Link>
                )}
            </div>
        </div>
    )
}

export default Navbar;