
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import { Typography } from "../components/style/Typography_styled";
import { HLLabel, Label } from "../components/style/Label";
import { Select } from "../components/style/Select_styled";
import { Button, PrimaryButton } from "../components/Button";
import { loadProjectSumInfo, submitProjectSummary, updateSummeryConfig } from "../features/projectSummery/project_summery_Slice";
import { CardHeaderButton } from "../components/style/Card_styled";
import { Input } from "../components/style/Input_styled";
import { Loading } from "../components/Loading";
import { useLocation } from "react-router-dom";
import { formatGridDate } from "../utils/helper";
import { Formik } from "formik";
import styled from "styled-components";

const CustFlex = styled(Flex)`
  padding: 0 10px 0 0;
`;

const CustDiv = styled.div`
  display: flex;
  margin-top: 0.15rem;
  justify-content:${({ end }) => (end ? 'flex-end' : 'flex-start')}; 
  & button:first-child {
      margin: 0 0 2px 0;
    }
  
`;

export const ProjectwiseSummary = () => {
  const dispatch = useDispatch();
  const prosummary = useSelector(state => state.prosummary);
  const [project_id, set_project_id] = useState(0);
  const [dropValue, setDropValue] = useState("");
  const [get_value, set_value] = useState(0);
  const dropDownRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [get_name, set_name] = useState("");
  const [search_value_err, set_search_value_err] = useState(null);
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const [summery_data, set_summery_data] = useState({
    popular_loc: "",
    type_name: "",
    company_investment: 0,
    total_investment: 0,
    company_share: 0,
    project_name: "",
    total_subproject: 0,
    sub_project_sold: 0,
    total_est_sell_amount: 0,
    project_id: 0,
    no_share: 0,
    share_sold: 0,
    receeivable_amount: 0,
    customer_count: 1,
    customer_sell_amount: 0,
    investor_count: 0,
    no_share_for_sell: 105,
    est_start_date: "",
    est_gross_profit: 0,
    unit_price: 0,
    investor_buy_share: 0,
    company_shares: 0,
    est_cost: 0,
    investor_buy_amount: 0,
    est_complete_date: "",
    act_complete_date: "",
    status: ""
  });
  useEffect(() => {

    set_summery_data({
      popular_loc: prosummary?.projectlist?.popular_loc || "---",
      type_name: prosummary?.projectlist?.type_name || "---",
      company_investment: prosummary?.projectlist?.company_investment || "0",
      total_investment: prosummary?.projectlist?.total_investment || "0",
      company_share: prosummary?.projectlist?.company_share || "0",
      project_name: prosummary?.projectlist?.project_name || "---",
      total_subproject: prosummary?.projectlist?.total_subproject || "0",
      sub_project_sold: prosummary?.projectlist?.sub_project_sold || "0",
      total_est_sell_amount: prosummary?.projectlist?.total_est_sell_amount || "0",
      project_id: 0,
      no_share: prosummary?.projectlist?.total_est_sell_amount || "0",
      share_sold: prosummary?.projectlist?.total_est_sell_amount || "0",
      receeivable_amount: prosummary?.projectlist?.total_est_sell_amount || "0",
      customer_count: prosummary?.projectlist?.total_est_sell_amount || "0",
      customer_sell_amount: prosummary?.projectlist?.total_est_sell_amount || "0",
      investor_count: prosummary?.projectlist?.total_est_sell_amount || "0",
      no_share_for_sell: prosummary?.projectlist?.total_est_sell_amount || "0",
      est_start_date: prosummary?.projectlist?.est_start_date || "---",
      est_gross_profit: prosummary?.projectlist?.est_gross_profit || "0",
      unit_price: prosummary?.projectlist?.unit_price || "0",
      investor_buy_share: prosummary?.projectlist?.total_est_sell_amount || "0",
      company_shares: prosummary?.projectlist?.company_shares || "0",
      est_cost: prosummary?.projectlist?.est_cost || "0",
      investor_buy_amount: prosummary?.projectlist?.investor_buy_amount || "0",
      est_complete_date: prosummary?.projectlist?.est_complete_date || "---",
      act_complete_date: prosummary?.projectlist?.act_complete_date || "---",
      status: prosummary?.projectlist?.status || "---",

    })
  }, [prosummary?.projectlist]);


  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      dispatch(loadProjectSumInfo());
    }

    dispatch(loadPage({ title: "Project Summary", button: false }));
  }, [location]);

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
      set_search_value_err("")
      var dropData = prosummary?.list?.find((d) => d.project_id == searchID);
      set_name(dropData.project_name)
      set_value(searchID);
      setDropValue(searchID)
    }
  };
  const SubmitForm = (values) => {
    values.project_id = project_id;
    dispatch(updateSummeryConfig(values));
    set_disabled(true);
  };



  return (
    <>

      <Flex row>
        <CustFlex md={1.2} sm={6} xs={12}>
          <Label>Select Project</Label>
        </CustFlex>
        <CustFlex md={3} sm={6} xs={12}>
          <Select
            app
            ref={dropDownRef}
            name="search_col"
            id="search_col"
            value={dropValue}
            onChange={handleChangeOption}
          >
            <option disabled value={""}>--Select Value</option>
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
        </CustFlex>
        <CustFlex md={3} sm={12} xs={12}>
          <CustDiv>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!get_value}
            >
              Submit
            </Button>
          </CustDiv>
        </CustFlex>
      </Flex>

      <Formik
        initialValues={summery_data}
        // validate={validate}
        enableReinitialize

        onSubmit={SubmitForm}
      >
        {(formik) => {


          const {
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
            isValid,
            dirty,
            resetForm
          } = formik;

          return (
            <form onSubmit={handleSubmit}>
              <Flex row>
                <Flex padding="10px 0 10px 0" md={12}>
                  <HLLabel>
                    <Typography color="primaryFont" fontSize="bodySubTitleFontSize" fontWeight="bold" textAlign="left">
                      Summary
                    </Typography>
                  </HLLabel>

                </Flex> 
                <Flex padding="0!important" md={12}>
                  <Flex row>
                    <Flex padding="0 10px 0 0 !important" md={12}>
                      <Flex row>
                        <Flex padding="0!important" md={"2"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Project Name")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="4" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                          {/* {":"}{" "} {prosummary?.projectlist?.project_name || "----"} */}
                          <Input
                            app
                            type="text"
                            name="project_name"
                            // onKeyDown={(event) => {
                            //   if (!checkNumber(event.key)) {
                            //     event.preventDefault();
                            //   }
                            // }}
                            value={values.project_name || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>
                      <Flex row>
                        <Flex padding="0!important" md={"2"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Project type")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="4" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >

                          <Input
                            app
                            type="text"
                            name="type_name"
                            value={values.type_name || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>
                      <Flex row>
                        <Flex padding="0!important" md={"2"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Location")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="4" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >

                          <Input
                            app
                            type="text"
                            name="popular_loc"
                            value={values.popular_loc || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex padding="10px 10px 0 0 !important" md={12}>
                      <HLLabel>
                        <Typography color="primaryFont" fontSize="bodySubTitleFontSize" fontWeight="bold" textAlign="left">
                          Details Information
                        </Typography>
                      </HLLabel>
                    </Flex>
                    <Flex padding="10px 10px 0 0 !important" md={4}>
                      <Flex row>
                        <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Total Share")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                          <Input
                            app
                            type="text"
                            name="no_share"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            value={values.no_share || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>
                      <Flex row>
                        <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Share/Price")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >

                          <Input
                            app
                            type="text"
                            name="unit_price"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            value={values.unit_price || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>
                      <Flex row>
                        <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Est Cost of Project")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                          {/* {":"}{" "} {prosummary?.projectlist?.est_cost || "----"} */}
                          <Input
                            app
                            type="text"
                            name="est_cost"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            value={values.est_cost || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>

                    </Flex>
                    <Flex padding="10px 10px 10px 0 !important" md={4}>
                      <Flex row>
                        <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Total Investor")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >

                          <Input
                            app
                            type="text"
                            name="investor_count"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            value={values.investor_count || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>
                      <Flex row>
                        <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Shares Sold to Investor")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >

                          <Input
                            app
                            type="text"
                            name="no_share_for_sell"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            value={values.no_share_for_sell || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>
                      <Flex row>
                        <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Amount from Investor")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                          <Input
                            app
                            type="text"
                            name="investor_buy_amount"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            value={values.investor_buy_amount || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>

                    </Flex>
                    <Flex padding="10px 0 10px 0 !important" md={4}>
                      <Flex row>
                        <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Total Sub-projects")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >

                          <Input
                            app
                            type="text"
                            name="total_subproject"
                            value={values.total_subproject || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>

                      <Flex row>
                        <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Total Est. Sell Amount")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >

                          <Input
                            app
                            type="text"
                            name="total_est_sell_amount"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            value={values.total_est_sell_amount || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex padding="10px 0 0 0 !important" md={4}>

                    </Flex>

                    <Flex padding="10px 10px 0 0 !important" md={4}>
                      <Flex row>
                        <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Company Shares")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                          <Input
                            app
                            type="text"
                            name="company_share"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            value={values.company_share || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>
                      <Flex row>
                        <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Company Investment")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >

                          <Input
                            app
                            type="text"
                            name="company_investment"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            value={values.company_investment || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>


                    </Flex>
                    <Flex padding="10px 0 0 0 !important" md={4}>
                      <Flex row>
                        <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Total Customers")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >

                          <Input
                            app
                            type="text"
                            name="customer_count"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            value={values.customer_count || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>
                      <Flex row>
                        <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Sub-project Sold")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                          <Input
                            app
                            type="text"
                            name="sub_project_sold"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            value={values.sub_project_sold || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>
                      <Flex row>
                        <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Amount from Customer")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >

                          <Input
                            app
                            type="text"
                            name="customer_sell_amount"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            value={values.customer_sell_amount || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>
                      <Flex row>
                        <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Amount Receivable")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                          <Input
                            app
                            type="text"
                            name="amnt_receive"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            value={values.amnt_receive || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>

                    </Flex>
                    <Flex padding="0!important" md={4}></Flex>
                    <Flex padding="0 10px 0 0!important" md={"4"}>
                      <Flex row>
                        <Flex padding="0 !important" md="5" sm="6" xs="12" ><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Actual Cost of Project")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                          <Input
                            app
                            type="text"
                            name="act_cost_project"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            placeholder="type actual cost"
                            value={values.act_cost_project || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />

                        </Typography>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex padding="10px 0 0 0 !important" md={4}>
                      <Flex row>
                        <Flex padding="0!important" md={"7"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Est Gross Profit/Loss Amount")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="5" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                          <Input
                            app
                            type="text"
                            name="act_cost_project"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            placeholder="type actual cost"
                            value={values.act_cost_project || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Typography>
                        </Flex>
                      </Flex>
                      <Flex row>
                        <Flex padding="0!important" md={"7"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Gross Profit/Loss Amount")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="5" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                          <Input
                            app
                            type="text"
                            name="act_cost_project"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            placeholder="type actual cost"
                            value={values.act_cost_project || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Typography>
                        </Flex>
                      </Flex>
                      <Flex row>
                        <Flex padding="0!important" md={"7"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Gross Profit/Loss Investor")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="5" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                          <Input
                            app
                            type="text"
                            name="act_cost_project"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            placeholder="type actual cost"
                            value={values.act_cost_project || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Typography>
                        </Flex>
                      </Flex>
                    </Flex>



                    <Flex padding="0!important" md={6}>
                      <Flex row>
                        <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Estimated Complete Date")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="5" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                          <Input
                            app
                            type="text"
                            name="est_complete_date"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            value={values.est_complete_date || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>
                      <Flex row>
                        <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Actual Complete Date")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="5" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >

                          <Input
                            app
                            type="text"
                            name="act_complete_date"
                            onKeyDown={(event) => {
                              if (!checkNumber(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            value={values.act_complete_date || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </Typography>
                        </Flex>
                      </Flex>
                      <Flex row>
                        <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                          {("Project Status")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md="5" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                          <Input
                            app
                            type="text"
                            name="status"
                            placeholder={("----")}
                            value={values.status || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />

                        </Typography>
                        </Flex>
                      </Flex>

                    </Flex>

                  </Flex>
                </Flex>
                <Flex row>
                  <CardHeaderButton>
                    <PrimaryButton
                      type="submit"
                    // className={!(dirty && isValid) ? "disabled-btn" : ""}
                    // disabled={!(dirty && isValid) || disabled}
                    >
                      {("Submit")}
                    </PrimaryButton>
                  </CardHeaderButton>
                </Flex>
              </Flex>
            </form>
          );
        }}
      </Formik>

      <Loading open={isLoading} />
    </>
  );
};
