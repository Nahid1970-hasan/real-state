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
import { initLoader } from "./stackholder_info_slice";
import { Flex } from "../../components/style/Flex_styled";
import { numberWithCommas } from "../../utils/helper";

export const ViewStackholderModal = ({
    open,
    setOpen = () => { },
    newInitValues,
}) => {
    const stackInfoData = useSelector(state => state.stackInfo);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    return (
        <>
            <Modal
                md={8}
                sm={10}
                xs={12}
                title={("View Stakeholder")}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                outsideclick
            >
                <Flex row>
                    <Flex padding="0 0 10px 0!important" md={12}>
                        <HLLabel>
                            <Typography color="primaryFont" fontSize="bodySubTitleFontSize" fontWeight="bold" textAlign="left">
                                Credential Information
                            </Typography>
                        </HLLabel>

                        <Flex row>
                            <Flex padding="5px 0 0 10px !important" md={"2"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Mobile Number")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md="10" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                             {":"} {" "}  {stackInfoData?.stakeholder_detail?.cm_mobile_no||""}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 10px !important" md={"2"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Email")}
                            </Typography></Flex>
                            <Flex padding="0 !important" md="10" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                            {":"} {" "}  {stackInfoData?.stakeholder_detail?.cm_email}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 10px !important" md={"2"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Username")}
                            </Typography></Flex>
                            <Flex padding="0 !important" md="10" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                            {":"} {" "}    {stackInfoData?.stakeholder_detail?.username}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 10px !important" md={"2"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Registration Type")}
                            </Typography></Flex>
                            <Flex padding="0 !important" md="10" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                            {":"} {" "}  {stackInfoData?.stakeholder_detail?.req_type=="INV-CUST"?"BOTH":stackInfoData?.stakeholder_detail?.req_type||"---"}
                            </Typography>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex md={12}>
                        <HLLabel>
                            <Typography color="primaryFont" fontSize="bodySubTitleFontSize" fontWeight="bold" textAlign="left">
                                Detail Information
                            </Typography>
                        </HLLabel>
                        <Flex row>
                            <Flex padding="5px 0 0 0!important" md={6}>
                                <Flex row>
                                    <Flex padding="0 0 0 10px!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Full Name")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {" "}  {stackInfoData?.stakeholder_detail?.fullname}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 10px !important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Father's Name")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {" "}    {stackInfoData?.stakeholder_detail?.fathers_name}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 10px !important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Mother's Name")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {" "}    {stackInfoData?.stakeholder_detail?.mothers_name}
                                    </Typography>
                                    </Flex>
                                </Flex>

                                <Flex row>
                                    <Flex padding="0 0 0 10px !important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Spouse name")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {" "}   {stackInfoData?.stakeholder_detail?.spouse_name}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 10px !important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("District")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {" "}    {stackInfoData?.stakeholder_detail?.district_name}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 10px !important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Thana")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {" "}   {stackInfoData?.stakeholder_detail?.thana_name}
                                    </Typography>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex padding="4px 0 0 0 !important" md={6}>
                                <Flex row>
                                    <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Address")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {" "}  {stackInfoData?.stakeholder_detail?.address}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Mobile Number")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {" "}   {stackInfoData?.stakeholder_detail?.mobile_no}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Email")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {" "}  {stackInfoData?.stakeholder_detail?.email}
                                    </Typography>
                                    </Flex>
                                </Flex>

                                <Flex row>
                                    <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("NID")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {" "}  {stackInfoData?.stakeholder_detail?.nid}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Nationality")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {" "}    {stackInfoData?.stakeholder_detail?.nationality}
                                    </Typography>
                                    </Flex>
                                </Flex>

                            </Flex>

                        </Flex>
                    </Flex>
                    <Flex md={12}>
                        <HLLabel>
                            <Typography color="primaryFont" fontSize="bodySubTitleFontSize" fontWeight="bold" textAlign="left">
                                Bank Information
                            </Typography>
                        </HLLabel>

                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={6}>
                                <Flex row>
                                    <Flex padding="0 0 0 10px !important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Account Number")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {" "}    {stackInfoData?.stakeholder_detail?.account_no}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 10px !important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Bank Name")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {" "}  {stackInfoData?.stakeholder_detail?.bank_name}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 10px !important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Branch Name")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {" "}   {stackInfoData?.stakeholder_detail?.branch_name}
                                    </Typography>
                                    </Flex>
                                </Flex>

                            </Flex>
                            <Flex padding="4px 0 0 0 !important" md={6}>
                                <Flex row>
                                    <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Routing Number")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {" "}  {stackInfoData?.stakeholder_detail?.route_no}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Address")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {" "}  {stackInfoData?.stakeholder_detail?.bank_address}
                                    </Typography>
                                    </Flex>
                                </Flex>

                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex md={12}>
                        <HLLabel>
                            <Typography color="primaryFont" fontSize="bodySubTitleFontSize" fontWeight="bold" textAlign="left">
                                Payment Information
                            </Typography>
                        </HLLabel>

                        <Flex padding="0 !important" md={6}>
                            <Flex row>
                                <Flex padding="5px 0 0 10px!important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Total Payments")}
                                </Typography></Flex>
                                <Flex padding="5px 0 0 0!important" md={7} sm={6} xs={12} > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {numberWithCommas(stackInfoData?.stakeholder_others?.total_payment||0)}{" "}{" "}{"Taka"}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row>
                                <Flex padding="0 0 0 10px !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Involved in Project(s)")}
                                </Typography></Flex>
                                <Flex padding="0 !important" md={7} sm={6} xs={12} > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "}   {stackInfoData?.stakeholder_others?.involve_project}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row>
                                <Flex padding="0 0 0 10px !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Shares Owned")}
                                </Typography></Flex>
                                <Flex padding="0 !important" md={7} sm={6} xs={12} > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "}   {stackInfoData?.stakeholder_others?.shares_owned}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row>
                                <Flex padding="0 0 0 10px !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Investment Amount")}
                                </Typography></Flex>
                                <Flex padding="0 !important" md={7} sm={6} xs={12} > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "}   {numberWithCommas(stackInfoData?.stakeholder_others?.total_investment||0)}{" "}{" "}{"Taka"}
                                </Typography>
                                </Flex>
                            </Flex>

                            <Flex row>
                                <Flex padding="0 0 0 10px !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Amount in Wallet")}
                                </Typography></Flex>
                                <Flex padding="0 !important" md={7} sm={6} xs={12} > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "}    {numberWithCommas(stackInfoData?.stakeholder_others?.amnt_in_wallet||0)}{" "}{" "}{"Taka"}
                                </Typography>
                                </Flex>

                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Modal >
            <Loading open={isLoading} />
        </>
    );
};
