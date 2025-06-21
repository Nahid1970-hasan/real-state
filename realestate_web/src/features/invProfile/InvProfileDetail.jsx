import { useDispatch, useSelector } from "react-redux"
import { Flex } from "../../components/style/Flex_styled"
import { Typography } from "../../components/style/Typography_styled";
import { useEffect } from "react";
import { HLLabel } from "../../components/style/Label";
import { loadInvProfile } from "./inv_profile_slice";

export const InvProfileDetail = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.invprofile);  
    return <>
        <Flex row>
            <Flex padding="0 !important" md={"12"}>
                <HLLabel margin="0 0 10px 0">
                    <Typography color="primaryFont" textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                        {("Credential Information")}
                    </Typography>
                </HLLabel>
                <Flex row>
                    <Flex padding="0 !important" md={6}>
                        <Flex row>
                            <Flex padding="0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Mobile Number")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}{user.user.cm_mobile_no}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Email")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}{user.user.cm_email}
                                </Typography>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex padding="0 !important" md={6}>
                        <Flex row>
                            <Flex padding="0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Username")}
                                </Typography>
                            </Flex>
                            <Flex padding="0 !important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "} {user.user.username}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Registration Type")}
                                </Typography>
                            </Flex>
                            <Flex padding="0  !important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}Investor
                                </Typography>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>

                <HLLabel margin="10px 0">
                    <Typography color="primaryFont" textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                        {("Detail Information")}
                    </Typography>
                </HLLabel>
                <Flex row>
                    <Flex padding="0 !important" md={6}>
                        <Flex row>
                            <Flex padding=" 0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Full Name")}
                                </Typography>
                            </Flex>
                            <Flex padding=" 0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}{user.user.fullname}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Father's Name")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}{user.user.fathers_name}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Mother's Name")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}{user.user.mothers_name}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Spouse Name")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}{user.user.spouse_name}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("District")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}{user.user.district_name}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 !important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Thana")}
                                </Typography>
                            </Flex>
                            <Flex padding="0 !important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}{user.user.thana_name}
                                </Typography>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex padding="0 !important" md={6}>
                        <Flex row>
                            <Flex padding="0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Address")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}{user.user.address}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Mobile Number")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}{user.user.mobile_no}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Email")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}{user.user.email}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("NID")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}{user.user.nid}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding=" 0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Nationality")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}{user.user.nationality}
                                </Typography>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <HLLabel margin="10px 0">
                    <Typography color="primaryFont" textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                        {("Bank Information")}
                    </Typography>
                </HLLabel>
                <Flex row>
                    <Flex padding="0 !important" md={12}>
                        <Flex row>
                            <Flex padding="0!important" md={2}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Account Number")} 
                                </Typography>
                            </Flex>
                            <Flex padding=" 0!important" md={10}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                   {":"}{" "} {user.user.account_no}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={2}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Bank Name")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={10}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                  {":"}{" "}  {user.user.bank_name}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={2}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Branch Name")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={10}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "} {user.user.branch_name}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={2}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Routing Number")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={10}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}    {user.user.route_no}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={2}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Address")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={10}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}{user.user.bank_address}
                                </Typography>
                            </Flex>
                        </Flex>
                    </Flex>

                </Flex>

            </Flex>
        </Flex>
    </>

}