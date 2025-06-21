

import { useDispatch, useSelector } from "react-redux"
import { Flex } from "../components/style/Flex_styled"
import { loadPage } from "../features/page/page_slice";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { loadInvDashboard } from "../features/dashboard/inv_dashboard_slice";
import { HLLabel } from "../components/style/Label";
import { Typography } from "../components/style/Typography_styled";
import { useLocation, useNavigate } from "react-router-dom";
import { formatGridDate, numberWithCommas } from "../utils/helper";
import { HLChip } from "../components/Chip";
import { PrimaryButton } from "../components/Button";

export const InvDashboard = () => {
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const location = useLocation();
    const [editModal, setEditModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userData = useSelector((state) => state.user);
    const user = useSelector(state => state.self.user);
    const invdashboard = useSelector((state) => state.invdashboard);
    const self = useSelector((state) => state.self);

    useEffect(() => {
        if (userData.user_type == "CUSTOMER") {
            nevigate("/cust")
        } else if (userData.user_type == "INV-CUST") {
            nevigate("/reg-type");
        } else if (userData.user_type == "ADMIN") {
            nevigate("/app")
        }
    }, [userData]);


    useEffect(() => {
        var isvalid = userData?.pageList?.find((d) => d == location.pathname);
        if (isvalid) {
            dispatch(loadInvDashboard())
            dispatch(loadPage({
                title: "Investor Deshboard", button: false, onClick: () => {
                }
            }))
        }
    }, [location])

    useEffect(() => {
        invdashboard.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [invdashboard.loading]);

    return <>

        <Flex row>
            <Flex padding="0 !important" md={"12"}>
                <HLLabel>
                    <Flex row>
                        <Flex padding="2px 0 0 0!important" md={8}><Typography color="primaryFont" textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                            {("Last Payment Details")}
                        </Typography></Flex>
                        <Flex padding="0 20px 0 0!important" md={4}>
                                <Typography color="primaryFont" textAlign="right" fontSize="bodyTitleFontSize" >
                                    {("Wallet ")}{" "}{" "} {numberWithCommas(invdashboard?.dashboardState?.wallet_amnt || 0)}{" "} {" Tk"}
                                </Typography>
                        </Flex>
                    </Flex>
                </HLLabel>

                <Flex row>
                    <Flex md={"6"} padding="0 !important">
                        <Flex row>
                            <Flex padding="5px 0 0 10px!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Payment Date")}
                                </Typography>
                            </Flex>
                            <Flex padding="5px 0 0 0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"}{" "} {invdashboard?.lastPayment?.payment_date ? formatGridDate(invdashboard?.lastPayment?.payment_date) : "----"}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 10px!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Payment Method")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"}{" "}     {invdashboard?.lastPayment?.payment_method || "----"}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 10px!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Cheque Number")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"}{" "}     {invdashboard?.lastPayment?.cheque_no || "----"}
                                </Typography>
                            </Flex>
                        </Flex>

                    </Flex>
                    <Flex md={"6"} padding="0 !important">
                        <Flex row>
                            <Flex padding="5px 0 0 10px!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Amount Paid")}
                                </Typography>
                            </Flex>
                            <Flex padding="5px 0 0 0 !important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"}{" "} {numberWithCommas(invdashboard?.lastPayment?.amount || 0)} {" Tk"}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 10px!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Status")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"}{" "} {invdashboard?.dashboardState?.payment_status ? <HLChip background="primary" color="primaryFont" label={invdashboard?.dashboardState?.payment_status} /> : "----"}
                                </Typography>
                            </Flex>
                        </Flex>
                    </Flex>


                </Flex>
            </Flex>
            <Flex padding="10px 5px 10px 0 !important" md={"6"}>

                <Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                    {("Company Bank Information")}
                </Typography>


                <Flex row>
                    <Flex row>
                        <Flex padding="10px 0 0 10px!important" md={4}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Bank Name")}
                            </Typography>
                        </Flex>
                        <Flex padding="10px 0 0 0!important" md={8}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}    {invdashboard?.companyBank?.bank_name || "----"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="0 0 0 10px!important" md={4}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Branch Name")}
                            </Typography>
                        </Flex>
                        <Flex padding="0!important" md={8}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}      {invdashboard?.companyBank?.branch_name || "----"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="0 0 0 10px!important" md={4}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Account Number")}
                            </Typography>
                        </Flex>
                        <Flex padding="0!important" md={8}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}   {invdashboard?.companyBank?.account_no || "----"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="0 0 5px 10px!important" md={4}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Routing Number")}
                            </Typography>
                        </Flex>
                        <Flex padding="0!important" md={8}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}    {invdashboard?.companyBank?.route_no || "----"}
                            </Typography>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex padding="10px 0 10px 5px !important" md={"6"}>

                <Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                    {("Own Bank Information")}
                </Typography>


                <Flex row>
                    <Flex row>
                        <Flex padding="10px 0 0 10px!important" md={4}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Bank Name")}
                            </Typography>
                        </Flex>
                        <Flex padding="10px 0 0 0 !important" md={8}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}   {invdashboard?.own_bank?.bank_name || "----"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="0 0 0 10px!important" md={4}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Branch Name")}
                            </Typography>
                        </Flex>
                        <Flex padding="0!important" md={8}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}    {invdashboard?.own_bank?.branch_name || "----"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="0 0 0 10px!important" md={4}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Account Number")}
                            </Typography>
                        </Flex>
                        <Flex padding="0!important" md={8}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}  {invdashboard?.own_bank?.account_no || "----"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="0 0 0 10px!important" md={4}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Routing Number")}
                            </Typography>
                        </Flex>
                        <Flex padding="0!important" md={8}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}{" "}    {invdashboard?.own_bank?.route_no || "----"}
                            </Typography>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex padding="0 10px 10px 0 !important" md={"12"}>
                <HLLabel>
                    <Typography color="primaryFront" textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                        {("Transaction Summary")}
                    </Typography>
                </HLLabel>

                <Flex row>
                    <Flex md={6} padding="5px 0 10px 0 !important">
                        <Flex row>
                            <Flex padding="5px 0 0 10px!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Paid Count")}
                                </Typography>
                            </Flex>
                            <Flex padding=" 0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"}{" "}    {invdashboard?.dashboardState?.paid_count || "0"}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 10px!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Total Paid")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"}{" "}    {numberWithCommas(invdashboard?.dashboardState?.paid_amount || 0)} {" Tk"}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 10px!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Involved in Projects ")}
                                </Typography>
                            </Flex>

                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"}{" "}  {invdashboard?.dashboardState?.investment_cnt || 0}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 10px!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Shares Bought")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"}{" "}   {invdashboard?.dashboardState?.shares_bought || 0}
                                </Typography>
                            </Flex>
                        </Flex>


                    </Flex>
                    <Flex md={6} padding="5px 0 0 0 !important">
                        <Flex row>
                            <Flex padding="0 0 0 10px!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Total Investment")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"}{" "}    {numberWithCommas(invdashboard?.dashboardState?.investment_amnt || 0)} {" Tk"}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 10px!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Total Withdraw")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"}{" "}    {numberWithCommas((invdashboard?.dashboardState?.withdrawl_investment || 0) + (invdashboard?.dashboardState?.withdrawl_profit || 0))} {" Tk"}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 10px!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Total Release")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"}{" "}    {numberWithCommas((invdashboard?.dashboardState?.release_investment || 0) + (invdashboard?.dashboardState?.release_profit || 0))} {" Tk"}
                                </Typography>
                            </Flex>
                        </Flex>

                        <Flex row>
                            <Flex padding="0 0 0 10px!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Total Profit")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"}{" "} {numberWithCommas(invdashboard?.dashboardState?.total_profit || 0 )}   {" Tk"}
                                </Typography>
                            </Flex>
                        </Flex>


                    </Flex>

                </Flex>
            </Flex>



        </Flex>
        <Loading open={isLoading} />
    </>
}