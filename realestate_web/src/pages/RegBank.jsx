import { Suspense, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, PrimaryButton, SecondaryButton } from "../components/Button"
import { Card, CardBody, CardHeaderButton } from "../components/style/Card_styled"
import { Center } from "../components/style/Center_styled"
import { Container } from "../components/style/Container_styled"
import { Flex } from "../components/style/Flex_styled"
import { Loader } from "../components/style/Loader_styled"
import { Typography } from "../components/style/Typography_styled"
import { Toast } from "../components/Toast"
import NotFound from "./NotFound"
import emailverifyimg from "../assets/email-verify.svg"
import { Formik } from "formik"
import { Input } from "../components/style/Input_styled"
import { Label } from "../components/style/Label"
import { Select } from "../components/style/Select_styled"

export const RegBankPage = () => {
    const { t, i18n } = useTranslation();
    const nevigate = useNavigate();

    const initialValues = {
        account_no: '',
        bank_name: '',
        branch_name: '',
        routing_no: '',
        bank_address: ''
    };


    const validate = (values) => {

        let errors = {};
        if (!values.account_no) {
            errors.account_no = t("Please enter account no");
        }
        if (!values.bank_name) {
            errors.bank_name = t("Please enter bank name");
        }
        if (!values.branch_name) {
            errors.branch_name = t("Please enter branch name");
        }
        if (!values.routing_no) {
            errors.routing_no = t("Please enter routing no");
        }
        if (!values.bank_address) {
            errors.bank_address = t("Please enter bank address");
        }
       

        return errors;
    };

    const submitForm = (values, actions) => {
        console.log(values);
        nevigate("/reg-success");
        //dispatch(setUserRegistration(values)); 
    };

    return <>
        <Suspense fallback={<Loader />}>
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={submitForm}
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
                        setFieldValue
                    } = formik;

                    return (
                        <form onSubmit={handleSubmit}>
                            <div style={{ width: "50%", display: "block", marginLeft: "auto", marginRight: "auto" }}>
                                <Flex row >
                                    <Flex md={12} sm={12}>
                                        <Typography textAlign="center" fontSize="bodyTitleFontSize"> {t("Bank Information")}</Typography>
                                    </Flex>
                                    <Flex md={12} sm={12}>
                                        <Typography textAlign="left" fontSize="bodySubTitleFontSize"> {t("Account No")}</Typography>
                                        <Input
                                            type="text"
                                            name="account_no"
                                            placeholder={t("Type account no")}
                                            value={values.account_no}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            color={errors.account_no && touched.account_no ? "error" : null}
                                        />
                                        {
                                            errors.account_no && touched.account_no ? <Label>{errors.account_no}</Label> : null
                                        }
                                    </Flex>

                                    <Flex md={12} sm={12}>
                                        <Typography textAlign="left" fontSize="bodySubTitleFontSize"> {t("Bank Name")}</Typography>
                                        <Input
                                            type="text"
                                            name="bank_name"
                                            placeholder={t("Type bank name")}
                                            value={values.bank_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            color={errors.bank_name && touched.bank_name ? "error" : null}
                                        />
                                        {
                                            errors.bank_name && touched.bank_name ? <Label>{errors.bank_name}</Label> : null
                                        }
                                    </Flex>

                                    <Flex md={12} sm={12}>
                                        <Typography textAlign="left" fontSize="bodySubTitleFontSize"> {t("Branch Name")}</Typography>
                                        <Input
                                            type="text"
                                            name="branch_name"
                                            placeholder={t("Type mother name")}
                                            value={values.branch_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            color={errors.branch_name && touched.branch_name ? "error" : null}
                                        />
                                        {
                                            errors.branch_name && touched.branch_name ? <Label>{errors.branch_name}</Label> : null
                                        }
                                    </Flex>

                                    <Flex md={12} sm={12}>
                                        <Typography textAlign="left" fontSize="bodySubTitleFontSize"> {t("Routing No")}</Typography>
                                        <Input
                                            type="text"
                                            name="routing_no"
                                            placeholder={t("Type rounting no")}
                                            value={values.routing_no}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            color={errors.routing_no && touched.routing_no ? "error" : null}
                                        />
                                        {
                                            errors.routing_no && touched.routing_no ? <Label>{errors.routing_no}</Label> : null
                                        }
                                    </Flex> 

                                    <Flex md={12} sm={12}>
                                        <Typography textAlign="left" fontSize="bodySubTitleFontSize"> {t("Bank Address")}</Typography>
                                        <Input
                                            type="text"
                                            name="bank_address"
                                            placeholder={t("Type bank address")}
                                            value={values.bank_address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            color={errors.bank_address && touched.bank_address ? "error" : null}
                                        />
                                        {
                                            errors.bank_address && touched.bank_address ? <Label>{errors.bank_address}</Label> : null
                                        }
                                    </Flex>
                                    <Flex md={12} sm={12}>
                                    <CardHeaderButton>
                                        <SecondaryButton  type="Button" onClick={()=> (nevigate("/signup/reg-details"))}>
                                            {t("Back")}
                                        </SecondaryButton> 
                                        <PrimaryButton type="submit"
                                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                                            disabled={!(dirty && isValid)}>
                                            {t("Next")}
                                        </PrimaryButton>
                                    </CardHeaderButton>

                                    </Flex>
                                </Flex>

                            </div>

                        </form>
                    );
                }}
            </Formik>
        </Suspense>
    </>
}