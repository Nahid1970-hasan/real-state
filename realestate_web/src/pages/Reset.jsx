import { Formik } from "formik";
import { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, DownloadButton } from "../components/Button";
import { Card, CardBody } from "../components/style/Card_styled";
import { Center } from "../components/style/Center_styled";
import { Container } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled";
import { Input } from "../components/style/Input_styled";
import { ErrLabel, Label } from "../components/style/Label";
import { Loader } from "../components/style/Loader_styled";
import { Typography } from "../components/style/Typography_styled";
import { Toast } from "../components/Toast";
import NotFound from "./NotFound";
import { theme } from "../styles/theme";
import { getResetPassword, initLoader } from "../features/resetPassword/reset_password_slice";
import { useEffect } from "react";
import { Loading } from "../components/Loading";

export const ResetPass = () => {
  const { t, i18n } = useTranslation();
  const resetPassData = useSelector((state) => state.resetPass);
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const { token } = useParams();
  const [isLoading, setIsLoading]=useState(false);
  const [disabled , set_disabled] = useState(false);
  const [tag , set_tag] = useState(false);
  const [tokenstr] = useState(token.split(":token=")[1]);

  const initData = {
    password: "",
    new_password: "",
  };
  const validate = (values) => {
    let errors = {};
    if (!values.password) {
      errors.password = t("err_new_pass");
    } else if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(values.password)
    ) {
      errors.password = t("err_password_invalid");
    }
    if (!values.new_password) {
      errors.new_password = t("err_con_new_pass");
    } else if (values.new_password != values.password) {
      errors.new_password = t("err_password_mismatch");
    }
    return errors;
  };
  const submitForm = (values) => {
    var data = {
      token: tokenstr,
      new_password: values.new_password
    } 
    dispatch(getResetPassword(data));
  };

  useEffect(() => {
    if (resetPassData.loading == "pending") {
      setIsLoading(true);
     }else if (resetPassData.loading == "succeeded") {  
      setTimeout(() => { dispatch(initLoader()),setIsLoading(false),set_disabled(false), set_tag(true) }, 5000);
    } else if (resetPassData.loading != "pending") { 
      setTimeout(() => { dispatch(initLoader()),setIsLoading(false),set_disabled(false) }, 5000);
    }
}, [resetPassData.loading]);

  return (
    <>
      {resetPassData.loading != "idle" ? (
        resetPassData.loading == "failed" ? (
          <Toast msg={resetPassData.msg} color="error" />
        ) : (
          <Toast color="success" icon="task_alt" msg={resetPassData.msg} />
        )
      ) : (
        ""
      )}
       {(resetPassData.loading == "idle" || resetPassData.loading == "pending") ? <></> : (
       resetPassData.loading == "succeeded" ? (
          <Toast msg={resetPassData.msg} icon="task_alt" color="success" />
        ) : (
          <Toast color="error" msg={resetPassData.msg} />
        )
      )}
      <Suspense fallback={<Loader />}>
        <Container bottomBorder={"2px solid " + theme.colors.primaryBorder}>
          <Card color={"bg"}>
            <CardBody>
              {tokenstr != undefined ? tag ? (
                <Center>
                  <Typography fontSize="20px" lineHeight="23px">
                    {t(resetPassData.msg)}
                  </Typography>
                  <Typography  lineHeight="3rem" color="font">
                      Go to Login 
                    <DownloadButton onClick={() => { nevigate("/login") }}>Login</DownloadButton></Typography>
                   
                </Center>
              ) : (
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
                      <form onSubmit={handleSubmit}>
                        <Flex row justifyCenter>
                          <Flex md={4} sm={6} xs={12}>
                            <Flex row>
                              <Flex md={12}>
                                <Typography
                                  textAlign="center"
                                  fontSize="bodyTitleFontSize"
                                  fontWeight="bold"
                                >
                                  {t("reset_title")}
                                </Typography>
                              </Flex>
                            </Flex>
                            <Flex row>
                              <Flex padding="0" md={12}>
                                <Label>New Password</Label>
                                <Input
                                  app
                                  type="password"
                                  name="password"
                                  placeholder={t("ph_new_pass")}
                                  value={values.password}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.password &&
                                  touched.password ? (
                                  <ErrLabel margin="0 0 5px 0">{errors.password}</ErrLabel>
                                ) : null}
                              </Flex>
                            </Flex>
                            <Flex row>
                              <Flex padding="0" md={12}>
                                <Label>Confirm New Password</Label>
                                <Input
                                  app
                                  type="password"
                                  name="new_password"
                                  placeholder={t("ph_con_new_pass")}
                                  value={values.new_password}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.new_password &&
                                  touched.new_password ? (
                                  <ErrLabel>{errors.new_password}</ErrLabel>
                                ) : null}
                              </Flex>
                            </Flex>

                            <Button
                              full
                              color="primary"
                              type="submit"
                              fontColor="barFont"
                              className={!(dirty && isValid) ? "disabled-btn" : ""}
                              disabled={!(dirty && isValid)||disabled}
                            >
                              {t("submit")}{" "}
                            </Button>
                          </Flex>
                        </Flex>
                      </form>
                    );
                  }}
                </Formik>) : (
                <NotFound></NotFound>
              )}
            </CardBody>
          </Card>
        </Container>
      </Suspense>
      <Loading open={isLoading}/>
    </>
  );
};
