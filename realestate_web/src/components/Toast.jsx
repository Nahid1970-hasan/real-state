import { useEffect, useState } from "react";
import { StyledToast } from "./style/Toast_styled";

export const Toast = ({ icon, color, msg}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => { 
        !!msg &&
            setOpen(true);
        setTimeout(() => setOpen(false), 4900);
    }, [icon, color, msg]);

    return (
        <StyledToast msg={msg} className={open ? "show" : ""} color={color}>
            <div>
                <span className="material-icons">{icon || "error_outline"}</span>
            </div>
            <div>{msg}</div>
        </StyledToast>);
}