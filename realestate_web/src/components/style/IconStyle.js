import styled, { css } from 'styled-components';

export const Icon = styled.i` 
  display: inline-flex;
  margin: ${({margin})=> !!margin? margin: "0px"};
  padding: 8px; 
  height: ${({size})=> !!size? size+"px": "24px"};
  width: ${({size})=> !!size? size+"px": "24px"};
  border-radius: ${({size})=> !!size? (size/2)+"px": "12px"};
  background: ${({theme})=> theme.colors.bg};
  color: ${({theme, color})=> !!color? color : theme.colors.bg}; 
  fill: ${({theme})=> theme.colors.font}; 
  vertical-align: middle;  
  ${({hover})=> hover && css` &:hover {
    border-radius: ${({size})=> !!size? (size/2)+"px": "12px"}; 
    color:  ${({theme, hoverColor})=> !!hoverColor? hoverColor :theme.colors.bg};
    background:  ${({theme, hoverBack})=> !!hoverBack? hoverBack :theme.colors.bg};
    fill:  ${({theme, hoverFill})=> !!hoverFill? hoverFill :theme.colors.bg};
  }`};
`;

export const MenuIcon = styled.i` 
  display: inline-flex;
  margin-right: 8px;
  height: ${({size})=> !!size? size+"px": "24px"};
  width: ${({size})=> !!size? size+"px": "24px"}; 
  background: transparent;
  color: ${({theme, color})=> !!color? color : theme.colors.bg}; 
  vertical-align: middle;   
`;