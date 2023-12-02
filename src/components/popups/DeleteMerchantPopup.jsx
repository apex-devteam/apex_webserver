import { Dialog } from "@headlessui/react";
import PropTypes from 'prop-types';
import serviceMerchants from '../../services/merchants'

const DeleteMerchantPopup = ({deletePopup, setDeletePopup, idToDelete}) => {

    const handleDeleteMerchant = async () => {
        const id = {
            id: idToDelete
        }
        console.log("id in popup", id)
        const deleteMerchant = await serviceMerchants.deleteMerchant(id)
        console.log(deleteMerchant)
        setDeletePopup(false)
    }

    return (
        <Dialog 
            open={deletePopup} 
            onClose={() => {}}
        >
            <div className="dialog-background">
                <div className="dialog-box">
                <Dialog.Panel className="dialog-styling">
                    <Dialog.Title>Are you sure you want to delete this?</Dialog.Title>
                    <button 
                        className="btn secondary-btn m-1"
                        onClick={handleDeleteMerchant}
                    >
                        Confirm Delete
                    </button>
                    <button 
                        onClick={() => setDeletePopup(false)}
                        className="btn m-1"
                    >
                        Cancel
                    </button>
                </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
};

DeleteMerchantPopup.propTypes = {
    deletePopup: PropTypes.bool,
    setDeletePopup: PropTypes.func,
    idToDelete: PropTypes.number
}

export default DeleteMerchantPopup;