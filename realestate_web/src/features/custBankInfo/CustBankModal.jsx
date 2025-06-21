import { Formik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton,PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { useRef } from "react";
import { ErrLabel, Label } from "../../components/style/Label";
import { Input } from "../../components/style/Input_styled";
import { saveCustBankInfo, updateCustBankInfo } from "./cust_bank_slice";

export const CustBankModal = ({add,open, setOpen = () => { }, data, }) => {
    const custBankInfo = useSelector((state) => state.custBankInfo);
    const [bank_id, set_bank_id] = useState(0);
    const formRef = useRef();
    const [disabled, set_disabled] = useState(false);
    const [savedData, setSavedData] = useState({
        account_no: "",
        bank_name: "",
        bank_shortname: "",
        branch_name: "",
        route_no: "",
        bank_address: ""
    })

    const dispatch = useDispatch();

    useEffect(() => {
        add?"":setSavedData(data);
        set_bank_id(data.bank_id || "");
    }, [data]);


    const SubmitForm = (values) => {
        add ? "" : values.bank_id = bank_id; 
        dispatch(add?saveCustBankInfo(values):updateCustBankInfo(values));
        set_disabled(true);
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.bank_name) {
            errors.bank_name = ("Bank name is required");
        } else if (Values.bank_name.length > 200) {
            errors.bank_name = ("Maximum 200 Characters are allowed ");
        }
        if (!Values.bank_shortname) {
            errors.bank_shortname = ("Bank short name is required");
        } else if (Values.bank_shortname.length > 100) {
            errors.bank_shortname = ("Maximum 100 Characters are allowed ");
        }
        if (!Values.branch_name) {
            errors.branch_name = ("Branch name is required");
        } else if (Values.branch_name.length > 200) {
            errors.branch_name = ("Maximum 200 Characters are allowed ");
        }
        if (!Values.bank_address) {
            errors.bank_address = ("Bank address is required");
        } else if (Values.bank_address.length > 200) {
            errors.bank_address = ("Maximum 200 Characters are allowed ");
        }
        if (!Values.route_no) {
            errors.route_no = ("Routing number is required");
        } else if (Values.route_no.length > 100) {
            errors.route_no = ("Maximum 100 Characters are allowed ");
        }
        if (!Values.account_no) {
            errors.account_no = ("Account number is required");
        } else if (Values.account_no.length > 100) {
            errors.account_no = ("Maximum 100 Characters are allowed ");
        }

        return errors;
    };


    useEffect(() => {
        if (custBankInfo.addUpdateLoading == "succeeded") { 
           setTimeout(() => {formRef.current.resetForm(); set_disabled(false); setOpen(false) }, 3000);
       } else if (custBankInfo.addUpdateLoading != "idle" && custBankInfo.addUpdateLoading != "pending") { 
           setTimeout(() => { set_disabled(false); }, 4000);
       }
   }, [custBankInfo.addUpdateLoading]);


    return (<>
        <Modal
            md={4}
            sm={6}
            xs={10}
            title={(add?"Add Bank Infornamtion":"Update Bank Information")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >

            <Formik
                initialValues={savedData}
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
                        resetForm
                    } = formik;

                    return (
                        <div>
                            <form onSubmit={handleSubmit}>
                                <CardHeaderButton>
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
                                <Label >{("Bank Name")}</Label>
                                <Input
                                    app
                                    type="text"
                                    name="bank_name"
                                    placeholder={("type bank name")}
                                    value={values.bank_name || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={!add}
                                />
                                {
                                    errors.bank_name && touched.bank_name ? <ErrLabel>{errors.bank_name}</ErrLabel> : null
                                }

                                <Label >{("Bank Short Name")}</Label>
                                <Input
                                    app
                                    type="text"
                                    name="bank_shortname"
                                    placeholder={("type bank short name")}
                                    value={values.bank_shortname || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {
                                    errors.bank_shortname && touched.bank_shortname ? <ErrLabel>{errors.bank_shortname}</ErrLabel> : null
                                }

                                <Label >{("Branch Name")} </Label>
                                <Input
                                    app
                                    type="text"
                                    name="branch_name"
                                    placeholder={("type branch name")}
                                    value={values.branch_name || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                {
                                    errors.branch_name && touched.branch_name ? <ErrLabel>{errors.branch_name}</ErrLabel> : null
                                }

                                <Label >{("Account Number")} </Label>
                                <Input
                                    app
                                    type="text"
                                    name="account_no"
                                    placeholder={("type account number")}
                                    value={values.account_no || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={!add}

                                />
                                {
                                    errors.account_no && touched.account_no ? <ErrLabel>{errors.account_no}</ErrLabel> : null
                                }
                                <Label >{("Bank Address")} </Label>
                                <Input
                                    app
                                    type="text"
                                    name="bank_address"
                                    placeholder={("type bank address")}
                                    value={values.bank_address || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                {
                                    errors.bank_address && touched.bank_address ? <ErrLabel>{errors.bank_address}</ErrLabel> : null
                                }

                                <Label>{("Routing Number")} </Label>
                                <Input
                                    app
                                    type="text"
                                    name="route_no"
                                    placeholder={("type routing")}
                                    value={values.route_no || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                {
                                    errors.route_no && touched.route_no ? <ErrLabel>{errors.route_no}</ErrLabel> : null
                                }

                            </form>

                        </div>
                    );
                }}
            </Formik>
        </Modal>
      
    </>
    );
};
