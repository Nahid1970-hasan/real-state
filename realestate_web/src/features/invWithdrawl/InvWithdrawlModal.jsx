import { Formik } from "formik";
import { t } from "i18next";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, DownloadButton, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { ErrLabel, Label } from "../../components/style/Label";
import { Select } from "../../components/style/Select_styled";

import {
    saveInvWithdrawlConfig as savetype,
    updateInvWithdrawlConfig as updateWithdrawl,
    submitWithdrawlConfig,
} from "./inv_withdrawl_slice";
import { Toast } from "../../components/Toast";
import { Flex } from "../../components/style/Flex_styled";
import DataGrid from "../../components/DataGrid";
import { Loading } from "../../components/Loading";
import { useRef } from "react";
import { Typography } from "../../components/style/Typography_styled";
import styled from "styled-components";
import { checkNumber, numberWithCommas } from "../../utils/helper";

const InlineFlex = styled(CardHeaderButton)`
    width: fit-content;
    align-items: center;
`
export const InvWithdrawlModal = ({ add, open, setOpen = () => { }, data, }) => {
    const invwithdrawl = useSelector((state) => state.invwithdrawl);
    const [total_sum, set_total_sum] = useState(0);
    const [profit_amount, set_profit_amount] = useState(0);
    const [available_amount, set_available_amount] = useState(0);
    const [project_id, set_project_id] = useState("");
    const [project_name, set_project_name] = useState("");
    const [disabled, set_disabled] = useState(false);
    const dispatch = useDispatch();

    const formRef = useRef(null);
    const [project_data, set_project_data] = useState({ 
        amount: "", 
        request_for: "",
    })
 
    function clearForm(){ 
        set_project_data({ 
            amount: "", 
            request_for: "",
        });
    }
    useEffect(() => {
        var rowData = invwithdrawl.investlist || [];
        set_total_sum(rowData?.map((d) => d?.total_amount).reduce((a, b) => a + b, 0))
    }, [invwithdrawl.investlist]);

    useEffect(() => {
        set_profit_amount(invwithdrawl?.profitAmount || 0)
    }, [invwithdrawl.profitAmount]);

    useEffect(() => {  
        set_available_amount(total_sum-(invwithdrawl.availableAmount||0));
    }, [invwithdrawl.availableAmount, total_sum]);

    useEffect(() => {
        !add && set_project_name(data?.project_name || "---")
        add? clearForm() : set_project_data(data);
        !add && set_project_id( data?.project_id || "")
    }, [data]);

    const SubmitForm = (values) => {
        var reqData = {
            "withdrawl_id": add ? 0 : project_data?.withdrawl_id || 0,
            "project_id": project_id || 0,
            "request_for": values?.request_for || "",
            "amount": values?.amount || 0
        }
        dispatch(add ? savetype(reqData) : updateWithdrawl(reqData));
        set_disabled(true);
    };

    function submitproject(e) {
        e.preventDefault();
        let data = {
            project_id: project_id,
        };
        dispatch(submitWithdrawlConfig(data));
    }

    const validate = (Values) => {
        let errors = {}; 
        
        if (!Values.request_for) {
            errors.request_for = ("Select withdrawal request");
        } 

        if (!Values.amount) {
            errors.amount = ("Withdrawal amount is required");
        } else {
            if (Values.amount < 0) {
                errors.amount = ("Negative number are not allowed");
            } else if (Values.request_for == "Profit" && Values.amount > profit_amount) {
                errors.amount = ("Withdrawal amount should not be more than profit amount.");
            } else if (Values.request_for != "Profit" && Values.amount > available_amount) {
                errors.amount = ("Withdrawal amount should not be more than available amount.");
            }
        }

        return errors;
    };

    useEffect(() => {
        if (invwithdrawl.addUpdateLoading == "succeeded") {
            setTimeout(() => {
                set_project_data({ project_id: "", amount: 0, request_for: "" });
                formRef.current.resetForm(); set_disabled(false); setOpen(false)
            }, 2000);
        } else if (invwithdrawl.addUpdateLoading != "idle") {
            setTimeout(() => { set_disabled(false); }, 4000);
        }
    }, [invwithdrawl.addUpdateLoading]);

    const colums = [
        {
            headerName: "ID",
            field: "project_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: ("Investment date"),
            field: "investment_date",
            description: "investment date",
            sortable: true,
            filterable: true,
            type: "date",
        },
        {
            headerName: ("Shares"),
            field: "buy_share",
            description: "shares",
            type: "number",
        },
        {
            headerName: ("Price/Share"),
            field: "unit_price",
            description: "price/share",
            type: "currency",
        },

        {
            headerName: ("Amount"),
            field: "total_amount",
            description: "amount",
            sortable: true,
            filterable: true,
            type: "currency",
        },

    ];

    // let rows = invwithdrawl.investlist || [];

    function handleDDChange(e) {
        set_project_id(e.target.value);
    }

    return (<>

        <Modal
            md={6}
            sm={8}
            xs={12}
            title={add ? ("New Withdrawal") : ("Update Withdrawal")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >

            <Flex padding="0 0 10px 0!important" md={12}>
                <Flex row>
                    <Flex padding="0 !important" md={12}>
                        {add ? <InlineFlex>
                            <Label margin={"0 10px 0 0"} >Project</Label>
                            <Select
                                app
                                value={project_id||""}
                                onChange={handleDDChange} >
                                <option disabled value={""}> {("select project name")}</option>
                                {invwithdrawl.projectlist?.map((d, i) => (
                                    <option key={i} value={d.project_id}>{d.project_name}</option>
                                ))}
                            </Select>
                            <PrimaryButton type="button" disabled={!project_id} onClick={submitproject} >
                                Submit
                            </PrimaryButton>
                        </InlineFlex> : <Typography textAlign="left" fontSize="bodyContentFontSize">
                            {"Project Name: "} {" "} {project_name || "---"}
                        </Typography>}
                    </Flex>
                </Flex>

                <Flex row>
                    <Flex padding="10px 0 0 0 !important" md={12}>
                        <CardBody>
                            <DataGrid colums={colums} rows={invwithdrawl.investlist || []} />
                        </CardBody>
                    </Flex>
                    {<Flex padding="10px 0 0 0 !important" md={12}>
                        <Typography textAlign="right" fontSize="bodyContentFontSize">
                            {"Total Investment :"} {" "} {numberWithCommas(total_sum || 0)} {" Tk"}
                        </Typography>
                    </Flex>}
                </Flex>
            </Flex>

            <Formik
                initialValues={project_data}
                validate={validate}
                enableReinitialize
                innerRef={formRef}
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
                        resetForm,
                        setFieldValue,
                    } = formik;

                    return (
                        <div>
                            <form onSubmit={handleSubmit}>
                                <Flex row>
                                    <Flex padding="0 !important" md={12}>

                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >Available Amount</Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text" 
                                                    placeholder={("0")}
                                                    value={numberWithCommas(available_amount||0)+" Tk"} 
                                                    disabled
                                                />

                                            </Flex>

                                        </Flex>
                                    </Flex>
                                   
                                    <Flex padding="0 !important" md={12}>

                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >Profit Amount</Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text" 
                                                    placeholder={("0")}
                                                    value={numberWithCommas(profit_amount||0)+" Tk"} 
                                                    disabled
                                                />

                                            </Flex>

                                        </Flex>
                                    </Flex>

                                    <Flex padding="0 !important" md={12}>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label>{("Withdrawal Request For")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Select
                                                    app
                                                    name="request_for"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.request_for || ""}
                                                >
                                                    <option disabled value="">  {("select request for")} </option> 
                                                    <option value="Investment">Investment</option>
                                                    { <option value="Profit">Profit</option>}
                                                </Select>
                                                {
                                                    errors.request_for && touched.request_for ? <ErrLabel>{errors.request_for}</ErrLabel> : null
                                                }

                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Flex padding="0!important" md={12}>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Withdrawal Amount")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    name="amount"
                                                    placeholder={("type withdrawal amount")}
                                                    onKeyDown={(event) => {
                                                        if (!checkNumber(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    value={values.amount || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {
                                                    errors.amount && touched.amount ? <ErrLabel>{errors.amount}</ErrLabel> : null
                                                }

                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Flex padding="10px 0 0 0!important" md={12}>
                                        <CardHeaderButton>
                                            <AlertButton
                                                type="reset"
                                                onClick={resetForm}
                                            >
                                                {t("reset")}
                                            </AlertButton>
                                            <PrimaryButton
                                                type="submit"
                                                className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                disabled={!(dirty && isValid) || disabled || !total_sum}
                                            >
                                                {t("submit")}
                                            </PrimaryButton>
                                        </CardHeaderButton>
                                    </Flex>
                                </Flex>

                            </form>
                        </div>
                    );
                }}
            </Formik>


        </Modal>

    </>
    );
};
