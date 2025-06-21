import { Suspense, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadProjectSumInfo, submitProjectSummary } from "../features/projectSummery/project_summery_Slice";
import { loadPage } from "../features/page/page_slice";
import { Loader } from "react-feather";
import { ErrLabel, HLLabel, Label } from "../components/style/Label";
import { Flex } from "../components/style/Flex_styled";
import { Loading } from "../components/Loading";
import { Select } from "../components/style/Select_styled";
import { CardHeaderButton } from "../components/style/Card_styled";
import { PrimaryButton } from "../components/Button";
import { Typography } from "../components/style/Typography_styled";
import { HLChip } from "../components/Chip";
import { checkNumber, numberWithCommas } from "../utils/helper";
import { Input } from "../components/style/Input_styled";
import { loadComSummary } from "../features/projectSummery/company_summary_slice";

export const AdminComSummaryPage = () => {
    const dispatch = useDispatch();
    const comSummaryData = useSelector(state => state.comsummary);
    const user = useSelector((state) => state.user);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    const [summery_data, set_summery_data] = useState({});
    useEffect(() => {
        var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
        if (isvalid) {
            dispatch(loadComSummary());
        }
        dispatch(loadPage({ title: "Company Summary", button: false }));
    }, [location]);

    useEffect(() => {
        set_summery_data(comSummaryData?.summaryData || {})
    }, [comSummaryData?.summaryData]);

    useEffect(() => {
        comSummaryData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [comSummaryData.loading]);


    return <>
        <Suspense fallback={<Loader />}>
            <Flex row>
                <Flex padding="0 5px 0 0 !important" md={6}>
                    <HLLabel>
                        <Typography color="primaryFont" fontSize="bodySubTitleFontSize" fontWeight="bold" textAlign="left">
                        Total Investment Information
                        </Typography>
                    </HLLabel>
                    <Flex row>
                        <Flex padding="10px 0 2px 0" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"No of Share"}
                            </Typography>
                        </Flex>
                        <Flex padding="10px 0 2px 0" md={5}>
                            <Typography textAlign="right" >
                                {summery_data?.total_shares || "0"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="2px" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Investors"}
                            </Typography>
                        </Flex>
                        <Flex padding="2px" md={5}>
                            <Typography textAlign="right" >
                                {summery_data?.investor_count || "0"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="2px" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Shares Sold to Investors"}
                            </Typography>
                        </Flex>
                        <Flex padding="2px" md={5}>
                            <Typography textAlign="right" >
                                {summery_data?.investor_buy_share || "0"}
                            </Typography>
                        </Flex>
                    </Flex>

                    <Flex row>
                        <Flex padding="2px" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Amount from Investors (in Taka)"}
                            </Typography>
                        </Flex>
                        <Flex padding="2px" md={5}>
                            <Typography textAlign="right" >
                                {numberWithCommas(summery_data?.investor_buy_amount || 0)}
                            </Typography>
                        </Flex>
                    </Flex>

                    <Flex row>
                        <Flex padding="2px" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Company Shares"}
                            </Typography>
                        </Flex>
                        <Flex padding="2px" md={5}>
                            <Typography textAlign="right" >
                                {summery_data?.company_shares || "0"}
                            </Typography>
                        </Flex>
                    </Flex>

                    <Flex row>
                        <Flex padding="2px" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Company Investment (in Taka)"}
                            </Typography>
                        </Flex>
                        <Flex padding="2px" md={5}>
                            <Typography textAlign="right" >
                                {numberWithCommas(summery_data?.company_investment || 0)}
                            </Typography>
                        </Flex>
                    </Flex>

                    <Flex row>
                        <Flex padding="2px" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Investment (in Taka)"}
                            </Typography>
                        </Flex>
                        <Flex padding="2px" md={5}>
                            <Typography textAlign="right" >
                                {numberWithCommas(summery_data?.total_investment || 0)}
                            </Typography>
                        </Flex>
                    </Flex>


                </Flex>
                <Flex padding="0 0 0 5px !important" md={6}>
                    <HLLabel>
                        <Typography color="primaryFont" fontSize="bodySubTitleFontSize" fontWeight="bold" textAlign="left">
                        Total Selling Information
                        </Typography>
                    </HLLabel>
                    <Flex row>
                        <Flex padding="10px 0 2px 0" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Projects"}
                            </Typography>
                        </Flex>
                        <Flex padding="10px 0 2px 0" md={5}>
                            <Typography textAlign="right" >
                                {summery_data?.project_count || "0"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="0 0 2px 0" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Sub-projects"}
                            </Typography>
                        </Flex>
                        <Flex padding="0 0 2px 0" md={5}>
                            <Typography textAlign="right" >
                                {summery_data?.total_subproject || "0"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="2px" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Sell Amount (in Taka)"}
                            </Typography>
                        </Flex>
                        <Flex padding="2px" md={5}>
                            <Typography textAlign="right" >
                                {numberWithCommas(summery_data?.total_est_sell_amount || 0)}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="2px" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Customers"}
                            </Typography>
                        </Flex>
                        <Flex padding="2px" md={5}>
                            <Typography textAlign="right" >
                                {summery_data?.customer_count || "0"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="2px" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Sub-project Sold"}
                            </Typography>
                        </Flex>
                        <Flex padding="2px" md={5}>
                            <Typography textAlign="right" >
                                {summery_data?.sub_project_sold || "0"}
                            </Typography>
                        </Flex>
                    </Flex>

                    <Flex row>
                        <Flex padding="2px" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Amount from Customer (in Taka)"}
                            </Typography>
                        </Flex>
                        <Flex padding="2px" md={5}>
                            <Typography textAlign="right" >
                                {numberWithCommas(summery_data?.customer_sell_amount || 0)}
                            </Typography>
                        </Flex>
                    </Flex>

                    <Flex row>
                        <Flex padding="2px" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Amount Receivable (in Taka)"}
                            </Typography>
                        </Flex>
                        <Flex padding="2px" md={5}>
                            <Typography textAlign="right" >
                                {numberWithCommas(summery_data?.receeivable_amount || 0)}
                            </Typography>
                        </Flex>
                    </Flex>

                </Flex>
            </Flex>
            <Flex row>
                <Flex padding="10px 0 10px 0" md={12}>
                    <HLLabel>
                        <Typography color="primaryFont" fontSize="bodySubTitleFontSize" fontWeight="bold" textAlign="left">
                            Total Profit/Loss Information
                        </Typography>
                    </HLLabel>
                    <Flex row>
                        <Flex md={6}>

                            <Flex row>
                                <Flex padding="0!important" md={8}>
                                    <Typography margin="5px 0 0 5px" textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Cost of Project (in Taka)")}
                                    </Typography>
                                </Flex>
                                <Flex padding="0 !important" md={4} sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >

                                    <Typography textAlign="right" >
                                        {numberWithCommas(summery_data?.act_cost || 0)}
                                    </Typography>
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row>
                                <Flex padding="0!important" md={8}>
                                    <Typography margin="5px 0 0 5px" textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Profit/Loss Amount (in Taka)")}
                                    </Typography>
                                </Flex>
                                <Flex padding="0 !important" md={4} sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    <Typography textAlign="right" >
                                        {numberWithCommas(summery_data?.act_profit || 0)}
                                    </Typography>
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row>
                                <Flex padding="0!important" md={8}>
                                    <Typography margin="5px 0 0 5px" textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Profit/Loss Investor")} {"("}{summery_data?.ProfitSharePercent || 0}{"%)"} {"(in Taka)"}
                                    </Typography>
                                </Flex>
                                <Flex padding="0 !important" md={4} sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    <Typography textAlign="right" >
                                        {numberWithCommas(summery_data?.act_profit_investors || 0)}
                                    </Typography>
                                </Typography>
                                </Flex>
                            </Flex>

                        </Flex>
                    </Flex>


                </Flex>
            </Flex>
        </Suspense>

        <Loading open={isLoading} />
    </>

}