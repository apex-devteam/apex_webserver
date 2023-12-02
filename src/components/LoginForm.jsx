import { useState } from "react";
import loginService from "../services/login"
import { useUserAuthContext } from "../providers/AuthProvider";


const LoginForm = () => {

    const { setLogin, setUsers } = useUserAuthContext(); 

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin (event) {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username, password
            })
            setUsername("")
            setPassword("")
            setUsers(user)
            setLogin(true)
            window.localStorage.setItem("userLoggedIn", JSON.stringify(user))
        } catch (exception) {
            console.log("exception", exception)
        }
    }

    return (
        <div className="w-full max-w-lg">
            
            <form onSubmit={handleLogin} className="shadow-lg bg-gray-700 rounded px-10 py-8 m-5 text-white font-bold">
                <div className="form-title">
                    You must be logged in to access this website
                </div>
                <div className="mb-4 text-lg">
                    <label className="form-label">
                        Username:      
                    </label>
                    <input
                        value={username} 
                        type='text'
                        onChange={({target}) => setUsername(target.value)}
                        className="form-input"
                        placeholder="Username"
                    />
                    
                </div>
                <div className="mb-4 text-lg">
                    <label className="form-label">
                        Password:  
                    </label>
                    <input 
                        value={password}
                        type="password"
                        onChange={({target}) => setPassword(target.value)}
                        className="form-input"
                        placeholder="*****************"
                    />
                </div>
                <button
                    type="submit"
                    className="btn"
                >
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default LoginForm;