import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, PrimaryButton } from "../components/Button";
import { ErrLabel, Label } from "../components/style/Label";
import { Modal } from "../components/Modal";
import { Card, CardBody, CardHeader } from "../components/style/Card_styled";
import { Center } from "../components/style/Center_styled";
import { Container } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled";
import { FormStyled } from "../components/style/From_style";
import { Input } from "../components/style/Input_styled";
import { loadPage } from "../features/page/page_slice";
import { useOutsideClicker } from "../utils/helper";
import UnAuthorized from "./UnAuthorized";
import { Loader } from "../components/style/Loader_styled";
import { changePasswordEdit, initLoader } from "../features/changePassword/changePassword_slice";
import { Toast } from "../components/Toast";
import { Alert } from "../components/Alert";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { Loading } from "../components/Loading";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

export const ChangePass = () => {


  const changePassword = useSelector(state => state.changePassword);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, set_disabled] = useState(false);
  const formRef = useRef();
  useEffect(() => {
    if (changePassword.loading == "succeeded")
      setTimeout(() => dispatch(initLoader()), 5000);
  }, [changePassword.loading])

  useEffect(() => {
    dispatch(loadPage({ title: 'change_password' }))
  }, []);

  const initData = {
    current_password: "",
    password: "",
    new_password: "",
  };

  const validate = (values) => {
    let errors = {};
    if (!values.current_password) {
      errors.current_password = "Current password is required.";
    }
    if (!values.password) {
      errors.password = "New password is required.";
    } else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(values.password)) {
      errors.password = "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number one special character.";
    }
    if (!values.new_password) {
      errors.new_password = "Confirm password is required.";
    } else if (values.new_password != values.password) {
      errors.new_password = "Confirm password don't match.";
    }
    return errors;
  };
  const submitForm = (values) => {
    var isvalid = !!(userData?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      var data = {
        current_password: values.current_password,
        password: values.new_password
      }
      dispatch(changePasswordEdit(data));
      set_disabled(true);
    } 
  };

  useEffect(() => {
    if (changePassword.loading == "pending") {
      setIsLoading(true);
    } else if (changePassword.loading == "succeeded") {
      setIsLoading(false);
      set_disabled(false);
      formRef.current.resetForm();
      setTimeout(() => { dispatch(initLoader());  }, 5000);
    } else if (changePassword.loading != "idle") {
      setTimeout(() => { dispatch(initLoader()); set_disabled(false); setIsLoading(false); }, 5000);
    }
  }, [changePassword.loading]);


  return (
    <>
      {(changePassword.loading == "idle" || changePassword.loading == "pending") ? <></> : (
        changePassword.loading == "succeeded" ? (
          <Toast msg={changePassword.msg} icon="task_alt" color="success" />
        ) : (
          <Toast color="error" msg={changePassword.msg} />
        )
      )}
      <Flex row>
        <Flex padding="0" md={12} sm={12} xs={12}>
          <CardBody>
            <Formik
              initialValues={initData}
              validate={validate}
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
                return (
                  <div>
                    <Flex row>
                      <Flex padding="0 !important" md={6} sm={8} xs={12}>
                        <form onSubmit={handleSubmit} >
                          <Label htmlFor="current_password">Current Password</Label>
                          <Input
                            app
                            type="password"
                            id="current_password"
                            name='current_password'
                            placeholder={t("ph_crn_pass")}
                            value={values.current_password || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.current_password &&
                            touched.current_password ? (
                            <ErrLabel>{errors.current_password}</ErrLabel>
                          ) : null}
                          <Label htmlFor="password">New Password</Label>
                          <Input
                            app
                            type="password"
                            id="password"
                            name="password"
                            placeholder={t("ph_new_pass")}
                            value={values.password || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.password &&
                            touched.password ? (
                            <ErrLabel>{errors.password}</ErrLabel>
                          ) : null}
                          <Label htmlFor="new_password">Confirm New Password.</Label>
                          <Input
                          app
                            type="password"
                            id="new_password"
                            name="new_password"
                            placeholder={t("ph_con_new_pass")}
                            value={values.new_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.new_password && touched.new_password ? (
                            <ErrLabel>{errors.new_password}</ErrLabel>
                          ) : null}
                          <PrimaryButton 
                            type="submit" 
                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                            disabled={!(dirty && isValid)||disabled}>
                            {t("submit")}
                          </PrimaryButton>
                        </form>
                      </Flex>
                    </Flex>
                  </div>
                );
              }}
            </Formik>
          </CardBody>
        </Flex>
      </Flex>
      <Loading open={isLoading} />
    </>
  );
};
