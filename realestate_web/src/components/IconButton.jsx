import { StyledIconButton } from "./style/IcontButton_styled"

export const IconButton = ({ children,padding ,onClick, color, bgColor, style , alignment, width ,display, nothover }) => {
    return <StyledIconButton bgColor={bgColor} padding={padding} style={style} color={color} alignment={alignment} width= {width} display={display} nothover onClick={onClick}>
        {children}
    </StyledIconButton>
}