import { useEffect, useMemo } from "react";
import { useRef, useState } from "react"
import { StyledCheckbox } from "./style/Checkbox_styled"

export const Checkbox = ({ size, checked = false, disabled=false, selectColor,hoverColor, ...props }) => {
    const [icon, setIcon] = useState(+checked == 2 ? "indeterminate_check_box" : checked ? "check_box" : "check_box_outline_blank");
    const [isChecked, setIsChecked] = useState(checked || false);

    useMemo(() => {  
        setIsChecked(checked); 
        setIcon(+checked == 2 ? "indeterminate_check_box" : checked ? "check_box" : "check_box_outline_blank") 
    }, [checked]);

    return <StyledCheckbox selectColor={selectColor} disabled={disabled} hoverColor={hoverColor} size={size}>
        <input checked={isChecked} disabled={disabled} type="checkbox" onChange={(e) => { setIsChecked(e.target.checked); e.target.checked ? setIcon("check_box") : setIcon("check_box_outline_blank") }} {...props} />
        <span className={size == "md" ? "material-icons md-18" : size == "sm" ? "material-icons md-15" : "material-icons "}>
            {icon}
        </span>
    </StyledCheckbox>
}