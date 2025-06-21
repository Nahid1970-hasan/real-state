import { Formik } from "formik";
import { t } from "i18next";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { ErrLabel, Label } from "../../components/style/Label";
import { Select } from "../../components/style/Select_styled";
import Flatpickr from "react-flatpickr";

import {
    updateInvPayment as updatetype,
    saveInvPayment as savetype,
    initLoader,
} from "./inv_payment_Slice";
import { Flex } from "../../components/style/Flex_styled";
import { Typography } from "../../components/style/Typography_styled";
import { DateTime } from "luxon";
import { checkNumber } from "../../utils/helper";

export const InvPamentModal = ({ add, open, setOpen = () => { }, data, }) => {
    const invpayment = useSelector((state) => state.invpayment);
    const [payment_id, set_payment_id] = useState(0);
    const formRef = useRef();
    const [disabled, set_disabled] = useState(false);
    const [project_data, set_project_data] = useState({
        amount: "",
        com_bank_id: "",
        com_bank_name: "",
        com_account_no: "",
        com_branch_name: "",
        com_route_no: "",
        payment_method: "",
        cheque_no: "",
        payment_date: DateTime.now().toFormat('yyyy-MM-dd'),
        own_bank_id: "",
        own_bank_name: "",
        own_branch_name: "",
        own_account_no: "",
        own_route_no: ""
    })

    const dispatch = useDispatch();

    function clearForm() {
        set_project_data({
            amount: "",
            com_bank_id: "",
            com_bank_name: "",
            com_account_no: "",
            com_branch_name: "",
            com_route_no: "",
            payment_method: "",
            cheque_no: "",
            payment_date: DateTime.now().toFormat('yyyy-MM-dd'),
            own_bank_id: "",
            own_bank_name: "",
            own_branch_name: "",
            own_account_no: "",
            own_route_no: ""
        });
        formRef.current.resetForm();
    }

    useEffect(() => {
        add ? clearForm() : set_project_data({
            amount: data?.amount || "0",
            com_bank_id: data?.company_bank?.bank_id || "",
            com_bank_name: data?.company_bank?.bank_name||"",
            com_account_no: data?.company_bank?.account_no||"",
            com_branch_name: data?.company_bank?.branch_name||"",
            com_route_no: data.company_bank?.route_no||"",
            payment_method: data?.payment_method || "",
            cheque_no: data?.cheque_no || "",
            payment_date: data?.payment_date || DateTime.now().toFormat('yyyy-MM-dd'),
            own_bank_id: data?.own_bank?.bank_id || "",
            own_bank_name: data?.own_bank?.bank_name||"",
            own_branch_name: data?.own_bank?.branch_name||"",
            own_account_no: data?.own_bank?.account_no||"",
            own_route_no: data?.own_bank?.route_no||"",
        });
        set_payment_id(add ? 0 : data.payment_id || "");
    }, [data]);

    const SubmitForm = (values) => {
        var payData = {
            "c_bank_id": values?.payment_method == "Cash" ? 0 : values?.com_bank_id || 0,
            "bank_id": values?.payment_method == "Cash" ? 0 : values?.own_bank_id || 0,
            "cheque_no": values?.payment_method == "Cash" ? "" : values?.cheque_no || "",
            "payment_method": values?.payment_method || "",
            "payment_date": values?.payment_date || "",
            "amount": values?.amount || ""
        }
        add ? "" : payData.payment_id = payment_id;
        dispatch(add ? savetype(payData) : updatetype(payData));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.payment_method) {
            errors.payment_method = ("Please select payment method");
        }
        if (Values.payment_method != "Cash") {
            if (!Values.com_bank_id) {
                errors.com_bank_id = ("Please select company bank");
            }
            if (!Values.own_bank_id) {
                errors.own_bank_id = ("Please select own bank");
            }
            if (!Values.cheque_no) {
                errors.cheque_no = ("Cheque no is required");
            } else if (Values.cheque_no.length > 30) {
                errors.cheque_no = ("Maximum 30 Characters are allowed ");
            }
        }

        if (!Values.payment_date) {
            errors.payment_date = ("Please choose payment date");
        }

        if (!Values.amount) {
            errors.amount = ("Payment amount is required");
        }
        return errors;
    };

    useEffect(() => {
        if (invpayment.addUpdateLoading == "succeeded") {
            setTimeout(() => { clearForm(); set_disabled(false); setOpen(false) }, 3000);
        } else if (invpayment.addUpdateLoading != "idle" && invpayment.addUpdateLoading != "pending") {
            setTimeout(() => { set_disabled(false); }, 5000);
        }
    }, [invpayment.addUpdateLoading]);



    return (<>
        <Modal
            md={6}
            sm={8}
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
                onSubmit={SubmitForm}
                innerRef={formRef}
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
                                    <Flex padding="0 !important" md={8}>
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

                                                    <option disabled value=""> {("select payment method")}
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
                                    <Flex padding="0 10px 0 0 !important" md={6}>
                                        <Flex row>
                                            <Flex md={12}>
                                                <Typography textAlign="left" fontWeight="bold">Company Bank Info</Typography>
                                            </Flex>
                                        </Flex>

                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Bank Name")}</Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Select
                                                    app
                                                    name="com_bank_id"
                                                    onChange={(e) => {
                                                        var data = invpayment?.companyBanks?.find((d) => d.c_bank_id == e.target.value);
                                                        setFieldValue("com_bank_name", data.c_bank_name || "")
                                                        setFieldValue("com_branch_name", data.c_branch_name || "")
                                                        setFieldValue("com_account_no", data.c_account_no || "")
                                                        setFieldValue("com_route_no", data.c_route_no || "")
                                                        formik.handleChange(e);
                                                    }}
                                                    onBlur={handleBlur}
                                                    value={values.com_bank_id || ""}
                                                    disabled={values.payment_method == "Cash"}
                                                >
                                                    <option disabled value="">
                                                        {t("select bank")}
                                                    </option>
                                                    {invpayment?.companyBanks?.map((d, i) => <option key={i} value={d.c_bank_id}>{d.c_bank_name}</option>)}

                                                </Select>
                                                {
                                                    errors.com_bank_id && touched.com_bank_id ? <ErrLabel>{errors.com_bank_id}</ErrLabel> : null
                                                }

                                            </Flex>
                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Branch Name")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    name="com_branch_name"
                                                    placeholder={("----")}
                                                    value={values.com_branch_name || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled
                                                />
                                                {
                                                    errors.com_branch_name && touched.com_branch_name ? <ErrLabel>{errors.com_branch_name}</ErrLabel> : null
                                                }


                                            </Flex>
                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Account No.")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    name="com_account_no"
                                                    placeholder={("----")}
                                                    value={values.com_account_no || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled
                                                />
                                                {
                                                    errors.com_account_no && touched.com_account_no ? <ErrLabel>{errors.com_account_no}</ErrLabel> : null
                                                }


                                            </Flex>
                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Routing No.")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    name="com_route_no"
                                                    placeholder={("----")}
                                                    value={values.com_route_no || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled
                                                />
                                                {
                                                    errors.com_route_no && touched.com_route_no ? <ErrLabel>{errors.com_route_no}</ErrLabel> : null
                                                }


                                            </Flex>
                                        </Flex>



                                    </Flex>
                                    <Flex padding="0 0 0 10px !important" md={6}>
                                        <Flex row>
                                            <Flex md={12}>
                                                <Typography textAlign="left" fontWeight="bold">Own Bank Info</Typography>
                                            </Flex>
                                        </Flex>

                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Bank Name")}</Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Select
                                                    app
                                                    name="own_bank_id"
                                                    onChange={(e) => {
                                                        var data = invpayment?.ownBanks?.find((d) => d.bank_id == e.target.value);
                                                        setFieldValue("own_bank_name", data.bank_name || "")
                                                        setFieldValue("own_branch_name", data.branch_name || "")
                                                        setFieldValue("own_account_no", data.account_no || "")
                                                        setFieldValue("own_route_no", data.route_no || "")
                                                        formik.handleChange(e);
                                                    }}
                                                    onBlur={handleBlur}
                                                    value={values.own_bank_id || ""}
                                                    disabled={values.payment_method == "Cash"}
                                                >
                                                    <option disabled value="">
                                                        {t("select bank")}
                                                    </option>
                                                    {invpayment?.ownBanks?.map((d, i) => <option key={i} value={d.bank_id}>{d.bank_name}</option>)}


                                                </Select>
                                                {
                                                    errors.own_bank_id && touched.own_bank_id ? <ErrLabel>{errors.own_bank_id}</ErrLabel> : null
                                                }

                                            </Flex>
                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Branch Name")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    name="own_branch_name"
                                                    placeholder={("----")}
                                                    value={values.own_branch_name || ""}
                                                    onChange={handleChange}
                                                    disabled
                                                    onBlur={handleBlur}
                                                />
                                                {
                                                    errors.own_branch_name && touched.own_branch_name ? <ErrLabel>{errors.own_branch_name}</ErrLabel> : null
                                                }


                                            </Flex>
                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Account No.")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    name="own_account_no"
                                                    placeholder={("----")}
                                                    value={values.own_account_no || ""}
                                                    disabled
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {
                                                    errors.own_account_no && touched.own_account_no ? <ErrLabel>{errors.own_account_no}</ErrLabel> : null
                                                }


                                            </Flex>
                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Routing No.")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    name="own_route_no"
                                                    placeholder={("----")}
                                                    value={values.own_route_no || ""}
                                                    disabled
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {
                                                    errors.own_route_no && touched.own_route_no ? <ErrLabel>{errors.own_route_no}</ErrLabel> : null
                                                }
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Flex padding="10px 10px 0 0! important" md={12}>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Cheque No. ")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    name="cheque_no"
                                                    placeholder={("type cheque no")}
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
                                                                app
                                                                {...props}
                                                                type="text"
                                                                name="payment_date"
                                                                placeholder={("select payment date")}
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
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label >{("Payment Amount")} </Label>
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
                                                    name="amount"
                                                    placeholder={("type amount")}
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
                                </Flex>

                                <CardHeaderButton top="10px">
                                    <AlertButton
                                        type="reset"
                                        onClick={resetForm}
                                    >
                                        {("Reset")}
                                    </AlertButton>
                                    <PrimaryButton
                                        type="submit"
                                        className={!(dirty && isValid) ? "disabled-btn" : ""}
                                        disabled={!(dirty && isValid) || disabled}
                                    >
                                        {("Submit")}
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
