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
import { Button, DownloadButton, PrimaryButton } from "../components/Button";
import { Typography } from "../components/style/Typography_styled";
import { HLChip } from "../components/Chip";
import { checkNumber, numberWithCommas } from "../utils/helper";
import { Input } from "../components/style/Input_styled";
import { ProjectCompleteModal } from "../features/projectSummery/ProjectCompleteModal";
import { Checkbox } from "../components/Checkbox";
import styled from "styled-components";
const CustDiv = styled.div`
  display: flex;
  margin-top: 0.15rem;
  justify-content:${({ end }) => (end ? 'flex-end' : 'flex-start')}; 
  & button:first-child {
      margin: 0 0 2px 0;
    }
  
`;

export const AdmProjectSummaryPage = () => {
    const dispatch = useDispatch();
    const prosummary = useSelector(state => state.prosummary);
    const user = useSelector((state) => state.user);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const dropDownRef = useRef(null);
    const [get_value, set_value] = useState(0);
    const [act_cost, set_act_cost] = useState(0);
    const [gpl_amount, set_gpl_amount] = useState(0);
    const [gpl_investor, set_gpl_investor] = useState(0);
    const [search_value_err, set_search_value_err] = useState(null);
    const [summery_data, set_summery_data] = useState({});
    const [req_data, set_req_data] = useState({});
    const [open, setOpen] = useState(false);
    useEffect(() => {
        var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
        if (isvalid) {
            dispatch(loadProjectSumInfo());
        }
        dispatch(loadPage({ title: "Project Summary", button: false }));
    }, [location]);

    useEffect(() => {
        set_summery_data(prosummary?.projectlist || {});
        set_gpl_investor(prosummary?.projectlist?.est_gross_profit_investor || 0);
        set_gpl_amount(prosummary?.projectlist?.est_gross_profit || 0);
    }, [prosummary.projectlist]);

    useEffect(() => {
        prosummary.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [prosummary.loading]);

    function submitFormValue() {
        let data = {
            project_id: get_value,
        };
        get_value && dispatch(submitProjectSummary(data));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!get_value) {
            set_search_value_err("Please select project")
        } else {
            submitFormValue();
            set_search_value_err(null);
        }
    };

    const handleChangeOption = () => {
        let searchID = dropDownRef.current.value;
        if (!searchID) {
            set_search_value_err("Please select project")
        } else {
            set_value(searchID);
            set_search_value_err("");
        }
    };

    function cmpProjectSubmit() {
        var data = {
            project_id: summery_data?.project_id || 0,
            act_cost: act_cost,
            act_profit: gpl_amount,
            act_profit_investors: gpl_investor
        }
        if (summery_data.status != "Completed") {
            setOpen(true);
            set_req_data(data);
        }
    }
    return <>
        <Suspense fallback={<Loader />}>

            <Flex row>
                <Flex padding="0 10px 0 0 !important" md={1.2} sm={6} xs={12}>
                    <Label>Select Project</Label>
                </Flex>
                <Flex padding="0 10px 0 0 !important" md={3} sm={6} xs={12}>
                    <Select
                        app
                        defaultValue={0}
                        ref={dropDownRef}
                        name="search_col"
                        id="search_col"
                        onChange={handleChangeOption}
                    >
                        <option disabled value={0}>--select value</option>
                        {prosummary.list?.map((d, i) => (
                            <option key={i} value={d.project_id}>
                                {" "}
                                {d.project_name}
                            </option>
                        ))}
                    </Select>
                    {
                        search_value_err ? <ErrLabel margin={"0px"}>{search_value_err}</ErrLabel> : null
                    }
                </Flex>

                <Flex padding="0 10px 0 0 !important" md={3} sm={12} xs={12}>
                <CustDiv>
                    <Button
                        color="primaryButton"
                        fontColor="primaryButtonFont"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!get_value}
                    >
                        Submit
                    </Button>
                    </CustDiv>

                </Flex>
            </Flex>
            <Flex row>
                <Flex padding="10px 0 10px 0" md={12}>
                    <HLLabel>
                        <Typography color="primaryFont" fontSize="bodySubTitleFontSize" fontWeight="bold" textAlign="left">
                            Project Information
                        </Typography>
                    </HLLabel>
                    <Flex row>
                        <Flex padding="10px 0 2px 0" md={2}>
                            <Typography textAlign="left" fontWeight="bold">
                                {" Project Name"}
                            </Typography>
                        </Flex>
                        <Flex padding="10px 0 2px 0" md={10}>
                            <Typography textAlign="left" >
                                {":"} {summery_data?.project_name || "----"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="2px" md={2}>
                            <Typography textAlign="left" fontWeight="bold">
                                {" Type Name"}
                            </Typography>
                        </Flex>
                        <Flex padding="2px" md={10}>
                            <Typography textAlign="left" >
                                {":"} {summery_data?.type_name || "----"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="2px" md={2}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Address"}
                            </Typography>
                        </Flex>
                        <Flex padding="2px" md={10}>
                            <Typography textAlign="left" >
                                {":"} {summery_data?.address || "----"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="2px" md={2}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Popular Location"}
                            </Typography>
                        </Flex>
                        <Flex padding="2px" md={10}>
                            <Typography textAlign="left" >
                                {":"} {summery_data?.popular_loc || "----"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="2px" md={2}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Est. Start Date"}
                            </Typography>
                        </Flex>
                        <Flex padding="2px" md={10}>
                            <Typography textAlign="left" >
                                {":"} {summery_data?.est_start_date || "----"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="2px" md={2}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Est. Completion Date"}
                            </Typography>
                        </Flex>
                        <Flex padding="2px" md={10}>
                            <Typography textAlign="left" >
                                {":"} {summery_data?.est_complete_date || "----"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="2px" md={2}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Status"}
                            </Typography>
                        </Flex>
                        <Flex padding="2px" md={10}>
                            <Typography textAlign="left" >
                                {":"} {summery_data?.status ? <HLChip label={summery_data?.status || ""} background="primary" color={"primaryFont"} /> : "----"}
                            </Typography>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex row>
                <Flex padding="0 5px 0 0 !important" md={6}>
                    <HLLabel>
                        <Typography color="primaryFont" fontSize="bodySubTitleFontSize" fontWeight="bold" textAlign="left">
                            Investment Information
                        </Typography>
                    </HLLabel>
                    <Flex row>
                        <Flex padding="10px 0 2px 0" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Total Share"}
                            </Typography>
                        </Flex>
                        <Flex padding="10px 0 2px 0" md={5}>
                            <Typography textAlign="right" >
                                {summery_data?.no_share || "0"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="2px" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Price/Share (in Taka)"}
                            </Typography>
                        </Flex>
                        <Flex padding="2px" md={5}>
                            <Typography textAlign="right" >
                                {numberWithCommas(summery_data?.unit_price || 0)}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="2px" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Total Investor"}
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
                                {"Total Investment (in Taka)"}
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
                            Selling Information
                        </Typography>
                    </HLLabel>
                    <Flex row>
                        <Flex padding="10px 0 2px 0" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Total Sub-projects"}
                            </Typography>
                        </Flex>
                        <Flex padding="10px 0 2px 0" md={5}>
                            <Typography textAlign="right" >
                                {summery_data?.total_subproject || "0"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="2px" md={7}>
                            <Typography textAlign="left" fontWeight="bold">
                                {"Total Sell Amount (in Taka)"}
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
                                {"Total Customers"}
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

                    <Flex row>
                        <Flex md={6}>
                            <HLLabel>
                                <Typography color="primaryFont" fontSize="bodySubTitleFontSize" fontWeight="bold" textAlign="left">
                                    Estimated Profit/Loss Information
                                </Typography>
                            </HLLabel>
                            <Flex row>
                                <Flex padding="10px 0 2px 0" md={7}>
                                    <Typography textAlign="left" fontWeight="bold">
                                        {"Profit/Loss Amount (in Taka)"}
                                    </Typography>
                                </Flex>
                                <Flex padding="10px 0 2px 0" md={5}>
                                    <Typography textAlign="right" >
                                        {numberWithCommas(summery_data?.est_gross_profit || 0)}
                                    </Typography>
                                </Flex>
                            </Flex>
                            <Flex row>
                                <Flex padding="2px 0" md={7}>
                                    <Typography textAlign="left" fontWeight="bold">
                                        {"Profit/Loss Investor (in Taka)"}
                                    </Typography>
                                </Flex>
                                <Flex padding="2px 0" md={5}>
                                    <Typography textAlign="right" >
                                        {numberWithCommas(summery_data?.est_gross_profit_investor || 0)}
                                    </Typography>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex md={6}>
                            <HLLabel>
                                <Typography color="primaryFont" fontSize="bodySubTitleFontSize" fontWeight="bold" textAlign="left">
                                    Actual Profit/Loss Information
                                </Typography>
                            </HLLabel>
                            <Flex row>
                                <Flex padding="0!important" md={8}>
                                    <Typography margin="5px 0 0 5px" textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Cost of Project (in Taka)")}
                                    </Typography>
                                </Flex>
                                <Flex padding="0 !important" md={4} sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >

                                    {summery_data.status == "Completed" ? <Typography textAlign="right" >
                                        {numberWithCommas(summery_data?.act_cost || 0)}
                                    </Typography>
                                        : <Input
                                            app
                                            type="text"
                                            name="act_cost"
                                            onKeyDown={(event) => { if (!checkNumber(event.key)) event.preventDefault() }}
                                            value={act_cost}
                                            maxLength={12}
                                            onChange={(e) => {
                                                set_act_cost(e.target.value);
                                                var actcost = parseInt(e.target.value || 0);
                                                var ttSell = parseInt(summery_data?.total_est_sell_amount || 0);
                                                var ttPrcn = parseInt(summery_data?.ProfitSharePercent || 0);
                                                var grsamount = ttSell - actcost;
                                                var actPrcntg = parseInt(grsamount * (ttPrcn / 100));
                                                set_gpl_amount(grsamount);
                                                set_gpl_investor(actPrcntg);
                                            }}
                                            disabled={!get_value}
                                        />}
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
                                    {summery_data.status == "Completed" ? <Typography textAlign="right" >
                                        {numberWithCommas(summery_data?.act_profit || 0)}
                                    </Typography> : <Input
                                        app
                                        type="text"
                                        name="gpl_amount"
                                        maxLength={12}
                                        onKeyDown={(event) => { if (!checkNumber(event.key)) event.preventDefault() }}
                                        value={gpl_amount}
                                        onChange={(e) => {
                                            set_gpl_amount(e.target.value)
                                        }}
                                        disabled
                                    />}
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
                                    {summery_data.status == "Completed" ? <Typography textAlign="right" >
                                        {numberWithCommas(summery_data?.act_profit_investors || 0)}
                                    </Typography> : <Input
                                        app
                                        type="text"
                                        name="gpl_investor"
                                        maxLength={12}
                                        onKeyDown={(event) => { if (!checkNumber(event.key)) event.preventDefault() }}
                                        value={gpl_investor}
                                        onChange={(e) => {
                                            set_gpl_investor(e.target.value)
                                        }}
                                        disabled={!get_value}
                                    />}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row>
                                <Flex padding={"10px 0"} md={8} />

                                <Flex padding={"10px 0 !important"} md={4}>
                                    <CardHeaderButton>
                                        {
                                            summery_data.status == "Completed" ? <></> :
                                                <PrimaryButton full onClick={() => cmpProjectSubmit()} disabled={act_cost < 1}>
                                                    Complete this Project
                                                </PrimaryButton>}
                                    </CardHeaderButton>
                                </Flex>
                            </Flex>
                        </Flex>

                    </Flex>


                </Flex>
            </Flex>
        </Suspense>
        <ProjectCompleteModal open={open} setOpen={setOpen} data={req_data} />
        <Loading open={isLoading} />
    </>

}