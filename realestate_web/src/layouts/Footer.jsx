import React from "react";
import { Container } from "../components/style/Container_styled";
import { FooterStyled } from "../components/style/footer_styled";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Typography } from "../components/style/Typography_styled";
import { Flex } from "../components/style/Flex_styled"; 
import { Icon } from "../components/style/IconStyle";
import * as feather from "feather-icons/dist/feather.min";
import { useEffect } from "react";
const Border = styled.div`
    // border: ${({ theme }) => "1px solid "+ theme.colors.primaryBorder};
    padding: 5px;
    border-radius: 20px;
    //background-color: #198da0;
    // &:hover {
    //   padding: 4px;
    //   border: ${({ theme }) => "2px solid "+  theme.colors.primaryHover} ; 
    // }
`;

const FooterMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: start; 
  color: ${({ theme }) => theme.colors.bodyContent};  
  &> a{
    color: ${({ theme }) => theme.colors.bodyContent};
    font-size: ${({ theme }) => theme.fontSize.smFont};
    margin-right: 4px;
    margin-left: 4px;
    padding: 0 5px;
    text-decoration: none; 
    &:hover {
      color:${({ theme }) => theme.colors.primaryHover} ; 
      text-decoration: underline; 
    }
  }

`;
const Footer = () => {
  useEffect(()=>{feather.replace()},[])
  return (
    <>

      <FooterStyled color="font">
        <Container border={"none"}>
          <Flex row>
            <Flex md={12}>
              <Typography  fontSize="bodyTitleFontSize" fontWeight="bold" color="bodyContent" width={"100%"} textAlign="left">
                Selim Realty 
              </Typography> 
              <Typography   color="bodyContent" width={"100%"} textAlign="left">
                 Dhaka-1207, Bangladesh
              </Typography>
            </Flex>
            <Flex padding="10px 0 0 0 !important" md={8}>
              <Flex row>
                <Flex padding="10px 0 0 0 !important" md={4}>
                  <Typography  fontSize="bodySubTitleFontSize" color="bodyContent" width={"100%"} textAlign="left">
                     Company
                  </Typography>
                  <Typography  margin="15px 0 5px 0"  fontSize="smFont" color="bodyContent" width={"100%"} textAlign="left">
                 <FooterMenu><Link to="/au-abtus">About</Link></FooterMenu> 
                  </Typography>
                  <Typography  fontSize="smFont" color="bodyContent" width={"100%"} textAlign="left">
                  <FooterMenu><Link to="/pub-con">Contact Us</Link></FooterMenu>
                  </Typography>
         
                  
                </Flex>
                <Flex padding="10px 0 0 0 !important" md={4}>
                  <Typography   fontSize="bodySubTitleFontSize" color="bodyContent" width={"100%"} textAlign="left">
                    Learn
                  </Typography>
                
                  <Typography margin="15px 0 5px 0" fontSize="smFont" color="bodyContent" width={"100%"} textAlign="left">
                  <FooterMenu margin="0 0 0  0" padding="0 0"><Link to="/pub-faq">FAQs</Link></FooterMenu>
                  </Typography>
                  <Typography  fontSize="smFont" color="bodyContent" width={"100%"} textAlign="left">
                  <FooterMenu> <Link to="/pub-inq">Feedback</Link></FooterMenu>
                  </Typography>
                 
                </Flex>
                <Flex padding="10px 0 0 0 !important" md={4}>
                  <Typography  fontSize="bodySubTitleFontSize" color="bodyContent" width={"100%"} textAlign="left">
                    Connect with us
                  </Typography><br />    
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Border><a href="https://www.facebook.com/" target="_blank"><Icon hoverColor="white" hoverFill="white" hoverBack="blue" color="black" data-feather="facebook" hover size={40}/></a></Border>
                      <Border><a href="https://www.twitter.com/" target="_blank"><Icon hoverColor="white" hoverFill="white" hoverBack="#0dbbe0" color="black" data-feather="twitter" hover size={40}/></a></Border> 
                      <Border><a href="https://www.instagram.com/" target="_blank"><Icon hoverColor="red" hoverFill="white"  hoverBack="red" data-feather="instagram" hover size={40}/></a></Border>
                      <Border><a href="https://www.linkedin.com/" target="_blank"><Icon  hoverColor="white" hoverFill="white" hoverBack="#1bbc9b"  color="black" data-feather="linkedin" hover size={40}/></a></Border>
                      <Border><a href="https://www.youtube.com/" target="_blank"><Icon  hoverColor="red" hoverFill="white"  hoverBack="red" data-feather="youtube" hover size={40}/></a></Border>
                    </div> 
                </Flex>
              </Flex>
            </Flex>
            <Flex md={4}></Flex>
            <Flex md={12}>
            <FooterMenu>
              <Typography  textAlign="left"  fontSize="smFont" color="bodyContent" margin={"0 5px 0 0"}>  © 2023 KDRL. All rights reserved</Typography>  {" | "} 
              <Link to="/pub-termcon">Terms & Conditions</Link>  {" | "} 
              <Link to="/pub-disclaim">Privacy Policy</Link> 
            </FooterMenu>   
            </Flex>

          </Flex>
        </Container>

      </FooterStyled>






    </>
  );
};

export default Footer;
