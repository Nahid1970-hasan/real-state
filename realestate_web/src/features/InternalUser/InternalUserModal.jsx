import { Formik } from "formik";
import { t } from "i18next";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { ErrLabel, Label } from "../../components/style/Label";
import { Select } from "../../components/style/Select_styled";

import {
  saveInternalUserConfig as saveConfig,
  updateInternalUserConfig, 
} from "./internal_user_Slice";
import { useRef } from "react";
import styled from "styled-components";

const InlineLabel = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const InternalUserModal = ({ add, open, setOpen = () => { }, data }) => {
  const [user_id, set_user_id] = useState(0);
  const [disabled, set_disabled] = useState(false); 
  const formRef = useRef();
  const [userData, setUserData] = useState({
    email: "",
    mobile_no: "",
    username: "",
    password: "",
    fullname: "",
    nickname: "",
    designation: "",
    status: "",
  });
  const [isMobileAsUsername, setMobileAsUsername] = useState(false);
  const [isEmailAsUsername, setEmailAsUsername] = useState(false);
  const [mobileCheckEnable, setMobileCheckEnable] = useState(false);
  const [emailCheckEnable, setEmailCheckEnable] = useState(false);
  const userConfig = useSelector((state) => state.internal);
  const dispatch = useDispatch();

  useEffect(() => {
    clearForm();
  }, []);

  useEffect(() => {
    set_user_id(data.user_id);
    add?"":setUserData(data);
  }, [data]);

  function clearForm(){
    setUserData({
      email: "",
      mobile_no: "",
      username: "",
      password: "",
      fullname: "",
      nickname: "",
      designation: "",
      status: "",
    })
  }
  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = ("Email is required.");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = ("Email is invalid");
    }

    if (!values.username) {
      errors.username = ("Username is required");
    } else if (values.username.length > 60) {
      errors.username = ("Maximum 60 characters are allowed");
    }

    if (!values.password) {
      errors.password = ("Password is required");
    } else if (values.password.length > 150) {
      errors.password = ("Maximum 150 characters are allowed");
    } 

    if (!values.fullname) {
      errors.fullname = ("Fullname is required");
    } else if (values.fullname.length > 80) {
      errors.fullname = ("Maximum 80 characters are allowed");
    }
    if (!values.mobile_no) {
      errors.mobile_no = ("Mobile number is required");
    } else if (!/(^(01){1}[3456789]{1}(\d){8})$/i.test(values.mobile_no)) {
      errors.mobile_no = ("Mobile number is invalid");
    }
    if (!values.nickname) {
      errors.nickname = ("Nickname is required");
    } else if (values.nickname.length > 40) {
      errors.nickname = ("Maximum 00 characters are allowed");
    }
    if (!values.designation) {
      errors.designation = ("Designation is required");
    } else if (values.designation.length > 80) {
      errors.designation = ("Maximum 80 characters are allowed");
    }

    if (!values.status) {
      errors.status = ("Status is required");
    }
    return errors;
  };

  const submitForm = (values) => {
    values.update_user_id = add ? 0 : parseInt(user_id);
    dispatch(add ? saveConfig(values) : updateInternalUserConfig(values));
    set_disabled(true);
  };

  useEffect(() => {
    if (userConfig.addUpdateLoading == "succeeded") { 
      setTimeout(() => {  formRef.current.resetForm(); clearForm(); set_disabled(false); setOpen(false) }, 3000);
    } else if (userConfig.addUpdateLoading != "idle" && userConfig.addUpdateLoading != "pending") { 
      setTimeout(() => {set_disabled(false); }, 4000);
    }
  }, [userConfig.addUpdateLoading]);

  return (
    <>
      <Modal
        md={4}
        sm={6}
        xs={10}
        title={add ? ("Add New User") : t("Update User Profile")}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        outsideclick
      >
        <Formik
          initialValues={userData}
          validate={validate}
          onSubmit={submitForm}
          innerRef={formRef}
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
              setFieldValue,
              resetForm,
            } = formik;

            return (
              <div>
                <form onSubmit={handleSubmit}>
                  <CardHeaderButton>
                    <AlertButton
                      type="reset"
                      onClick={resetForm}
                    >
                      {("Reset")}
                    </AlertButton>
                    <PrimaryButton
                      className={!(dirty && isValid) ? "disabled-btn" : ""}
                      disabled={!(dirty && isValid)||disabled}
                    >
                      {("Submit")}
                    </PrimaryButton>
                  </CardHeaderButton>
                  <InlineLabel>
                    <Label> {("Email")}</Label>
                    <Label
                      color="font" 
                      style={{ display: add ? "flex" : "none" }}
                      htmlFor="email_as_username"
                    >
                      <Input
                        type="checkbox"
                        name="email_as_username"
                        disabled={!emailCheckEnable ? "disabled" : ""}
                        checked={isEmailAsUsername || false}
                        onChange={(e) => {
                          e.target.checked
                            ? (setFieldValue("username", values.email),
                              setEmailAsUsername(e.target.checked),
                              setMobileAsUsername(!e.target.checked))
                            : setEmailAsUsername(e.target.checked);
                        }}
                      />
                      <span>{("Use email as username")}</span>
                    </Label>
                  </InlineLabel>
                  <Input
                    app
                    type="email"
                    name="email"
                    placeholder={("type email")}
                    value={values.email || ""}
                    onBlur={handleBlur}
                    color={errors.email && touched.email ? "error" : null}
                    onChange={(e) => (
                      setEmailCheckEnable(e.target.value.length > 4),
                      formik.handleChange(e)
                    )}
                  />
                  {errors.email && touched.email ? (
                    <ErrLabel>{errors.email}</ErrLabel>
                  ) : null}

                  <InlineLabel>
                    <Label>
                      {("Mobile no")}
                    </Label>
                    <Label 
                      color="font"
                      style={{ display: add ? "flex" : "none" }}
                      htmlFor="contact_no_as_username"
                    >
                      <Input
                        type="checkbox"
                        disabled={!mobileCheckEnable ? "disabled" : ""}
                        name="contact_no_as_username"
                        checked={isMobileAsUsername || false}
                        onChange={(e) => {
                          e.target.checked
                            ? (setFieldValue("username", values.mobile_no),
                              setMobileAsUsername(e.target.checked),
                              setEmailAsUsername(!e.target.checked))
                            : setMobileAsUsername(e.target.checked);
                        }}
                      />
                      <span> {t("Use mobile no as username")} </span>
                    </Label>
                  </InlineLabel>

                  <Input 
                    app
                    type="text"
                    name="mobile_no"
                    placeholder={("type mobile no")}
                    value={values.mobile_no || ""}
                    onBlur={handleBlur}
                    color={
                      errors.mobile_no && touched.mobile_no
                        ? "error"
                        : null
                    }
                    onChange={(e) => (
                      setMobileCheckEnable(e.target.value.length > 10),
                      formik.handleChange(e)
                    )}
                  />
                  {errors.mobile_no && touched.mobile_no ? (
                    <ErrLabel>{errors.mobile_no}</ErrLabel>
                  ) : null}

                  <Label htmlFor="Username"> {("Username")} </Label>
                  <Input
                    app
                    type="text"
                    name="username"
                    placeholder={("type username")}
                    disabled={
                      add
                        ? isMobileAsUsername || isEmailAsUsername
                          ? "disabled"
                          : ""
                        : "disabled"
                    }
                    value={
                      (add
                        ? isMobileAsUsername
                          ? values.mobile_no
                          : isEmailAsUsername
                            ? values.email
                            : values.username
                        : values.username) || ""
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    color={errors.username && touched.username ? "error" : null}
                  />
                  {errors.username && touched.username ? (
                    <ErrLabel>{errors.username}</ErrLabel>
                  ) : null}
                  <Label 
                    color="font"
                    style={{ display: add ? "block" : "none" }}
                    htmlFor="password"
                  >
                    {("Password")}
                  </Label>
                  <Input
                    app
                    display={add ? "block" : "none"}
                    type="password"
                    name="password"
                    placeholder={t("type password")}
                    value={(add ? values.password : "") || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <ErrLabel>{errors.password}</ErrLabel>
                  ) : null}

                  <Label >
                    {("Fullname")}
                  </Label>
                  <Input
                    app
                    type="text"
                    name="fullname"
                    placeholder={("type fullname")}
                    value={values.fullname || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.fullname && touched.fullname ? (
                    <ErrLabel>{errors.fullname}</ErrLabel>
                  ) : null}

                  <Label>
                    {("Nickname")}
                  </Label>
                  <Input
                    app
                    type="text"
                    name="nickname"
                    placeholder={("type nickname")}
                    value={values.nickname || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.nickname && touched.nickname ? (
                    <ErrLabel>{errors.nickname}</ErrLabel>
                  ) : null}

                  <Label>
                    {("Designation")}{" "}
                  </Label>
                  <Input
                    app
                    type="text"
                    name="designation"
                    placeholder={("type designation")}
                    value={values.designation || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.designation && touched.designation ? (
                    <ErrLabel>{errors.designation}</ErrLabel>
                  ) : null}


                  <Label htmlFor="status">
                    {("Status")}
                  </Label>
                  <Select
                    app
                    name="status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.status || ""}
                  >
                    <option disabled value="">
                      {("select status")}
                    </option> 
                    <option value="Approved">Approved</option>
                    <option value="Blocked">Blocked</option> 
                  </Select>
                  {errors.status && touched.status ? (
                    <ErrLabel>{errors.status}</ErrLabel>
                  ) : null}
                </form>
              </div>
            );
          }}
        </Formik>
      </Modal> 
    </>
  );
};
