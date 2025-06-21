import { Formik } from "formik";
import { t } from "i18next";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { ErrLabel, Label } from "../../components/style/Label";
import { Select } from "../../components/style/Select_styled";
import { Toast } from "../../components/Toast";
import {
    updateInternalUserConfig as updateConfig,
    initLoader,
} from "./internal_user_Slice";
import { useRef } from "react";
import { Loading } from "../../components/Loading";

export const InternalUserEdit = ({ add, open, setOpen = () => { }, data }) => {
    const userConfig = useSelector((state) => state.internal);
    const [disabled, set_disabled] = useState(false);
    const [user_id, set_user_id] = useState(0);
    const formRef = useRef();
    const [userData, setUserData] = useState({
        email: "",
        mobile_no: "",
        username: "",
        password: "",
        fullname: "",
        nickname: "",
        designation: "",
        status: "",
    });
    const dispatch = useDispatch();

    useEffect(() => {
        set_user_id(data.user_id);
        setUserData(data);
    }, [data]);

    const submitForm = (values) => {
        add ? "" : (values.user_id = user_id);
        dispatch(updateConfig(values));
        set_disabled(true);
    };

    const validate = (values) => {
        let errors = {};

        if (!values.fullname) {
            errors.fullname = ("Fullname is required");
        } else if (values.fullname.length > 80) {
            errors.fullname = ("Maximum 80 characters are allowed");
        }

        if (!values.email) {
            errors.email = ("Email is required.");
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = ("Invalid email.");
        }
        if (!values.nickname) {
            errors.nickname = ("Nickname is required.");
        } else if (values.nickname.length > 40) {
            errors.nickname = ("Maximum 40 characters are allowed.");
        }
        if (!values.designation) {
            errors.designation = ("Designation is required");
        } else if (values.designation.length > 80) {
            errors.designation = ("Maximum 80 characters are allowed");
        }
        if (!values.mobile_no) {
            errors.mobile_no = ("Mobile number is required");
        } else if (!/(^(01){1}[3456789]{1}(\d){8})$/i.test(values.mobile_no)) {
            errors.mobile_no = ("Mobile number is invalid");
        }
        if (!values.status) {
            errors.status = ("Status is required");
        }
        return errors;
    };

    useEffect(() => {
        if (userConfig.addUpdateLoading == "succeeded") {
            setTimeout(() => { formRef.current.resetForm(); setOpen(false); set_disabled(false); }, 3000);
        } else if (userConfig.addUpdateLoading != "idle" && userConfig.addUpdateLoading != "pending") {
            setTimeout(() => { set_disabled(false); }, 4000);
        }
    }, [userConfig.addUpdateLoading]);

    return (
        <>
            <Modal
                md={4}
                sm={6}
                xs={10}
                title={("Edit User Profile")}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                outsideclick
            >
                <Formik
                    initialValues={userData}
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
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <CardHeaderButton> 
                                        <PrimaryButton
                                            type="submit"
                                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                                            disabled={!(dirty && isValid) || disabled}
                                        >
                                            {t("submit")}
                                        </PrimaryButton>
                                    </CardHeaderButton>

                                    <CardBody>
                                        <Label>
                                            {("Fullname")}
                                        </Label>
                                        <Input
                                            app
                                            type="text"
                                            name="fullname"
                                            placeholder={("type fullname")}
                                            value={values.fullname || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.fullname && touched.fullname ? (
                                            <ErrLabel>{errors.fullname}</ErrLabel>
                                        ) : null}

                                        <Label>
                                            {("Nickname")}
                                        </Label>
                                        <Input
                                            app
                                            type="text"
                                            name="nickname"
                                            placeholder={("nick name")}
                                            value={values.nickname || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.nickname && touched.nickname ? (
                                            <ErrLabel>{errors.nickname}</ErrLabel>
                                        ) : null}

                                        <Label>
                                            {("Designation")}{" "}
                                        </Label>
                                        <Input
                                            app
                                            type="text"
                                            name="designation"
                                            placeholder={("designation")}
                                            value={values.designation || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.designation && touched.designation ? (
                                            <ErrLabel>{errors.designation}</ErrLabel>
                                        ) : null}

                                        <Label>{("Email")} </Label>
                                        <Input
                                            app
                                            type="text"
                                            name="email"
                                            placeholder={("type email")}
                                            value={values.email || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.email && touched.email ? (
                                            <ErrLabel>{errors.email}</ErrLabel>
                                        ) : null}


                                        <Label>
                                            {("Mobile No")}{" "}
                                        </Label>
                                        <Input
                                            app
                                            type="text"
                                            name="mobile_no"
                                            placeholder={("type mobile number")}
                                            value={values.mobile_no || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                        {errors.mobile_no &&
                                            touched.mobile_no ? (
                                            <ErrLabel>{errors.mobile_no}</ErrLabel>
                                        ) : null}

                                        <Label>
                                            {("Status")}
                                        </Label>
                                        <Select
                                            app
                                            name="status"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.status || ""}
                                        >
                                            <option disabled value="">
                                                {("select status")}
                                            </option>
                                            <option value="RegRequest">RegRequest</option>
                                            <option value="Verified">Verified</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Blocked">Blocked</option>
                                            <option value="Canceled">Canceled</option>
                                        </Select>
                                        {errors.status && touched.status ? (
                                            <ErrLabel>{errors.status}</ErrLabel>
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
