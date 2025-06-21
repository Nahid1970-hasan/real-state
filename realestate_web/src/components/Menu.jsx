import { StyledMenu } from "./style/Menu_styled";

export const Menu = ({ children, open, last, top, bottom }) => {
    return <StyledMenu open={open} bottom={bottom} last={last} top={top}>
        <ul id="userpanel">
            {children}
        </ul>
    </StyledMenu>;
}