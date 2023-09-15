import ToastMessage from "./ToastMessage";

export enum ToastType {
    Success = "success",
    Warning = "warning",
    Error = "error"
}

export enum ToastPosition {
    TopRight = "toast-top-right",
    TopLeft = "toast-top-left"
}

export interface ToastMessageProps {
    type: ToastType;
    message: string
    position: ToastPosition;
    showTime: number;
}

export {ToastMessage}
