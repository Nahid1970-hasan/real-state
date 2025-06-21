import { Formik } from "formik";
import { t } from "i18next";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { ErrLabel, Label } from "../../components/style/Label";
import Flatpickr from "react-flatpickr";


import {
    updateAdminWallet as updateWallet,
    saveAdminWallet as saveWallet,
    initLoader,
} from "./wallet_slice";
import { DateTime } from "luxon";
import { useRef } from "react";
import { checkNumber } from "../../utils/helper";
import { Flex } from "../../components/style/Flex_styled";

export const WalletModal = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const adminWallet = useSelector((state) => state.adminWallet);
    const [payment_id, set_payment_id] = useState(0);
    const formRef = useRef();
    const [disabled, set_disabled] = useState(false);
    const [wallet_data, set_wallet_data] = useState({
        add_date: DateTime.now().toFormat("yyyy-MM-dd"),
        amount: '',
        verified:'',
        wallet:'',

    })

    const dispatch = useDispatch();

    useEffect(() => {
        add ? clearForm() : set_wallet_data(data);
        set_payment_id(add ? 0 : data.payment_id || "");
    }, [data]);

    const SubmitForm = (values) => {
        add ? "" : values.payment_id = payment_id;
        dispatch(add ? saveWallet(values) : updateWallet(values));
        set_disabled(true);
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.add_date) {
            errors.add_date = ("Please choose payment date");
        }

        if (!Values.amount) {
            errors.amount = ("Money amount is required");
        } else if (Values.amount.length > 100) {
            errors.amount = ("Maximum 100 characters are allowed");
        }

        return errors;
    };

    function clearForm() {
        set_wallet_data({
            add_date: DateTime.now().toFormat("yyyy-MM-dd"),
            amount: '',

        });
    }

    useEffect(() => {
        if (adminWallet.addUpdateLoading == "succeeded") {
            setTimeout(() => { formRef.current.resetForm(); clearForm(); set_disabled(false); setOpen(false) }, 3000);
        } else if (adminWallet.addUpdateLoading != "idle" && adminWallet.addUpdateLoading != "pending") {
            setTimeout(() => { set_disabled(false) }, 4000);
        }
    }, [adminWallet.addUpdateLoading]);


    return (<>
        <Modal
            md={4}
            sm={6}
            xs={11}
            title={add ? ("Add Money") : ("Edit Add Money")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >

            <Formik
                initialValues={wallet_data}
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
                        setFieldValue,
                        resetForm
                    } = formik;

                    return (
                        <form onSubmit={handleSubmit}>
                            <Flex md={12} padding="0!important">
                                <Flex row>
                                    <Flex padding="0 !important" md={4}>
                                        <Label >{("Add Date")} </Label>
                                    </Flex>
                                    <Flex padding="0 !important" md={8}>
                                        <Flatpickr
                                            readOnly
                                            options={{
                                                dateFormat: "Y-m-d",
                                            }}
                                            value={values.add_date}
                                            onChange={(e, str) => {
                                                setFieldValue('add_date', str)
                                            }}
                                            render={({ defaultValue, value, ...props }, ref) => {
                                                return (
                                                    <Input
                                                        {...props}
                                                        app
                                                        type="text"
                                                        name="add_date"
                                                        placeholder={("1900-01-01")}
                                                        value={values.add_date || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={errors.add_date && touched.add_date ? "error" : null}
                                                        ref={ref}
                                                    />
                                                );
                                            }}
                                        />
                                        {
                                            errors.add_date && touched.add_date ? <ErrLabel>{errors.add_date}</ErrLabel> : null
                                        }

                                    </Flex>
                                </Flex>

                                <Flex row>
                                    <Flex padding="0 0 10px 0!important" md={4}>
                                        <Label >{("Add Money Amount")} </Label>
                                    </Flex>
                                    <Flex padding="0 0 10px 0!important" md={8}>
                                        <Input
                                            app
                                            type="text"
                                            name="amount"
                                            placeholder={("type amount")}
                                            value={values.amount || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled={values.payment_method == "Cash"}
                                        />
                                        {
                                            errors.amount && touched.amount ? <ErrLabel>{errors.amount}</ErrLabel> : null
                                        }


                                    </Flex>
                                </Flex>
                            </Flex>
                            <CardHeaderButton>
                                <AlertButton
                                    type="reset"
                                    onClick={() => {
                                        clearForm();
                                        formik.resetForm();
                                    }}
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

                        </form>
                    );
                }}
            </Formik>


        </Modal>

    </>
    );
};
