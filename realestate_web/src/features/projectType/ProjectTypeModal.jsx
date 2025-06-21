import { Formik } from "formik";

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
  updateprotype as updatetype,
  saveprotype as savetype,
  initLoader,
} from "./pro_Type_slice";
import { Toast } from "../../components/Toast";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { Loading } from "../../components/Loading";
import { useRef } from "react";

export const ProjectTypeModal = ({ add, open, setOpen = () => { }, data }) => {

  const { t, i18n } = useTranslation();
  const protype = useSelector((state) => state.protype);
  const [config_id, set_config_id] = useState(0);
  const [disabled, set_disabled] = useState(false);
  const formRef = useRef();
  const [project_data, set_project_data] = useState({
    type_name: '',
    commercial_space: "",
    type_id: '',
    apartment: "",
  })

  const dispatch = useDispatch();

  useEffect(() => {
    set_project_data(data);
    set_config_id(data.type_id || "");
  }, [data]);

  const SubmitForm = (values) => {
    add ? "" : values.type_id = config_id;
    dispatch(add ? savetype(values) : updatetype(values));
    set_disabled(true);
  };

  const validate = (Values) => {
    let errors = {};

    if (!Values.type_name) {
      errors.type_name = ("Project name is required");
    } else if (Values.type_name.length > 60) {
      errors.type_name = ("Maximum 60 characters are allowed");
    }

    if (!Values.commercial_space) {
      errors.commercial_space = ("Select commercial space");
    }

    if (!Values.apartment) {
      errors.apartment = ("Select apartment");
    }
    return errors;
  };

  function clearForm(){
    set_project_data({
      type_name: '',
      commercial_space: "", 
      apartment: "",
    });
  }
  useEffect(() => {
    if (protype.addUpdateLoading == "succeeded") {
      setTimeout(() => { formRef.current.resetForm(); clearForm(); set_disabled(false); setOpen(false) }, 3000);
    } else if (protype.addUpdateLoading != "idle" && protype.addUpdateLoading != "pending") {
      setTimeout(() => { set_disabled(false); }, 4000);
    }
  }, [protype.addUpdateLoading]);


  return (<>
    <Modal
      md={4}
      sm={6}
      xs={10}
      title={add ? ("Add Project Type") : ("Edit Project Type")}
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
                  onClick={()=>{ 
                    clearForm();
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

              <Label>{t("Project Type")}</Label>
              <Input
                app
                type="text"
                name="type_name"
                placeholder={("type project name")}
                value={values.type_name || ""}
                maxLength={60}
                disabled={!add}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {
                errors.type_name && touched.type_name ? <ErrLabel>{errors.type_name}</ErrLabel> : null
              }

              <Label>{("Commercial Space")}</Label>
              <Select
                app
                name="commercial_space"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.commercial_space || ""}
              >
                <option disabled value="">
                  {t("select value")}
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
              {
                errors.commercial_space && touched.commercial_space ? <ErrLabel>{errors.commercial_space}</ErrLabel> : null
              }

              <Label >{("Apartment")} </Label>
              <Select
                app
                name="apartment"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.apartment || ""}
              >

                <option disabled value="">
                  {("select value")}
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
              {
                errors.apartment && touched.apartment ? <ErrLabel>{errors.apartment}</ErrLabel> : null
              }

            </form>
          );
        }}
      </Formik>
    </Modal>
  </>
  );
};
