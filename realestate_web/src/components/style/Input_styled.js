import styled, { css } from "styled-components";
import { getBNFont } from "../../utils/helper";

export const Input = styled.input`
  display: ${({display , type})=> display? display: type=="checkbox"? "inline-block" : "block"};
  // ${({type})=> type !== "checkbox" && css`width: 100%;`}
  padding: 0.375rem 0.75rem;
  margin-top: ${({ app, marginTop }) => (app ? ".15rem" : marginTop? marginTop: "0.55rem")};
  margin-left: ${({type})=> type=="checkbox" || type=="radio"? "10px" : "0"};
  ${({type})=> type == "checkbox" && css`margin-right: 0.55rem;`}
  border:  ${({ color,theme }) => (color ? "1px solid "+theme.colors[color] : "1px solid "+theme.colors.inputBorder)};
  border-radius: ${({ app }) => (app ? "0.3rem" : 0)}; 
  font-weight: 400;
  line-height: 1.5;
  height: ${({type})=> type=="checkbox" || type=="radio"? "20px" : "35px"};
  font-size: ${({ fontSize  , theme}) => theme.fontSize[fontSize ? fontSize:'font']};
  color:  ${({theme }) =>theme.colors.inputFont} ;
  background-color: ${({theme }) =>theme.colors.inputBackground} ;
  width: ${({ width, type }) => (type !== "checkbox"  && type !== "radio" ? width ? width : "100%":"auto")};
  max-width: ${({ maxWidth, type }) => (type !== "checkbox" && type !== "radio" ? maxWidth ? maxWidth : "100%":"auto")};
  min-width: ${({ minWidth, type }) => (type !== "checkbox" && type !== "radio" ? minWidth ? minWidth : "100%":"auto")};;
  background-clip: padding-box;
  appearance: menulist-button;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : localStorage.i18nextLng=='en'?"var(--dashboard-font)":"var(--bangla-font)")};
  ${({height})=> height && css`height: ${height};`}
  &:focus {
    outline: none;
    border:  ${({theme }) => ("2px solid "+theme.colors.inputBorder)};
  }
`;

export const ChipInput = styled(Input)`
  padding: 0; 
  margin: 0;
  height: 30px;
  width: 40px;
  min-width: 40px;
`

