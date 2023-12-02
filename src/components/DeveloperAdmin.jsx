import { useForm, useFieldArray } from "react-hook-form";
import merchantsService from "../services/merchants"
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { states } from '../library/states'

//USE REACT HOOK FORM HERE
const DeveloperAdmin = () => {
    const [isSuccessful, setIsSuccessful] = useState(false);
    // const states = [ 'AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'];
    const navigate = useNavigate()
    
    const { 
        control,
        register, 
        handleSubmit, 
        formState: {errors}, 
        reset 
    } = useForm({
        defaultValues: {
            locationInfo: [{
                merchantGroupName: "",
                streetAddress1: "",
                streetAddress2: "",
                city: "",
                state: "",
                zipCode: ""
            }],
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'locationInfo'
    })


    const createGroup = async (data) => {
        console.log("data", data)
        console.log('locationinfo', data.locationInfo)
        const response = await merchantsService.postOneMerchantGroup(data.locationInfo)
        console.log("response", response)
        reset()
        setIsSuccessful(true)
        setTimeout(() => {
            setIsSuccessful(false)
        }, 8000)
    }

    const [zipCodeInput, setZipCodeInput] = useState("")
    const handleZipCode = (event) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === "" || re.test(event.target.value)) {
            setZipCodeInput(event.target.value)
        } 
    }

    return (
        <div>
            <form onSubmit={handleSubmit(createGroup)}>
                {fields.map((location, index) => (
                    <div key={index}>
                        {index === 0 ? <header className="form-title">Create New Merchant Group for Main Location</header> : <header className="form-title">Create Merchant for additional Location {index + 1}</header>} 
                        
                        {isSuccessful ? 
                        <h4>Success! New group is created!</h4> :
                        null}
                        <div>
                            <label className="form-label">
                                Merchant Group Name: 
                            </label>
                            <input 
                            {...register (
                                `locationInfo[${index}].merchantGroupName`, 
                                {required: "A merchant group name is required."} )}
                                className="form-input"
                            />
                        </div>
                        <div className="flex justify-between w-full">
                            <div>
                                <label className="form-label">
                                    Street Address: 
                                </label>
                                <input 
                                    {...register (
                                        `locationInfo[${index}].streetAddress1`, { 
                                        required: true, 
                                        minLength: {
                                            value: 10,
                                            message: "Address needs at least 10 characters."
                                        }
                                    })}
                                    // title={errors.streetAddress1 ? errors.streetAddress1.message : ""}
                                    // style={{ backgroundColor: errors.streetAddress1 ? "rgb( 242, 81, 81 )" : "rgb( 75, 169, 58  )" }}
                                    className="form-input"
                                />
                            </div>
                            <div className="ml-4">
                                <div className="form-label">
                                    Street Address 2: 
                                </div>
                                <input {...register(`locationInfo[${index}].streetAddress2`)} className="form-input"/>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <label className="form-label">
                                    City: 
                                </label>
                                <input {...register(`locationInfo[${index}].city`,  {required: true})} className="form-input"/>
                            </div>
                            <div>
                                <label className="form-label">
                                    State: 
                                </label>
                                <select 
                                    {...register(`locationInfo[${index}].state`, {required: true})} 
                                    className="form-select"
                                >  
                                    {states.map((state) => {
                                        return (
                                            <option value={state} key={state}>
                                                {state}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <label className="form-label" >
                                    Zip Code: 
                                </label>
                                <input 
                                    {
                                    ...register(
                                        `locationInfo[${index}].zipCode`, 
                                        {
                                            required: true
                                        }, {
                                            minLength: 5
                                        },
                                        {
                                            valueAsNumber: true,
                                            pattern: {
                                                value: /^(0|[1-9]\d*)$/
                                            }
                                        }
                                    )}
                                    onChange={(e) => handleZipCode(e)}
                                    value={zipCodeInput}
                                    className="form-input"
                                />
                            </div>                   
                        </div>
                        <button className="btn secondary-btn" onClick={() => remove(index)}>Remove</button>
                    </div>
                ))}    
                <div>
                    <button 
                        type="button"
                        className="btn"  
                        onClick={() => 
                            append({
                                merchantGroupName: "",
                                streetAddress1: "",
                                streetAddress2: "",
                                city: "",
                                state: "",
                                zipCode: ""
                            })}
                    >
                        Add another location?
                    </button>
                    <button className="btn" type="submit">Create</button>
                </div>
            </form>
            <button className="btn" onClick={() => navigate("/developer-administration/developer-table")}>Merchant Table</button>
            <button className="btn" onClick={() => navigate("/developer-administration/create-new-account")}>Create New Account</button>
            <button className="btn" onClick={() => navigate("/developer-administration/link-user")}>Link Existing Users to Location</button>
        </div>
    );
};

export default DeveloperAdmin;