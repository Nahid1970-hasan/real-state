import { Suspense } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { PrimaryButton } from "../components/Button"
import { Flex } from "../components/style/Flex_styled"
import { Loader } from "../components/style/Loader_styled"
import { Typography } from "../components/style/Typography_styled"
import { Formik } from "formik"
import { Input } from "../components/style/Input_styled"
import { ErrLabel, Label } from "../components/style/Label"
import { initURLoader, status, validateUserRegistration } from "../features/registration/user_registration_slice"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Loading } from "../components/Loading"
import { Toast } from "../components/Toast"

export const ConfirmEmail = () => {
    const { t, i18n } = useTranslation();
    const userRegistration = useSelector((state) => state.user_registration);
    const nevigate = useNavigate();
    const formRef = useRef();
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState();

    const initialValues = {
        mobile_no: '',
        email: '',
        validation_number: ''
    };


    const validate = (values) => {

        let errors = {};
        if (!values.mobile_no) {
            errors.mobile_no = t("Please enter mobile number");
        } else if (!values.mobile_no.startsWith("01")) {
            errors.mobile_no = t("Please type valid mobile number");
        } else if (values.mobile_no.length != 11) {
            errors.mobile_no = t("Mobile no must be 11 digit");
        }
        if (!values.email) {
            errors.email = t("err_email");
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = t("err_email_invalid");
        }
        if (!values.validation_number) {
            errors.validation_number = t("Please enter validation number");
        }
        return errors;
    };

    useEffect(() => {
        setDisabled(false);
    }, []);
    useEffect(() => {
        if (userRegistration?.user_info?.user_status == "initial") {
            setDisabled(true);
            formRef.current.setFieldValue("email", userRegistration?.user_info?.email);
            formRef.current.setFieldValue("mobile_no", userRegistration?.user_info?.mobile_no);
            dispatch(status({})); 
        }
    }, [userRegistration.user_info]);

    const submitForm = (values, actions) => { 
        dispatch(status(Object.assign({ "user_status": "validate", ...values })))
        setIsLoading(true); 
        dispatch(validateUserRegistration(values)); 
    };

    useEffect(() => {
        if( userRegistration.validating == "succeeded"){ 
            if(userRegistration.user_id==0){
                setTimeout(() => { dispatch(initURLoader());  setIsLoading(false);}, 5000)
            }else{
                setTimeout(() => { dispatch(initURLoader());  setIsLoading(false); nevigate("/credential")}, 5000)
            }
           
        }else if (userRegistration.validating != "pending"){
         setTimeout(() => { setIsLoading(false), dispatch(initURLoader()) }, 5000);
        } 
     }, [userRegistration.validating]);

    return <>
        <Suspense fallback={<Loader />}>
        {(userRegistration.validating == "idle" || userRegistration.validating == "pending") ? <></> : (
          userRegistration.validating == "succeeded" ? (
            <Toast msg={userRegistration.msg} icon="task_alt" color="success" />
          ) : (
            <Toast color="error" msg={userRegistration.msg} />
          )
        )} 
            <Formik
                initialValues={initialValues}
                validate={validate}
                innerRef={formRef}
                onSubmit={submitForm}
                enableReinitialize
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
                            <div style={{ width: "400px", display: "block", marginLeft: "auto", marginRight: "auto" }}>
                                <Flex row >
                                    <Flex md={12} sm={12}>
                                        <Typography textAlign="center" fontSize="bodyTitleFontSize"> {t("Validate Mobile/Email")}</Typography>
                                    </Flex>
                                    <Flex padding="0px" md={12} sm={12}>
                                        <Label > {t("Mobile Number")}</Label>
                                        <Input
                                            app
                                            type="text"
                                            name="mobile_no"
                                            placeholder={t("Type mobile number")}
                                            value={values.mobile_no || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            maxLength={11}
                                            disabled={disabled}
                                            color={errors.mobile_no && touched.mobile_no ? "error" : null}
                                        />
                                        {
                                            errors.mobile_no && touched.mobile_no ? <ErrLabel>{errors.mobile_no}</ErrLabel> : null
                                        }
                                    </Flex>

                                    <Flex padding="0px" md={12} sm={12}>
                                        <Label> {t("Email")}</Label>
                                        <Input
                                            app
                                            type="text"
                                            name="email"
                                            placeholder={t("Type email")}
                                            value={values.email || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled={disabled}
                                            color={errors.email && touched.email ? "error" : null}
                                        />
                                        {
                                            errors.email && touched.email ? <ErrLabel>{errors.email}</ErrLabel> : null
                                        }
                                    </Flex>

                                    <Flex  padding="0px" md={12} sm={12}>
                                        <Label> {t("Validation Number")}</Label>
                                        <Input 
                                            app
                                            type="text"
                                            name="validation_number"
                                            placeholder={t("Type validation number")}
                                            value={values.validation_number || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur} 
                                            color={errors.validation_number && touched.validation_number ? "error" : null}
                                        />
                                        {
                                            errors.validation_number && touched.validation_number ? <ErrLabel>{errors.validation_number}</ErrLabel> : null
                                        }
                                    </Flex>

                                    <Flex md={12} sm={12}>
                                        <PrimaryButton full type="submit"
                                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                                            disabled={!(dirty && isValid)}>
                                            {t("Next")}
                                        </PrimaryButton>

                                        {/* <Typography fontSize="bodyContentFontSize" color="font">{t("signin_msg")} {" "}
                                            <Link to="/login"> {t("login_title")}</Link></Typography> */}


                                    </Flex>
                                </Flex>

                            </div>

                        </form>
                    );
                }}
            </Formik>
        </Suspense>
        <Loading open={isLoading} />
    </>
}