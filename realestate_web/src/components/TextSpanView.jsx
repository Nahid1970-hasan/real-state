import styled from "styled-components";
import { Typography } from "./style/Typography_styled";

const LBSpan = styled.span`
    text-align:  ${({textAlign})=> textAlign ? textAlign: "left"}; 
    display: inline-flex; 
    flex-direction: column; 
    align-items: ${({textAlign})=> textAlign ? textAlign: "left"}; 
    ${({textAlign})=> textAlign=="left" ? ' padding-left: 5px;':' padding-right: 5px;'} 
`
const TypoGraphy = styled(Typography)` 
    display: inline-flex;   
`
export const TextSpanView = ({ children, textAlign="left", ...props }) => {
    return (<TypoGraphy {...props}> 
        : <LBSpan textAlign={textAlign} >{children}</LBSpan>
    </TypoGraphy>);
}