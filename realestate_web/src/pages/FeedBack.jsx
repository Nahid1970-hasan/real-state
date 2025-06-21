import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, DownloadButton, PrimaryButton } from "../components/Button";
import { CardBody, CardHeaderButton } from "../components/style/Card_styled";
import { Flex } from "../components/style/Flex_styled"
import { Input } from "../components/style/Input_styled";
import { Select } from "../components/style/Select_styled";
import { loadDistrict } from "../features/district/district_slice";
import { initLoader, loadFeedback, loadFeedbackData } from "../features/feedback/feedback_slice";
import { FeedBackGrid } from "../features/feedback/FeedBackGrid";
import { loadPage } from "../features/page/page_slice";
import { loadRequestType } from "../features/requestType/requestType_slice";
import i18n from "../i18n";
import { theme } from "../styles/theme";
import { Loading } from "../components/Loading";
import Flatpickr from "react-flatpickr";
import { ErrLabel, Label } from "../components/style/Label";
import { Typography } from "../components/style/Typography_styled";
import { useLocation } from "react-router-dom";
import { checkNumber } from "../utils/helper";



const CustDiv = styled.div`
  display: flex;
  justify-content:${({ end }) => (end ? 'flex-end' : 'flex-start')}; 
  margin-top: 30px;
  & button:first-child {
      margin: 0 0 2px 0;
    }
  
`;


export const FeedBack = () => {
    const feedback = useSelector((state) => state.feedback);
    const dispatch = useDispatch();
    const [get_value, set_value] = useState("fullname");
    const dropDownInputRef = useRef(null);
    const dropDownRef = useRef(null);
    const [full, setFull] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [search_value_err, set_search_value_err] = useState(null)
    const user = useSelector((state) => state.user);
    const location= useLocation();

    function handleResize() {
        window.innerWidth <= +theme.layout.xs.replaceAll("px", "") ? setFull(true) : setFull(false);
    }
    useEffect(() => {
        var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
        if(isvalid){
            dispatch(loadFeedbackData());
        } 
        dispatch(loadPage({ title: ("Feedback"), button: false }));
    }, [location]);



    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
        if(isvalid){
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
            }  else {
                set_search_value_err("This field is required.");
    
            }
        }else{
            set_search_value_err("Sorry! You are not authorized user to view this page.");
          }
      

        // console.log(data);
        // dispatch(loadFeedback(data));
    };
    const handleChangeOption = (values) => {
        let searchID = dropDownRef.current.value;
        set_value(searchID)
    };

    const handleChangeValue = () => {
        let searchVal = get_value === 'request_date' ? dropDownInputRef.current.node.value : dropDownInputRef.current.value;
        searchVal ? set_search_value_err(null) : set_search_value_err("This field is required.");
    };


    const searchType = [
        { key: "fullname", value: "Requester Name", },
        { key: "address", value: "Requester Address", },
        { key: "mobile_no", value: "Mobile Number", },
        { key: "request_date", value: "Feedback Date", },
        { key: "request_detail", value: "Description", },
    ]

    useEffect(() => {
        feedback.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [feedback.loading]);

    useEffect(() => {
        if (feedback.replyloading == "pending") {
            setIsLoading(true)
        } else if (feedback.replyloading == "succeeded") {
            setIsLoading(false);
            dispatch(loadFeedbackData());
            setTimeout(() => { dispatch(initLoader()); }, 5000);
        } else if (feedback.replyloading != "idle") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false) }, 5000);
        }
    }, [feedback.replyloading]);


    return (<>

        <form>
            <Flex row>
                <Flex padding="0 10px 0 0 !important" md={2} sm={6} xs={12}>
                    <Typography margin="0 0 10px 0" fontWeight="bold" textAlign="left" > Search By</Typography>
                    <Select
                        app
                        ref={dropDownRef}
                        name="search_by"
                        onChange={handleChangeOption}>
                        <option disabled> {("Select Value")}</option>
                        {
                            searchType?.map((d, i) => (<option key={i} value={d.key}>{d.value}</option>))
                        }
                    </Select>

                </Flex>
                <Flex padding="0 10px 0 0 !important" md={3} sm={6} xs={12}>
                    <Typography margin="0 0 10px 0" fontWeight="bold" textAlign="left" > Search Value</Typography>

                    {
                        (get_value === 'fullname' ||
                            get_value === 'address' ||
                            get_value === 'request_detail') &&
                        <Input
                            app
                            ref={dropDownInputRef}
                            type="text"
                            onChange={handleChangeValue}
                            name="search_value"
                            placeholder={("search value")}
                        />
                    } {get_value === "mobile_no" && (
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
                                        placeholder="pick a date"
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
                <Flex padding="0 10px 0 0 !important" md={2} sm={12} xs={12}>
                    <CustDiv>
                        <DownloadButton
                            full={full}
                            type="submit"
                            onClick={handleSubmit}
                        >
                            {("Submit")}
                        </DownloadButton>
                    </CustDiv>
                </Flex>
                <Flex padding="10px 0 0 0 !important" md={12} >
                    <FeedBackGrid />
                </Flex>
            </Flex>
        </form>
        <Loading open={isLoading} />

    </>)
};
