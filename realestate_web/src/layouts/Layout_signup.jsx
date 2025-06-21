import { Outlet } from "react-router-dom"
import { HeaderTop } from "../components/HeaderTop"
import { Container } from "../components/style/Container_styled"
import styled from "styled-components"
import { Img } from "../components/style/Img_Styled";
import backImg from "../assets/re-web/image3.jpg";
const SPLIT = styled.div`
    height: 100%;
    width: 50%;
    position: fixed;
    z-index: 1;
    overflow:  ${({right})=> right ? "visible":"scroll"};
    top: 0;
    ${({left})=> left ? `left:0`:""}
    ${({right})=> right ? `right:0`:""} 
`;
export const LayoutSignup = () => {
    return (<> 
        <div>
            <SPLIT left>
                <Outlet />
            </SPLIT>
            <SPLIT right>
               <img style={{width:"100%"}} src={backImg}></img>
            </SPLIT>
           
        </div>
    </>)
}