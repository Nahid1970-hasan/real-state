import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { useState } from "react";
import { Loading } from "../components/Loading";
import { loadPaymentInfo, initLoader, tempLoader, loadPaymentInfoInit } from "../features/stackPayments/stack_payment_slice";
import { StackPaymentGrid } from "../features/stackPayments/StackPaymentGrid";
import { Suspense } from "react";
import { Loader } from "../components/style/Loader_styled";
import { ErrLabel, Label } from "../components/style/Label";
import styled from "styled-components";
import { DownloadButton } from "../components/Button";
import { Select } from "../components/style/Select_styled";
import { Input } from "../components/style/Input_styled";
import { Typography } from "../components/style/Typography_styled";
import { useLocation } from "react-router-dom";
import { checkNumber } from "../utils/helper";
import { DateTime } from "luxon";
import Flatpickr from "react-flatpickr";

const CustDiv = styled.div`
  display: flex;
  justify-content:${({ end }) => (end ? 'flex-end' : 'flex-start')}; 
  margin-top: 30px;
  & button:first-child {
      margin: 0 0 2px 0;
    }
  
`;

export const StackPaymentPage = () => {
  const stpayment = useSelector((state) => state.stackPayment);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [get_value, set_value] = useState("payee_name");
  const dropDownInputRef = useRef(null);
  const dropDownRef = useRef(null);
  const location = useLocation();
  const [date, setDate] = useState("");
  const [search_value_err, set_search_value_err] = useState(null);
  const [date_value_err, set_date_value_err] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [disable, set_disable] = useState(false);

  useEffect(() => {
    setDate(DateTime.now().toFormat("yyyy-MM-dd"));
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      dispatch(loadPaymentInfoInit());
    }
    dispatch(
      loadPage({
        title: ("View Payment"),
      })
    );
  }, [location]);

  useEffect(() => {
    if (stpayment.loading == "pending") {
      setIsLoading(true)
    } else if (stpayment.loading != "idle") {
      setTimeout(() => { setIsLoading(false) }, 2000);
    }
  }, [stpayment.loading]);


  useEffect(() => {
    if (stpayment.addUpdateLoading == "pending") {
      setIsLoading(true)
    } else if (stpayment.addUpdateLoading == "succeeded") {
      setIsLoading(false)
      dispatch(loadPaymentInfoInit());
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (stpayment.addUpdateLoading != "idle") {
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false) }, 5000);
    }
  }, [stpayment.addUpdateLoading]);

  useEffect(() => {
    if (stpayment.tempLoading == "pending") {
      setIsLoading(true)
    } else if (stpayment.tempLoading != "pending" && stpayment.tempLoading != "idle") {
      dispatch(tempLoader()); setIsLoading(false);
    }
  }, [stpayment.tempLoading]);


  const handleSubmit = (e) => {
    e.preventDefault();
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      set_search_value_err(null);
      let searchVal = dropDownInputRef.current.value;
      if (searchVal) {
        if (date) {
          let data = {
            search_by: dropDownRef.current.value,
            search_value: searchVal,
            payment_date: date || DateTime.now().toFormat("yyyy-MM-dd"),
          };
          dispatch(loadPaymentInfo(data));
          set_date_value_err(null);
        }else{
          set_date_value_err("This field is required.");
        } 
        set_search_value_err(null);
      } else {
        set_search_value_err("This field is required.");
      }
    } else {
      set_search_value_err("Sorry! You are not authorized user to view this page.");
    }

  };
  const handleChangeOption = () => {
    let searchID = dropDownRef.current.value;
    let searchVal = dropDownInputRef.current.value;
    searchVal ? set_search_value_err(null) : set_search_value_err("");
    set_value(searchID);
  };

  const handleChangeValue = () => {
    let searchVal = dropDownInputRef.current.value;
    if (!searchVal) {
      set_disable(true)
      set_search_value_err("This field is reruired");

    } else if (dropDownRef.current.value == "mobile_no" && !/(^(01){1}[3456789]{1}(\d){8})$/i.test(searchVal)) {
      set_search_value_err("This is not valid mobile number.");
      set_disable(true)
    }  else {
      set_disable(false)
      set_search_value_err(null);
    }

  };

  const searchType = [
    { key: "payee_name", value: "Payee Name" },
    { key: "payee_type", value: "Payee Type" },
    { key: "mobile_no", value: "Mobile Number" },
    { key: "cheque_no", value: "Cheque Number" },
    { key: "status", value: "Status" },
  ];

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Flex row>
          <Flex padding="0 10px 0 0 !important" md={2} sm={4} xs={12}>
            <Typography margin="0 0 10px 0" fontWeight="bold" textAlign="left" > Search By</Typography>
            <Select
              app
              ref={dropDownRef}
              name="search_col"
              id="search_col"
              onChange={handleChangeOption}
            >
              <option disabled  >--select value</option>
              {searchType?.map((d, i) => (
                <option key={i} value={d.key}>
                  {d.value}
                </option>
              ))}
            </Select>
          </Flex>
          <Flex padding="0 10px 0 0 !important" md={2} sm={4} xs={12}>
            <Typography margin="0 0 10px 0" fontWeight="bold" textAlign="left" > Search Value</Typography>
            {(
              get_value === "payee_name" || get_value === "cheque_no") && (
                <Input
                  app
                  ref={dropDownInputRef}
                  type="text"
                  onChange={handleChangeValue}
                  placeholder="search value"
                />
              )}
            {get_value === "mobile_no" && (
              <Input
                app
                ref={dropDownInputRef}
                type="text"
                onKeyDown={(event) => {
                  if (!checkNumber(event.key)) {
                    event.preventDefault();
                  }
                }}
                maxLength={11}
                onChange={handleChangeValue}
                placeholder="search value"
              />
            )}
            {get_value === "payee_type" && (
              <Select
                app
                defaultValue=""
                ref={dropDownInputRef}
                name="search_type"
                onChange={(e)=>{set_search_value_err(null)}}
                id="search_type"
              >
                <option disabled value={""}>--select value</option>
                <option value="INVESTOR">INVESTOR</option>
                <option value="CUSTOMER">CUSTOMER</option>
              </Select>
            )}
            {get_value === "status" && (
              <Select
                app
                defaultValue=""
                ref={dropDownInputRef}
                onChange={(e)=>{set_search_value_err(null)}}
                name="search_status"
                id="search_status"
              >
                <option disabled value={""}>--select value</option>
                <option value="Requested">Requested</option>
                <option value="Verified">Verified</option>
                <option value="Wallet">Wallet</option>
              </Select>
            )}
            {search_value_err ? <ErrLabel margin="0px">{search_value_err}</ErrLabel> : null}
          </Flex>
          <Flex padding="0 10px 0 0 !important" md={2} sm={4} xs={12}>
            <Typography margin="0 0 10px 0" fontWeight="bold" textAlign="left" > Payment Date</Typography>
            <Flatpickr
              app
              readOnly
              options={{
                dateFormat: "Y-m-d",
                defaultDate: DateTime.now().toFormat("yyyy-MM-dd")
              }}
              value={date || ""}
              onChange={(e, str) => {
                setDate(str);
                set_date_value_err(null);
              }}
              render={({ value, ...props }, ref) => {
                return (
                  <Input
                    {...props}
                    type="text"
                    name="date"
                    minWidth="auto"
                    placeholder={("pick date")}
                    value={date || ""}
                    ref={ref}
                  />
                );
              }}
            />
            {date_value_err ? <ErrLabel margin="0px">{date_value_err}</ErrLabel> : null}
          </Flex>
          <Flex padding="0 10px 0 0 !important" md={2} sm={12} xs={12}>
            <CustDiv>
              <DownloadButton
                type="button"
                onClick={handleSubmit}
                disabled={disable || !date}
              >
                Submit
              </DownloadButton>
            </CustDiv>
          </Flex>
        </Flex>
        <Flex row>
          <Flex padding="10px 0 0 0 !important" md={12} sm={12} xs={12}>
            <StackPaymentGrid />
          </Flex>
        </Flex>
      </Suspense>
      <Loading open={isLoading} />
    </>
  );
};


