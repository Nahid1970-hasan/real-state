import { Suspense, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, PrimaryButton } from "../components/Button"
import { Card, CardBody, CardHeaderButton } from "../components/style/Card_styled"
import { Center } from "../components/style/Center_styled"
import { Container } from "../components/style/Container_styled"
import { Flex } from "../components/style/Flex_styled"
import { Loader } from "../components/style/Loader_styled"
import { Typography } from "../components/style/Typography_styled"
import { Toast } from "../components/Toast"
import NotFound from "./NotFound"
import emailverifyimg from "../assets/email-verify.svg"
import { Select } from "../components/style/Select_styled";
import Flatpickr from "react-flatpickr";
import { DateTime } from "luxon";
import { Formik } from "formik"
import { Input } from "../components/style/Input_styled"
import { ErrLabel, HLLabel, Label } from "../components/style/Label"
import styled from "styled-components"
import { initURLoader, saveUserData, status } from "../features/registration/user_registration_slice"
import { useRef } from "react"
import { useEffect } from "react"
import { loadDistrict } from "../features/district/district_slice"
import { Loading } from "../components/Loading"
import { loadThana } from "../features/thana/thana_slice"

const CustFlex = styled(Flex)`
  padding: 0;
`;

const CustRadio = styled.div`
  height: auto;
  display: flex;
  vertical-align: middle;
  align-items: center;
  & :first-child {
    margin-right: 3px;
  }
  & :last-child {
    margin-left: 3px;
  }
`;


