import styled from "styled-components";
import {theme} from "../../styles/theme";
import { getBNFont } from "../../utils/helper";

export const  RightLabel = styled.span`
  display: flex; 
  align-items: center; 
  justify-content: ${({justifyContent}) => ( justifyContent ? justifyContent : "right")}; 
  margin: ${({margin}) => ( margin ? margin : "4px 0 10px 0")};
  font-size :  ${({ fontSize  , theme}) => getBNFont(theme.fontSize[fontSize ? fontSize:'bodyContentFontSize'])};
  color: ${({color, theme})=> color? theme.colors[color]:theme.colors.font};
  & input {
    margin-top: 0;
  }

  
`;

