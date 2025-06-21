import { useEffect, useRef } from "react";
import { Suspense } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DataGrid from "../components/DataGrid";
import { Flex } from "../components/style/Flex_styled";
import { Loader } from "../components/style/Loader_styled";
import { loadPage } from "../features/page/page_slice";
import { Loading } from "../components/Loading";
import { Typography } from "../components/style/Typography_styled";
import { Select } from "../components/style/Select_styled";
import { useLocation } from "react-router-dom";
import { DownloadButton } from "../components/Button";
import Flatpickr from "react-flatpickr";
import { Input } from "../components/style/Input_styled";
import { User } from "react-feather";
import { ErrLabel } from "../components/style/Label";
import { SubmitHistory, loadSMSEmailConfig,initLoader } from "../features/smsEmailHist/sms_email_slice";
import { checkNumber } from "../utils/helper";
const ConsFlex = styled(Flex)`
padding-right: 0px;
padding-top: 0px;
`;

const CustDiv = styled.div`
  display: flex;
  justify-content:${({ end }) => (end ? 'flex-end' : 'flex-start')}; 
  margin-top: 30px;
  & button:first-child {
      margin: 0 0 2px 0;
    }
  
`;

export const SmsEmailPage = () => {
    const center = {
        lat: 23.797724704739064,
        lng: 90.4015874593808,
    };
    const historyData = useSelector((state) => state.smshistory);
    const [isLoading, setIsLoading] = useState(false);
    const [get_value, set_value] = useState("email");
    const dropDownInputRef = useRef(null);
    const dropDownRef = useRef(null);
    const location = useLocation();
    const user = useSelector((state) => state.user);
    const [search_value_err, set_search_value_err] = useState(null);
    const [disable, set_disable] = useState(false);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadSMSEmailConfig())
        setIsLoading(true);
        dispatch(
            loadPage({
                title: "SMS & Email History",
                button: false,
            })
        );
    }, []);
    useEffect(() => {
        historyData.loading != "pending" && setTimeout(() => setIsLoading(false), 2000);
    }, [historyData.loading]);

    useEffect(() => {
        if (historyData.loading == "pending") {
          setIsLoading(true)
        } else if (historyData.loading == "succeeded") {
          setIsLoading(false)
          dispatch(SubmitHistory());
          setTimeout(() => { dispatch(initLoader()); }, 5000);
        } else if (historyData.loading != "idle") {
          setTimeout(() => { dispatch(initLoader()); setIsLoading(false) }, 5000);
        }
      }, [historyData.loading]);

    const SMSColums = [
        {
            headerName: "sms_id",
            field: "sms_id",
            type: "string",
            hide: true,
        },
        {
            headerName: "Mobile",
            field: "mobile_no",
            type: "string",
            width:"120px",
            description: "Mobile Number"
        },
        {
            headerName: "Message",
            field: "message",
            type: "string",
            description: "Message"
        },

        {
            headerName: "sent_date",
            field: "sent_date",
            type: "datetime",
            description: "sent_date",
            width: "120px"
        },
    ];
    const ELColums = [
        {
            headerName: "id",
            field: "email_id",
            type: "string",
            description: "email_id",
            hide: true,
        },
        {
            headerName: "Email",
            field: "email",
            type: "string",
            description: "Email"
        },
        {
            headerName: "Subject",
            field: "subject",
            type: "string",
            description: "Eamil Subject",
        },
        {
            headerName: "Body",
            field: "body",
            type: "string",
            description: "Email Body",
            width: "220px"
        },
        {
            headerName: "sent_date",
            field: "sent_date",
            type: "datetime",
            description: "sent_date",
            width: "120px"
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
        if (isvalid) {
            let searchVal = get_value === 'sent_date' ? dropDownInputRef.current.node.value : dropDownInputRef.current.value;
            if (get_value == "mobile_no" && !/(^(01){1}[3456789]{1}(\d){8})$/i.test(searchVal)) {
                set_search_value_err("This is not valid mobile number.");
            } else if (searchVal) {
                let data = {
                    search_by: dropDownRef.current.value,
                    search_value: get_value === 'sent_date' ? dropDownInputRef.current.node.value : dropDownInputRef.current.value

                };
                dispatch(SubmitHistory(data));
                set_search_value_err(null);
            } else {
                set_search_value_err("This field is required.");

            }
        } else {
            set_search_value_err("Sorry! You are not authorized user to view this page.");
        }

    };
    const handleChangeOption = (values) => {
        let searchID = dropDownRef.current.value;
        set_value(searchID)
    };

    const handleChangeValue = (value) => {
        let searchVal = get_value === 'sent_date' ? dropDownInputRef.current.node.value : dropDownInputRef.current.value;
        if(!searchVal){
            set_disable(true)
            set_search_value_err("This field is reruired");
            
        }
        else if(dropDownRef.current.value=="mobile_no"&&!/(^(01){1}[3456789]{1}(\d){8})$/i.test(searchVal)){
            set_search_value_err("This is not valid mobile number.");
            set_disable(true)
        }
        else if(dropDownRef.current.value=="email"&&!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(searchVal)){
            set_search_value_err("This is not valid email.");
            set_disable(true)
        }
        else{
            set_disable(false)
             set_search_value_err(null) ;
        };
        }
       
        

    const searchType = [
        { key: "email", value: "Email" },
        { key: "mobile_no", value: "Mobile Number" },
        { key: "sent_date", value: "Sent Date" },

    ];

    return (
        <>
            <Suspense fallback={<Loader />}>
                <Flex row>
                    <Flex padding="0 10px 0 0 !important" md={2} sm={6} xs={12}>
                        <Typography margin="0 0 10px 0" fontWeight="bold" textAlign="left" > Search By</Typography>
                        <Select
                            app
                            ref={dropDownRef}
                            name="search_col"
                            id="search_col"
                            onChange={handleChangeOption}
                        >
                            <option disabled>--Select Value</option>
                            {searchType?.map((d, i) => (
                                <option key={i} value={d.key}>
                                     {" "}
                                    {d.value}
                                </option>
                            ))}
                        </Select>
                    </Flex>
                    <Flex padding="0 10px 0 0 !important" md={3} sm={6} xs={12}>
                        <Typography margin="0 0 10px 0" fontWeight="bold" textAlign="left" > Search Value</Typography>
                        {(get_value === "email") && (
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
                         {
                            get_value === 'mobile_no' &&
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
                            name="search_value"
                            id="search_value"
                        /> 
                        }
                        {
                            get_value === 'sent_date' &&
                            <Flatpickr
                                readOnly
                                name="sent_date"
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
                                            name="sent_date"
                                            placeholder="pick a date"
                                            value={value}
                                            ref={ref}
                                        />
                                    );
                                }}
                            />
                        }


                        {search_value_err ? <ErrLabel margin="0px">{search_value_err}</ErrLabel> : null}
                    </Flex>
                    <Flex padding="0 10px 0 0 !important" md={2} sm={12} xs={12}>
                        <CustDiv>
                            <DownloadButton
                                type="button"
                                onClick={handleSubmit}
                                disabled={disable}
                            >
                                Submit
                            </DownloadButton>
                        </CustDiv>
                    </Flex>
                </Flex>
                <Flex row>
                    <Flex padding="10px 0 0 0 !important" md={6}>
                        <DataGrid colums={ELColums} rows={historyData?.emaillist || []} />
                    </Flex>
                    <Flex padding="10px  0 0 10px !important" md={6}>
                        <DataGrid colums={SMSColums} rows={historyData?.smslist || []} />
                    </Flex>


                </Flex>
            </Suspense>
            <Loading open={isLoading} />
        </>
    );
};
