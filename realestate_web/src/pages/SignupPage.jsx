import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/Button";
import { Flex } from "../components/style/Flex_styled";
import { Input } from "../components/style/Input_styled";
import { initURLoader, setUserRegistration, status } from "../features/registration/user_registration_slice";
import { Formik } from "formik";
import { ErrLabel, Label } from "../components/style/Label";
import styled from "styled-components";
import { Toast } from "../components/Toast";
import { Typography } from "../components/style/Typography_styled";
import { Loading } from "../components/Loading";

const CustFlex = styled(Flex)` 
  padding: 2px 8px;
  margin:0;
  display: flex; 
`;
export const SignUpPage = () => {

    const { t, i18n } = useTranslation();
    const user_registration = useSelector((state) => state.user_registration);
    const nevigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState();

    // useEffect(() => { 
      
    // }, []);

    // useEffect(() => {
    //   console.log(gender);
    //   dispatch(loadGender());
    //   dispatch(loadDistrict());
    // }, []);


    const initialValues = {
        mobile_no: '',
        email: '',
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
        return errors;
    };

    const submitForm = (values, actions) => {
        dispatch(status(Object.assign({ "user_status": "initial", ...values })))
        setIsLoading(true);
        //setTimeout(() => { nevigate("/reg-ver"); setIsLoading(false);}, 2000); 
        dispatch(setUserRegistration(values)); 
    };
    useEffect(() => {
       if( user_registration.addUpdateloading == "succeeded"){ 
            setTimeout(() => {   setIsLoading(false);  dispatch(initURLoader()),nevigate("/reg-ver") }, 5000)
       }else if (user_registration.addUpdateloading != "pending"){
        setTimeout(() => { setIsLoading(false), dispatch(initURLoader()) }, 5000);
       } 
    }, [user_registration.addUpdateloading]);

    return (
        <>
            {(user_registration.addUpdateloading == "idle" || user_registration.addUpdateloading == "pending") ? <></> : (
          user_registration.addUpdateloading == "succeeded" ? (
            <Toast msg={user_registration.msg} icon="task_alt" color="success" />
          ) : (
            <Toast color="error" msg={user_registration.msg} />
          )
        )} 
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
                            <div style={{ width: "400px", display: "block", marginLeft: "auto", marginRight: "auto" }}>
                                <Flex row >
                                    <Flex md={12} sm={12}>
                                        <Typography margin="40px 0 0 0" textAlign="center" fontSize="bodyTitleFontSize"> {t("Join with US")}</Typography>
                                        {/* <Typography margin="10px 0 0 0" textAlign="center" fontSize="bodyContentFontSize">{t("reg_subtitle")}</Typography> */}
                                    </Flex>
                                    <Flex  padding="0px" md={12} sm={12}>
                                        <Label> {t("Mobile Number")}</Label>
                                        <Input
                                            app
                                            type="text"
                                            name="mobile_no"
                                            placeholder={t("Type mobile number")}
                                            value={values.mobile_no}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            maxLength={11}
                                            color={errors.mobile_no && touched.mobile_no ? "error" : null}
                                        />
                                        {
                                            errors.mobile_no && touched.mobile_no ? <ErrLabel>{errors.mobile_no}</ErrLabel> : null
                                        }
                                    </Flex>

                                    <Flex  padding="0px" md={12} sm={12}>
                                        <Label> {t("Email")}</Label>
                                        <Input
                                            app
                                            type="text"
                                            name="email"
                                            placeholder={t("Type email")}
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            color={errors.email && touched.email ? "error" : null}
                                        />
                                        {
                                            errors.email && touched.email ? <ErrLabel>{errors.email}</ErrLabel> : null
                                        }
                                    </Flex>
                                    <Flex md={12} sm={12}>
                                        <PrimaryButton full type="submit"
                                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                                            disabled={!(dirty && isValid)}>
                                            {t("Let's Go")}
                                        </PrimaryButton>

                                        {/* <Typography  fontSize="bodyContentFontSize">{t("signin_msg")} {" "}
                                            <Link to="/login"> {t("login_title")}</Link></Typography> */}


                                    </Flex>
                                </Flex>

                            </div>

                        </form>
                    );
                }}
            </Formik>
            <Loading open={isLoading} />

        </>
    );
};
