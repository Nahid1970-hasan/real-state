import { Suspense, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, PrimaryButton, ReactButton, SecondaryButton } from "../components/Button"
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
import styled from "styled-components"
import { useEffect } from "react"
import { changeType, updatePageList } from "../features/user/user_slice"
import { setUserTypeData,initLoader } from "../features/registration/user_data_slice"
import { Loading } from "../components/Loading"

const CircleText = styled(Flex)` 
    height: 90px;
    border-radius: 45px;  
    border: ${({ theme, selected }) => (selected ? "5px solid " + theme.colors.primaryBorder : "none")};
    background: ${({ theme, selected }) => (selected ? theme.colors.primaryHover : "#1e739c")};
    margin: 15px;
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        background: ${({ theme }) => (theme.colors.primaryHover)};
    }
`;
export const RegTypePage = () => {
    const { t, i18n } = useTranslation();
    const nevigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const userData = useSelector((state) => state.userData);
    const [isInvestor, setInvestor] = useState(false);
    const [isCustomer, setCustomer] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const initialValues = {
        user_type: '',
    }; 
    const validate = (values) => { 
        let errors = {}; 
        if (!values.user_type) {
            errors.user_type = t("Please choose registration type");
        } 
        return errors;
    };

    useEffect(() => {
        if( userData.loading == "succeeded"){ 
            dispatch(updatePageList(userData.pageList));
            if (userData.user_type=="INVESTOR"){
                dispatch(changeType('INVESTOR')) 
            }else if(userData.user_type=="CUSTOMER"){
                dispatch(changeType('CUSTOMER')) 
            } 
            setTimeout(() => {   dispatch(initLoader()),  setIsLoading(false);   }, 5000)
        }else if (userData.loading != "pending"){
            setTimeout(() => { setIsLoading(false), dispatch(initLoader()) }, 5000);
        } 
     }, [userData]);

    useEffect(() => {
        i18n.changeLanguage("en");
        if (user.login) {
            if (user.user_type=="INVESTOR"){
                nevigate("/inv")
            }else if(user.user_type=="CUSTOMER"){
                nevigate("/cust")
            } else if(user.user_type=="ADMIN"){
                nevigate("/app")
            } 
        }else{
            nevigate("/")
        }
      }, [user]);

    const submitForm = (values, actions) => {  
        setIsLoading(true);
        dispatch(setUserTypeData(values)); 
    };

    return <>
      {(userData.loading == "idle" || userData.loading == "pending") ? <></> : (
        userData.loading != "succeeded" && <Toast color="error" msg={userData.msg} /> 
      )}
        <Suspense fallback={<Loader />}>
            <div style={{ display: "flex", alignItems: "center", height: "80vh", justifyContent: "center" }}>
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
                                <div style={{ background: "#fff",  width: "300px", top: "10%", padding: "20px" }}>
                                    <Flex row >
                                        <Flex md={12} sm={12}>
                                            <Typography textAlign="center" fontSize="bodyTitleFontSize"> {t("Choose Login Type")}</Typography>
                                        </Flex>  
                                        <Flex md={12} sm={12}>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <CircleText selected={isInvestor} onClick={() => { setFieldValue("user_type", !isInvestor ? "INVESTOR" : ""), setInvestor(!isInvestor), setCustomer(false)}}>Investor</CircleText>
                                                <CircleText selected={isCustomer} onClick={() => { setFieldValue("user_type", !isCustomer ? "CUSTOMER" : ""), setCustomer(!isCustomer), setInvestor(false)}}>Customer</CircleText>
                                            </div>
                                            {
                                                errors.user_type && touched.user_type ? <Label>{errors.user_type}</Label> : null
                                            }
                                        </Flex>

                                        <Flex md={12} sm={12}>
                                            <CardHeaderButton> 
                                                <PrimaryButton type="submit"
                                                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                    disabled={!(dirty && isValid)}>
                                                    {t("Continue")}
                                                </PrimaryButton>
                                            </CardHeaderButton>
                                        </Flex>
                                    </Flex>
                                </div>


                            </form>
                        );
                    }}
                </Formik>
            </div>
        </Suspense>
        <Loading open={isLoading} />
    </>
}