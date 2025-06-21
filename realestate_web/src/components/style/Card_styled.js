import styled from "styled-components";
import { Button, PrimaryButton } from "../Button";
import { Link } from "react-router-dom";
import { getBNFont } from "../../utils/helper";

export const Card = styled.div`
  border-radius: 4px;
  overflow: scroll;
  position: relative;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  background: ${({ color, theme }) =>
    !!color ? theme.colors[color] : theme.colors.cardContent};
  padding: 10px;
  width: 100%;
  height:${({  height }) => ( height ? height : "auto")};
`;

export const CardHeader = styled.div`
  font-family: var(--dashboard-font);
  font-size: ${({theme }) => getBNFont(theme.fontSize.bodyTitleFontSize)};
  font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : localStorage.i18nextLng=='en'?"var(--dashboard-font)":"var(--bangla-font)")};
  padding-bottom: ${({  bottom }) => ( bottom ? bottom : "0")};;
`;

export const CardBody = styled.div`
font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : localStorage.i18nextLng=='en'?"var(--dashboard-font)":"var(--bangla-font)")};
  font-size: ${({theme }) =>getBNFont(theme.fontSize.font)};
  background: ${({theme }) =>theme.colors.cardContent};
  color: ${({theme }) =>theme.colors.cardContentFont};
  & textarea {
    width: 100% !important;
    padding: 1rem;
  }
`;

export const CardHeaderButton = styled.div`
  display: flex;
  justify-content: ${({start}) => ( start ? 'flex-start' : 'flex-end')};
  width: 100%;
  margin-right: ${({  right }) => ( right ? right : 0)};
  margin-top: ${({  top }) => ( top ? top : 0)};
  padding:  ${({padding})=>(padding? padding : '0'  )};
  & > button  {  
    margin-right: ${({start}) => ( start ? '5px' : '0')};
    margin-left: ${({start}) => ( start ? '0' : '5px')};
  }

   a {
    font-size:  ${({fontSize, theme}) => getBNFont(theme.fontSize[fontSize ? fontSize:'font'])};
    font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : localStorage.i18nextLng=='en'?"var(--dashboard-font)":"var(--bangla-font)")};
   }
  & ${PrimaryButton} {
    margin: 0;
    margin-right: ${({start}) => ( start ? '5px' : '0')};
    margin-left: ${({start}) => ( start ? '0' : '5px')};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
  }
`;

export const ModalCard = styled(Card)`
  height: ${({  height }) => ( height ? height : "100%")};  
  margin: ${({  margin }) => ( margin ? margin : 0)};
  padding: ${({  padding }) => ( padding ? padding : 0)}; 
  & header {
    background: ${({  background, theme }) => ( background ? theme.colors[background] :theme.colors.modalHeader)};
    color: ${({  color, theme }) => ( color ? theme.colors[color] :theme.colors.modalHeaderFont)};
    font-size:  ${({  fontSize, theme }) =>  getBNFont(theme.fontSize[fontSize ? fontSize:'modalHeaderFontSize'])};
 }  
  & main {
     padding: 15px 30px; 
     background: ${({  bdColor, theme }) => ( bdColor ? theme.colors[bdColor] :theme.colors.modalBody)};
     color: ${({  bdcolor, theme }) => ( bdcolor ? theme.colors[bdcolor] :theme.colors.modalBodyFont)};
     font-size:  ${({  bdFontSize, theme }) => getBNFont(theme.fontSize[bdFontSize ? bdFontSize:'modalBodyFontSize'])};
  }
`;


export const InfoCard = styled(Card)`
  height: ${({  height }) => ( height ? height : "100%")}; 
  background: ${({  background, theme }) => ( background ? theme.colors[background] :theme.colors.infoCardContent)};
  margin-top: ${({  top }) => ( top ? top : 0)};
  position: ${({  position }) => ( position ? position : "center")};
  & section {
    text-align:${({  textAlign }) => ( textAlign ? textAlign : "center")};
    flex: 1;
  }
`;
export const InfoTitle = styled(Card)` 
border-radius: 0;  
padding: 0.4rem 1rem;
background: ${({  background, theme }) => ( background ? theme.colors[background] :theme.colors.infoCardTitle)};
color: ${({theme }) =>theme.colors.infoCardTitleFont};
  margin-top: ${({  top }) => ( top ? top : 0)};
  position: ${({  position }) => ( position ? position : "center")}; 
`;

export const InfoSubTitle = styled(Card)` 
  border-radius: 0;
  padding: 0.4rem 1rem;
  background: ${({  background, theme }) => ( background ? theme.colors[background] :theme.colors.infoCardSubTitle)};
  color: ${({theme }) =>theme.colors.infoCardSubTitleFont};
  margin-top: ${({  top }) => ( top ? top : 0)};
  position: ${({  position }) => ( position ? position : "center")}; 
  height: 100%;
`;

export const PdfCard = styled(Card)`
  height: ${({  height }) => ( height ? height : "100%")}; 
  background: ${({  background, theme }) => ( background ? theme.colors[background] :theme.colors.cardContent)};
  margin-top: ${({  top }) => ( top ? top : 0)};
  position: ${({  position }) => ( position ? position : "center")};
  display: flex;
  justify-content: center; 
`;
export const ShadowCard = styled(Card)` 
  padding:  ${({padding})=>(padding? padding : '10px'  )};
  background: ${({  background, theme }) => ( background ? theme.colors[background] :theme.colors.cardContent)}; 
  box-shadow: 0px 0px 12px 0px #888888; 
 
`;

