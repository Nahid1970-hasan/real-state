
import { useDispatch, useSelector } from "react-redux"
import { Flex } from "../components/style/Flex_styled"
import { loadPage } from "../features/page/page_slice";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { Typography } from "../components/style/Typography_styled";
import { HLLabel } from "../components/style/Label";
import { useLocation, useNavigate } from "react-router-dom";
import { loadCustDashboard } from "../features/dashboard/cust_dashboard_slice";
import { formatGridDate, numberWithCommas } from "../utils/helper";
import { HLChip } from "../components/Chip";

export const CustDashboard = () => {
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const userData = useSelector((state) => state.custdashboard);
    const user = useSelector(state => state.user);

    useEffect(() => {
        var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
        if (isvalid) {
            dispatch(loadCustDashboard());
            dispatch(loadPage({
                title: "Dashboard", button: false, onClick: () => {
                }
            }))
        } 
    }, [location])

    useEffect(() => {
        if (user.user_type == "INVESTOR") {
            nevigate("/inv")
        } else if (user.user_type == "INV-CUST") {
            nevigate("/reg-type");
        } else if (user.user_type == "ADMIN") {
            nevigate("/app")
        }
    }, [user]);

    useEffect(() => {
        userData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [userData.loading]);
    return <>

        <Flex row>
            <Flex padding="0 !important" md={"12"}>
                <HLLabel>
                    <Typography color="primaryFont" textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                        {("Last Payment Details")}
                    </Typography>
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
                                    {":"}  {userData?.dashboardState?.last_payment?.payment_date ? formatGridDate(userData?.dashboardState?.last_payment?.payment_date) : "----"}
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
                                    {":"}  {userData?.dashboardState?.last_payment?.payment_method||"----"}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 10px!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Payment Purpose")}
                                </Typography>
                            </Flex>

                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {userData?.dashboardState?.last_payment?.payment_for||"----"}
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

                            <Flex padding="5px 0 0 0 !important" md={7}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"}  {numberWithCommas(userData?.dashboardState?.last_payment?.amount || 0)}  {"Tk"}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 10px!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Status")}
                                </Typography>
                            </Flex>

                            <Flex padding="0!important" md={7}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {userData?.dashboardState?.payment_status ? <HLChip background={"primary"} color={"primaryFont"} label={userData?.dashboardState?.payment_status || ""} /> : "----"}
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
                        <Flex padding="5px 0 0 10px!important" md={4}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Bank Name")}
                            </Typography>
                        </Flex>
                        <Flex padding="5px 0 0 0!important" md={8}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {userData?.dashboardState?.company_bank?.bank_name||"----"}
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
                                {":"} {userData?.dashboardState?.company_bank?.branch_name||"----"}
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
                                {":"}  {userData?.dashboardState?.company_bank?.account_no||"----"}
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
                                {":"} {userData?.dashboardState?.company_bank?.route_no||"----"}
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
                        <Flex padding="5px 0 0 10px!important" md={4}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Bank Name")}
                            </Typography>
                        </Flex>
                        <Flex padding="5px 0 0 0!important" md={8}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {userData?.dashboardState?.own_bank?.bank_name||"----"}
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
                                {":"}  {userData?.dashboardState?.own_bank?.branch_name||"----"}
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
                                {":"}  {userData?.dashboardState?.own_bank?.account_no||"----"}
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
                                {":"}  {userData?.dashboardState?.own_bank?.route_no||"----"}
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
                                    {":"}  {userData?.dashboardState?.paid_count||0}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 10px!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Paid Amount")}
                                </Typography>
                            </Flex>

                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"}  {numberWithCommas(userData?.dashboardState?.paid_amount || 0)}  {"Tk"}
                                </Typography>
                            </Flex>
                        </Flex>

                    </Flex>
                    <Flex md={6} padding="5px 0 0 0 !important">

                        <Flex row>
                            <Flex padding="0 0 0 10px!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Remaining Installment")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"}  {userData?.dashboardState?.rem_installment||0}  
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 10px!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Remaining Amount")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={7}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"}  {numberWithCommas(userData?.dashboardState?.rem_amount || 0)} {"Tk"}
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