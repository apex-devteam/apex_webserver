import { Dialog } from "@headlessui/react";
import PropTypes from 'prop-types';
import { useRef } from "react";


export const LogoutPopup = ({ setOpenLogout, openLogout, handleLogout }) => {

    let hoverLogout = useRef(null)

    return (
        <Dialog 
            open={openLogout} 
            onClose={() => {}} 
            initialFocus={hoverLogout}
        >
            <Dialog.Overlay className="dialog-background" aria-hidden="true"/>
                <div className="dialog-box">
                    <Dialog.Panel className="dialog-styling">
                        <Dialog.Title>Logout?</Dialog.Title>
                        <Dialog.Description>Are you sure you want to logout?</Dialog.Description>
                        <div className="flex space-x-4 justify-center">
                            <button  className="btn secondary-btn" ref={hoverLogout} onClick={handleLogout} >Logout</button>
                            <button className="btn"onClick={() => setOpenLogout(false)}>Cancel</button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
    );
};

LogoutPopup.propTypes = {
    setOpenLogout: PropTypes.any, //look into this more...
    openLogout: PropTypes.bool,
    handleLogout: PropTypes.func
}