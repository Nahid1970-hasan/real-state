import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Header } from "./Header";
import whatsapp from "../assets/whatsapp.svg";
import messenger from "../assets/chatbox.svg";
import call from "../assets/call.svg";
import styled from "styled-components";
const ChatButton = styled.div`
    position: fixed;
    z-index: 2;
    bottom: 25px;   
    background: #fff;
    color: inherit;   
    height: 50px;
    cursor: pointer;
    border-radius: 25px;
    padding: 4px;
    ${({call})=> call ? `top:30%; right:0; bottom: auto;`:""}
    ${({left})=> left ? `left:15px;`:""}
    ${({right})=> right ? `right:15px`:""} 
`;
export const LayoutHome = () => {
    return (
        <>
            <Header />
            <div style={{marginBottom: '52px' }}>
                <div style={{position:"relative"}}>
                    <Outlet />
                </div>
                <div style={{position:"absolute"}}>
                    <ChatButton call><a href="/contact" target="_blank"><img src={call} alt="whatsapp"></img></a></ChatButton>
                    <ChatButton left><a href="https://api.whatsapp.com/" target="_blank"><img src={whatsapp} alt="whatsapp"></img></a></ChatButton>
                    <ChatButton right><a href="https://m.me/100075877677192" target="_blank"><img src={messenger} alt="messenger"></img></a></ChatButton>
                    {/* <ChatButton right><MessengerCustomerChat pageId="<PAGE_ID>" appId="<APP_ID>"  htmlRef="<REF_STRING>"/></ChatButton> */}
                </div>
            </div>
           
            <Footer/>
        </>)
}