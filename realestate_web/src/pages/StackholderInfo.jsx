import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { useEffect } from "react";
import { detailtLoader, loadStakeholder, loadStakeholderInit } from "../features/stackholderInfo/stackholder_info_slice";
import { ViewStackholderGrid } from "../features/stackholderInfo/StackInfoGrid";
import { CardBody } from "../components/style/Card_styled";
import { Select } from "../components/style/Select_styled";
import { Flex } from "../components/style/Flex_styled";
import { ErrLabel, Label } from "../components/style/Label";
import { loadPage } from "../features/page/page_slice";
import { Loading } from "../components/Loading";
import { DownloadButton } from "../components/Button";
import styled from "styled-components";
import { Input } from "../components/style/Input_styled";
import { loadDistrict } from "../features/district/district_slice";
import { Typography } from "../components/style/Typography_styled";
import { useLocation } from "react-router-dom";
import { checkNumber } from "../utils/helper";



const CustLabel = styled(Label)`
   width: 120px;
`;

// const CustDiv = styled.div` 
//   display: flex;
//   padding-top:0px; 
//   & button:first-child{
//     margin-right:5px;
//   }
//   & button:last-child{
//     margin-left:4px;
//   }
// `;

const CustDiv = styled.div`
  display: flex;
  justify-content:${({ end }) => (end ? 'flex-end' : 'flex-start')}; 
  margin-top: 30px;
  & button:first-child {
      margin: 0 0 2px 0;
    }
  
`;

export const StackholderInfoPage = () => {
  const dispatch = useDispatch();
  const stackInfoData = useSelector(state => state.stackInfo);
  const district = useSelector((state) => state.district);
  const [stakeholder_type, set_stakeholder_type] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [get_value, set_value] = useState("district_id");
  const dropDownInputRef = useRef(null);
  const dropDownRef = useRef(null);
  const [search_value_err, set_search_value_err] = useState(null);
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const [disable, set_disable] = useState(false);

  useEffect(() => {

    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      setIsLoading(true);
      dispatch(loadDistrict());
      dispatch(loadStakeholderInit());
    }

    dispatch(loadPage({ title: "View Stakeholder", button: false }));

  }, [location]);


  const handleSubmit = (e) => {
    e.preventDefault();
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      set_search_value_err(null);
      let searchVal = dropDownInputRef.current.value;
      if (get_value == "mobile_no" && !/(^(01){1}[3456789]{1}(\d){8})$/i.test(searchVal)) {
        set_search_value_err("This is not valid mobile number.");
      } else if (searchVal) {
        let data = {
          search_by: dropDownRef.current.value,
          search_value: dropDownInputRef.current.value
        };

        dispatch(loadStakeholder(data));
        set_search_value_err(null);
      } else {
        set_search_value_err("This field is required.");

      }
    } else {
      set_search_value_err("Sorry! You are not authorized user to view this page.");
    }

  };

  useEffect(() => {
    stackInfoData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [stackInfoData.loading]);


  useEffect(() => {
    if (stackInfoData.detailLoading == "pending") {
      setIsLoading(true)
    } else if (stackInfoData.detailLoading == "succeeded") {
      setTimeout(() => { dispatch(detailtLoader()); setIsLoading(false); }, 2000);
    } else if (stackInfoData.detailLoading != "idle") {
      setTimeout(() => { dispatch(detailtLoader()); setIsLoading(false); }, 2000);
    }
  }, [stackInfoData.detailLoading]);

  const handleChangeOption = (values) => {
    let searchID = dropDownRef.current.value;
    set_value(searchID)
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
    { key: "district_id", value: "District Name", },
    { key: "address", value: "Address", },
    { key: "mobile_no", value: "Mobile Number", },
    { key: "login_type", value: "Type", },
  ]

  return (
    <>
      <CardBody>
        <form >
          <Flex row>
            <Flex padding="0 10px 0 0 !important" md={2} sm={6} xs={12}>
              <Typography margin="0 0 10px 0" fontWeight="bold" textAlign="left" > Search By</Typography>
              <Select
                app
                ref={dropDownRef}
                name="search_by"
                onChange={handleChangeOption}>
                <option disabled > {("--Select Value")}</option>
                {
                  searchType?.map((d, i) => (<option key={i} value={d.key}>{d.value}</option>))
                }
              </Select>

            </Flex>
            <Flex padding="0 10px 0 0 !important" md={3} sm={6} xs={12}>
              <Typography margin="0 0 10px 0" fontWeight="bold" textAlign="left" > Search Value</Typography>

              {
                (get_value === 'address') &&
                <Input
                  app
                  ref={dropDownInputRef}
                  type="text"
                  name="search_value"
                  onChange={handleChangeValue}
                  placeholder={("search value")}
                />
              }
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
              {
                get_value === 'district_id' &&
                <Select
                  app
                  ref={dropDownInputRef}
                  defaultValue={""}
                  onChange={handleChangeValue}
                  name="search_value">
                  <option disabled value={""}>{("--select value")}</option>
                  {
                    district?.list?.map((d, i) => (
                      <option key={i} value={d.district_id}>{d.district_name}
                      </option>
                    ))
                  }
                </Select>
              }
              {
                get_value === 'login_type' &&
                <Select
                  ref={dropDownInputRef}
                  onChange={handleChangeValue}
                  defaultValue={""}
                  name="search_value">
                  <option disabled value={""}> {("--select value")}</option>
                  <option value={"INVESTOR"}>Investor</option>
                  <option value={"CUSTOMER"}>Customer</option>
                  <option value={"INV-CUST"}>Both</option>

                </Select>
              }

              {search_value_err ? (
                <ErrLabel>{search_value_err}</ErrLabel>
              ) : null}

            </Flex>
            <Flex padding="0 10px 0 0 !important" md={2} sm={12} xs={12}>
              <CustDiv>
                <DownloadButton
                  type="submit"
                  onClick={handleSubmit}
                  disabled={disable}
                >
                  {("Submit")}
                </DownloadButton>
              </CustDiv>
            </Flex>

          </Flex>

        </form>
        <Flex row>
          <Flex padding="10px 0 0 0 !important" md={12} sm={12} xs={12}>
            <ViewStackholderGrid />
          </Flex>

        </Flex>
      </CardBody>
      <Loading open={isLoading} />
    </>
  );
};
