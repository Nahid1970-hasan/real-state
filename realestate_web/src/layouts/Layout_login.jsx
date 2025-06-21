import { Outlet } from "react-router-dom"
import backimg from "../assets/re-web/slider2.jpg"
import { HeaderTop } from "../components/HeaderTop"
import { Container } from "../components/style/Container_styled"
import styled from "styled-components"
const LoginLayout = styled.div`
    height: 100vh;
    background-image: url(src/assets/re-web/slider2.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    overflow: hidden scroll ;
`
export const LayoutLogin = () => {
    return (<>
        {/* <header>
            <Container>
                <HeaderTop />
            </Container>
        </header> */}
        <LoginLayout>
        <Outlet />
        </LoginLayout> 
        
    </>)
}