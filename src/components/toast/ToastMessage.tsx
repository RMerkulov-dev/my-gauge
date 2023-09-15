import React, {useEffect, useState} from 'react';
import {ToastMessageProps, ToastType} from "./index";

const ToastMessage = ({type, message, position, showTime}: ToastMessageProps) => {
    const [hideToast, setHideToast] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setHideToast(false);
        }, showTime);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const toastConfig = {
        [ToastType.Success]: {
            class: "toast-notification toast-success-color",
            image: "✅"
        },
        [ToastType.Warning]: {
            class: "toast-notification toast-warning-color",
            image: "⭕"
        },
        [ToastType.Error]: {
            class: "toast-notification toast-error-color",
            image: "❌"
        },
    };

    return hideToast ? (
        <div className={`toast-notification-container ${position}`}>
            <div className={`toast-notification ${toastConfig[type].class}`}>
                <p className="toast-image">{toastConfig[type].image}</p>
                <h6 className="toast-message">{message}</h6>
            </div>
        </div>
    ) : null;
};

export default ToastMessage;
