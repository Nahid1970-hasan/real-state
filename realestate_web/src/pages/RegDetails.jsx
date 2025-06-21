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

export const RegDetailsPage = () => {
    const { t, i18n } = useTranslation();
    const nevigate = useNavigate();

    const initialValues = {
        fullname: '',
        fathers_name: '',
        mothers_name: '',
        spouse_name: '',
        district_id: '',
        thana_id: '',
        address: '',
        mobile_no: '',
        email: '',
        nid: '',
        nationality: ''
    };


    const validate = (values) => {

        let errors = {};
        if (!values.fullname) {
            errors.fullname = t("Please enter fullname");
        }
        if (values.email) {
            if (!values.mobile_no.startsWith("01")) {
                errors.mobile_no = t("Please type valid mobile no");
            } else if (values.mobile_no.length != 11) {
                errors.mobile_no = t("Mobile no must be 11 digit");
            }
        }
      
        if (values.email) {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = t("err_email_invalid");
            }
        }  
        return errors;
    };

    const submitForm = (values, actions) => {
        console.log(values);
        nevigate("/reg-bank");
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
                                        <Typography textAlign="center" fontSize="bodyTitleFontSize"> {t("Personal Information")}</Typography>
                                    </Flex>
                                    <Flex md={12} sm={12}>
                                        <Typography textAlign="left" fontSize="bodySubTitleFontSize"> {t("Fullname")}</Typography>
                                        <Input
                                            type="text"
                                            name="fullname"
                                            placeholder={t("Type fullname")}
                                            value={values.fullname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            color={errors.fullname && touched.fullname ? "error" : null}
                                        />
                                        {
                                            errors.fullname && touched.fullname ? <Label>{errors.fullname}</Label> : null
                                        }
                                    </Flex>

                                    <Flex md={12} sm={12}>
                                        <Typography textAlign="left" fontSize="bodySubTitleFontSize"> {t("Father Name")}</Typography>
                                        <Input
                                            type="text"
                                            name="fathers_name"
                                            placeholder={t("Type father name")}
                                            value={values.fathers_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            color={errors.fathers_name && touched.fathers_name ? "error" : null}
                                        />
                                        {
                                            errors.fathers_name && touched.fathers_name ? <Label>{errors.fathers_name}</Label> : null
                                        }
                                    </Flex>

                                    <Flex md={12} sm={12}>
                                        <Typography textAlign="left" fontSize="bodySubTitleFontSize"> {t("Mother Name")}</Typography>
                                        <Input
                                            type="text"
                                            name="mothers_name"
                                            placeholder={t("Type mother name")}
                                            value={values.mothers_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            color={errors.mothers_name && touched.mothers_name ? "error" : null}
                                        />
                                        {
                                            errors.mothers_name && touched.mothers_name ? <Label>{errors.mothers_name}</Label> : null
                                        }
                                    </Flex>

                                    <Flex md={12} sm={12}>
                                        <Typography textAlign="left" fontSize="bodySubTitleFontSize"> {t("Spouse Name")}</Typography>
                                        <Input
                                            type="text"
                                            name="spouse_name"
                                            placeholder={t("Type spouse name")}
                                            value={values.spouse_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            color={errors.spouse_name && touched.spouse_name ? "error" : null}
                                        />
                                        {
                                            errors.spouse_name && touched.spouse_name ? <Label>{errors.spouse_name}</Label> : null
                                        }
                                    </Flex>
                                    <Flex md={12} sm={12}>
                                        <Typography textAlign="left" fontSize="bodySubTitleFontSize"> {t("District")}</Typography>
                                        <Select
                                            defaultValue={""}
                                            name="district_id"
                                            onChange={(e) => {
                                                // set_district_id_change(e)
                                                formik.handleChange(e);
                                            }}
                                            onBlur={handleBlur}
                                        >
                                            <option disabled value="">
                                                {t("ph_district")}
                                            </option>
                                            {/* {district?.list.map((d, i) => (
                                                <option value={d.district_id} key={i}>
                                                    {i18n.resolvedLanguage == "bn" ? d.district_name_bn : d.district_name_en}
                                                </option>
                                            ))} */}
                                        </Select>
                                        {
                                            errors.district_id && touched.district_id ? <Label>{errors.district_id}</Label> : null
                                        }

                                    </Flex>

                                    <Flex md={12} sm={12}>
                                        <Typography textAlign="left" fontSize="bodySubTitleFontSize"> {t("Thana")}</Typography>
                                        <Select
                                            defaultValue={""}
                                            name="thana_id"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <option disabled value="">
                                                {t("ph_thana")}
                                            </option>
                                            {/* {thana?.list.map((d, i) => (
                                  <option value={d.thana_id} key={i}> 
                                    {i18n.resolvedLanguage == "bn" ? d.thana_name_bn : d.thana_name_en}
                                  </option>
                                ))} */}

                                            {/* {thanaList?.list.map((d,i)=> <option value={d.org_type_id} key={i}>{d.org_type_en}</option>)} */}
                                        </Select>
                                        {
                                            errors.thana_id && touched.thana_id ? <Label>{errors.thana_id}</Label> : null
                                        }
                                    </Flex>
                                    <Flex md={12} sm={12}>
                                        <Typography textAlign="left" fontSize="bodySubTitleFontSize"> {t("Address")}</Typography>
                                        <Input
                                            type="text"
                                            name="address"
                                            placeholder={t("Type address")}
                                            value={values.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            color={errors.address && touched.address ? "error" : null}
                                        />
                                        {
                                            errors.address && touched.address ? <Label>{errors.address}</Label> : null
                                        }
                                    </Flex>

                                    <Flex md={12} sm={12}>
                                        <Typography textAlign="left" fontSize="bodySubTitleFontSize"> {t("Mobile No (optional)")}</Typography>
                                        <Input
                                            type="text"
                                            name="mobile_no"
                                            placeholder={t("Type mobile no")}
                                            value={values.mobile_no}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            color={errors.mobile_no && touched.mobile_no ? "error" : null}
                                        />
                                        {
                                            errors.mobile_no && touched.mobile_no ? <Label>{errors.mobile_no}</Label> : null
                                        }
                                    </Flex>

                                    <Flex md={12} sm={12}>
                                        <Typography textAlign="left" fontSize="bodySubTitleFontSize"> {t("Email (optional)")}</Typography>
                                        <Input
                                            type="email"
                                            name="email"
                                            placeholder={t("Type email")}
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            color={errors.email && touched.email ? "error" : null}
                                        />
                                        {
                                            errors.email && touched.email ? <Label>{errors.email}</Label> : null
                                        }
                                    </Flex>

                                    <Flex md={12} sm={12}>
                                        <Typography textAlign="left" fontSize="bodySubTitleFontSize"> {t("NID")}</Typography>
                                        <Input
                                            type="text"
                                            name="nid"
                                            placeholder={t("Type nid")}
                                            value={values.nid}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            color={errors.nid && touched.nid ? "error" : null}
                                        />
                                        {
                                            errors.nid && touched.nid ? <Label>{errors.nid}</Label> : null
                                        }
                                    </Flex>

                                    <Flex md={12} sm={12}>
                                        <Typography textAlign="left" fontSize="bodySubTitleFontSize"> {t("Nationality")}</Typography>
                                        <Input
                                            type="text"
                                            name="nationality"
                                            placeholder={t("Type nationality")}
                                            value={values.nationality}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            color={errors.nationality && touched.address ? "error" : null}
                                        />
                                        {
                                            errors.nationality && touched.nationality ? <Label>{errors.nationality}</Label> : null
                                        }
                                    </Flex>
                                    <Flex md={12} sm={12}>
                                        <CardHeaderButton>
                                        <SecondaryButton  type="Button"  onClick={()=> (nevigate("/signup/reg-type"))}>
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