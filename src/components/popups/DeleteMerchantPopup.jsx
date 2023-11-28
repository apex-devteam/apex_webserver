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
            <div className="fixed inset-0 bg-black/30">
                <div className="flex justify-center items-center min-h-full p-4">
                <Dialog.Panel className="mx-auto max-w-sm rounded bg-slate-600 p-2">
                    <Dialog.Title>Are you sure you want to delete {}</Dialog.Title>
                    <button 
                        className="bg-red-700 hover:bg-red-800"
                        onClick={handleDeleteMerchant}
                    >
                        Confirm Delete
                    </button>
                    <button onClick={() => setDeletePopup(false)}>Cancel</button>
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