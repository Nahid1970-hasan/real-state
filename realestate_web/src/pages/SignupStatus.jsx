import { Suspense } from "react";
import { Loader } from "../components/style/Loader_styled";
import { useTranslation } from "react-i18next";
import { Container } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled";
import { Typography } from "../components/style/Typography_styled";
import { Center } from "../components/style/Center_styled";
import { useNavigate } from "react-router-dom";
import { DownloadButton } from "../components/Button";

export const SignupStatus = () => {
    const { t, i18n } = useTranslation();
    const nevigate = useNavigate();
    return <>
        <Suspense fallback={<Loader />}>
            <Container border="none">
                <div style={{ width: "400px", height: "40vh", display: "block", marginLeft: "auto", marginRight: "auto" }}>
                    <Center>
                        <Flex row>
                            <Flex md={12}>
                                <Typography margin="20px 0 0 0" fontSize={"bodyTitleFontSize"} fontWeight={"bold"} color="primary" lineHeight="23px">
                                    Success
                                </Typography> 

                            </Flex>
                            <Flex md={12}>
                                <Typography margin="0" fontSize="bodySubTitleFontSize">{("Registration successfully completed.")}</Typography>
                            </Flex>
                            <Flex md={12}>
                                <Typography margin="0" fontSize="bodySubTitleFontSize">{("Please go to")}
                                <DownloadButton onClick={() => { nevigate("/login") }}>Login</DownloadButton></Typography>
                            </Flex>

                        </Flex>
                    </Center>
                </div>
            </Container>


        </Suspense>
    </>
}