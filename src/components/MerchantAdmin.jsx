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
        <div className="flex justify-center items-center">
            {/* <fieldset className="w-full max-w-lg "> */}
                <form onSubmit={handleCreateUser} className="w-full max-w-xl ">
                    <div className="flex justify-center items-center text-lg text-bold underline mb-1">
                        <h3>Create new User for Location</h3>
                    </div>
                    <div className="flex justify-between mb-6 md:mb-0">
                        <div className="w-2/5"> 
                            <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                                First Name:
                            </label> 
                            <input 
                                type="text" 
                                value={firstname} 
                                onChange={(event) => setFirstname(event.target.value)}
                                required
                                className="appearance-none block w-full bg-gray-700 border rounded py-2 px-4 mb-3 leading-tight"    
                            />
                        </div>
                        <div className="w-1/5 px-4"> 
                            <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                                M. Initials: 
                            </label>
                            <input 
                                type="text"
                                maxLength={1} 
                                value={middleInitials.toUpperCase()} 
                                onChange={(event) => setMiddleInitials(event.target.value)}
                                className=" block w-full bg-gray-700 border rounded py-2 px-4 mb-3 leading-tight"       
                            />
                        </div>
                        <div className="w-2/5">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                                Last Name: 
                            </label>
                            <input 
                                type="text" 
                                value={lastname}  
                                onChange={(event) => setLastname(event.target.value)}
                                required
                                className="appearance-none block w-full bg-gray-700 border rounded py-2 px-4 mb-3 leading-tight"   
                            />
                        </div>

                    </div>
                    <div className="mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                            Username: 
                        </label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(event) => setUsername(event.target.value)} 
                            required
                            className="appearance-none block w-full bg-gray-700 border rounded py-2 px-4 mb-3 leading-tight" 
                        />
                    </div>
                    <div className="flex justify-between mb-6 md:mb-0">
                        <div>
                            <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                                Password: 
                            </label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} 
                                required
                                className="appearance-none block w-full bg-gray-700 border rounded py-2 px-4 mb-3 leading-tight"
                            />
                        </div>
                        <div>
                            <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                                Confirm Password: 
                            </label>
                            <input 
                                type="password" 
                                value={passwordConfirm} 
                                onChange={(event) => setPasswordConfirm(event.target.value)} 
                                required
                                className="appearance-none block w-full bg-gray-700 border rounded py-2 px-4 mb-3 leading-tight"
                            />
                        </div>
                    </div>
                    <fieldset className="mb-6">
                        <legend>Select Business Location(s)</legend>
                        {merchants.map(merchant => 
                            <div key={merchant.merchant_id}>
                                <input  type="checkbox" name={merchant.merchant_id} checked={locations[merchant.merchant_id]} onChange={handleCheckBox}/> 
                                <label htmlFor={merchant.street_address1}> {merchant.merchant_name}: {merchant.street_address1} {merchant.state} {merchant.zip_code}</label>
                            </div>
                        )}
                    </fieldset>
                    <button 
                        type="submit"
                        className="bg-blue-600"
                    >
                        Create
                    </button>
                    <button 
                        onClick={() => navigate("/link-user")}
                        className="bg-blue-600"
                    >
                        Connect Pre-existing user to Business
                    </button>
                </form>
            {/* </fieldset> */}

        </div>
    )
}
export default MerchantAdmin;