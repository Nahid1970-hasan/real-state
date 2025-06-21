import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../features/page/page_slice";
import { Container } from "../components/style/Container_styled";
import { theme } from "../styles/theme";
import styled from "styled-components";
import { Toast } from "../components/Toast";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { Flex } from "../components/style/Flex_styled";
import { Loader } from "../components/style/Loader_styled";
import { Card, CardHeaderButton, InfoCard, ShadowCard } from "../components/style/Card_styled";
import { Typography } from "../components/style/Typography_styled";
import { ErrLabel, Label } from "../components/style/Label";
import { Formik } from "formik";
import { Input } from "../components/style/Input_styled";
import { TextArea } from "../components/style/TextArea";
import { PrimaryButton } from "../components/Button";
import { Loading } from "../components/Loading";
import { initLoader, saveHomeFeedback } from "../features/homeFeedback/homeFeedback_slice";
import { DateTime } from "luxon";
import { Checkbox } from "../components/Checkbox";

// const IFrame = styled.iframe`
//   width: 100%; 
//   border-color: #fff0;
// `;
export const ContactPage = () => {
  const homeFeedback = useSelector((state) => state.homefeedback);
  const dispatch = useDispatch();
  const formRef = useRef();
  const { t, i18n } = useTranslation();
  const [submit, setSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [data, set_data] = useState({

    fullname: "",
    address: "",
    mobile_no: "",
    request_date: DateTime.now().toFormat("yyyy-MM-dd"),
    request_detail: "",
  });


  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false) }, 3000);
    dispatch(
      loadPage({
        title: "Contract Information",
      })
    );
  }, []);


  const submitForm = (values) => {
    dispatch(saveHomeFeedback(values));

  };

  const validate = (values) => {
    let errors = {};

    if (!values.fullname) {
      errors.fullname = ("Name is required");
    } else if (values.fullname.length > 50) {
      errors.fullname = ("Maximum 50 Characters are allowed");
    }
    if (!values.mobile_no) {
      errors.mobile_no = t("Mobile number is required");
    } else if (!/(^(01){1}[3456789]{1}(\d){8})$/i.test(values.mobile_no)) {
      errors.mobile_no = t("Type mobile number");
    }

    if (!values.request_detail) {
      errors.request_detail = ("Message is required");
    } else if (values.request_detail.length > 500) {
      errors.request_detail = ("Minimum 500 Characters are allowed");
    }
    if (!values.address) {
      errors.address = ("Address is required");
    } else if (values.address.length > 200) {
      errors.address = ("Minimum 200 Characters are allowed");
    }

    return errors;
  };
  useEffect(() => {
    if (homeFeedback.addLoading == "pending") {
      setIsLoading(true);
    } else if (homeFeedback.addLoading == "succeeded") {
      setTimeout(() => { dispatch(initLoader()); formRef.current.resetForm(); setIsChecked(false), setIsLoading(false); }, 5000);
    } else if (homeFeedback.addLoading != "idle") {
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 5000);
    }
  }, [homeFeedback.addLoading]);

  return (
    <>
      {(homeFeedback.addLoading == "idle" || homeFeedback.addLoading == "pending") ? <></> : (
        homeFeedback.addLoading == "succeeded" ? (
          <Toast msg={homeFeedback.msg} icon="task_alt" color="success" />
        ) : (
          <Toast color="error" msg={homeFeedback.msg} />
        )
      )}
      <Flex row>
        <Flex padding={"0 !important"} md={12}>
          <iframe
            height={"500px"}
            width={"100%"}
            src="https://maps.google.com/maps?q= House%2020/A%20Rd%20No.%2012,%20Shekhertek,%20Mohammadpur,%20Dhaka,%201207&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
          // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0725395948293!2d90.37623351554518!3d23.780431084574605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c74c74849fe3%3A0x3ceaf53dcb993e5a!2sBangladesh+Meteorological+Department%2C+Dhaka+1207!5e0!3m2!1sen!2sbd!4v1500445282599"
          ></iframe>
        </Flex>
      </Flex>
      <Container border="none">
        <Suspense fallback={<Loader />}>
          <Flex row>
            <Flex md={12}>
              <Typography margin={"20px 0"} fontSize="bodyTitleFontSize" textAlign="left" fontWeight="bold">
                Contact Us
              </Typography>

            </Flex>
            <Flex padding={"0 0 10px 0!important"} md={12}>

              <Typography margin={"10px 0"} fontSize="bodySubTitleFontSize" textAlign="left">
                Thank you for your interest in Selim Real Estate. We are here to help you with all your real estate needs, whether you're looking to buy, sell, or rent a property.
                Please don't hesitate to contact us with any questions or inquiries you may have.
              </Typography>
            </Flex>
            <Flex row>
              <Flex md={7}>
                <ShadowCard padding="1.5rem">
                  <Typography fontSize="bodyContentFontSize" textAlign="left">
                    Alternatively, you can fill out the contact form below and we will get back to you as soon as possible.
                    We look forward to hearing from you and assisting you in any way we can.
                  </Typography>
                  <Flex Row>
                    <Formik
                      initialValues={data}
                      validate={validate}
                      enableReinitialize
                      innerRef={formRef}
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
                        } = formik;
                        console.log()
                        return (
                          <div>
                            <form onSubmit={handleSubmit}>



                              <Flex row>
                                <Flex padding="0 5px 0 0!important" md={6}>
                                  <Label color="font">Full Name</Label>
                                  <Input
                                    app
                                    type="text"
                                    name="fullname"
                                    placeholder={("Full Name")}
                                    value={values.fullname || ""}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    color={
                                      errors.fullname && touched.fullname
                                        ? "error"
                                        : null
                                    }
                                  />
                                  {errors.fullname && touched.fullname ? (
                                    <ErrLabel>{errors.fullname}</ErrLabel>
                                  ) : null}
                                </Flex>
                                <Flex padding="0 0 0 5px!important" md={6}>
                                  <Label color="font">Mobile Number</Label>
                                  <Input
                                    app
                                    type="text"
                                    name="mobile_no"
                                    placeholder={("Mobile number")}
                                    value={values.mobile_no || ""}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    color={
                                      errors.mobile_no && touched.mobile_no
                                        ? "error"
                                        : null
                                    }
                                  />
                                  {errors.mobile_no && touched.mobile_no ? (
                                    <ErrLabel>{errors.mobile_no}</ErrLabel>
                                  ) : null}
                                </Flex>
                              </Flex>
                              <Flex row>
                                <Flex padding="0 5px 0 0  !important" md={12}>
                                  <Label color="font">Address</Label>
                                  <Input
                                    app
                                    type="text"
                                    name="address"
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder={("Type address..")}
                                  />
                                  {errors.address && touched.address ? (
                                    <ErrLabel>{errors.address}</ErrLabel>
                                  ) : null}
                                </Flex>

                              </Flex>
                              <Flex row>
                                <Flex padding="0 0 0 0 !important" md={12}>
                                  <Label color="font">Message</Label>
                                  <TextArea
                                    app
                                    width="100%"
                                    type="text"
                                    name="request_detail"
                                    placeholder={("Message")}
                                    value={values.request_detail || ""}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    color={
                                      errors.request_detail && touched.request_detail
                                        ? "error"
                                        : null
                                    }
                                  />
                                  {errors.request_detail && touched.request_detail ? (
                                    <ErrLabel>{errors.request_detail}</ErrLabel>
                                  ) : null}
                                </Flex>
                                
                                <Flex padding={"0 !important"} md={12}>
                                  <div style={{ display: "flex", paddingBottom: "5px", justifyContent: "flex-start", alignItems: "center" }} >
                                    <Checkbox size={"md"} checked={isChecked} onChange={() => setIsChecked(!isChecked)} hoverColor={"transparent"} />
                                    <Label margin="0" htmlFor="rememverMe">{('I consent to having this website store my submitted information')}</Label>
                                  </div>


                                </Flex>

                                <PrimaryButton
                                  full
                                  type="submit"
                                  className={!(dirty && isValid) ? "disabled-btn" : ""}
                                  disabled={!(dirty && isValid) || !isChecked}
                                >
                                  {"Submit"}
                                </PrimaryButton>

                              </Flex>



                            </form>
                          </div>
                        );
                      }}
                    </Formik>
                  </Flex>
                </ShadowCard>
              </Flex>
              <Flex md={5}>
                <Flex padding="0 0 0 20px" md={12}>
                  <Typography fontSize="bodyTitleFontSize" textAlign="right" fontWeight="bold">
                    Get in Touch with Us
                  </Typography>
                </Flex>
                <Flex md={12}>
                  <Typography fontSize="bodyContentFontSize" textAlign="right" >
                    phone number
                  </Typography>
                  <Typography fontSize="bodyContentFontSize" textAlign="right" >
                    mail
                  </Typography>
                </Flex>
                <Flex md={12}>
                  <Typography fontSize="bodyContentFontSize" textAlign="right" fontWeight="bold" >
                    Head Office
                  </Typography>
                </Flex>
                <Flex md={12}>
                  <Typography fontSize="bodyContentFontSize" textAlign="right" >
                    Chittagong
                  </Typography>
                </Flex>
                <Flex md={12}>
                  <Typography fontSize="bodyContentFontSize" textAlign="right" fontWeight="bold" >
                    Office Hours:
                  </Typography>
                  <Typography fontSize="bodyContentFontSize" textAlign="right" >
                    Monday to Friday, 9:00 am to 5:00 pm
                  </Typography>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Suspense>
      </Container>
      <Loading open={isLoading} />
    </>
  );
};
