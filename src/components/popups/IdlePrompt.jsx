import { useIdleTimer } from "react-idle-timer";
import { useState, useEffect } from "react";
import { useUserAuthContext } from '../../providers/AuthProvider';
import { Dialog } from '@headlessui/react';
// import { useNavigate } from 'react-router-dom';
import '../../App.css'


const timeout = 300_000;
const promptBeforeIdle = 60_000

const IdlePrompt = () => {

    // const navigate = useNavigate();
    const { setLogin, setUsers } = useUserAuthContext()

    const [remaining, setRemaining] = useState(timeout)
    const [open, setOpen] = useState(false)

    const onIdle = () => {
        setOpen(false)
        setLogin(false)
        setUsers([])
        // Navigate("/")
        window.localStorage.removeItem("userLoggedIn");
    }

    const onActive = () => {
        setOpen(false)
    }

    const onPrompt = () => {
        setOpen(true)
    }

    const { getRemainingTime, activate } = useIdleTimer({
        onIdle,
        onActive,
        onPrompt,
        timeout,
        promptBeforeIdle,
        throttle: 500
    })

    const handleStillHere = () => {
        activate()
        setOpen(false)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setRemaining(Math.ceil(getRemainingTime() / 1000))
        }, 500)

        return () => {
            clearInterval(interval)
        }
    })

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <Dialog.Overlay className="dialog-background" aria-hidden="true"/>
            <div className="dialog-box">
            <Dialog.Panel className="dialog-styling">
                <Dialog.Title>Are you still here?</Dialog.Title>
                <Dialog.Description>This popup occurs when you have been idle for a long period of time.</Dialog.Description>
                <p>Logging out in {remaining} seconds</p>
                <div className="flex justify-center items-center">
                    <button className="btn"onClick={handleStillHere}>I am still here</button>
                </div>
            </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default IdlePrompt;