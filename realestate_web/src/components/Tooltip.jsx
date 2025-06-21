import { useState } from "react"
import { Center } from "./style/Center_styled"
import { TooltipBox, TooltipTarget, TooltipWrapper } from "./style/Tooltip_styled"

export const Tooltip = ({ title, children, position,headerTitle, background, color, width }) => {
    const [isHover, setIsHover] = useState(false);

    return <TooltipWrapper>
        <TooltipTarget  background={background} width={width} color={color} headerTitle={headerTitle}  onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {children}
        </TooltipTarget>
        {
            isHover &&
            (<Center>
                <TooltipBox position={position}>{title}</TooltipBox>
            </Center>)
        }

    </TooltipWrapper>
}