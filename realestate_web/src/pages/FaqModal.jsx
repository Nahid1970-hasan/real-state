import { Formik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton } from "../components/Button";
import { Modal } from "../components/Modal";
import { CardBody, CardHeaderButton } from "../components/style/Card_styled";
import { ErrLabel, Label } from "../components/style/Label";
import { Toast } from "../components/Toast";
import {
  UpdateFaq as updateFAQ,
  FaqSave as saveFaq,
  initLoader,
} from "../features/faq/faq_slice";
import { useRef } from "react";
import { TextArea } from "../components/style/TextArea";

export const FaqModal = ({ open, setOpen = () => {}, data , add}) => {
  const faqData = useSelector((state) => state.faq);
  const [faq_id, set_faq_id] = useState(0);
  const formRef = useRef();
  const [disabled, set_disabled] = useState(false);
  const [faq_data, set_faq_data] = useState({
    faq_id: 0,
    question: "",
    answer: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    add? clearForm() : set_faq_data(data);
    set_faq_id(add? 0 :data.faq_id || "");
  }, [data]);

  const submitForm = (values) => {
    add ? "" : (values.faq_id = faq_id); 
    dispatch(add ? saveFaq(values) : updateFAQ(values));
    set_disabled(true);
  };

  function clearForm(){
    set_faq_data({faq_id: 0,  question: "", answer: ""})
  }
  const validate = (values) => {
    let errors = {};

    if (!values.question) {
      errors.question = ("Question is required");
    } else if (values.question.length > 250) {
      errors.question = ("Maximum 250 characters are allowed.");
    }

    if (!values.answer) {
      errors.answer = ("Answer is required");
    } else if (values.answer.length > 1000) {
      errors.answer = ("Maximum 1000 characters are allowed.");
    }


    return errors;
  };

  useEffect(() => {
    if (faqData.addUpdateLoading == "succeeded") { 
      setTimeout(() => { formRef.current.resetForm(); clearForm(); set_disabled(false); setOpen(false)}, 3000);
    }else if (faqData.addUpdateLoading !=  "idle" && faqData.addUpdateLoading != "pending"){ 
      setTimeout(() => { set_disabled(false);}, 4000);
    }
  }, [faqData.addUpdateLoading]);

  return (
    <>
    
      <Modal
        md={6}
        sm={6}
        xs={10}
        title={add ? ("Add FAQ") : ("Edit FAQ")}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        outsideclick
      >
        <Formik
          initialValues={faq_data}
          validate={validate}
          enableReinitialize
          onSubmit={submitForm}
          innerRef={formRef}
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
                      disabled={!(dirty && isValid) || disabled}
                    >
                      {("Submit")}
                    </PrimaryButton>
                  </CardHeaderButton>
                  <CardBody>
                    <Label>{("Question")}</Label>
                    <TextArea
                      app 
                      type="text"
                      name="question"
                      placeholder={("type question here...")}
                      value={values.question || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.question && touched.question ? (
                      <ErrLabel >{errors.question}</ErrLabel>
                    ) : null}

                    <Label>{("Answer")}</Label>
                    <TextArea 
                      app
                      rows="6" 
                      type="textarea"
                      name="answer"
                      placeholder={("type answer here...")}
                      value={values.answer || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.answer && touched.answer ? (
                      <ErrLabel>{errors.answer}</ErrLabel>
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
