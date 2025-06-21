import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { useState } from "react";
import { Loading } from "../components/Loading";
import { StackInvGrid } from "../features/stackInvestment/StackInvGrid";
import { loadInvestmentInfo, initLoader, tempLoader, loadInvestmentInfoInit } from "../features/stackInvestment/stack_investment_slice";
import { checkNumber } from "../utils/helper";
import { Input } from "../components/style/Input_styled";
import { Typography } from "../components/style/Typography_styled";
import { Select } from "../components/style/Select_styled";
import styled from "styled-components";
import { DownloadButton } from "../components/Button";
import { ErrLabel } from "../components/style/Label";
import { useLocation } from "react-router-dom";
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

export const StackInvestmentPage = () => {
  const stinvestment = useSelector((state) => state.stinvestment);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [get_value, set_value] = useState("project_name");
  const dropDownInputRef = useRef(null);
  const dropDownRef = useRef(null);
  const [search_value_err, set_search_value_err] = useState(null);
  const [date_value_err, set_date_value_err] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [disable, set_disable] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(DateTime.now().toFormat("yyyy-MM-dd"));
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      dispatch(loadInvestmentInfoInit())
    }
    dispatch(
      loadPage({
        title: ("View Investments"),

      })
    );
  }, [location]);
  
  useEffect(() => {
    if (stinvestment.loading == "pending") {
      setIsLoading(true)
    } else if (stinvestment.loading != "idle") {
      setTimeout(() => { setIsLoading(false) }, 2000);
    }
  }, [stinvestment.loading]);

  useEffect(() => {
    if (stinvestment.addUpdateLoading == "pending") {
      setIsLoading(true);
    } else if (stinvestment.addUpdateLoading == "succeeded") {
      setIsLoading(false);
      dispatch(loadInvestmentInfoInit());
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (stinvestment.addUpdateLoading != "pending") {
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 5000);
    }
  }, [stinvestment.addUpdateLoading]);

  useEffect(() => {
    if (stinvestment.tempLoading == "pending") {
      setIsLoading(true)
    } else if (stinvestment.tempLoading != "pending" && stinvestment.tempLoading != "idle") {
      setIsLoading(false); dispatch(tempLoader());
    }
  }, [stinvestment.tempLoading]);


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
            request_date: date || DateTime.now().toFormat("yyyy-MM-dd")
          };
          dispatch(loadInvestmentInfo(data));
          set_date_value_err(null);
        } else {
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
    set_value(searchID);
  };

  const handleChangeValue = () => {
    let searchVal = dropDownInputRef.current.value;
    if (!searchVal) {
      set_disable(true)
      set_search_value_err("This field is reruired");

    }
    else if (dropDownRef.current.value == "mobile_no" && !/(^(01){1}[3456789]{1}(\d){8})$/i.test(searchVal)) {
      set_search_value_err("This is not valid mobile number.");
      set_disable(true)
    }
    else {
      set_disable(false)
      set_search_value_err(null);
    };
  };


  const searchType = [
    { key: "project_name", value: "Project Name" },
    { key: "investor_name", value: "Investor Name" },
    { key: "mobile_no", value: "Mobile Number" },
    { key: "amount_equal", value: "Amount Equal" },
    { key: "amount_less", value: "Amount Less" },
    { key: "amount_greater", value: "Amount Above" },
    { key: "status", value: "Status" },
  ];


  return stinvestment.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
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
            <option disabled>--select value</option>
            {searchType?.map((d, i) => (
              <option key={i} value={d.key}>
                {d.value}
              </option>
            ))}
          </Select>
        </Flex>
        <Flex padding="0 10px 0 0 !important" md={2} sm={4} xs={12}>
          <Typography margin="0 0 10px 0" fontWeight="bold" textAlign="left" > Search Value</Typography>
          {(get_value === "project_name" || get_value === "investor_name") && (
            <Input
              app
              ref={dropDownInputRef}
              type="text"
              onChange={handleChangeValue}
              placeholder="search value"
              name="search_value"
              id="search_value"
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
          {(get_value === "amount_equal" || get_value === "amount_less" || get_value === "amount_greater") && (
            <Input
              app
              maxLength="20"
              onChange={handleChangeValue}
              placeholder="type amount"
              onKeyDown={(event) => !checkNumber(event.key) && event.preventDefault()}
              ref={dropDownInputRef}
              name="search_amount"
              id="search_amount"
            />
          )}
          {get_value === "status" && (
            <Select
              app
              defaultValue=""
              ref={dropDownInputRef}
              name="search_status"
              onChange={(e)=>{set_search_value_err(null)}}
              id="search_status"
            >
              <option disabled value={""}>--select value</option>
              <option value="Requested">Requested</option>
              <option value="Verified">Verified</option>
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
          <StackInvGrid open={open} />
        </Flex>
      </Flex>
      <Loading open={isLoading} />
    </>
  );
};


