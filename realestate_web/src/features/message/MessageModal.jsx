import { Formik } from "formik";

import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { ErrLabel, Label } from "../../components/style/Label";

import {
    updateMessageConfig as updateMessage,
    saveMessageConfig as saveMessage, 
} from "./message_Slice"; 
import { useTranslation } from "react-i18next"; 
import { useRef } from "react";
import { TextArea } from "../../components/style/TextArea";

export const MessageModal = ({ add, open, setOpen = () => { }, data, }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const formRef = useRef();
    const message = useSelector((state) => state.message);
    const [sub_type_id, set_sub_type_id] = useState(0);
    const [disabled, set_disabled] = useState(false); 
    const [project_data, set_project_data] = useState({
        template_name: '',
        message: '',
        sub_type_id: '',
    })

    useEffect(() => {
        set_project_data(data);
        set_sub_type_id(data.sub_type_id || "");
    }, [data]);

    const SubmitForm = (values) => {
        add ? "" : values.sub_type_id = sub_type_id; 
        dispatch(add ? saveMessage(values) : updateMessage(values));
        set_disabled(true);
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.template_name) {
            errors.template_name = ("Sub-project name is required");
        } else if (Values.template_name.length > 30) {
            errors.template_name = ("err_30_legnth");
        } 
        if (!Values.message) {
            errors.message = ("Description is required");
        } else if (Values.message.length > 160) {
            errors.message = ("err_160_legnth");
        }
        if (!Values.email_subject) {
            errors.email_subject = ("Email suibject  is required");
        } else if (Values.email_subject.length > 100) {
            errors.email_subject = ("err_100_legnth");
        }
        if (!Values.email_body) {
            errors.email_body = ("Email body  is required");
        } else if (Values.email_body.length > 512) {
            errors.email_body = ("err_512_legnth");
        }

        return errors;
    };

    useEffect(() => {
         if (message.addUpdateLoading == "succeeded") { 
            setTimeout(() => {formRef.current.resetForm(); set_disabled(false); setOpen(false) }, 3000);
        } else if (message.addUpdateLoading != "idle" && message.addUpdateLoading != "pending") { 
            setTimeout(() => { set_disabled(false); }, 4000);
        }
    }, [message.addUpdateLoading]);

    return (<>

        <Modal
            md={4}
            sm={6}
            xs={10}
            title={add ? ("Add Message Template") : ("Edit Message Template")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >

            <Formik
                initialValues={project_data}
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
                            <CardHeaderButton>
                                <AlertButton
                                    type="reset"
                                    onClick={resetForm}
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

                            <Label>{("Name")}</Label>
                            <Input 
                                app
                                type="text"
                                name="template_name"
                                placeholder={("type name")}
                                value={values.template_name || ""}
                                disabled={!add}
                                maxLength={30}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                errors.template_name && touched.template_name ? <ErrLabel>{errors.template_name}</ErrLabel> : null
                            }

                            <Label>{("Message")}</Label>
                            <Input 
                                app
                                type="text"
                                name="message"
                                maxLength={160}
                                placeholder={("type description")}
                                value={values.message || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                errors.message && touched.message ? <ErrLabel>{errors.message}</ErrLabel> : null
                            }
                            <Label>{("Email Subject")}</Label>
                            <Input 
                                app
                                type="text"
                                name="email_subject"
                                maxLength={100}
                                placeholder={("type email subject")}
                                value={values.email_subject || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                errors.email_subject && touched.email_subject ? <ErrLabel>{errors.email_subject}</ErrLabel> : null
                            }

                            <Label>{("Email Body")}</Label>
                            <TextArea 
                                app
                                type="textarea"
                                name="email_body"
                                maxLength={512}
                                placeholder={("type email body")}
                                value={values.email_body || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            /> 
                            {
                                errors.email_body && touched.email_body ? <ErrLabel>{errors.email_body}</ErrLabel> : null
                            }



                        </form>
                    );
                }}
            </Formik>
        </Modal> 
    </>
    );
};
