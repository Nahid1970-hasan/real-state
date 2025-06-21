import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Container } from "../components/style/Container_styled";
import { StyledHeaderTop } from "../components/style/headertop_styled";
import { HeaderTop } from "../components/HeaderTop";
import { StyledNavbar } from "../components/style/navbar_styled";
import { theme } from "../styles/theme";
import styled from "styled-components";



export const Header = () => {
    return (
        <>
            {/* <header>
                
            <HeaderTop search/>
               
            </header> */}
            <Navbar />
        </>
    );
}