import React, {useEffect, useState} from 'react';
import {ToastMessageProps, ToastType} from "./index";

const ToastMessage = ({type, message, position, showTime}: ToastMessageProps) => {
    const [hideToast, setHideToast] = useState(false);


    useEffect(() => {
        const interval = setInterval(() => {
            setHideToast(true)
        }, showTime);
        return () => {
            clearInterval(interval);
        }
    }, []);

    const ToastSuccess = () => {
        return <div className="toast-notification toast-success-color">
            <p className="toast-image">&#9989;</p>
            <h6 className="toast-message">{message}</h6>
        </div>
    }

    const ToastWarning = () => {
        return (

            <div className="toast-notification toast-warning-color">
                <p className="toast-image">&#11093;</p>
                <h6 className="toast-message">{message}</h6>
            </div>

        )
    }

    const ToastError = () => {
        return <div className="toast-notification toast-error-color">
            <p className="toast-image">&#9940;</p>
            <h6 className="toast-message">{message}</h6>
        </div>
    }

    return (
        <>
            {!hideToast &&
                <div className={`toast-notification-container ${position}`}>
                    {type === ToastType.Success && <ToastSuccess/>}
                    {type === ToastType.Warning && <ToastWarning/>}
                    {type === ToastType.Error && <ToastError/>}
                </div>
            }
        </>

    )
};

export default ToastMessage;
