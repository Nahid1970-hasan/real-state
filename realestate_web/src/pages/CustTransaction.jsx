

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import { Typography } from "../components/style/Typography_styled";
import { ErrLabel, HLLabel, Label } from "../components/style/Label";
import { Select } from "../components/style/Select_styled";
import { CardHeaderButton } from "../components/style/Card_styled";
import { PrimaryButton } from "../components/Button";
import { Input } from "../components/style/Input_styled";
import { initTranHist, loadCustTransactionConfig, submitCustTransaction } from "../features/custTransaaction/cust_Transaction_slice";
import { useState } from "react";
import { Loading } from "../components/Loading";
import { HLChip } from "../components/Chip";
import { formatGridDate, numberWithCommas } from "../utils/helper";
import { useLocation } from "react-router-dom";
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

export const CustTransactionPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [get_value, set_value] = useState(0);
  const [get_name, set_name] = useState("");
  const [dropValue, setDropValue] = useState("");
  const [sub_project_id, set_sub_project_id] = useState(0);
  const user = useSelector((state) => state.user);
  const custtransfer = useSelector((state) => state.custtransfer);
  const dropDownRef = useRef(null);
  const [search_value_err, set_search_value_err] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      dispatch(initTranHist())
      dispatch(loadCustTransactionConfig());
    }
   
    dispatch(
      loadPage({
        title: ("Transaction"),
        button: false, 
      })
    );
  }, [location]);

  useEffect(() => {
    custtransfer.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [custtransfer.loading]);

  useEffect(() => {
    custtransfer.detailLoading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [custtransfer.detailLoading]);

  function submitFormValue() {
    let data = {
      sub_project_id: get_value,
    };
    get_value && dispatch(submitCustTransaction(data));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      set_search_value_err(null);
      if (!get_value) {
        set_search_value_err("Please select Sub-project")
      } else {
        setIsLoading(true);
        submitFormValue();
        set_search_value_err(null);
      }
    }else{
      set_search_value_err("Sorry! You are not authorised user to view this page")
    } 
  };
  const handleChangeOption = () => {
    let searchID = dropDownRef.current.value;
    if (!searchID) {
      set_search_value_err("Please select Sub-project")
    } else {
      set_search_value_err("")
      var dropData = custtransfer?.custlist?.find((d) => d.sub_project_id == searchID);
      set_name(dropData.sub_project_name)
      set_value(searchID);
      setDropValue(searchID)
    }
  };

  return (<>
        <Flex row>
          <CustFlex md={1.2} sm={6} xs={12}>
            <Label color="font">Sub-project</Label>
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
              {custtransfer.custlist?.map((d, i) => (
                <option key={i} value={d.sub_project_id}> 
                  {d.sub_project_name}
                </option>
              ))}
            </Select>
            {
              search_value_err ? <ErrLabel>{search_value_err}</ErrLabel> : null
            }

          </CustFlex>
          <CustFlex md={3} sm={12} xs={12}>
          <CustDiv>
              <PrimaryButton
                app
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </PrimaryButton>
            </CustDiv>
          </CustFlex>
        </Flex>
      
   
    <Flex row>
      <Flex padding="10px 10px 0 0 !important" md={6}>
        <HLLabel>
          <Typography color="primaryFont" textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
            {("Project Summary")}
          </Typography>
        </HLLabel>

        <Flex row>
          <Flex padding="5px 0 0 10px!important" md={4}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
              {("Project Name")}
            </Typography>
          </Flex>
          <Flex padding="5px 0 0 0!important" md={8}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "} {custtransfer?.tranHist?.project_summary?.project_name || "----"}
            </Typography>
          </Flex>
        </Flex>
        <Flex row>
          <Flex padding="5px 0 0 10px!important" md={4}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
              {("Project Type")}
            </Typography>
          </Flex>
          <Flex padding="5px 0 0 0!important" md={8}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "}{custtransfer?.tranHist?.project_summary?.type_name || "----"}
            </Typography>
          </Flex>
        </Flex>
        <Flex row>
          <Flex padding="5px 0 0 10px!important" md={4}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
              {("Location")}
            </Typography>
          </Flex>
          <Flex padding="5px 0 0 0!important" md={8}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "}{custtransfer?.tranHist?.project_summary?.popular_loc || "----"}
            </Typography>
          </Flex>
        </Flex>
        <Flex row>
          <Flex padding="5px 0 0 10px!important" md={4}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
              {("Floor#")}
            </Typography>
          </Flex>
          <Flex padding="5px 0 0 0!important" md={8}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "}{custtransfer?.tranHist?.project_summary?.floor_no || "----"}
            </Typography>
          </Flex>
        </Flex>
        <Flex row>
          <Flex padding="5px 0 0 10px!important" md={4}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
              {("Size (Sqft)")}
            </Typography>
          </Flex>
          <Flex padding="5px 0 0 0!important" md={8}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "}{custtransfer?.tranHist?.project_summary?.size_sqft || 0}
            </Typography>
          </Flex>
        </Flex>
        <Flex row>
          <Flex padding="5px 0 0 10px!important" md={4}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
              {("Position/Unit")}
            </Typography>
          </Flex>
          <Flex padding="5px 0 0 0!important" md={8}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "}{custtransfer?.tranHist?.project_summary?.position_unit || "----"}
            </Typography>
          </Flex>
        </Flex>
        <Flex row>
          <Flex padding="5px 0 0 10px!important" md={4}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
              {("Booking Date")}
            </Typography>
          </Flex>
          <Flex padding="5px 0 0 0!important" md={8}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "}{custtransfer?.tranHist?.project_summary?.booking_date?formatGridDate(custtransfer?.tranHist?.project_summary?.booking_date) : "----"}
            </Typography>
          </Flex>
        </Flex>
        <Flex row>
          <Flex padding="5px 0 0 10px!important" md={4}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
              {("Handed Over Date")}
            </Typography>
          </Flex>
          <Flex padding="5px 0 0 0!important" md={8}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "}{custtransfer?.tranHist?.project_summary?.handed_over_date?formatGridDate(custtransfer?.tranHist?.project_summary?.handed_over_date) : "----"}
            </Typography>
          </Flex>
        </Flex>
        <Flex row>
          <Flex padding="5px 0 0 10px!important" md={4}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
              {("Status")}
            </Typography>
          </Flex>
          <Flex padding="5px 0 0 0!important" md={8}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "} {custtransfer?.tranHist?.project_summary?.status?<HLChip label={custtransfer?.tranHist?.project_summary?.status} color={"primaryFont"} background={"primary"}/>:"----"}
            </Typography>
          </Flex>
        </Flex>

      </Flex>
      <Flex padding="10px 0 0 10px !important" md={6}>
        <HLLabel>
          <Typography color="primaryFont" textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
            {("Transaction Summary")}
          </Typography>
        </HLLabel>

        <Flex padding="10px 0 0 0 !important" md={12}>
          <Typography fontSize="bodyContentFontSize" fontWeight="bold" textAlign="left">
            Total Paid
          </Typography>
        </Flex>
        <Flex row>
          <Flex padding="5px 0 0 10px!important" md={4}>
            <Typography textAlign="left" fontSize="bodyContentFontSize">
              {("Down-payment")}{"("}{custtransfer?.tranHist?.paid_summary?.DownpaymentCount||0}{")"} 
            </Typography>
          </Flex>
          <Flex padding="5px 0 0 0!important" md={8}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "}{numberWithCommas(custtransfer?.tranHist?.paid_summary?.DownpaymentAmount ||0)} {"Tk"}
            </Typography>
          </Flex>
        </Flex>
        <Flex row>
          <Flex padding="5px 0 0 10px!important" md={4}>
            <Typography textAlign="left" fontSize="bodyContentFontSize">
              {("Installment")}{"("}{custtransfer?.tranHist?.paid_summary?.InstallmentCount||0}{")"}
            </Typography>
          </Flex>
          <Flex padding="5px 0 0 0!important" md={8}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "}{numberWithCommas(custtransfer?.tranHist?.paid_summary?.InstallmentAmount || 0)} {"Tk"}
            </Typography>
          </Flex>
        </Flex>

        <Flex padding="10px 0 0 0 !important" md={12}>
          <Typography fontSize="bodyContentFontSize" fontWeight="bold" textAlign="left">
            Remaining Amount
          </Typography>
        </Flex>
        <Flex row>
          <Flex padding="5px 0 0 10px!important" md={4}>
            <Typography textAlign="left" fontSize="bodyContentFontSize">
              {("Down-Payment")}{"("}{custtransfer?.tranHist?.unpaid_summary?.DownpaymentCount||0}{")"}
            </Typography>
          </Flex>
          <Flex padding="5px 0 0 0!important" md={8}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "}{numberWithCommas(custtransfer?.tranHist?.unpaid_summary?.DownpaymentAmount || 0)} {"Tk"}
            </Typography>
          </Flex>
        </Flex>
        <Flex row>
          <Flex padding="5px 0 0 10px!important" md={4}>
            <Typography textAlign="left" fontSize="bodyContentFontSize">
              {("Installment")}{"("}{custtransfer?.tranHist?.unpaid_summary?.InstallmentCount||0}{")"}
            </Typography>
          </Flex>
          <Flex padding="5px 0 0 0!important" md={8}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "}{numberWithCommas(custtransfer?.tranHist?.unpaid_summary?.InstallmentAmount || 0)} {"Tk"}
            </Typography>
          </Flex>
        </Flex>
        
      </Flex>
    </Flex>
    <Loading open={isLoading} />
  </>
  );
};
