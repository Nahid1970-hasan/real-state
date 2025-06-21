import { useRef, useState } from "react"
import { Container } from "../components/style/Container_styled"
import { Flex } from "../components/style/Flex_styled"
import { Typography } from "../components/style/Typography_styled"
import { Card, ShadowCard } from "../components/style/Card_styled"
import { Img } from "../components/style/Img_Styled"
import aboutImg from "../assets/re-web/slider2.jpg";
import temImg from "../assets/reg.jpg";
import styled from "styled-components"

const CustFlex = styled(Flex)`
position: relative;
width: 400px;

`;
const AbslteFlex = styled(Flex)`
position: absolute;
top: 25%;
`;

function About() {
    const [isTest, setIsTest] = useState(true);
    const imgRef = useRef();
   
    return (
        <>
            <Flex row>
                <CustFlex padding="10px 0 0 0 !mportant" md={12}>
                    <Img height="500px" width="100%" padding="0" noborder
                        src={aboutImg} srcSet={` `} />

                </CustFlex>

                <AbslteFlex md={12}>
                    <Typography color="bg" fontWeight="bold" fontSize="bodyTitleFontSize">
                        About Us
                    </Typography>
                    <Typography color="bg" fontSize="bodyTitleFontSize">
                        Welcome to  Real Estate
                    </Typography>


                </AbslteFlex>
            </Flex> 
            <Container border="none"> 
                <Flex row>
                    <Flex md={4} padding={"20px 10px 10px 0 !important"}>
                        <ShadowCard>
                            <Typography fontSize="bodySubTitleFontSize" fontWeight="bold">
                                Agency & Brokerage Services
                            </Typography>
                            <Typography fontSize="bodyContentFontSize" >
                                Real Estate offers Agency and Brokerage services from landlords and occupiers,
                                institutional or corporate investors, and developers to local or central government authorities.
                            </Typography>
                        </ShadowCard>
                    </Flex>
                    <Flex md={4} padding={"20px 10px 10px 10px !important"}>
                        <ShadowCard>
                            <Typography fontSize="bodySubTitleFontSize" fontWeight="bold">
                                Financial Reporting
                            </Typography>
                            <Typography fontSize="bodyContentFontSize" >
                                Real Estate offers Agency and Brokerage services from landlords and occupiers,
                                institutional or corporate investors, and developers to local or central government authorities.
                            </Typography>
                        </ShadowCard>
                    </Flex>
                    <Flex md={4} padding={"20px 0 10px 10px !important"}>
                        <ShadowCard>
                            <Typography fontSize="bodySubTitleFontSize" fontWeight="bold">
                                Valuation & Advisory Services

                            </Typography>
                            <Typography fontSize="bodyContentFontSize" >
                                Real Estate offers Agency and Brokerage services from landlords and occupiers,
                                institutional or corporate investors, and developers to local or central government authorities.
                            </Typography>
                        </ShadowCard>
                    </Flex>
                    <Flex row>
                        <Flex md={4} padding={"10px 10px 10px 0 !important"}>
                            <ShadowCard>
                                <Typography fontSize="bodySubTitleFontSize" fontWeight="bold">
                                    Agency & Brokerage Services
                                </Typography>
                                <Typography fontSize="bodyContentFontSize" >
                                    Real Estate offers Agency and Brokerage services from landlords and occupiers,
                                    institutional or corporate investors, and developers to local or central government authorities.
                                </Typography>
                            </ShadowCard>
                        </Flex>
                        <Flex md={4} padding={"10px 10px 10px 10px !important"}>
                            <ShadowCard>
                                <Typography fontSize="bodySubTitleFontSize" fontWeight="bold">
                                    Financial Reporting
                                </Typography>
                                <Typography fontSize="bodyContentFontSize" >
                                    Real Estate offers Agency and Brokerage services from landlords and occupiers,
                                    institutional or corporate investors, and developers to local or central government authorities.
                                </Typography>
                            </ShadowCard>
                        </Flex>
                        <Flex md={4} padding={"10px 0 10px 10px !important"}>
                            <ShadowCard>
                                <Typography fontSize="bodySubTitleFontSize" fontWeight="bold">
                                    Valuation & Advisory Services

                                </Typography>
                                <Typography fontSize="bodyContentFontSize" >
                                    Real Estate offers Agency and Brokerage services from landlords and occupiers,
                                    institutional or corporate investors, and developers to local or central government authorities.
                                </Typography>
                            </ShadowCard>
                        </Flex>
                    </Flex> 
                    <Flex row>
                        <Flex padding="30px!important" md={12}>
                            <Typography fontSize="bodyContentFontSize" textAlign="justify">
                                Real Estate was founded by a highly experienced group of realtors in Dubai specializing in all facets of the real
                                estate business. Combined with over 20 years of experience, knowledge of the Dubai market, and superior negotiating
                                training; Seven Stones Real Estate is the perfect choice for representing you in all your real estate transactions.
                                We are an organized team that is dedicated to providing the highest quality of service using our understanding of
                                each individual area as well as our clientele needs. Our main focus is the customer journey in day-to-day
                                management and our services are tailored to each client. We dedicate our special attention to unique needs
                                and requirements to help hundreds of clients realize their homeownership goals, business setup, and return
                                on investments.
                            </Typography>
                        </Flex>
                    </Flex> 
                    <ShadowCard height="500px">
                        <Flex md={12}>
                            <Typography
                                color={'font'}
                                fontSize={"bodyTitleFontSize"}
                                fontWeight="bold">
                                {("Meet Our Team​")}

                            </Typography>
                            <Typography
                                color={'font'}
                                fontSize={"font"}>
                                {("You are only an email away from our support​")}

                            </Typography>
                        </Flex>
                        <Flex row>
                            <Flex md={3}>
                                <img src={temImg} srcSet={` `} />
                                <Typography
                                    color={'font'}
                                    fontSize={"font"}
                                    fontWeight="bold">
                                    {("Founder")}
                                </Typography>
                                <Typography
                                    color={'font'}
                                    fontSize={"smFont"} >
                                    {("name and others detalis")}
                                </Typography>
                            </Flex>
                            <Flex md={3}>
                                <img src={temImg} srcSet={` `} />
                                <Typography
                                    color={'font'}
                                    fontSize={"font"}
                                    fontWeight="bold">
                                    {("CEO")}
                                </Typography>
                                <Typography
                                    color={'font'}
                                    fontSize={"smFont"} >
                                    {("name and others detalis")}
                                </Typography>
                            </Flex>
                            <Flex md={3}>
                                <img src={temImg} srcSet={` `} />
                                <Typography
                                    color={'font'}
                                    fontSize={"font"}
                                    fontWeight="bold">
                                    {("Sales Manager")}
                                </Typography>
                                <Typography
                                    color={'font'}
                                    fontSize={"smFont"} >
                                    {("name and others detalis")}
                                </Typography>
                            </Flex>
                            <Flex md={3}>
                                <img src={temImg} srcSet={` `} />
                                <Typography
                                    color={'font'}
                                    fontSize={"font"}
                                    fontWeight="bold">
                                    {("Associate Partner")}
                                </Typography>
                                <Typography
                                    color={'font'}
                                    fontSize={"smFont"}
                                >
                                    {("name and others detalis")}
                                </Typography>
                                <br />
                            </Flex>
                        </Flex>
                    </ShadowCard> 
                </Flex> 
            </Container>
            

        </>)
}

export default About;
