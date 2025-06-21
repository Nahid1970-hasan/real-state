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
import Flatpickr from "react-flatpickr";

import {
    updateInvRelesaeConfig as updatetype,
    initLoader,
} from "./inv_cash_release_Slice";
import { Toast } from "../../components/Toast";
import { Flex } from "../../components/style/Flex_styled";

export const InvEditRelease = ({ add, open, setOpen = () => { }, data, }) => {
    const invrelesae = useSelector((state) => state.invrelesae);
    const [config_id, set_config_id] = useState(0);
    const [disabled, set_disabled] = useState(false);
    const [project_data, set_project_data] = useState({
        user_id: "",
        project_id: "",
        project_name: "",
        rels_amnt: "",
        profit: "",
    })

    const dispatch = useDispatch();

    useEffect(() => {
        set_project_data(data);
        set_config_id(data.config_id || "");
    }, [data]);

    const SubmitForm = (values) => {
        add ? "" : values.config_id = config_id;
        dispatch(updatetype(values));
        set_disabled(true);
    };

    const validate = (Values) => {
        let errors = {};
        if (!Values.request_for) {
            errors.request_for = ("Release request is required");
        }else if (Values.request_for.length > 20) {
            errors.request_for = ("Maximum 20 Characters are allowed");
        }

        if (!Values.amount) {
            errors.amount = ("Release amount is required");
        } else if (Values.amount.length > 30) {
            errors.amount = ("Maximum 30 Characters are allowed ");
        }

        return errors;
    };

    useEffect(() => {
        if (
            invrelesae.addUpdateLoading == "succeeded" && invrelesae.loading == "succeeded"
        ) {
            setTimeout(() => { dispatch(initLoader()); set_disabled(false); setOpen(false) }, 5000);
        } else if (invrelesae.addUpdateLoading == "failed" || invrelesae.addUpdateLoading == "idle") {
            setTimeout(() => { set_disabled(false) }, 5000);
        }
    }, [invrelesae.addUpdateLoading, invrelesae.loading]);


    return (<>
        {invrelesae.addUpdateLoading != "idle" ? (
            invrelesae.addUpdateLoading == "failed" ? (
                <Toast msg={invrelesae.msg} color="error" />
            ) : (
                <Toast color="success" icon="task_alt" msg={invrelesae.msg} />
            )
        ) : (
            ""
        )}

        <Modal
            md={4}
            sm={6}
            xs={8}
            title={("Edit Release")}
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
                        resetForm,
                        setFieldValue,
                    } = formik;

                    return (
                        <div>
                            <form onSubmit={handleSubmit}>
                         
                                    <Flex padding="0 0 10px 0 !important" md={12}>

                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label color="font">Project Name</Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    type="text"
                                                    name="project_name"
                                                    placeholder={("type project name")}
                                                    value={values.project_name || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled
                                                />
                                                {/* {
                errors.project_name && touched.project_name ? <Label>{errors.project_name}</Label> : null
            } */}
                                            </Flex>

                                        </Flex>
                                    </Flex>

                                    <Flex padding="10px 0 10px 0 !important" md={12}>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label color="cardfont">{("Release Request For")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Select
                                                app
                                                    name="request_for"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.request_for || "DEFAULT"}
                                                >

                                                    <option disabled value="DEFAULT">
                                                        {("select request")}
                                                    </option>
                                                    <option value="Profit">Profit</option>
                                                    <option value="Investment">Investment</option>
                                                </Select>
                                                {
                                                    errors.request_for && touched.request_for ? <Label>{errors.request_for}</Label> : null
                                                }

                                            </Flex>
                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label color="cardfont">{("Release Amount")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    type="text"
                                                    name="amount"
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }}
                                                    value={values.amount || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {
                                                    errors.amount && touched.amount ? <Label>{errors.amount}</Label> : null
                                                }

                                            </Flex>
                                        </Flex>

                                    </Flex>
                                    
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


                            </form>

                        </div>
                    );
                }}
            </Formik>


        </Modal>
    </>
    );
};
