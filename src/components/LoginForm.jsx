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
            
            <form onSubmit={handleLogin} className="shadow-md bg-gray-700 rounded px-8 pt-6 pb-8 mb-4 text-white font-bold">
                <div className="pb-3.5 text-xl">
                    You must be logged in to access this website
                </div>
                <div className="mb-4 flex text-lg">
                    <label className="pr-2">
                        Username:      
                    </label>
                    <input
                        value={username} 
                        type='text'
                        onChange={({target}) => setUsername(target.value)}
                        className="shadow appearance-none border rounded w-full py-1 px-3 leading-tight focus:shadow-outline focus:outline-none"
                        placeholder="Username"
                    />
                    
                </div>
                <div className="mb-4 flex text-lg">
                    <label className="pr-2">
                        Password:  
                    </label>
                    <input 
                        value={password}
                        type="password"
                        onChange={({target}) => setPassword(target.value)}
                        className="shadow appearance-none border rounded w-full py-1 px-3 leading-tight focus:shadow-outline focus:outline-none"
                        placeholder="*****************"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-800 hover:bg-blue-900 font-bold focus:outline-none focus:shadow-1"
                >
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default LoginForm;