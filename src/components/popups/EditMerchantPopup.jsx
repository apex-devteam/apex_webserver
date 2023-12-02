import { Dialog } from "@headlessui/react";
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from "react";
import { states } from "../../library/states";
const EditMerchantPopup = ({ editPopup, setEditPopup, selectedData }) => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm ({
        defaultValue: useMemo(() => (
            {
                merchantTable: selectedData.merchant_name || "",
                streetAddress1: selectedData.street_address1 || "",
                streetAddress2: selectedData.street_address2 || "",
                city: selectedData.city || "",
                state: selectedData.state || "",
                zipCode: selectedData.zip_code || "",
            }
        ),[selectedData])
    })
    
    useEffect(() => {
        reset({
            merchantTable: selectedData.merchant_name || "",
            streetAddress1: selectedData.street_address1 || "",
            streetAddress2: selectedData.street_address2 || "",
            city: selectedData.city || "",
            state: selectedData.state || "",
            zipCode: selectedData.zip_code || "",
        })
    }, [selectedData, reset])

    const onSubmit = (data) => {
        setEditPopup(false)
        console.log(data)
    }

    return (
        <Dialog 
            open={editPopup} 
            onClose={() => {}}
            className="relative z-50"
        >
            <div className="dialog-background" aria-hidden="true">
                <div className="dialog-box">
                <Dialog.Panel className="dialog-styling">
                    <Dialog.Title className="form-title">Edit Location {selectedData.merchant_name}</Dialog.Title>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="form-label">
                                Merchant Name:
                            </label>
                            <input type="text" {...register("merchantTable")} className="form-input"/>
                        </div>
                        <div>
                            <label className="form-label">
                                Street Address:
                            </label>
                            <input {...register("streetAddress1")} className="form-input"/>
                        </div>
                        <div>
                            <label className="form-label">
                                Street Address 2:
                            </label>
                            <input {...register("streetAddress2")} className="form-input"/>
                        </div>
                        <div>
                            <label className="form-label"> 
                                City:
                            </label>
                            <input {...register("city")} className="form-input"/>
                        </div>
                        <div className="flex">
                            <div>
                                <label className="form-label">
                                    State:
                                </label>
                                <select {...register("state")} className="form-select">
                                    {states.map(state => {
                                        return (
                                            <option value={state} key={state}>
                                                {state}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="ml-5">
                                <label className="form-label">
                                    Zip Code:
                                </label>
                                <input {...register("zipCode")} className="form-input"/>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <button type="submit" className="btn m-1">Create Changes</button>
                            <button type="button" className="btn secondary-btn m-1" onClick={() => {setEditPopup(false)}}>Cancel</button>
                        </div>
                    </form>
                </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
};


EditMerchantPopup.propTypes = {
    editPopup: PropTypes.bool,
    setEditPopup: PropTypes.func,
    selectedData: PropTypes.object,
}
export default EditMerchantPopup
