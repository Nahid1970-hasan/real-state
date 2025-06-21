import styled from "styled-components";
import {theme} from "../../styles/theme";
import { getBNFont } from "../../utils/helper";

export const  Label = styled.span`
  display: flex; 
  align-items: center;
 // line-height: 1;
  justify-content: ${({justifyContent}) => ( justifyContent ? justifyContent : "left")}; 
  margin: ${({margin}) => ( margin ? margin : "10px 0 5px 0")};
  font-size : ${({ fontSize  , theme}) => getBNFont(theme.fontSize[fontSize ? fontSize:'bodyContentFontSize'])};
  font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : localStorage.i18nextLng=='en'?"var(--dashboard-font)":"var(--bangla-font)")};
  color: ${({color, theme}) => ( color ? theme.colors[color] : theme.colors.font)};
  & input {
    margin-top: 0;
  }

  // &::before {
  //   content: '◀';
  //   margin: 0 10px;
  // }
`;

export const  ErrLabel = styled.span`
  display: flex; 
  align-items: center; 
  justify-content: ${({justifyContent}) => ( justifyContent ? justifyContent : "left")}; 
  margin: ${({margin}) => ( margin ? margin : "5px 0 8px 0")};
  font-size : ${({ fontSize  , theme}) => getBNFont(theme.fontSize[fontSize ? fontSize:'bodyContentFontSize'])};
  font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : localStorage.i18nextLng=='en'?"var(--dashboard-font)":"var(--bangla-font)")};
  color: ${({color, theme}) => ( color ? theme.colors[color] : theme.colors.errFont)};
  & input {
    margin-top: 0;
  }

  // &::before {
  //   content: '◀';
  //   margin: 0 10px;
  // }
`;

export const HLLabel = styled.div`
  background: ${theme.colors.bodySubTitle};
  color: ${theme.colors.bodySubTitleFont};
  font-size : ${getBNFont(theme.fontSize.bodySubTitleFontSize)};
  padding: 5px;
  font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : localStorage.i18nextLng=='en'?"var(--dashboard-font)":"var(--bangla-font)")};
  margin: ${({margin})=>margin?margin:"0"}
`;