export const RegCredentialPage = () => {
    const { t, i18n } = useTranslation();
    const nevigate = useNavigate();
    const formRef = useRef();
    const dispatch = useDispatch();
    const userRegistration = useSelector((state) => state.user_registration);
    const [isInvestor, setInvestor] = useState(false);
    const [isCustomer, setCustomer] = useState(false);
    const [isBoth, setBoth] = useState(false);
    const [isLoading, setIsLoading] = useState();
    const district = useSelector((state) => state.district);
    const thana = useSelector((state) => state.thana);
    const initialValues = {
        mobile_no: '',
        email: '',
        username: '',
        password: '',
        con_password: '',
        user_type: '',
        fullname: '',
        father_name: '',
        mother_name: '',
        spouse_name: '',
        district_id: '',
        thana_id: '',
        address: '',
        con_mobile_no: '',
        con_email: '',
        nid: '',
        nationality: 'Bangladeshi',
        account_no: '',
        bank_name: '',
        branch_name: '',
        routing_no: '',
        bank_address: ''
    };


    const validate = (values) => {

        let errors = {};
        if (!values.mobile_no) {
            errors.mobile_no = t("Mobile no is required.");
        } else if (!values.mobile_no.startsWith("01")) {
            errors.mobile_no = t("Please type valid mobile no");
        } else if (values.mobile_no.length != 11) {
            errors.mobile_no = t("Mobile no must be 11 digit");
        }
        if (!values.email) {
            errors.email = t("Email is required");
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = t("Invalid email");
        }
        if (!values.username) {
            errors.username = t("Username is required");
        }
        if (!values.password) {
            errors.password = t("Password is required.");
        } else if (
            !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(values.password)
        ) {
            errors.password = t("Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character are required.");
        }
        if (!values.con_password) {
            errors.con_password = t("Confirm password is required.");
        } else if (values.con_password != values.password) {
            errors.con_password = t("Confirm password doesn't match with given password");
        }

        if (!values.district_id) {
            errors.district_id = t("District is required.");;
        }
        if (!values.thana_id) {
            errors.thana_id = t("Thana is required.");;
        }
        if (!values.nationality) {
            errors.nationality = t("Nationality is required.");
        }

        return errors;
    };


    useEffect(() => {
        setIsLoading(true);
        dispatch(loadDistrict());
    }, []);

    useEffect(() => {
        if (district.loading == "succeeded") {
            setIsLoading(false);
        } else if (district.loading != "pending" && district.loading != "idle") {
            setTimeout(() => { setIsLoading(false); }, 4000);
        }
    }, [district.loading]);

    useEffect(() => {
        if (thana.loading == "succeeded") {
            setIsLoading(false);
        } else if (thana.loading != "pending" && thana.loading != "idle") {
            setTimeout(() => { setIsLoading(false); }, 4000);
        }
    }, [thana.loading]);

    useEffect(() => {
        if (userRegistration?.user_info?.user_status == "validate") {
            formRef.current.setFieldValue("email", userRegistration?.user_info?.email);
            formRef.current.setFieldValue("mobile_no", userRegistration?.user_info?.mobile_no);
        } else {
            // nevigate("/reg-ver");
        }
    }, [userRegistration.user_info]);

    const submitForm = (values, actions) => {
        values.pre_user_id = userRegistration.user_id; 
        dispatch(saveUserData(values));
    };

    function set_district_id_change(event) {
        let districtID = event.target.value;
        const message = {
            district_id: districtID,
        };
        setIsLoading(true);
        dispatch(loadThana(message));
    }

    useEffect(() => {
        if (userRegistration.addUpdateloading == "pending") {
            setIsLoading(true);
        } else if (userRegistration.addUpdateloading == "succeeded") {
            setTimeout(() => { dispatch(initURLoader()), setIsLoading(false); nevigate("/reg-success") }, 5000)
        } else if (userRegistration.addUpdateloading != "pending") {
            setTimeout(() => { setIsLoading(false), dispatch(initURLoader()) }, 5000);
        }
    }, [userRegistration.addUpdateloading]);

    return <>
        <Container border="none">

            {(userRegistration.addUpdateloading == "idle" || userRegistration.addUpdateloading == "pending") ? <></> : (
                userRegistration.addUpdateloading == "succeeded" ? (
                    <Toast msg={userRegistration.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={userRegistration.msg} />
                )
            )}

            <Suspense fallback={<Loader />}>
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
                                <Flex row>
                                    <Flex md={12} sm={12}>
                                        <Typography margin={"40px 0 0 "} textAlign="center" fontSize="bodyTitleFontSize"> {t("Registration")}</Typography>
                                    </Flex>
                                    <Flex md={12}>
                                        <HLLabel>
                                            {("Credential Information")}
                                        </HLLabel>
                                    </Flex>
                                    <Flex row>
                                        <Flex md={6} xs={12}>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign="left">
                                                        {("Mobile No.")}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="mobile_no"
                                                        placeholder={t("Type mobile no")}
                                                        value={values.mobile_no}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        maxLength={11}
                                                        disabled="disabled"
                                                        color={errors.mobile_no && touched.mobile_no ? "error" : null}
                                                    />
                                                    {
                                                        errors.mobile_no && touched.mobile_no ? <ErrLabel>{errors.mobile_no}</ErrLabel> : null
                                                    }
                                                </CustFlex>
                                            </Flex>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign="left">
                                                        {('Email ')}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="email"
                                                        placeholder={t("Type email")}
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled="disabled"
                                                        color={errors.email && touched.email ? "error" : null}
                                                    />
                                                    {
                                                        errors.email && touched.email ? <ErrLabel>{errors.email}</ErrLabel> : null
                                                    }
                                                </CustFlex>
                                            </Flex>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign="left">
                                                        {('Username ')}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="username"
                                                        placeholder={t("Type username")}
                                                        value={values.username}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        maxLength={100}
                                                        color={errors.username && touched.username ? "error" : null}
                                                    />
                                                    {
                                                        errors.username && touched.username ? <ErrLabel>{errors.username}</ErrLabel> : null
                                                    }
                                                </CustFlex>

                                            </Flex>
                                        </Flex>
                                        <Flex md={6} xs={12}>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign="left">
                                                        {("Password")}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Input
                                                        app
                                                        type="password"
                                                        name="password"
                                                        placeholder={("Type password")}
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={errors.password && touched.password ? "error" : null}
                                                    />
                                                    {
                                                        errors.password && touched.password ? <ErrLabel>{errors.password}</ErrLabel> : null
                                                    }
                                                </CustFlex>

                                            </Flex>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign="left">
                                                        {("Confirm Password")}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Input
                                                        app
                                                        type="password"
                                                        name="con_password"
                                                        placeholder={("Type confirm password")}
                                                        value={values.con_password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={errors.con_password && touched.con_password ? "error" : null}
                                                    />
                                                    {
                                                        errors.con_password && touched.con_password ? <ErrLabel>{errors.con_password}</ErrLabel> : null
                                                    }
                                                </CustFlex>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Flex md={12}>
                                        <HLLabel>
                                            {("Registration Type")}
                                        </HLLabel>
                                    </Flex>
                                    <Flex row>
                                        <Flex md={6} sm={10} xs={12}>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign="left">
                                                        {("Type of Registration")}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <div style={{ display: "inline-flex" }}>
                                                        <CustRadio first>
                                                            <Input
                                                                app
                                                                type="radio"
                                                                name="user_type"
                                                                checked={values.user_type.toLocaleLowerCase() == 'investor'}
                                                                value={'investor'}
                                                                onChange={(e) =>
                                                                    setFieldValue(
                                                                        "user_type",
                                                                        e.target.value.toLocaleUpperCase()
                                                                    )
                                                                }
                                                            />
                                                            <Label margin="4px 8px" color="font">
                                                                {("Investor")}
                                                            </Label>
                                                        </CustRadio>
                                                        <CustRadio>
                                                            <Input
                                                                app
                                                                type="radio"
                                                                name="user_type"
                                                                checked={values.user_type.toLocaleLowerCase() == 'customer'}
                                                                value={'customer'}
                                                                onChange={(e) =>
                                                                    setFieldValue(
                                                                        "user_type",
                                                                        e.target.value.toLocaleUpperCase()
                                                                    )
                                                                }
                                                            />
                                                            <Label margin="4px 8px" color="font">
                                                                {("Customer")}
                                                            </Label>
                                                        </CustRadio>
                                                        <CustRadio>
                                                            <Input
                                                                app
                                                                type="radio"
                                                                name="user_type"
                                                                checked={values.user_type.toLocaleLowerCase() == 'inv-cust'}
                                                                value={'inv-cust'}
                                                                onChange={(e) =>
                                                                    setFieldValue(
                                                                        "user_type",
                                                                        e.target.value.toLocaleUpperCase()
                                                                    )
                                                                }
                                                            />
                                                            <Label margin="4px 8px" color="font">
                                                                {("Both")}
                                                            </Label>
                                                        </CustRadio>
                                                    </div>
                                                    {!values.user_type ? (
                                                        <ErrLabel margin="4px 0 10px 10px" >{errors.user_type}</ErrLabel>
                                                    ) : null}
                                                </CustFlex>
                                            </Flex>

                                        </Flex>
                                    </Flex>
                                    <Flex md={12}>
                                        <HLLabel>
                                            {("Detail Information")}
                                        </HLLabel>
                                    </Flex>
                                    <Flex row>
                                        <Flex md={6} xs={12}>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign={"left"}>
                                                        {("Full Name")}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        placeholder="Type full name"
                                                        name="fullname"
                                                        value={values.fullname}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={
                                                            errors.fullname && touched.fullname
                                                                ? "error"
                                                                : null
                                                        }
                                                    />
                                                    
                                                </CustFlex>
                                            </Flex>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign={"left"}>
                                                        {("Father's Name")}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        placeholder="Type father's name"
                                                        name="father_name"
                                                        value={values.father_name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={
                                                            errors.father_name && touched.father_name
                                                                ? "error"
                                                                : null
                                                        }
                                                    />
                                                    {/* {errors.father_name && touched.father_name ? (
                                                        <ErrLabel>{errors.father_name}</ErrLabel>
                                                    ) : null} */}
                                                </CustFlex>
                                            </Flex>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign={"left"}>
                                                        {("Mother's Name")}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        placeholder="Type mother's name"
                                                        name="mother_name"
                                                        value={values.mother_name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={
                                                            errors.mother_name && touched.mother_name
                                                                ? "error"
                                                                : null
                                                        }
                                                    />
                                                  
                                                </CustFlex>
                                            </Flex>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign={"left"}>
                                                        {("Spouse Name")}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        placeholder="Type spouse name"
                                                        name="spouse_name"
                                                        value={values.spouse_name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={
                                                            errors.spouse_name &&
                                                                touched.spouse_name
                                                                ? "error"
                                                                : null
                                                        }
                                                    />
                                                    
                                                </CustFlex>
                                            </Flex>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign={"left"}>
                                                        {('District')}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Select
                                                        app
                                                        defaultValue={""}
                                                        name="district_id"
                                                        onChange={(e) => {
                                                            set_district_id_change(e)
                                                            formik.handleChange(e);
                                                        }}
                                                        onBlur={handleBlur}
                                                    >
                                                        <option disabled value="">
                                                            {t("ph_district")}
                                                        </option>
                                                        {district?.list.map((d, i) => (
                                                            <option value={d.district_id} key={i}>
                                                                {d.district_name}
                                                            </option>
                                                        ))}
                                                    </Select>
                                                    {errors.district_id && touched.district_id ? (
                                                        <ErrLabel>{errors.district_id}</ErrLabel>
                                                    ) : null}
                                                </CustFlex>
                                            </Flex>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign={"left"}>
                                                        {('Thana')}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Select
                                                        app
                                                        defaultValue={""}
                                                        name="thana_id"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        <option disabled value="">
                                                            {t("ph_thana")}
                                                        </option>
                                                        {thana?.list.map((d, i) => (
                                                            <option value={d.thana_id} key={i}>
                                                                {d.thana_name}
                                                            </option>
                                                        ))}

                                                    </Select>
                                                    {errors.thana_id && touched.thana_id ? (
                                                        <ErrLabel>{errors.thana_id}</ErrLabel>
                                                    ) : null}
                                                </CustFlex>
                                            </Flex>
                                        </Flex>
                                        <Flex md={6} xs={12}>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign={"left"}>
                                                        {('Address')}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="address"
                                                        placeholder={t("Type address")}
                                                        value={values.address}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={errors.address && touched.address ? "error" : null}
                                                    />
                                                </CustFlex>
                                            </Flex>

                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign={"left"}>
                                                        {('Mobile Number (Optional)')}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="con_mobile_no"
                                                        placeholder={t("Type mobile number")}
                                                        value={values.con_mobile_no}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={errors.con_mobile_no && touched.con_mobile_no ? "error" : null}
                                                    />
                                                </CustFlex>
                                            </Flex>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign={"left"}>
                                                        {('Email (Optional)')}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Input
                                                        app
                                                        type="email"
                                                        name="con_email"
                                                        placeholder={t("Type email")}
                                                        value={values.con_email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={errors.con_email && touched.con_email ? "error" : null}
                                                    />
                                                </CustFlex>
                                            </Flex>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign={"left"}>
                                                        {('NID')}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="nid"
                                                        placeholder={("Type NID")}
                                                        value={values.nid}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={errors.nid && touched.nid ? "error" : null}
                                                    />
                                                </CustFlex>
                                            </Flex>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign={"left"}>
                                                        {('Nationality')}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Select
                                                        app
                                                        type="text"
                                                        name="nationality"
                                                        value={values.nationality || "Bangladeshi"}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={
                                                            errors.nationality &&
                                                                touched.nationality
                                                                ? "error"
                                                                : null
                                                        }
                                                    >
                                                        <option disabled value={""}>
                                                            --Select value
                                                        </option>
                                                        <option value={"Bangladeshi"}>
                                                            Bangladeshi
                                                        </option>
                                                        <option value={"Foreign Nation"}>
                                                            Foreign Nation
                                                        </option>
                                                    </Select>
                                                    {errors.nationality &&
                                                        touched.nationality ? (
                                                        <ErrLabel>
                                                            {errors.nationality}
                                                        </ErrLabel>
                                                    ) : null}
                                                </CustFlex>
                                            </Flex>

                                            {/* */}
                                        </Flex>
                                    </Flex>
                                    <Flex md={12}>
                                        <HLLabel>
                                            {("Bank Information")}
                                        </HLLabel>
                                    </Flex>
                                    <Flex row>
                                        <Flex md={6} xs={12}>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign="left">
                                                        {("Account Number")}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="account_no"
                                                        placeholder={("Type account number")}
                                                        value={values.account_no}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={errors.account_no && touched.account_no ? "error" : null}
                                                    />
                                                   
                                                </CustFlex>
                                            </Flex>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign="left">
                                                        {('Bank Name ')}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="bank_name"
                                                        placeholder={("Type bank name")}
                                                        value={values.bank_name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={errors.bank_name && touched.bank_name ? "error" : null}
                                                    />
                                                    
                                                </CustFlex>
                                            </Flex>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign="left">
                                                        {('Branch Name ')}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="branch_name"
                                                        placeholder={("Type branch name")}
                                                        value={values.branch_name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={errors.branch_name && touched.branch_name ? "error" : null}
                                                    />
                                                    
                                                </CustFlex>

                                            </Flex>
                                        </Flex>
                                        <Flex md={6} xs={12}>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign="left">
                                                        {("Routing Number")}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="routing_no"
                                                        placeholder={("Type rounting number")}
                                                        value={values.routing_no}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={errors.routing_no && touched.routing_no ? "error" : null}
                                                    />
                                                   
                                                </CustFlex>

                                            </Flex>
                                            <Flex row>
                                                <CustFlex md={4} sm={6} xs={12}>
                                                    <Typography textAlign="left">
                                                        {("Address")}
                                                    </Typography>
                                                </CustFlex>
                                                <CustFlex md={8} sm={6} xs={12}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="bank_address"
                                                        placeholder={("Type bank address")}
                                                        value={values.bank_address}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={errors.bank_address && touched.bank_address ? "error" : null}
                                                    />
                                                   
                                                </CustFlex>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Flex md={12} sm={12}>
                                        <CardHeaderButton>
                                            <PrimaryButton type="submit"
                                                className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                disabled={!(dirty && isValid)}>
                                                {("Submit")}
                                            </PrimaryButton>
                                        </CardHeaderButton>
                                    </Flex>
                                </Flex>

                            </form>
                        );
                    }}
                </Formik>
            </Suspense>
        </Container>
        <Loading open={isLoading} />
    </>
}