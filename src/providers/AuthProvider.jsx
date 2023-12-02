import { createContext, useContext, useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
export const UserAuthContext = createContext(null);
import PropTypes from 'prop-types'
import IdlePrompt from "../components/popups/IdlePrompt";
import '../App.css'

export const useUserAuthContext = () => useContext(UserAuthContext)    

const AuthProvider = ({ children }) => {    
    const [users, setUsers] = useState([])
    const [login, setLogin] = useState(false)

    useEffect (() => {
        const loggedUserJSON = window.localStorage.getItem("userLoggedIn")
        if  (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUsers(user)
            setLogin(true)
        }
    },[])

    return (
        <UserAuthContext.Provider value={{ users, setUsers, setLogin }}>
            {!login && (
                <div className="flex justify-center items-center h-screen">
                    <LoginForm />
                </div>
            )}
            {
                login && 
                    <>
                        <IdlePrompt/>
                        {children}
                    </>
            }
        </UserAuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.object
}

export default AuthProvider;