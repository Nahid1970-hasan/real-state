import { Formik } from "formik";
import { t } from "i18next";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { ErrLabel, Label } from "../../components/style/Label";
import { Select } from "../../components/style/Select_styled";
import { Toast } from "../../components/Toast";
import {
  undateEmailConfig as updateEmail,
  saveEmailConfig as saveEmail,
  initLoader,
} from "./emailConfig_slice";
import { useRef } from "react"; 
import { checkNumber } from "../../utils/helper";

export const EmailConfigModal = ({ add, open, setOpen = () => {}, data }) => {
  const emailConfig = useSelector((state) => state.emailConfig);
  const [config_id, set_config_id] = useState(0);
  const [disabled, set_disabled] = useState(false); 
  const formRef = useRef();
  const [email_data, set_email_data] = useState({
    config_id: "",
    email_server: "",
    enable_ssl: "",
    network_cred_pass: "",
    network_cred_user_email: "",
    port: "",
    sender_name: "",
    sending_email_address: "",
    used_for: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    add?clearForm():set_email_data(data);
    set_config_id(add? 0 : data.config_id || "");
  }, [data]);

  function clearForm(){
    set_email_data({
      config_id: "",
      email_server: "",
      enable_ssl: "",
      network_cred_pass: "",
      network_cred_user_email: "",
      port: "",
      sender_name: "",
      sending_email_address: "",
      used_for: "",
    });
  }
  const submitForm = (values) => {
    add ? "" : (values.config_id = config_id); 
    dispatch(add ? saveEmail(values) : updateEmail(values));
    set_disabled(true);
  };

  const validate = (values) => {
    let errors = {};

    if (!values.sender_name) {
      errors.sender_name = "Sender name is required";
    } else if (values.sender_name.length > 260) {
      errors.sender_name = "Maximum 260 characters are allowed.";
    }

    if (!values.network_cred_pass) {
      errors.network_cred_pass = "Network credential is required.";
    } else if (values.network_cred_pass.length > 260) {
      errors.network_cred_pass = "Maximum 260 characters are allowed."
    }
    if (!values.email_server) {
      errors.email_server = "Email server is required.";
    } else if (values.email_server.length > 500) {
      errors.email_server = "Maximum 500 characters are allowed."
    }
    if (!values.port) {
      errors.port = "Port is required.";
    } else if (values.port.length > 10) {
      errors.port = "Maximum 10 digits are allowed."
    }
    if (!values.network_cred_user_email) {
      errors.network_cred_user_email =  "Network credential user email is required.";
    } else if (values.network_cred_user_email.length > 500) {
      errors.network_cred_user_email = "Maximum 500 characters are allowed."
    }
    if (!values.sending_email_address) {
      errors.sending_email_address = "Sending email is required."
    } else if (values.sending_email_address.length > 500) {
      errors.sending_email_address = "Maximum 500 characters are allowed."
    }
    if (!values.used_for) {
      errors.used_for = "Userd For is required.";
    } else if (values.used_for.length > 500) {
      errors.used_for = "Maximum 500 characters are allowed."
    }

    return errors;
  };

  useEffect(() => {
    if ( emailConfig.addUpdateLoading == "succeeded") { 
      setTimeout(() => { formRef.current.resetForm(); set_disabled(false); setOpen(false);}, 3000);
    }else if (emailConfig.addUpdateLoading !=  "idle" && emailConfig.addUpdateLoading !=  "pending"){ 
      setTimeout(() => { set_disabled(false);}, 4000);
    }
  }, [emailConfig.addUpdateLoading]);

  return (
    <> 
      <Modal
        md={4}
        sm={6}
        xs={10}
        title={add ? ("Add Email Configuration") : ("Update Email Configuration")}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        outsideclick
      >
        <Formik
          initialValues={email_data}
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

            return (
              <div>
                <form onSubmit={handleSubmit}>
                  <CardHeaderButton>
                    <AlertButton
                      type="reset"
                      onClick={()=>{
                        clearForm();
                        formik.resetForm();
                      }}
                    >
                      {t("reset")}
                    </AlertButton>
                    <PrimaryButton
                      type="submit"
                      className={!(dirty && isValid) ? "disabled-btn" : ""}
                      disabled={!(dirty && isValid) || disabled}
                    >
                      {t("submit")}
                    </PrimaryButton>
                  </CardHeaderButton>
                  <CardBody>
                    <Label>{("Sender Name")}</Label>
                    <Input
                      app
                      type="text"
                      name="sender_name"
                      placeholder={("sender name")}
                      value={values.sender_name||""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.sender_name && touched.sender_name ? (
                      <ErrLabel>{errors.sender_name}</ErrLabel>
                    ) : null}

                    <Label  htmlFor="sending_email">{("Sending Email")}</Label>
                    <Input
                      app
                      type="email"
                      name="sending_email_address"
                      placeholder={("sending email")}
                      value={values.sending_email_address||""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.sending_email_address &&
                    touched.sending_email_address ? (
                      <ErrLabel>{errors.sending_email_address}</ErrLabel>
                    ) : null}

                    <Label >{("Email Server")} </Label>
                    <Input
                      app
                      type="text"
                      name="email_server"
                      placeholder={("email server")}
                      value={values.email_server||""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email_server && touched.email_server ? (
                      <ErrLabel>{errors.email_server}</ErrLabel>
                    ) : null}
                    <Label >{("Enable SSL")} </Label>

                    <Select 
                      app
                      name="enable_ssl"
                      value={values.enable_ssl||""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option disabled value="">
                        {("Select SSL")}
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Select>
                    {errors.enable_ssl &&
                    touched.enable_ssl ? (
                      <ErrLabel>{errors.enable_ssl}</ErrLabel>
                    ) : null} 
                    <Label  >
                      {("Network Cred Email")}{" "}
                    </Label>
                    <Input
                      app
                      type="email"
                      name="network_cred_user_email"
                      placeholder={("network cred user email")}
                      value={values.network_cred_user_email||""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    {errors.network_cred_user_email &&
                    touched.network_cred_user_email ? (
                      <ErrLabel>{errors.network_cred_user_email}</ErrLabel>
                    ) : null} 

                    <Label>
                      {("Password")}{" "}
                    </Label>
                    <Input
                      app
                      type="password"
                      name="network_cred_pass"
                      placeholder={("network cred password")}
                      value={values.network_cred_pass||""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.network_cred_pass && touched.network_cred_pass ? (
                      <ErrLabel>{errors.network_cred_pass}</ErrLabel>
                    ) : null}

                    <Label >{("Port")} </Label>
                    <Input
                      app
                      type="text"
                      name="port"
                      onKeyDown={(event) => {
                        if (!checkNumber(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      placeholder={("port")}
                      value={values.port||""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.port && touched.port ? (
                      <ErrLabel>{errors.port}</ErrLabel>
                    ) : null}

                    <Label >{("Used For")} </Label>
                    <Input
                      app
                      type="text"
                      name="used_for"
                      placeholder={("used for")}
                      value={values.used_for||""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.used_for && touched.used_for ? (
                      <ErrLabel>{errors.used_for}</ErrLabel>
                    ) : null}
                  </CardBody>
                </form>
              </div>
            );
          }}
        </Formik>
      </Modal> 
    </>
  );
};
