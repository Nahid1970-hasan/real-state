import { IconButton } from "./IconButton";
import { StyledAlert } from "./style/Alert_styled";

export const Alert = ({ type, children, onClose }) => {
    return <StyledAlert type={type}>
        <div>
            {(() => {
                switch (type) {
                    case "error":
                        return (<div>
                            <span className="material-icons">error_outline</span>
                        </div>);
                    case "success":
                        return (<div>
                            <span className="material-icons">task_alt</span>
                        </div>);
                    default:
                        break;
                }
            })()
            }

            <div>
                {children}
            </div>
        </div>
        {!!onClose ? <IconButton onClose={onClose} color={type == "error" ? "error" : "success"}>
            <span className="material-icons">close</span>
        </IconButton> : <></>}
    </StyledAlert>
}