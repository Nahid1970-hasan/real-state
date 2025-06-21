import { Formik } from "formik";
import { t } from "i18next";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, DownloadButton, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { Label } from "../../components/style/Label";
import { Select } from "../../components/style/Select_styled";

import {
    updateInvWithdrawlConfig as updateWithdrawl,
    initLoader,
} from "./inv_withdrawl_slice";
import { Toast } from "../../components/Toast";
import { Flex } from "../../components/style/Flex_styled";

export const EditInvWithdrawl = ({ add, open, setOpen = () => { }, data, }) => {
    const invwithdrawl = useSelector((state) => state.invwithdrawl);
    const [config_id, set_config_id] = useState(0);
    const [disabled, set_disabled] = useState(false);
    const [project_data, set_project_data] = useState({
        user_id: "",
        project_id: "",
        project_name: "",
        rels_amnt: "",

    })

    const dispatch = useDispatch();

    useEffect(() => {
        set_project_data(data);
        set_config_id(data.config_id || "");
    }, [data]);

    const SubmitForm = (values) => {
        add ? "" : values.config_id = config_id;
        dispatch(updateWithdrawl(values));
        set_disabled(true);
    };


    const validate = (Values) => {
        let errors = {};
        if (!Values.request_for) {
            errors.request_for = ("Withdrawl request for is required");
        }

        if (!Values.amount) {
            errors.amount = ("Withdrawl amount is required");
        } else if (Values.amount.length > 10) {
            errors.amount = ("Withdrawl amount is not valid");
        }

        return errors;
    };

    useEffect(() => {
        if (invwithdrawl.addUpdateLoading == "succeeded") {
            setTimeout(() => { set_disabled(false); setOpen(false) }, 2000);
        } else if (invwithdrawl.addUpdateLoading != "idle") {
            setTimeout(() => { set_disabled(false);}, 3000);
        }
    }, [invwithdrawl.addUpdateLoading]);




    return (<>

        <Modal
            md={6}
            sm={8}
            xs={12}
            title={("Update Withdrawl Amount")}
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
                                <Flex row>
                                    <Flex padding="0 !important" md={12}>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label color="font">Project Name</Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="text"
                                                    name="project_name"
                                                    placeholder={("type project name")}
                                                    value={values.project_name || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled
                                                />
                                            </Flex>
                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label color="cardfont">{("Withdraw Request For")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Select
                                                    app
                                                    name="request_for"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.request_for || ""}
                                                >
                                                    <option disabled value="">
                                                        {("select request for")}
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
                                                <Label color="cardfont">{("Withdrawl Amount")} </Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
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

                                </Flex>
                                <Flex row>
                                    <Flex padding="10px 0 0 0 !important" md={12}> 
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
                                    </Flex>
                                </Flex>




                            </form>

                        </div>
                    );
                }}
            </Formik>


        </Modal>
    </>
    );
};
