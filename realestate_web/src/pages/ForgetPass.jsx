import { Formik } from "formik";
import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, DownloadButton, PrimaryButton } from "../components/Button";
import { Card, CardBody } from "../components/style/Card_styled";
import { Center } from "../components/style/Center_styled";
import { Container } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled";
import { FormStyled } from "../components/style/From_style";
import { Input } from "../components/style/Input_styled";
import { ErrLabel, Label } from "../components/style/Label";
import { Loader } from "../components/style/Loader_styled";
import { Typography } from "../components/style/Typography_styled";
import { Toast } from "../components/Toast";
import { getPassResetLink, initLoader } from "../features/resetPassword/forget_password_slice";
import { theme } from "../styles/theme";
import { Loading } from "../components/Loading";

export const ForgetPass = () => {
  const { t, i18n } = useTranslation();
  const forgetPassData = useSelector((state) => state.forgetPass);
  const [isLoading, setIsLoading]=useState(false);
  const [disabled , set_disabled] = useState(false);
  const [tag , set_tag] = useState(false);
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const initData = {
    email_address: "",
  };
  const validate = (values) => {
    let errors = {};
    if (!values.email_address) {
      errors.email_address = t("err_email");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email_address)
    ) {
      errors.email_address = t("err_email_invalid");
    }
    return errors;
  };

  const submitForm = (values) => { 
    dispatch(getPassResetLink(values));
    set_disabled(true)
  };

  useEffect(() => {
    if (forgetPassData.loading == "pending") {
      setIsLoading(true);
     }else if (forgetPassData.loading == "succeeded") {  
      setTimeout(() => { dispatch(initLoader()),setIsLoading(false),set_disabled(false), set_tag(true) }, 5000);
    } else if (forgetPassData.loading != "pending") { 
      setTimeout(() => { dispatch(initLoader()),setIsLoading(false),set_disabled(false) }, 5000);
    }
}, [forgetPassData.loading]);

  return (
    <>
     {(forgetPassData.loading == "idle" || forgetPassData.loading == "pending") ? <></> : (
       forgetPassData.loading == "succeeded" ? (
          <Toast msg={forgetPassData.msg} icon="task_alt" color="success" />
        ) : (
          <Toast color="error" msg={forgetPassData.msg} />
        )
      )}
 
      <Suspense fallback={<Loader />}>
        <Container bottomBorder={"2px solid " + theme.colors.primaryBorder}>
          <Card color={"bg"}>
            <CardBody>
              {tag? (
                <Center>
                  <Typography margin="20px 0 0 0" fontSize="bodySubTitleFontSize" >
                    {t(forgetPassData.msg)}
                  </Typography>
                
                    <Typography  lineHeight="3rem" color="font">
                      Go to Login 
                    <DownloadButton onClick={() => { nevigate("/login") }}>Login</DownloadButton></Typography>
                  
                </Center>
              ) : 
                <Formik
                  initialValues={initData}
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
                    } = formik;
                    return (
                      <div className="container">
                        <Flex row justifyCenter>
                        
                          <Flex md={4} sm={6} xs={12}>
                            <Flex row>
                              <Flex md={12}>
                                <Typography
                                  fontSize="bodySubTitleFontSize" 
                                  textAlign="left"
                                  fontWeight="bold"
                                >
                                  {t("Forgot Password")}
                                </Typography>

                                <Typography 
                                  margin="5px 0"
                                  textAlign="left"
                                >
                                  {t("forget_pass_subtitle")}
                                </Typography>
                              </Flex>
                              <Flex padding="0 !important" md={12}>
                                <form onSubmit={handleSubmit}>
                                  <Input
                                    app
                                    type="email"
                                    name="email_address"
                                    placeholder={t("ph_email")}
                                    value={values.email_address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {errors.email_address &&
                                  touched.email_address ? (
                                    <ErrLabel margin="5px 0 10px 0">{errors.email_address}</ErrLabel>
                                  ) : null}
                                  <PrimaryButton
                                    type="submit"
                                    full
                                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                                    disabled={!(dirty && isValid) || disabled}
                                  >
                                    {t("submit")}
                                  </PrimaryButton>
                                </form>
                              </Flex>
                            </Flex>
                          </Flex>
                          
                        </Flex>
                      </div>
                    );
                  }}
                </Formik>
              }
            </CardBody>
          </Card>
        </Container>
      </Suspense>
      <Loading open={isLoading}/>
    </>
  );
};
