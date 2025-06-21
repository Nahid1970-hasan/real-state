import { Formik } from "formik";
import { t } from "i18next";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { ErrLabel, Label } from "../../components/style/Label";
import { Select } from "../../components/style/Select_styled";
import Flatpickr from "react-flatpickr";

import {
    updateviewpayment as updatetype,
    saveviewpayment as savetype,
} from "./cust_payment_slice";
import { Flex } from "../../components/style/Flex_styled";
import { Typography } from "../../components/style/Typography_styled";
import { DateTime } from "luxon";
import { checkNumber } from "../../utils/helper";

export const CustPaymentModal = ({ add, open, setOpen = () => { }, data, }) => {
    const custPayment = useSelector((state) => state.custPayemntData);
    const [payment_id, set_payment_id] = useState(0);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const [project_data, set_project_data] = useState({
        user_id: "",
        sub_project_id: "",
        payment_for:"",
        installment_no:"0",
        company_bank_id: "",
        payment_method: "",
        bank_id: "",
        cheque_no: "",
        payment_date: DateTime.now().toFormat("yyyy-MM-dd"),
        account_no: "",
        route_no: "",
        branch_name: "",
        c_bank_id:"",
        c_branch_name:"",
        c_account_no: "",
        c_route_no:"",
        project_name:"",
        payment_type:"",
        installment: "",
    })

    const dispatch = useDispatch();
    function clearForm() {
        set_project_data({
            user_id: "",
            sub_project_id: "",
            payment_for: "",
            installment_no: "0",
            payment_method: "",
            bank_id: "",
            cheque_no: "",
            payment_date: DateTime.now().toFormat("yyyy-MM-dd"),
            account_no: "",
            route_no: "",
            branch_name: "",
            c_bank_id: "",
            c_branch_name: "",
            c_account_no:"",
            c_route_no: "",
            project_name:"",
            payment_type: "",
            installment: "",
        });
        formRef.current.resetForm();
    }
    useEffect(() => {
        add ? clearForm() : set_project_data({
            payment_for: data?.payment_for || "",
            payment_method:data?.payment_method || "",
            cheque_no: data?.cheque_no || "",
            amount: data?.amount || "0",
            c_bank_id: data?.company_bank?.bank_id || "",
            c_bank_name: data?.company_bank?.bank_name||"",
            c_account_no: data?.company_bank?.account_no||"",
            c_branch_name: data?.company_bank?.branch_name||"",
            c_route_no: data.company_bank?.route_no||"",
            payment_date: data?.payment_date || DateTime.now().toFormat('yyyy-MM-dd'),
            bank_id: data?.own_bank?.bank_id || "",
            bank_name: data?.own_bank?.bank_name||"",
            branch_name: data?.own_bank?.branch_name||"",
            account_no: data?.own_bank?.account_no||"",
            route_no: data?.own_bank?.route_no||"",
        });
        set_payment_id(add ? 0 : data.payment_id || "");
    }, [data]);

    const SubmitForm = (values) => {
        var payData = {
            "c_bank_id": values?.payment_method == "Cash" ? 0 : values?.c_bank_id || 0,
            "bank_id": values?.payment_method == "Cash" ? 0 : values?.bank_id || 0,
            "cheque_no": values?.payment_method == "Cash" ? "" : values?.cheque_no || "",
            "sub_project_id": values?.sub_project_id||"",
            "payment_method": values?.payment_method || "",
            "payment_for": values?.payment_for || "",
            "payment_date": values?.payment_date || "",
            "installment_no": values?.installment_no || "",
            "amount": values?.amount || ""
        }
        add ? "" : payData.payment_id = payment_id;
        dispatch(add ? savetype(payData) : updatetype(payData));
    };

    const validate = (Values) => {
        let errors = {};
        if (!Values.sub_project_id) {
            errors.sub_project_id = ("Select sub-project");
        }

        if (!Values.payment_for) {
            errors.payment_for = ("Select payment type");
        }
        if (!Values.installment_no) {
            errors.installment_no = ("Installment is required");
        }
        if (!Values.payment_method) {
            errors.payment_method = ("Please select payment method");
        } else if (Values.payment_method.length > 30) {
            errors.payment_method = ("Maximum 30 Characters are allowed ");
        }
        if (!Values.payment_date) {
            errors.payment_date = ("Please choose payment date");
        }
        if (Values.payment_method != "Cash") {
            if (!Values.bank_id) {
                errors.bank_id = ("Select bank name");
            }
            if (!Values.c_bank_id) {
                errors.c_bank_id = ("Select bank name");
            }
            if (!Values.cheque_no) {
                errors.cheque_no = ("Please type cheque no");
            } else if (Values.cheque_no.length > 30) {
                errors.cheque_no = ("Maximum 30 Characters are allowed ");
            }
        }
        if (!Values.amount) {
            errors.amount = ("Please type payment amount");
        }


        return errors;
    };

    useEffect(() => {
        if (custPayment.addUpdateLoading == "succeeded") {
            setTimeout(() => { clearForm(); set_disabled(false); setOpen(false) }, 3000);
        } else if (custPayment.addUpdateLoading != "idle" && custPayment.addUpdateLoading != "pending") {
            setTimeout(() => { set_disabled(false); }, 5000);
        }
    }, [custPayment.addUpdateLoading]);


    return (<>

        <Modal
            md={8}
            sm={10}
            xs={12}
            title={add ? ("New Payment") : ("Edit Payment")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
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
                                    <Flex padding="0 10px 0 0 !important" md={6} sm={12} xs={12}>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Sub-project Name")}</Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Select
                                                    app
                                                    name="sub_project_id"
                                                    onChange={(e) => {
                                                        var pId = e.target.value;
                                                        var rwData = custPayment?.projectlist?.find((d) => d.sub_project_id == pId);
                                                        console.log(rwData);
                                                        setFieldValue("installment_no", rwData?.installment_no || "0");
                                                        setFieldValue("payment_for", rwData?.payment_for || "");
                                                        setFieldValue("amount", rwData.amount || "")
                                                        formik.handleChange(e);
                                                    }}
                                                    onBlur={handleBlur}
                                                    value={values.sub_project_id || ""}
                                                >
                                                    <option value="">
                                                        {("--select value")}
                                                    </option>
                                                    {custPayment?.projectlist?.map((d, i) => <option key={i} value={d.sub_project_id}>{d.sub_project_name}</option>)}
                                                </Select>
                                                {
                                                    errors.sub_project_id && touched.sub_project_id ? <ErrLabel>{errors.sub_project_id}</ErrLabel> : null
                                                }

                                            </Flex>
                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Payment Type")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    name="payment_for"
                                                    placeholder={("type payment type")}
                                                    value={values.payment_for || ""}
                                                    disabled
                                                />
                                                {
                                                    errors.payment_for && touched.payment_for ? <ErrLabel>{errors.payment_for}</ErrLabel> : null
                                                }
                                            </Flex>
                                        </Flex>
                                    </Flex>

                                    <Flex padding="0 0 0 10px !important" md={6} sm={12} xs={12}>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Installment#")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    name="installment_no"
                                                    placeholder={("type installment")}
                                                    value={values.installment_no || ""}
                                                    disabled
                                                />
                                                {
                                                    errors.installment_no && touched.installment_no ? <ErrLabel>{errors.installment_no}</ErrLabel> : null
                                                }

                                            </Flex>
                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Payment Method")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Select
                                                    app
                                                    name="payment_method"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.payment_method || ""}
                                                >

                                                    <option disabled value="">
                                                        {("select payment method")}
                                                    </option>
                                                    <option value="Cheque">Cheque</option>
                                                    <option value="Cash">Cash</option>
                                                </Select>
                                                {
                                                    errors.payment_method && touched.payment_method ? <ErrLabel>{errors.payment_method}</ErrLabel> : null
                                                }

                                            </Flex>
                                        </Flex>
                                    </Flex>

                                    <Flex padding="10px 10px 0 0 !important" md={6} sm={12} xs={12}>
                                        <Typography textAlign="left" fontWeight="bold">Company Bank Info</Typography>
                                        <Flex row>
                                            <Flex padding="10px 0 0 0 !important" md={4}>
                                                <Label >{("Bank Name")}</Label>
                                            </Flex>
                                            <Flex padding="10px 0 0 0 !important" md={8}>
                                                <Select
                                                    app
                                                    name="c_bank_id"
                                                    onChange={(e) => {
                                                        var data = custPayment?.Companylist?.find((d) => d.c_bank_id == e.target.value);
                                                        setFieldValue("c_bank_name", data.c_bank_name || "")
                                                        setFieldValue("c_branch_name", data.c_branch_name || "")
                                                        setFieldValue("c_account_no", data.c_account_no || "")
                                                        setFieldValue("c_route_no", data.c_route_no || "")


                                                        formik.handleChange(e);
                                                    }}
                                                    onBlur={handleBlur}
                                                    value={values.c_bank_id || ""}
                                                    disabled={values.payment_method == "Cash"}
                                                >
                                                    <option disabled value="">
                                                        {t("select bank")}
                                                    </option>
                                                    {custPayment?.Companylist?.map((d, i) => <option key={i} value={d.c_bank_id}>{d.c_bank_name}</option>)}
                                                </Select>
                                                {
                                                    errors.c_bank_id && touched.c_bank_id ? <ErrLabel>{errors.c_bank_id}</ErrLabel> : null
                                                }

                                            </Flex>
                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Branch")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    name="c_branch_name"
                                                    placeholder={("----")}
                                                    value={values.c_branch_name || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled
                                                />

                                            </Flex>
                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Account")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    name="c_account_no"
                                                    placeholder={("----")}
                                                    value={values.c_account_no || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled
                                                />



                                            </Flex>
                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Routing")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    name="c_route_no"
                                                    placeholder={("----")}
                                                    value={values.c_route_no || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled
                                                />



                                            </Flex>
                                        </Flex>

                                    </Flex>
                                    <Flex padding="10px 0 0 10px !important" md={6} sm={12} xs={12}>
                                        <Typography textAlign="left" fontWeight="bold">Own Bank Info</Typography>
                                        <Flex row>
                                            <Flex padding="10px 0 0 0 !important" md={4}>
                                                <Label >{("Bank Name")}</Label>
                                            </Flex>
                                            <Flex padding="10px 0 0 0 !important" md={8}>
                                                <Select
                                                    app
                                                    name="bank_id"
                                                    onChange={(e) => {
                                                        var data = custPayment?.Ownerlist?.find((d) => d.bank_id == e.target.value);
                                                        setFieldValue("bank_name", data.bank_name || "")
                                                        setFieldValue("branch_name", data.branch_name || "")
                                                        setFieldValue("account_no", data.account_no || "")
                                                        setFieldValue("route_no", data.route_no || "")
                                                        formik.handleChange(e);
                                                    }}
                                                    onBlur={handleBlur}
                                                    value={values.bank_id || ""}
                                                    disabled={values.payment_method == "Cash"}
                                                >
                                                    <option disabled value="">
                                                        {t("select bank")}
                                                    </option>
                                                    {custPayment?.Ownerlist?.map((d, i) => <option key={i} value={d.bank_id}>{d.bank_name}</option>)}
                                                </Select>
                                                {
                                                    errors.bank_id && touched.bank_id ? <ErrLabel>{errors.bank_id}</ErrLabel> : null
                                                }

                                            </Flex>
                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Branch")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    name="branch_name"
                                                    placeholder={("----")}
                                                    value={values.branch_name || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled
                                                />



                                            </Flex>
                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Account")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    onKeyDown={(event) => {
                                                        if (!checkNumber(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    name="account_no"
                                                    placeholder={("----")}
                                                    value={values.account_no || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled
                                                />



                                            </Flex>
                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Routing")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    name="route_no"
                                                    placeholder={("----")}
                                                    value={values.route_no || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled
                                                />
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Flex padding="0 10px 0 0 !important" md={6} sm={12} xs={12}>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Amount")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    name="amount"
                                                    placeholder={("type amount")}
                                                    value={values.amount || ""}
                                                    disabled
                                                />
                                                {
                                                    errors.amount && touched.amount ? <ErrLabel>{errors.amount}</ErrLabel> : null
                                                }


                                            </Flex>
                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Payment Date")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Flatpickr
                                                    readOnly
                                                    options={{
                                                        dateFormat: "Y-m-d",
                                                    }}
                                                    value={values.payment_date}
                                                    onChange={(e, str) => {
                                                        setFieldValue('payment_date', str)
                                                    }}
                                                    render={({ defaultValue, value, ...props }, ref) => {
                                                        return (
                                                            <Input
                                                                {...props}
                                                                app
                                                                type="text"
                                                                name="payment_date"
                                                                placeholder={("1900-01-01")}
                                                                value={values.payment_date || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                color={errors.payment_date && touched.payment_date ? "error" : null}
                                                                ref={ref}
                                                            />
                                                        );
                                                    }}
                                                />
                                                {
                                                    errors.payment_date && touched.payment_date ? <ErrLabel>{errors.payment_date}</ErrLabel> : null
                                                }

                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Flex padding="0 0 0 10px !important" md={6} sm={12} xs={12}>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Cheque #")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    name="cheque_no"
                                                    placeholder={("type cheque number")}
                                                    value={values.cheque_no || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={values.payment_method == "Cash"}
                                                />
                                                {
                                                    errors.cheque_no && touched.cheque_no ? <ErrLabel>{errors.cheque_no}</ErrLabel> : null
                                                }


                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
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
                                        disabled={!(dirty && isValid) || disabled}
                                    >
                                        {t("submit")}
                                    </PrimaryButton>
                                </CardHeaderButton>


                            </form>

                        </div>
                    );
                }}
            </Formik>
        </Modal>
    </>
    );
};
