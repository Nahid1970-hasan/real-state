import { StyledBadge } from "./style/Badge_styled"

export const Badge = ({ children, onClick=()=>{},value, badgeContent, iconbackground, background}) => {
    return (<StyledBadge badgeContent={badgeContent} iconbackground={iconbackground} background={background}>
        {children}
       { value ? <span onClick={ onClick }>{badgeContent??"New"}</span>:<></>}
    </StyledBadge>);
}