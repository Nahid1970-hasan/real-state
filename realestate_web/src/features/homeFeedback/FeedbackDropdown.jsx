import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, DownloadButton } from "../../components/Button";
import {
  Card,
  CardBody,
  CardHeaderButton,
  InfoCard,
} from "../../components/style/Card_styled";
import { Flex } from "../../components/style/Flex_styled";
import { Input } from "../../components/style/Input_styled";
import { Select } from "../../components/style/Select_styled";
import { initLoader, loadFeedback, searchHomeFeedback } from "./homeFeedback_slice";
import { FeedbackEditModal } from "./FeedbackEditModal";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { ErrLabel, Label } from "../../components/style/Label";
import { Typography } from "../../components/style/Typography_styled";
import { loadPage } from "../page/page_slice";
import Flatpickr from "react-flatpickr";
import { Loading } from "../../components/Loading";
import { PubFeedbackGrid } from "./PubFeedbackGrid";
import { Toast } from "../../components/Toast";
import { useLocation } from "react-router-dom";
const CustFlex = styled(Flex)`
  padding: 0 !important;
  margin-right:10px;
`;
const CustDiv = styled.div`
  padding-top: 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  & button:first-child {
    margin-left: 5px;
  }
  & button:last-child {
    margin-left: 5px;
  }
`;

export const FeedbackDropdown = () => {
  const homeFeedback = useSelector((state) => state.homefeedback);
  const district = useSelector((state) => state.district);
  const requestType = useSelector((state) => state.requestType);

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [get_value, set_value] = useState("fullname");

  const dropDownInputRef = useRef(null);
  const dropDownRef = useRef(null);
  const [search_value_err, set_search_value_err] = useState(null)
  const dropDownStrRef = useRef(null);
  const [full, setFull] = useState(false);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  function handleResize() {
    window.innerWidth <= +theme.layout.xs.replaceAll("px", "")
      ? setFull(true)
      : setFull(false);
  }



  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const searchType = [

    {
      key: "fullname",
      value: "Requester Name",
    },
    { key: "address", value: "Address" },
    {
      key: "mobile_no",
      value: "Contact Number"
    },
    { key: "request_date", value: "Request Date" },
    { key: "request_detail", value: "Description" }
  ];



  useEffect(() => {
    setIsLoading(true);
    dispatch(loadFeedback());
    dispatch(loadPage({ title: ("Feedback"), button: false }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      let searchVal = get_value === 'request_date' ? dropDownInputRef.current.node.value : dropDownInputRef.current.value;
      if (get_value == "mobile_no" && !/(^(01){1}[3456789]{1}(\d){8})$/i.test(searchVal)) {
        set_search_value_err("This is not valid mobile number.");
      } else if (searchVal) {
        let data = {
          search_by: dropDownRef.current.value,
          search_value: get_value === 'request_date' ? dropDownInputRef.current.node.value : dropDownInputRef.current.value

        };
        dispatch(loadFeedback(data));
        set_search_value_err(null);
      } 
    } else {
      set_search_value_err("This field is required.");

    }
  };
  const handleChangeOption = (values) => {
    let searchID = dropDownRef.current.value;

    set_value(searchID);
  };

  function submitNewFeedBack(e) {
    e.preventDefault();
    setOpen(true);
  }
  const handleChangeValue = () => {
    let searchVal = get_value === 'request_date' ? dropDownInputRef.current.node.value : dropDownInputRef.current.value;
    searchVal ? set_search_value_err(null) : set_search_value_err("This field is required.");
  };


  useEffect(() => {
    homeFeedback.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [homeFeedback.loading]);

  useEffect(() => {
    homeFeedback.addLoading == "succeeded" && dispatch(loadFeedback());
    homeFeedback.addLoading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [homeFeedback.addLoading]);

  useEffect(() => {
    if (homeFeedback.loading == "pending") {
      setIsLoading(true)
    } else if (homeFeedback.loading == "succeeded") {
      setIsLoading(false);
      dispatch(searchHomeFeedback());
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (homeFeedback.loading != "idle") {
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false) }, 5000);
    }
  }, [homeFeedback.loading]);

  return (
    <>
      {(homeFeedback.updateLoading == "idle" || homeFeedback.updateLoading == "pending") ? <></> : (
        homeFeedback.updateLoading == "succeeded" ? (
          <Toast msg={homeFeedback.msg} icon="task_alt" color="success" />
        ) : (
          <Toast color="error" msg={homeFeedback.msg} />
        )
      )}

      <form>
        <Flex row>
          <Flex padding="0 !important" md={4} sm={6} xs={6}>
            <Flex row>
              <Flex padding="0 10px 0 0 !important" md={4}>
                <Typography margin={'10px'} textAlign={"left"} fontSize="bodyContentFontSize" htmlFor="search_by">
                  {" "}
                  {("Search Type")}
                </Typography>
              </Flex>
              <Flex padding="0" md={8}>
                <Select
                  app
                  ref={dropDownRef}
                  name="search_by"
                  onChange={handleChangeOption}
                >
                  <option > {("Select value")}</option>
                  {searchType?.map((d, i) => (
                    <option key={i} value={d.key}>
                      {d.value}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Flex>
          </Flex>
          <Flex padding="0 !important" md={4} sm={6} xs={6}>
            <Flex row>
              <Flex padding={"0 10px 0 0 !important"} md={4}>
                <Typography margin={'10px'} textAlign={"left"} fontSize="bodyContentFontSize" htmlFor="search_value">
                  {" "}
                  {("Search value")}{" "}
                </Typography>
              </Flex>
              <Flex padding={"0"} md={8}>
                {(get_value === "fullname" ||
                  get_value === "address" ||
                  get_value === "mobile_no" ||
                  get_value === "request_detail") && (
                    <Input
                      app
                      ref={dropDownInputRef}
                      type="text"
                      name="search_value"
                      placeholder={("search value")}
                    />
                  )}
                {
                  get_value === 'request_date' &&
                  <Flatpickr
                    readOnly
                    name="request_date"
                    onChange={handleChangeValue}
                    ref={dropDownInputRef}
                    options={{
                      dateFormat: "Y-m-d",
                    }}
                    render={(
                      { defaultValue, value, ...props },
                      ref
                    ) => {
                      return (
                        <Input
                          app
                          {...props}
                          type="text"
                          name="request_date"
                          placeholder="pick a Date"
                          value={value}
                          ref={ref}
                        />
                      );
                    }}
                  />
                }
                {search_value_err ? (
                  <ErrLabel margin={"0"}>{search_value_err}</ErrLabel>
                ) : null}
              </Flex>
            </Flex>
          </Flex>
          <Flex padding="0 !important" md={4} sm={12} xs={12}>
            <CustDiv>
              <Button
                margin={"2px"}
                type="submit"
                onClick={handleSubmit}
              >
                {("Submit")}
              </Button>
              <Button
                margin={"2px"}
                type="button"
                onClick={submitNewFeedBack}
              >
                {("Add New")}
              </Button>
            </CustDiv>
          </Flex>
        </Flex>
      </form>

      <Flex padding="10px 0 0 0">
        <PubFeedbackGrid userData={homeFeedback?.list} />
      </Flex>

      <FeedbackEditModal open={open} setOpen={setOpen} />
      <Loading open={isLoading} />
    </>
  );
};
