import { useForm, useFieldArray } from "react-hook-form";
import merchantsService from "../services/merchants"
import { useState } from 'react'

//USE REACT HOOK FORM HERE
const DeveloperAdmin = () => {
    const [isSuccessful, setIsSuccessful] = useState(false);
    const states = [ 'AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'];
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
                        {index === 0 ? <header>Create New Merchant Group for Main Location</header> : <header>Create Merchant for additional Location {index + 1}</header>} 
                        
                        {isSuccessful ? 
                        <h4>Success! New group is created!</h4> :
                        null}
                        <div>
                            Merchant Group Name: 
                            <input 
                            {...register (
                                `locationInfo[${index}].merchantGroupName`, 
                                {required: "A merchant group name is required."} )}
                            />
                        </div>
                        <div>
                            Street Address: 
                            <input 
                                {...register (
                                    `locationInfo[${index}].streetAddress1`, { 
                                    required: true, 
                                    minLength: {
                                        value: 10,
                                        message: "Address needs at least 10 characters."
                                    }
                                })}
                                title={errors.streetAddress1 ? errors.streetAddress1.message : ""}
                                style={{ backgroundColor: errors.streetAddress1 ? "rgb( 242, 81, 81 )" : "rgb( 75, 169, 58  )" }}
                            />
                        </div>
                        <div>
                            Street Address 2: 
                            <input {...register(`locationInfo[${index}].streetAddress2`)}/>
                        </div>
                        <div>
                            City: 
                            <input {...register(`locationInfo[${index}].city`,  {required: true})}/>
                        </div>
                        <div>
                            State: 
                            <select {...register(`locationInfo[${index}].state`, {required: true})}>  
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
                            Zip Code: 
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
                            />
                        </div>
                        <button onClick={() => remove(index)}>Remove</button>
                    </div>
                ))}    
                <div>
                    <button 
                        type="button" 
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
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    );
};

export default DeveloperAdmin;