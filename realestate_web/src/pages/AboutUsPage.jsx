
import { useDispatch } from "react-redux";
import {
    InfoCard,
    ShadowCard,
} from "../components/style/Card_styled";
import { Container } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled";
import { Typography } from "../components/style/Typography_styled";;
import { Img } from "../components/style/Img_Styled";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
//https://medium.com/nerd-for-tech/how-to-create-a-basic-carousel-component-with-react-redux-516eef5d9b38 carousel
import { Loading } from "../components/Loading";
import { loadPage } from "../features/page/page_slice";
import { loadHomepageData } from "../features/homepage/homepage_slice";
import { useEffect } from "react";
import aboutImg from "../assets/re-web/slider2.jpg";
import temImg from "../assets/reg.jpg";
import styled from "styled-components";
import { HLLabel } from "../components/style/Label";

const CustFlex = styled(Flex)`
position: relative;
width: 400px;

`;
const AbslteFlex = styled(Flex)`
position: absolute;
top: 25%;
`;


export const AboutUsPage = () => {
    const dispatch = useDispatch();
    const imgRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        dispatch(loadPage({ title: "Home", button: false }));
        dispatch(loadHomepageData())
    }, []);



    return (
        <>
            <Flex row>
                <CustFlex padding="10px 0 0 0 !mportant" md={12}>
                    <Img height="500px" width="100%" padding="0" noborder
                        src={aboutImg} srcSet={` `} />

                </CustFlex>


            </Flex>
            <Container border="none">

                <Flex md={12}>
                    <Typography margin="0 0 10px 0" textAlign="center" fontSize="bodyTitleFontSize" fontWeight="bold">
                        About Us
                    </Typography>
                    <Typography margin="0 0 20px 0" textAlign="center" fontSize="bodySubTitleFontSize" fontWeight="bold">
                        Welcome to  Real Estate
                    </Typography>
                </Flex>
                <Flex row>
                    <ShadowCard >
                        <Typography fontSize="bodyContentFontSize" >
                            Selim Real Estate  is a leading real estate company dedicated to helping individuals and families find their perfect home, shopping mall and others. With a deep understanding of the local market, a commitment to excellence, and a customer-centric approach, we provide exceptional services that go beyond traditional real estate transactions.

                            Selim Real Estate  is a leading real estate company dedicated to helping individuals and families find their perfect home, shopping mall and others. With a deep understanding of the local market, a commitment to excellence, and a customer-centric approach, we provide exceptional services that go beyond traditional real estate transactions.
                        </Typography>
                    </ShadowCard>
                </Flex>
                <Flex row>
                    <Flex padding="15px 0 0 0 !important" md={12} >
                        <Typography margin="0 0 10px 0" fontSize="bodyTitleFontSize" fontWeight="bold">
                            Mission
                        </Typography>
                        <ShadowCard>

                            <Typography fontSize="bodyContentFontSize" >

                                To provide world class services, and ensure that our clients get only the best real estate investment opportunities.
                                To provide world class services, and ensure that our clients get only the best real estate investment opportunities.
                                To provide world class services, and ensure that our clients get only the best real estate investment opportunities.
                                To provide world class services, and ensure that our clients get only the best real estate investment opportunities.
                            </Typography>
                        </ShadowCard>
                    </Flex>
                    <Flex md={12} padding={"20px 0 20px 0 !important"}>
                        <Typography margin="0 0 10px 0" fontSize="bodyTitleFontSize" fontWeight="bold">
                            Vision
                        </Typography>
                        <ShadowCard>

                            <Typography fontSize="bodyContentFontSize" >
                                To become the symbol of excellence in the real estate industry all over the world, making real estate investment accessible to everyone through continued application of modern technological advancements.
                                To become the symbol of excellence in the real estate industry all over the world, making real estate investment accessible to everyone through continued application of modern technological advancements.
                                To become the symbol of excellence in the real estate industry all over the world, making real estate investment accessible to everyone through continued application of modern technological advancements.
                                To become the symbol of excellence in the real estate industry all over the world, making real estate investment accessible to everyone through continued application of modern technological advancements.
                            </Typography>
                        </ShadowCard>
                    </Flex>
                </Flex>
                <Flex md={12}>

                    <Flex row>
                        <Flex padding="0 10px 10px 10px !important" md={12}>

                            <Typography fontSize="bodyTitleFontSize" fontWeight="bold">
                                Our Values
                            </Typography>


                        </Flex>

                        <Flex md={3} padding={"20px 10px 10px 10px !important"}>
                            <ShadowCard>
                                <Typography margin="0 0 5px 0" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                    Professionalism
                                </Typography>
                                <Typography fontSize="bodyContentFontSize" >
                                    Our team of experienced real estate professionals possesses in-depth knowledge of the local market trends, neighborhoods,and industry regulations.
                                    We continuously educate ourselves to stay ahead of the curve, providing our clients with accurate information and insightful advice.
                                </Typography>
                            </ShadowCard>
                        </Flex>
                        <Flex md={3} padding={"20px 10px 10px 10px !important"}>
                            <ShadowCard>
                                <Typography margin="0 0 5px 0" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                    Integrity
                                </Typography>
                                <Typography fontSize="bodyContentFontSize" >
                                    We conduct our business with the utmost integrity and professionalism. We believe in transparency, honesty, and
                                    ethical practices in all our interactions, building trust and long-lasting relationships with our clients and partners.
                                     Relationships with our clients and partners.
                                </Typography>
                            </ShadowCard>
                        </Flex>
                        <Flex md={3} padding={"20px 0 10px 10px !important"}>
                            <ShadowCard>
                                <Typography margin="0 0 5px 0" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                    Personalized & Approach

                                </Typography>
                                <Typography fontSize="bodyContentFontSize" >
                                    We understand that each client has specific needs and goals. By listening attentively and understanding their unique requirements,
                                    we tailor our services to deliver customized solutions that meet and exceed their expectations.
                                    A testament to our commitment to delivering results.
                                </Typography>
                            </ShadowCard>
                        </Flex>
                        <Flex md={3} padding={"20px 0 10px 10px !important"}>
                            <ShadowCard>
                                <Typography margin="0 0 5px 0" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                    Exceptional Service

                                </Typography>
                                <Typography fontSize="bodyContentFontSize" >
                                    At Selim Real Estate, we are dedicated to providing an exceptional level of service. We are responsive, proactive, and committed to ensuring a smooth and stress-free experience for our clients.
                                    We prioritize their satisfaction and go the extra mile to exceed their expectations.
                                </Typography>
                            </ShadowCard>
                        </Flex>
                    </Flex>


                </Flex>

                <Flex md={12}>

                    <Flex row>
                        <Flex padding="0 10px 10px 10px !important" md={12}>

                            <Typography fontSize="bodyTitleFontSize" fontWeight="bold">
                                Why Choose Selim Real Estate
                            </Typography>

                        </Flex>

                        <Flex md={3} padding={"20px 10px 10px 10px !important"}>
                            <ShadowCard>
                                <Typography margin="0 0 5px 0" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                    Market Expertise
                                </Typography>
                                <Typography fontSize="bodyContentFontSize" >
                                    Our team possesses a deep understanding of the local real estate market.
                                    We stay informed about current trends, property values, and emerging opportunities,
                                    enabling us to provide valuable insights and guidance to our clients.our commitment to delivering results.
                                </Typography>
                            </ShadowCard>
                        </Flex>
                        <Flex md={3} padding={"20px 10px 10px 10px !important"}>
                            <ShadowCard>
                                <Typography margin="0 0 5px 0" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                    Exceptional Client & Care
                                </Typography>
                                <Typography fontSize="bodyContentFontSize" >
                                    We put our clients at the forefront of everything we do. From the initial consultation to the final transaction,
                                    we prioritize their needs and provide personalized attention and support throughout the process.Provide personalized attention and support throughout the process
                                </Typography>
                            </ShadowCard>
                        </Flex>
                        <Flex md={3} padding={"20px 0 10px 10px !important"}>
                            <ShadowCard>
                                <Typography margin="0 0 5px 0" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                    Proven Track Record

                                </Typography>
                                <Typography fontSize="bodyContentFontSize" >
                                    Selim Real Estate has a track record of successful real estate transactions and satisfied clients. Our reputation for excellence, professionalism,
                                    and exceptional service is a testament to our commitment to delivering results.a testament to our commitment to delivering results.
                                </Typography>
                            </ShadowCard>
                        </Flex>
                        <Flex md={3} padding={"20px 0 10px 10px !important"}>
                            <ShadowCard>
                                <Typography margin="0 0 5px 0" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                    Technology-Driven Approach
                                </Typography>
                                <Typography fontSize="bodyContentFontSize" >
                                    We leverage cutting-edge technology and innovative tools to streamline the real estate process. From advanced property search platforms to virtual tours and digital marketing strategies,
                                    we embrace technology to enhance the client experience and drive successful outcomes.

                                </Typography>
                            </ShadowCard>
                        </Flex>
                    </Flex>

                </Flex>

            </Container>
        </>
    );
};
