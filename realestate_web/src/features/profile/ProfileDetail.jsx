
import { useDispatch, useSelector } from "react-redux"
import { Flex } from "../../components/style/Flex_styled"
import { Typography } from "../../components/style/Typography_styled";
import { t } from "i18next";
import { Underline } from "react-feather";
import styled from "styled-components";

export const ProfileDetail = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.self.user);


    const UnderLine = styled.div`
    display:block;
    height: 1.5px; 
    width: 100%;
    background-color: #a7a4a4;
`;

    return <Flex row>
        <Flex row>
            {/* <Flex padding="0!important" md={"1.5"}><Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                {t("name")}
            </Typography></Flex>
            <Flex md=".2" padding="0 !important">:</Flex> */}
            <Flex padding="10px 0 0 0 !important" md="9" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold" >
                {user.fullname}
            </Typography>
            </Flex>
            <Flex padding="10px 0 !important" md={4} sm={12}>
                <UnderLine />
            </Flex>
        </Flex>

        <Flex row>
            <Flex padding="0 !important" md={"1.5"}><Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                {t("Designation")}
            </Typography></Flex>
            <Flex md=".2" padding="0 !important">:</Flex>
            <Flex padding="0 !important" md="9" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodySubTitleFontSize" >
                {user.designation}
            </Typography>
            </Flex>
        </Flex>

        <Flex row>
            <Flex padding="0 !important" md={"1.5"}><Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                {t("Nick Name")}
            </Typography></Flex>
            <Flex md=".2" padding="0 !important">:</Flex>
            <Flex padding="0 !important" md="9" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodySubTitleFontSize" >
                {user.nickname}
            </Typography>
            </Flex>
        </Flex>

        <Flex row>
            <Flex padding="0 !important" md={"1.5"}><Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                {t("Email")}
            </Typography></Flex>
            <Flex md=".2" padding="0 !important">:</Flex>
            <Flex padding="0 !important" md="9" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodySubTitleFontSize" >
                {user.email}
            </Typography>
            </Flex>
        </Flex>
        <Flex row>
            <Flex padding="0 !important" md={"1.5"}><Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                {t("Mobile Number")}
            </Typography></Flex>
            <Flex md=".2" padding="0 !important">:</Flex>
            <Flex padding="0 !important" md="9" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodySubTitleFontSize">
                {user.mobile_no}
            </Typography>
            </Flex>
        </Flex>
 
        {/* <Flex row>
            <Flex padding="0 !important" md={"1.5"}><Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                {t("default_lang")}
            </Typography></Flex>
            <Flex md=".2" padding="0 !important">:</Flex>
            <Flex padding="0 !important" md="9" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodySubTitleFontSize" >
                {langs[user?.default_lang?.toLowerCase() || 'en'].nativeName}
            </Typography>
            </Flex>
        </Flex> */}


    </Flex>
}