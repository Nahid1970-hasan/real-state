import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { Flex } from "../../components/style/Flex_styled";
import { Input } from "../../components/style/Input_styled";
import { Select } from "../../components/style/Select_styled";
// import { editOrgUser } from "./homeFeedback_slice";
import { Formik } from "formik";
import { loadDistrict } from "../district/district_slice";
import { loadRequestType } from "../requestType/requestType_slice";
import { loadThana } from "../thana/thana_slice";
import { initLoader, saveHomeFeedback } from "./homeFeedback_slice";
import { ErrLabel, Label } from "../../components/style/Label";
import { TextArea } from "../../components/style/TextArea";
import styled from "styled-components";
import { Toast } from "../../components/Toast";
import { useRef } from "react";

const CustTextArea = styled(TextArea)`
  min-height: 80px !important;
  max-height: 150px !important;
`;

export const FeedbackEditModal = ({ open, setOpen = () => {} }) => {
  const homeFeedback = useSelector((state) => state.homefeedback);
  const requestType = useSelector((state) => state.requestType);
  const dispatch = useDispatch();
  const formRef =useRef();
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);


  const initialValues = {
    fullname:"",
    address: "",
    mobile_no: "",
    request_date: "",
    request_detail: "",
  };
  const validate = (values) => {
    let errors = {};

    if (!values.fullname) {
      errors.fullname = "Fullname is required";
    } else if (values.fullname.length > 50) {
      errors.fullname = "Maximum 50 Characters are allowed";
    }

    if (!values.address) {
      errors.address = t("err_address");
    }else if (values.address.length > 200) {
      errors.address = "Maximum 200 Characters are allowed";
    }

    if (!values.mobile_no) {
      errors.mobile_no = t("err_contact_no");
    } else if (!/(^(01){1}[3456789]{1}(\d){8})$/i.test(values.mobile_no)) {
      errors.mobile_no = t("err_contact_no_invalid");
    }

    if (!values.mobile_no) {
      errors.mobile_no = t("err_contact_no");
    }
    if (!values.request_detail) {
      errors.request_detail = t("err_req_details");
    }else if (values.request_detail.length > 500) {
      errors.request_detail = "Maximum 500 Characters are allowed";
    }
    return errors;
  };

  const submitForm = (values) => {
    dispatch(saveHomeFeedback(values));
  };

  useEffect(() => {
    if (homeFeedback.addLoading == "pending") {
      setIsLoading(true);
    } else if (homeFeedback.addLoading == "succeeded") {
      formRef.current.resetForm(); setIsLoading(false);  setOpen(false)
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (homeFeedback.addLoading != "idle") {
      setIsLoading(false);
      setTimeout(() => { dispatch(initLoader()); }, 5000);
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
      <Modal
        md={4}
        sm={6}
        xs={10}
        title={("New Feedback")}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Formik
          initialValues={initialValues}
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
                <form onSubmit={handleSubmit}>
                  <CardHeaderButton>
                    <AlertButton
                      type="reset"
                      onClick={resetForm}
                    >
                      {("Reset")}
                    </AlertButton>
                    <PrimaryButton
                      type="submit"
                      className={!(dirty && isValid) ? "disabled-btn" : ""}
                      disabled={!(dirty && isValid)}
                      // onClick={editOrgUserModel}
                    >
                      {("Submit")}
                    </PrimaryButton>
                  </CardHeaderButton>
                  <Label color="font">{("Request Name")}</Label>
                  <Input
                    app
                    type="text"
                    name="fullname"
                    placeholder={("type request name")}
                    value={values.fullname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    color={
                      errors.fullname && touched.fullname
                        ? "error"
                        : null
                    }
                  />
                  {errors.fullname && touched.fullname ? (
                    <ErrLabel>{errors.fullname}</ErrLabel>
                  ) : null}
                  
                  <Label color="font">{("Address")}</Label>
                  <Input
                    app
                    type="text"
                    name="address"
                    placeholder={("address")}
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    color={errors.address && touched.address ? "error" : null}
                  />
                  {errors.address && touched.address ? (
                    <ErrLabel>{errors.address}</ErrLabel>
                  ) : null}

                  <Label color="font">{("Contact Number")}</Label>
                  <Input
                    app
                    type="text"
                    name="mobile_no"
                    placeholder={("type contact number")}
                    value={values.mobile_no}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    color={
                      errors.mobile_no && touched.mobile_no
                        ? "error"
                        : null
                    }
                  />
                  {errors.mobile_no && touched.mobile_no ? (
                    <ErrLabel>{errors.mobile_no}</ErrLabel>
                  ) : null}

                  <Label color="font">{t("req_detail")} </Label>
                  <CustTextArea
                    app
                    type="text"
                    name="request_detail"
                    placeholder={("type request detail")}
                    value={values.request_detail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    color={
                      errors.request_detail && touched.request_detail
                        ? "error"
                        : null
                    }
                  />

                  {errors.request_detail && touched.request_detail ? (
                    <ErrLabel>{errors.request_detail}</ErrLabel>
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
