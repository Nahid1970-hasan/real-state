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
    updateSubProtype as updatetype,
    saveSubProtype as savetype, 
} from "./sub_project_type_Slice"; 
import { useTranslation } from "react-i18next";  
import { useRef } from "react";

export const SubProjectModal = ({ add, open, setOpen = () => { }, data, }) => {
    const dispatch = useDispatch();
    const {t, i18n} = useTranslation();
    const formRef = useRef();
    const subprotype = useSelector((state) => state.subprotype);
    const [sub_type_id, set_sub_type_id] = useState(0);
    const [disabled, set_disabled] = useState(false); 
    const [project_data, set_project_data] = useState({
        sub_type_name: '',
        sub_type_desc: '',
        sub_type_id: '', 
    })  

    useEffect(() => {
        set_project_data(data);
        set_sub_type_id(data.sub_type_id || "");
    }, [data]);

    const SubmitForm = (values) => {
        add ? "" : values.sub_type_id = sub_type_id;  
        dispatch(add ? savetype(values) : updatetype(values));
        set_disabled(true);
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.sub_type_name) {
            errors.sub_type_name = ("Sub-project name is required");
        } else if (Values.sub_type_name.length > 60) {
            errors.sub_type_name = ("Maximum 60 characters are allowed");
        }

        if (!Values.sub_type_desc) {
            errors.sub_type_desc = ("Description is required");
        } else if (Values.sub_type_desc.length > 100) {
            errors.sub_type_desc = ("Maximum 100 characters are allowed");
        } 

        return errors;
    };
 
    useEffect(() => {
        if ( subprotype.addUpdateLoading == "succeeded") { 
          setTimeout(() => { formRef.current.resetForm(); set_disabled(false); setOpen(false) }, 3000);
        }else if (subprotype.addUpdateLoading !=  "idle" && subprotype.addUpdateLoading != "pending"){ 
          setTimeout(() => {set_disabled(false); }, 4000);
        }
      }, [subprotype.addUpdateLoading]);

    return (<>
        
        <Modal
            md={4}
            sm={6}
            xs={10}
            title={add ? ("Add Sub-project Type") : ("Edit Sub-project Type")}
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

                            <Label >{t("Sub-project Type")}</Label>
                            <Input
                            app
                                type="text"
                                name="sub_type_name"
                                placeholder={("type sub-project name")}
                                value={values.sub_type_name || ""}
                                disabled={!add}
                                maxLength={60}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                errors.sub_type_name && touched.sub_type_name ? <ErrLabel>{errors.sub_type_name}</ErrLabel> : null
                            }

                            <Label color="cardfont">{t("Description")}</Label>
                            <Input
                            app
                                type="text"
                                name="sub_type_desc"
                                maxLength={100}
                                placeholder={("type description")}
                                value={values.sub_type_desc || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                errors.sub_type_desc && touched.sub_type_desc ? <ErrLabel>{errors.sub_type_desc}</ErrLabel> : null
                            }



                        </form> 
                    );
                }}
            </Formik> 
        </Modal> 
    </>
    );
};
