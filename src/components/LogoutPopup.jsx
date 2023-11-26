import { Dialog } from "@headlessui/react";
import PropTypes from 'prop-types'


export const LogoutPopup = ({ setOpenLogout, openLogout, handleLogout }) => {
    return (
        <Dialog open={openLogout} onClose={() => setOpenLogout(false)}>
            <Dialog.Panel>
                <Dialog.Title>Logout?</Dialog.Title>
                <Dialog.Description>Are you sure you want to logout?</Dialog.Description>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={() => setOpenLogout(false)}>Cancel</button>

            </Dialog.Panel>
        </Dialog>
    );
};

LogoutPopup.propTypes = {
    setOpenLogout: PropTypes.any, //look into this more...
    openLogout: PropTypes.bool,
    handleLogout: PropTypes.func
}