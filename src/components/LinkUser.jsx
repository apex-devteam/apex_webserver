import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import merchantService from '../services/merchants'

const LinkUser = () => {

    const [selectedUser, setSelectedUser] = useState("")
    const [selectedLocation, setSelectedLocation] = useState("")
    const [showError, setShowError] = useState(false)

    const allData = useLoaderData()
    console.log(allData)
    
    const handleLink = async (event) => {

        event.preventDefault()
        const data = {
            userId: selectedUser,
            merchantId: selectedLocation
        }

        const response = await merchantService.linkMerchantWithUser(data)
        console.log(response)
        if(response === 409) {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 8000)
        } else if(response.data.affectedRows === 1) {
            alert(`Link between user and location is successful!`)
        }
    }

    return (
        <div>
            <h2>Link User with Merchant Location</h2>
            {!showError ? 
                <p>Select the user and business location. Once linked, the user can sign in to see information for that business location.</p> : 
                <p style={{color: "red"}}>User and location is already linked.</p>
            }
                <form onSubmit={handleLink} className="user-link-form">
                    <h3>Users</h3>
                    <select size={`${allData[1].length}`} onChange={(event) => setSelectedUser(event.target.value)}>
                        {allData[1].map(user => (
                            <option key={user.id} value={user.id} >
                                {user.first_name} {user.last_name}
                            </option>
                        ))}
                    </select>
                    <h3>Business Locations</h3>
                    <select size={`${allData[0].length}`} onChange={(event) => setSelectedLocation(event.target.value)}>
                        {allData[0].map((location) => (
                            <option key={location.merchants_id} value={location.merchants_id}>
                                {location.merchant_name} {location.street_address1} {location.city}
                            </option>
                        ))}
                    </select>
                    <button>Create Link</button>
                </form>
        </div>
    );
};

export default LinkUser;