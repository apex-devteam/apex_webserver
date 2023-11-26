import { useState } from "react";
import { useLoaderData, useNavigate} from "react-router-dom";
import userService from "../services/users"
const MerchantAdmin = () => {

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [middleInitials, setMiddleInitials] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [locations, setLocations] = useState([])
    const merchants = useLoaderData()

    const navigate = useNavigate()


    const handleCreateUser = async (event) => {
        event.preventDefault();

        if (password !== passwordConfirm) {
            return console.log("Password does not match")
        }

        const newUser = {
            firstname,
            lastname,
            middleInitials,
            username,
            password,
            locations
        }
        const result = await userService.postUser(newUser)
        console.log("result: ", result)
        setFirstname("")
        setLastname("")
        setMiddleInitials("")
        setUsername("")
        setPassword("")
        setPasswordConfirm("")
        
        let newLocations = {}
        for (const merchant of merchants) {
            console.log(merchant)
            newLocations[merchant.merchant_id] = false
        }
        setLocations(newLocations)

    }

    const handleCheckBox = (event) => {
        setLocations({...locations, [event.target.name] : event.target.checked})
    }
    return (
        <div>
            <fieldset>
                <form onSubmit={handleCreateUser}>
                    <fieldset>
                        <h3>Create new User for Location</h3>
                        <div>
                            First Name: 
                            <input type="text" value={firstname} onChange={(event) => setFirstname(event.target.value)}required/>
                        </div>
                        <div>
                            Last Name: 
                            <input type="text" value={lastname}  onChange={(event) => setLastname(event.target.value)}required/>
                        </div>
                        <div>
                            Middle Initials: 
                            <input type="text" maxLength={1} value={middleInitials} onChange={(event) => setMiddleInitials(event.target.value)}/>
                        </div>
                        <div>
                            Username: 
                            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} required/>
                        </div>
                        <div>
                            Password: 
                            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
                        </div>
                        <div>
                            Confirm Password: 
                            <input type="password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} required/>
                        </div>
                        
                        <fieldset>
                            <legend>Select Business Location(s)</legend>
                            {merchants.map(merchant => 
                                <div key={merchant.merchant_id}>
                                    <input  type="checkbox" name={merchant.merchant_id} checked={locations[merchant.merchant_id]} onChange={handleCheckBox}/> 
                                    <label htmlFor={merchant.street_address1}> {merchant.merchant_name}: {merchant.street_address1} {merchant.state} {merchant.zip_code}</label>
                                </div>
                            )}
                        </fieldset>
                        <button type="submit">Create</button>
                    </fieldset>
                </form>
            </fieldset>
            <button onClick={() => navigate("/link-user")}>Connect Pre-existing user to Business</button>
        </div>
    )
}
export default MerchantAdmin;