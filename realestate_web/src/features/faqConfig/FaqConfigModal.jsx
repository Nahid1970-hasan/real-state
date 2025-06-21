import { Form, Formik } from "formik";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { Label } from "../../components/style/Label";
import { Toast } from "../../components/Toast";
import {
  updatefaqConfig as updateFaq,
  savefaqConfig as saveFaq,
  initLoader,
} from "./faqConfig_slice";

export const FaqConfigModal = ({ add, open, setOpen = () => {}, data }) => {
  const faqConfig = useSelector((state) => state.faqConfig);
  const [faq_id, set_faq_id] = useState(0);
  const formRef = useRef();
  const [disabled, set_disabled] = useState(false);
  const [email_data, set_email_data] = useState({
    faq_id:"",
    question: "",
    answer: "",
   
  });
  const dispatch = useDispatch();

  useEffect(() => {
    set_email_data(data);
    set_faq_id(data.faq_id || "");
  }, [data]);

  const submitForm = (values) => {
    add ? "" : (values.faq_id = faq_id);
    console.log(values);
    dispatch(add ? saveFaq(values) : updateFaq(values));
    set_disabled(true);
  };

  const validate = (values) => {
    let errors = {};

    if (!values.question) {
      errors.question = "Question is required";
    } else if (values.question.length > 255) {
      errors.question = "Maximum 255 Characters are allowed";
    }

    if (!values.answer) {
      errors.answer = "Answer is required";
    } else if (values.answer.length > 2000) {
      errors.answer = "Maximum 2000 Characters are allowed";
    }
    return errors;
  };

  useEffect(() => {
    if (
      faqConfig.addUpdateLoading == "succeeded" &&
      faqConfig.loading == "succeeded"
    ) {
      setTimeout(() => {
        formRef.current.resetForm();
        dispatch(initLoader());
        set_disabled(false);
        setOpen(false);
      }, 5000);
    } else if (
      faqConfig.addUpdateLoading == "failed" ||
      faqConfig.addUpdateLoading == "idle"
    ) {
      setTimeout(() => {
        set_disabled(false);
      }, 5000);
    }
  }, [faqConfig.addUpdateLoading, faqConfig.loading]);

  return (
    <>
      {faqConfig.addUpdateLoading != "idle" ? (
        faqConfig.addUpdateLoading == "failed" ? (
          <Toast msg={faqConfig.msg} color="error" />
        ) : (
          <Toast color="success" icon="task_alt" msg={faqConfig.msg} />
        )
      ) : (
        ""
      )}
      <Modal
        md={4}
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
              <div className="container">
                <Form onSubmit={handleSubmit}>
                  <CardHeaderButton>
                    <AlertButton
                      type="reset"
                      onClick={resetForm}
                    >
                      Reset
                    </AlertButton>
                    <PrimaryButton
                      type="submit"
                      className={!(dirty && isValid) ? "disabled-btn" : ""}
                      disabled={!(dirty && isValid) || disabled}
                    >
                      Submit
                    </PrimaryButton>
                  </CardHeaderButton>
                  <CardBody>
                    <Label color="cardfont" >Question</Label>
                    <Input
                      app
                      type="text"
                      name="question"
                      placeholder="type question"
                       value={values.question || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.question && touched.question ? (
                      <Label>{errors.question}</Label>
                    ) : null}

                    <Label color="cardfont" >Answer</Label>
                    <Input
                      app
                      type="text"
                      name="answer"
                      placeholder="type answer"
                       value={values.answer ||""}
                      onChange={handleChange}
                     onBlur={handleBlur}
                    />
                    {errors.answer &&
                    touched.answer ? (
                      <Label>{errors.answer}</Label>
                    ) : null}
                    
                  </CardBody>
                </Form>
              </div>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};
