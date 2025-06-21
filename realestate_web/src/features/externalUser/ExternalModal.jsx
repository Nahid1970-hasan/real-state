import { Formik } from "formik";
import { t } from "i18next";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { Label } from "../../components/style/Label";
import { Select } from "../../components/style/Select_styled";

import {
  updateUserConfig as undateConfig,
  initLoader,
} from "./external_Slice"; 
import { useRef } from "react";
export const ExternalModal = ({ add, open, setOpen = () => {}, data }) => {
  const [user_id, set_user_id] = useState(0);
  const [disabled, set_disabled] = useState(false); 
  const formRef = useRef();
  const [userData, setUserData] = useState({
    user_id:"",
    status: "",
  });
  const external = useSelector((state) => state.external);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(data);
    set_user_id(data.user_id||"");
  }, [data]);

  const validate = (values) => {
    let errors = {};
   
    if (!values.status) {
      errors.status = ("status is required");
    } 

    return errors;
  };

  const submitForm = (values) => {
    values.update_user_id = add ? 0 : parseInt(user_id)||0;
    dispatch(undateConfig(values));
    set_disabled(true);
  };
  
  useEffect(() => {
    if ( external.addUpdateLoading == "succeeded") { 
      setTimeout(() => { formRef.current.resetForm(); set_disabled(false); setOpen(false);}, 3000);
    } else if (external.addUpdateLoading != "idle" && external.addUpdateLoading != "pending"){ 
      setTimeout(() => {set_disabled(false);}, 4000);
    }
  }, [external.addUpdateLoading]);

  return (
    <>
    <Modal
      md={4}
      sm={6}
      xs={10}
      title={"Update Status"}
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
                    disabled={!(dirty && isValid) || disabled}
                  >
                    {("Submit")}
                  </PrimaryButton>
                </CardHeaderButton>
                
               
                <Label margin="0.65rem 0 0 0" color="font">
                  {("Full Name")}
                </Label>
                <Input
                  type="text"
                  name="fullname"
                  placeholder={("full name")}
                  value={values.fullname || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={true}
                />
                {errors.fullname && touched.fullname ? (
                      <Label>{errors.fullname}</Label>
                    ) : null}

                <Label margin="0.65rem 0 0 0" htmlFor="status" color="font">
                  {("Status")}
                </Label>
                <Select
                  name="status"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.status || ""}
                >
                  <option  value="">
                    {("Select status")}
                  </option> 
                  <option value="Approved">Approved</option>
                  <option value="Blocked">Blocked</option> 
                </Select>
                {errors.status && touched.status ? (
                      <Label>{errors.status}</Label>
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
