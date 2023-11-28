import { Dialog } from "@headlessui/react";
import PropTypes from 'prop-types';
import { useRef } from "react";


export const LogoutPopup = ({ setOpenLogout, openLogout, handleLogout }) => {

    let hoverLogout = useRef(null)

    return (
        <Dialog 
            open={openLogout} 
            onClose={() => setOpenLogout(false)} 
            className="fixed inset-0 z-50 overflow-auto"
            initialFocus={hoverLogout}
        >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 " aria-hidden="true"/>
            <div className="fixed inset-0 bg-black/30 ">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
                    <Dialog.Panel className="relative p-4 rounded-md bg-blue-950 border ">
                        <Dialog.Title>Logout?</Dialog.Title>
                        <Dialog.Description>Are you sure you want to logout?</Dialog.Description>
                        <div className="flex space-x-4">
                            <button ref={hoverLogout} onClick={handleLogout} className="bg-red-950">Logout</button>
                            <button onClick={() => setOpenLogout(false)}>Cancel</button>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
};

LogoutPopup.propTypes = {
    setOpenLogout: PropTypes.any, //look into this more...
    openLogout: PropTypes.bool,
    handleLogout: PropTypes.func
}