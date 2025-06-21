import styled from "styled-components";

export const FooterStyled = styled.div`  
    bottom: 0; 
    left: 0; 
    user-select: none;
    color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.primaryFont)}; 
    width: 100%;
    max-width: 100%;
    padding: 8px 10px;
    margin:  auto;
    display: block;
    box-sizing: border-box;
    background: ${({ theme }) => theme.colors.primary}; 
`