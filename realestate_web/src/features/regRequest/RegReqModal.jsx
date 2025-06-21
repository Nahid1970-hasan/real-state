import { Formik } from "formik";
import { t } from "i18next";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { Label } from "../../components/style/Label";
import { Select } from "../../components/style/Select_styled";
import { Toast } from "../../components/Toast";
import { Flex } from "../../components/style/Flex_styled";
import { Typography } from "../../components/style/Typography_styled";


export const RegReqModal = ({ add, open, setOpen = () => { }, data }) => {
    const regreq = useSelector((state) => state.regreq);
    const [user_id, set_user_id] = useState(0);
    const [disabled, set_disabled] = useState(false);
    const [req_data, set_req_data] = useState({
        user_id: "",
        mobile: "",
        email: "",
        username: "",
        full_name: "",
        father_name: "",
        mother_name: "",
        spouse_name: "",
        district: "",
        thana: "",
        nid: "",
        nationality: "",
        account_no: "",
        bank_name: "",
        branch_name: "",
        routing_no: "",
        address: "",
    });
    const dispatch = useDispatch();

    useEffect(() => {
        set_req_data(data);
        set_user_id(data.user_id || "");
    }, [data]);

    const submitForm = (values) => {
        add ? "" : (values.user_id = user_id);
        console.log(values);
        dispatch(add ? approveReg(values) : viewRegestion(values));
        set_disabled(true);
    };

    const validate = (values) => {
        let errors = {};

        // if (!values.sender_name) {
        //     errors.sender_name = t("err_sender_name");
        // } else if (values.sender_name.length > 460) {
        //     errors.sender_name = t("err_sender_name_length");
        // }

        // if (!values.network_cred_pass) {
        //     errors.network_cred_pass = t("network_cred_pass");
        // } else if (values.network_cred_pass.length > 460) {
        //     errors.network_cred_pass = t("err_network_cred_pass");
        // }
        // if (!values.email_server) {
        //     errors.email_server = t("email_server");
        // } else if (values.email_server.length > 500) {
        //     errors.email_server = t("err_email_server");
        // }
        // if (!values.port) {
        //     errors.port = t("port");
        // } else if (values.port.length > 500) {
        //     errors.port = t("err_port_length");
        // }
        // if (!values.network_cred_user_email) {
        //     errors.network_cred_user_email = t("err_net_cred_emails");
        // } else if (values.network_cred_user_email.length > 560) {
        //     errors.network_cred_user_email = t("err_net_cred_email_length");
        // }
        // if (!values.sending_email_address) {
        //     errors.sending_email_address = t("sending_email_address");
        // } else if (values.sending_email_address.length > 500) {
        //     errors.sending_email_address = t("err_sending_email_address");
        // }

        // if (!values.used_for) {
        //     errors.used_for = t("used_for");
        // } else if (values.used_for.length > 500) {
        //     errors.used_for = t("err_used_for_length");
        // }
        return errors;
    };

    useEffect(() => {
        if (
            regreq.addUpdateLoading == "succeeded" &&
            regreq.loading == "succeeded"
        ) {
            setTimeout(() => {
                dispatch(initLoader());
                set_disabled(false);
                setOpen(false);
            }, 5000);
        } else if (
            regreq.addUpdateLoading == "failed" ||
            regreq.addUpdateLoading == "idle"
        ) {
            setTimeout(() => {
                set_disabled(false);
            }, 5000);
        }
    }, [regreq.addUpdateLoading, regreq.loading]);

    return (
        <>
            {regreq.addUpdateLoading != "idle" ? (
                regreq.addUpdateLoading == "failed" ? (
                    <Toast msg={regreq.msg} color="error" />
                ) : (
                    <Toast color="success" icon="task_alt" msg={regreq.msg} />
                )
            ) : (
                ""
            )}
            <Modal
                md={4}
                sm={6}
                xs={8}
                title={t("View Registration Request")}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                outsideclick
            >
                <Formik
                    initialValues={req_data}
                    validate={validate}
                    enableReinitialize
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

                                    <CardBody>
                                        <Flex padding="0 0 10px 0 !important" md={12}>
                                            <Typography fontSize="bodyContentFontSize" textAlign="left" fontWeight="bold">
                                                Credential Information
                                            </Typography>
                                            <Flex row>
                                                <Flex padding="10px 0 0 0 !important" md={4}>
                                                    <Label color="font">{("Mobile")}</Label>
                                                </Flex>
                                                <Flex padding="10px 0 0 0 !important" md={8}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="Mobile"
                                                        placeholder={("mobile")}
                                                        value={values.mobile}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* {errors.Mobile && touched.Mobile ? (
                      <Label>{errors.Mobile}</Label>
                    ) : null} */}
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={4}>
                                                    <Label color="font">{("Email")}</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={8}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="email"
                                                        placeholder={("email")}
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* {errors.email && touched.email ? (
                      <Label>{errors.Email}</Label>
                    ) : null} */}
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={4}>
                                                    <Label color="font">{("Username")}</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={8}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="username"
                                                        placeholder={("username")}
                                                        value={values.username}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* {errors.username && touched.username ? (
                      <Label>{errors.Username}</Label>
                    ) : null} */}
                                                </Flex>

                                            </Flex>

                                            <Flex row>
                                                <Flex padding="0 !important" md={4}>
                                                    <Label color="font">{("Registration Type")}</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={8}>
                                                    <Flex row>
                                                        <Flex padding="0 !important" md={4}>
                                                            <Flex row>
                                                                <Flex padding="0 !important" md={3}>
                                                                    <Input
                                                                        app
                                                                        type="radio"
                                                                        name="inventor"
                                                                        checked={values.inventor == 6}
                                                                        value={6}
                                                                        onChange={(e) =>
                                                                            setFieldValue(
                                                                                "inventor",
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                    /></Flex>
                                                                <Flex padding="0 !important" md={9}> <Label color="font">
                                                                    {("Inventor")}
                                                                </Label> </Flex>

                                                            </Flex>


                                                        </Flex>
                                                        <Flex padding="0 !important" md={4}>
                                                            <Flex row>
                                                                <Flex padding="0 !important" md={3}>
                                                                    <Input
                                                                        app
                                                                        type="radio"
                                                                        name="customer"
                                                                        checked={values.inventor == 6}
                                                                        value={6}
                                                                        onChange={(e) =>
                                                                            setFieldValue(
                                                                                "customer",
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                    /></Flex>
                                                                <Flex padding="0 !important" md={9}> <Label color="font">
                                                                    {("Customer")}
                                                                </Label>
                                                                </Flex>

                                                            </Flex>
                                                        </Flex>

                                                        <Flex padding="0 !important" md={4}>
                                                            <Flex row>
                                                                <Flex padding="0 !important" md={3}>
                                                                    <Input
                                                                        app
                                                                        type="radio"
                                                                        name="both"
                                                                        checked={values.inventor == 6}
                                                                        value={6}
                                                                        onChange={(e) =>
                                                                            setFieldValue(
                                                                                "both",
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                    /></Flex>
                                                                <Flex padding="0 !important" md={9}> <Label color="font">
                                                                    {("Both")}
                                                                </Label> </Flex>

                                                            </Flex>
                                                        </Flex>


                                                    </Flex>

                                                </Flex>

                                            </Flex>

                                            <Flex row>
                                                <Flex md={12}>
                                                    <Typography fontSize="bodyContentFontSize" textAlign="left" fontWeight="bold">
                                                        Detail Information
                                                    </Typography>
                                                </Flex>
                                                <Flex padding="0 !important" md={4}>

                                                    <Label color="font">{("Full Name")}</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={8}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="full_name"
                                                        placeholder={("full name")}
                                                        value={values.full_name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* {errors.full_name && touched.full_name ? (
                      <Label>{errors.Full Name}</Label>
                    ) : null} */}
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={4}>

                                                    <Label color="font">{("Father Name")}</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={8}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="fater_name"
                                                        placeholder={("father name")}
                                                        value={values.father_name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* {errors.father_name && touched.father_name ? (
                      <Label>{errors.Father Name}</Label>
                    ) : null} */}
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={4}>

                                                    <Label color="font">{("Mother's Name")}</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={8}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="mother_name"
                                                        placeholder={("mother's name")}
                                                        value={values.mother_name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* {errors.mother_name && touched.mother_name ? (
                      <Label>{errors.Mother Name}</Label>
                    ) : null} */}
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={4}>

                                                    <Label color="font">{("Spouse name")}</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={8}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="spouse_name"
                                                        placeholder={("spouse name")}
                                                        value={values.spouse_name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* {errors.spouse_name && touched.spouse_name ? (
                      <Label>{errors.Spouse Name}</Label>
                    ) : null} */}
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={4}>

                                                    <Label color="font">{("District")}</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={8}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="district"
                                                        placeholder={("district")}
                                                        value={values.district}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* {errors.district && touched.district ? (
                      <Label>{errors.district}</Label>
                    ) : null} */}
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={4}>

                                                    <Label color="font">{("Thana")}</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={8}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="thana"
                                                        placeholder={("thana")}
                                                        value={values.thana}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* {errors.thana && touched.thana ? (
                      <Label>{errors.Thana}</Label>
                    ) : null} */}
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={4}>

                                                    <Label color="font">{("Address")}</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={8}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="address"
                                                        placeholder={("address")}
                                                        value={values.address}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* {errors.address && touched.address ? (
                      <Label>{errors.address}</Label>
                    ) : null} */}
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={4}>

                                                    <Label color="font">{("Mobile")}</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={8}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="mobile"
                                                        placeholder={("mobile")}
                                                        value={values.mobile}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={4}>

                                                    <Label color="font">{("email")}</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={8}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="email"
                                                        placeholder={("email")}
                                                        value={values.spouse_name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={4}>

                                                    <Label color="font">{("NID")}</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={8}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="nid"
                                                        placeholder={("nid")}
                                                        value={values.nid}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* {errors.nid && touched.nid ? (
                      <Label>{errors.nid}</Label>
                    ) : null} */}
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={4}>

                                                    <Label color="font">{t("Nationality")}</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={8}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="nationality"
                                                        placeholder={t("nationality")}
                                                        value={values.nationality}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* {errors.nationality && touched.nationality ? (
                      <Label>{errors.nationality}</Label>
                    ) : null} */}
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex md={12}>
                                                    <Typography fontSize="bodyContentFontSize" textAlign="left" fontWeight="bold">
                                                        Bank Information
                                                    </Typography>
                                                </Flex>

                                                <Flex padding="0 !important" md={4}>

                                                    <Label color="font">{t("Account No")}</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={8}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="account_no"
                                                        placeholder={t("account no")}
                                                        value={values.account_no}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* {errors.account_no && touched.account_no ? (
                      <Label>{errors.account_no}</Label>
                    ) : null} */}
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={4}>

                                                    <Label color="font">{t("Bank name")}</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={8}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="bank_name"
                                                        placeholder={t("bank name")}
                                                        value={values.bank_name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* {errors.bank_name && touched.bank_name ? (
                      <Label>{errors.bank_name}</Label>
                    ) : null} */}
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={4}>

                                                    <Label color="font">{t("Routing No")}</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={8}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="routing_no-"
                                                        placeholder={t("routing no")}
                                                        value={values.routing_no}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* {errors.routing_no && touched.routing_no ? (
                      <Label>{errors.routing_no}</Label>
                    ) : null} */}
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={4}>

                                                    <Label color="font">{("Address")}</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={8}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="address"
                                                        placeholder={("address")}
                                                        value={values.address}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* {errors.address && touched.address ? (
                      <Label>{errors.address}</Label>
                    ) : null} */}
                                                </Flex>

                                            </Flex>

                                        </Flex>
                                    </CardBody>
                                    <CardHeaderButton>
                                        <PrimaryButton
                                            type="submit"
                                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                                            disabled={!(dirty && isValid) || disabled}
                                        >
                                            {t("Approve")}
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
