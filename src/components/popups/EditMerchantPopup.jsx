import { Dialog } from "@headlessui/react";
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from "react";

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
                    <Dialog.Title>Edit Location {selectedData.merchant_name}</Dialog.Title>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            Merchant Name:
                            <input type="text" {...register("merchantTable")}/>
                        </div>
                        <div>
                            Street Address:
                            <input {...register("streetAddress1")}/>
                        </div>
                        <div>
                            Street Address 2:
                            <input {...register("streetAddress2")}/>
                        </div>
                        <div>
                            State:
                            <input {...register("state")}/>
                        </div>
                        <div>
                            Zip Code:
                            <input {...register("zipCode")}/>
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
