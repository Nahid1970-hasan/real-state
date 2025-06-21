import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, ContainerBody } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled";
import { loadFeedbackData } from "../features/feedback/feedback_slice";
import { FeedbackDropdown } from "../features/homeFeedback/FeedbackDropdown";
import { loadPage } from "../features/page/page_slice";
import { theme } from "../styles/theme";
import { useState } from "react";
import { Loading } from "../components/Loading";
import { Typography } from "../components/style/Typography_styled";


export const HomeFeedback = () => {

    return (
        <>
            <Flex row>
                <Flex padding="10px 0 0 0 !important" md={12}>
                    <Typography
                        margin="1rem"
                        fontSize="bodyTitleFontSize" 
                        fontWeight="bold"
                    >
                        Feedback
                    </Typography>
                </Flex>
            </Flex>
            <Container border="none" >
                <ContainerBody>
                    <FeedbackDropdown />
                </ContainerBody>
            </Container>


        </>
    );
};
