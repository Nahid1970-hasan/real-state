import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/style/Input_styled";
import { Formik } from "formik";
import { HLLabel, Label } from "../../components/style/Label";
import { useRef } from "react";
import { Loading } from "../../components/Loading";
import { Typography } from "../../components/style/Typography_styled";
import { Flex } from "../../components/style/Flex_styled";
import { initLoader, loadRegisApprove as approve } from "./stack_registration_slice";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { PrimaryButton } from "../../components/Button";

export const StackRegistrationModal = ({
    open,
    setOpen = () => { },
    newInitValues,
}) => {
    const stackRegData = useSelector((state) => state.stackRegistration);
    const dispatch = useDispatch();
    const [user_id, set_user_id] = useState(0);
    const [disabled, set_disabled] = useState();
    const SubmitForm = () => {
        var values = {
            user_id: user_id
        }  
       dispatch(approve(values));
       set_disabled(true);
    };
 
    useEffect(() => {
        if (stackRegData.approveLoading == "succeeded") { 
            setTimeout(() => {setOpen(false); set_disabled(false); }, 2000);
        }else if (stackRegData.approveLoading != "pending" && stackRegData.approveLoading != "idle"){
            setTimeout(() => {set_disabled(false); }, 5000);
        } 
    }, [stackRegData.approveLoading]);

    useEffect(() => {
         set_user_id(stackRegData?.reg_datails?.user_id||"")
    }, [stackRegData.reg_datails]);

    return (
        <>
            <Modal
                md={6}
                sm={8}
                xs={12}
                title={("View Registration")}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
            >
                <Flex row>
                    <Flex padding="0 !important" md={"12"}>
                        <HLLabel margin="0 0 10px 0">
                            <Typography color="primaryFont" textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                {("Credential Information")}
                            </Typography>
                        </HLLabel>
                        <Flex row>
                            <Flex padding="0 !important" md={12}>
                                <Flex row>
                                    <Flex padding=" 0 0 0 5px !important" md={3}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("Mobile")}
                                        </Typography>
                                    </Flex> 
                                    <Flex padding="0!important" md={9}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                          {":"}  {stackRegData.reg_datails.mobile_no||"----"}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 5px !important" md={3}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("Email")}
                                        </Typography>
                                    </Flex> 
                                    <Flex padding="0!important" md={9}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}  {stackRegData.reg_datails.email||"----"}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 5px !important" md={3}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("UserName")}
                                        </Typography>
                                    </Flex> 
                                    <Flex padding="0 !important" md={9}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"} {stackRegData.reg_datails.username||"----"}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 5px !important" md={3}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("Registration Type")}
                                        </Typography>
                                    </Flex>
                                   
                                    <Flex padding="0  !important" md={9}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}  {stackRegData?.reg_datails?.req_type == "INV-CUST" ? "BOTH" : stackRegData?.reg_datails?.req_type || "---"}
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
                                    <Flex padding="0 0 0 5px !important" md={4}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("Full Name")}
                                        </Typography>
                                    </Flex>
                                    <Flex padding="0!important" md={.2}>:</Flex>
                                    <Flex padding=" 0!important" md={7.8}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                            {stackRegData.reg_datails.fullname||"----"}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 5px !important" md={4}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("Father Name")}
                                        </Typography>
                                    </Flex>
                                    <Flex padding="0!important" md={.2}>:</Flex>
                                    <Flex padding="0!important" md={7.8}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                            {stackRegData.reg_datails.fathers_name||"----"}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 5px !important" md={4}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("Mother Name")}
                                        </Typography>
                                    </Flex>
                                    <Flex padding="0!important" md={.2}>:</Flex>
                                    <Flex padding="0!important" md={7.8}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                            {stackRegData.reg_datails.mothers_name||"----"}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 5px !important" md={4}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("Spouse Name")}
                                        </Typography>
                                    </Flex>
                                    <Flex padding="0!important" md={.2}>:</Flex>
                                    <Flex padding="0!important" md={7.8}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                            {stackRegData.reg_datails.spouse_name||"----"}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 5px !important" md={4}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("District")}
                                        </Typography>
                                    </Flex>
                                    <Flex padding="0!important" md={.2}>:</Flex>
                                    <Flex padding="0!important" md={7.8}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                            {stackRegData.reg_datails.district_name||"----"}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 5px !important" md={4}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("Thana")}
                                        </Typography>
                                    </Flex>
                                    <Flex padding="0 !important" md={.2}>:</Flex>
                                    <Flex padding="0 !important" md={7.8}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                            {stackRegData.reg_datails.thana_name||"----"}
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
                                    <Flex padding="0!important" md={.2}>:</Flex>
                                    <Flex padding="0!important" md={7.8}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                            {/* {user.user.address} */}
                                            {stackRegData.reg_datails.address||"----"}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={4}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("Mobile no")}
                                        </Typography>
                                    </Flex>
                                    <Flex padding="0!important" md={.2}>:</Flex>
                                    <Flex padding="0!important" md={7.8}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                            {stackRegData.reg_datails.cm_mobile_no||"----"}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={4}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("Email")}
                                        </Typography>
                                    </Flex>
                                    <Flex padding="0!important" md={.2}>:</Flex>
                                    <Flex padding="0!important" md={7.8}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                            {stackRegData.reg_datails.cm_email||"----"}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={4}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("NID")}
                                        </Typography>
                                    </Flex>
                                    <Flex padding="0!important" md={.2}>:</Flex>
                                    <Flex padding="0!important" md={7.8}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                            {stackRegData.reg_datails.nid||"----"}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding=" 0!important" md={4}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("Nationality")}
                                        </Typography>
                                    </Flex>
                                    <Flex padding="0!important" md={.2}>:</Flex>
                                    <Flex padding="0!important" md={7.8}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                            {stackRegData.reg_datails.nationality||"----"}
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
                                    <Flex padding="0 0 0 5px!important" md={3}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("Account no")}
                                        </Typography>
                                    </Flex> 
                                    <Flex padding=" 0!important" md={9}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}  {stackRegData.reg_datails.account_no||"----"}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 5px !important" md={3}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("Bank Name")}
                                        </Typography>
                                    </Flex> 
                                    <Flex padding="0!important" md={9}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}   {stackRegData.reg_datails.bank_name||"----"}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 5px !important" md={3}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("Branch Name")}
                                        </Typography>
                                    </Flex> 
                                    <Flex padding="0!important" md={9}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}   {stackRegData.reg_datails.branch_name||"----"}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 5px !important" md={3}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("Routing no")}
                                        </Typography>
                                    </Flex> 
                                    <Flex padding="0!important" md={9}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}   {stackRegData.reg_datails.route_no||"----"}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 5px !important" md={3}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                            {("Address")}
                                        </Typography>
                                    </Flex> 
                                    <Flex padding="0!important" md={9}>
                                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}   {stackRegData.reg_datails.bank_address||"----"}
                                        </Typography>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex md={6}></Flex>
                            <Flex padding="0 !important" md={6}>
                                <CardHeaderButton top="5px">
                                    <PrimaryButton
                                        type="submit"
                                        disabled={disabled}
                                        onClick={SubmitForm}
                                    >
                                        Approve
                                    </PrimaryButton>
                                </CardHeaderButton>
                            </Flex>
                        </Flex>

                    </Flex>
                </Flex>

            </Modal >
        </>
    );
};
