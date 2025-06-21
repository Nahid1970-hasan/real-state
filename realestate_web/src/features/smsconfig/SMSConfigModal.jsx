import { Formik } from "formik";
import { t } from "i18next";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { ErrLabel, Label } from "../../components/style/Label";
import { Select } from "../../components/style/Select_styled";


import {
  undateSMSConfig as updateSMS,
  saveSMSConfig as saveSMS,
  initLoader,
} from "./smsConfig_slice";
import { useRef } from "react";
import { checkNumber } from "../../utils/helper";
import { Flex } from "../../components/style/Flex_styled";

export const SMSConfigModal = ({
  add,
  open,
  setOpen = () => { },
  data,
}) => {
  const smsConfig = useSelector((state) => state.smsConfig);
  const [config_id, set_config_id] = useState(0);
  const formRef = useRef();
  const [disabled, set_disabled] = useState(false);
  const [sms_data, set_sms_data] = useState({
    sender_name: '',
    company_name: '',
    base_url: '',
    gateway_username: '',
    gateway_password: '',
    gateway_api_key: '',
    gateway_sender_id: '',
    sms_type: "",
    sender_id: '',
    sms_stock: 0,
  })

  const dispatch = useDispatch();

  useEffect(() => {
    add? clearForm() : set_sms_data(data);
    set_config_id(add? 0 : data.config_id || "");
  }, [data]);

  const SubmitForm = (values) => {
    add ? "" : values.config_id = config_id;
    dispatch(add ? saveSMS(values) : updateSMS(values));
    set_disabled(true);
  };

  const validate = (Values) => {
    let errors = {};

    if (!Values.company_name) {
      errors.company_name = ("Company name is required");
    } else if (Values.company_name.length > 200) {
      errors.company_name = ("Maximum 200 characters are allowed");
    }
    if (!Values.base_url) {
      errors.base_url = ("Base URL is required");
    } else if (!/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i.test(Values.base_url)) {
      errors.base_url = ("Base URL is invalid");
    }
    if (!Values.sender_name) {
      errors.sender_name = ("Sender name is required");
    } else if (Values.sender_name.length > 50) {
      errors.sender_name = ("Maximum 50 characters are allowed");
    }
    if (!Values.gateway_username) {
      errors.gateway_username = ("Username is required");
    } else if (Values.gateway_username.length > 50) {
      errors.gateway_username = ("Maximum 50 characters are allowed");
    }

    if (!Values.gateway_password) {
      errors.gateway_password = ("Password is required");
    } else if (Values.gateway_password.length > 50) {
      errors.gateway_password = ("Maximum 50 characters are allowed");
    }
    if (!Values.sms_type) {
      errors.sms_type = ("SMS type is required");
    }
    if (!Values.gateway_api_key) {
      errors.gateway_api_key = ("API key is required");
    } else if (Values.gateway_api_key.length > 100) {
      errors.gateway_api_key = ("Maximum 100 characters are allowed");
    }
    if (!Values.gateway_sender_id) {
      errors.gateway_sender_id = ("Sender ID is required");
    } else if (Values.gateway_sender_id.length > 50) {
      errors.gateway_sender_id = ("Maximum 50 characters are allowed");
    }
    if (!Values.status) {
      errors.status = ("Status is required");
    }

    if (!Values.sms_stock) {
      errors.sms_stock = ("Stock is required");
    }
    return errors;
  };

  function clearForm(){
    set_sms_data({
      sender_name: '',
      company_name: '',
      base_url: '',
      gateway_username: '',
      gateway_password: '',
      gateway_api_key: '',
      gateway_sender_id: '',
      sms_type: "",
      sender_id: '',
      sms_stock: 0,
    });
  }

  useEffect(() => {
    if (smsConfig.addUpdateLoading == "succeeded") {
      setTimeout(() => { formRef.current.resetForm(); clearForm(); set_disabled(false); setOpen(false) }, 3000);
    } else if (smsConfig.addUpdateLoading != "idle" && smsConfig.addUpdateLoading !=  "pending") {
      setTimeout(() => { set_disabled(false) }, 4000);
    }
  }, [smsConfig.addUpdateLoading]);


  return (<>
    <Modal
      md={6}
      sm={10}
      xs={11}
      title={add ? ("Add SMS Configuration") : ("Update SMS Configuration")}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      outsideclick
    >

      <Formik
        initialValues={sms_data}
        validate={validate}
        enableReinitialize
        innerRef={formRef}
        onSubmit={SubmitForm}
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
            resetForm
          } = formik;

          return (
            <form onSubmit={handleSubmit}>
              <Flex row>
                <Flex padding="0 5px 0 0 !important" md={6} sm={12}>
                  <Label>{("Company Name")}</Label>
                  <Input
                    app
                    type="text"
                    name="company_name"
                    placeholder={("type company name")}
                    value={values.company_name || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {
                    errors.company_name && touched.company_name ? <ErrLabel>{errors.company_name}</ErrLabel> : null
                  }


                  <Label>{("Base URL")}</Label>
                  <Input
                    app
                    type="text"
                    name="base_url"
                    placeholder={("type base url")}
                    value={values.base_url || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {
                    errors.base_url && touched.base_url ? <ErrLabel>{errors.base_url}</ErrLabel> : null
                  }
                  <Label>{("Sender Name")}</Label>
                  <Input
                    app
                    type="text"
                    name="sender_name"
                    placeholder={("sender name")}
                    value={values.sender_name || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.sender_name && touched.sender_name ? (
                    <ErrLabel>{errors.sender_name}</ErrLabel>
                  ) : null}

                  <Label>{("Username")}</Label>
                  <Input
                    app
                    type="text"
                    name="gateway_username"
                    placeholder={("type user name")}
                    value={values.gateway_username || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {
                    errors.gateway_username && touched.gateway_username ? <ErrLabel>{errors.gateway_username}</ErrLabel> : null
                  }

                  <Label >{t("password")}</Label>
                  <Input
                    app
                    type="password"
                    name="gateway_password"
                    placeholder={("type password")}
                    value={values.gateway_password || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {
                    errors.gateway_password && touched.gateway_password ? <ErrLabel>{errors.gateway_password}</ErrLabel> : null
                  }
                </Flex>
                <Flex padding="0 0 10px 5px !important" md={6} sm={12}>
                  <Label htmlFor="gateway_api_key">{("API Key")}</Label>
                  <Input
                    app
                    type="text"
                    name="gateway_api_key"
                    placeholder={("type api key")}
                    value={values.gateway_api_key || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {
                    errors.gateway_api_key && touched.gateway_api_key ? <ErrLabel>{errors.gateway_api_key}</ErrLabel> : null
                  }

                  <Label>{("Sender ID")}</Label>
                  <Input
                    app
                    type="text"
                    name="gateway_sender_id"
                    placeholder={("type sender id")}
                    value={values.gateway_sender_id || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {
                    errors.gateway_sender_id && touched.gateway_sender_id ? <ErrLabel>{errors.gateway_sender_id}</ErrLabel> : null
                  }

                  <Label>{("Type")}</Label>
                  <Select
                    app
                    name="sms_type"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.sms_type || ""}
                  >
                    <option disabled value="">
                      {("select sms type")}
                    </option>
                    <option value="Masking">Masking</option>
                    <option value="Non-masking">Non-masking</option>
                  </Select>
                  {
                    errors.sms_type && touched.sms_type ? <ErrLabel>{errors.sms_type}</ErrLabel> : null
                  }

                  <Label color="cardfont">{("Status")} </Label>
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
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Select>
                  {
                    errors.status && touched.status ? <ErrLabel>{errors.status}</ErrLabel> : null
                  }

                  <Label>{("Stock")} </Label>
                  <Input
                    app
                    type="text"
                    name="sms_stock"
                    onKeyDown={(event) => {
                      if (!checkNumber(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    placeholder={"0"}
                    value={values.sms_stock || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {
                    errors.sms_stock && touched.sms_stock ? <ErrLabel>{errors.sms_stock}</ErrLabel> : null
                  }
                </Flex>
              </Flex>
              <CardHeaderButton>
                <AlertButton
                  type="reset"
                  onClick={()=>{
                    clearForm();
                    formik.resetForm();
                  }}
                >
                  {("Reset")}
                </AlertButton>
                <PrimaryButton
                  type="submit"
                  className={!(dirty && isValid) ? "disabled-btn" : ""}
                  disabled={!(dirty && isValid) || disabled}
                >
                  {("Submit")}
                </PrimaryButton>
              </CardHeaderButton>

            </form>
          );
        }}
      </Formik>


    </Modal>

  </>
  );
};
