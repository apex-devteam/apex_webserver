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
        <div>
            <div>
                You must be logged in to access data
            </div>
            <form onSubmit={handleLogin}>
                <div>
                    Username: 
                    <input
                        value={username} 
                        type='text'
                        onChange={({target}) => setUsername(target.value)}
                    />
                    
                </div>
                <div>
                    Password:  
                    <input 
                        value={password}
                        type="password"
                        onChange={({target}) => setPassword(target.value)}

                    />
                </div>
                <button type="submit">Login</button>
                <button>Dont have an account?</button>
            </form>
        </div>
    )
}

// LoginForm.propTypes = {
//     setLogin: PropTypes.func,
//     setUsers: PropTypes.func
// }

export default LoginForm;