import { Formik } from "formik";
import { t } from "i18next";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { Label } from "../../components/style/Label";

import {
    updateInvestmentConfig as updatetype,
    initLoader,
} from "./inv_investment_Slice";
import { Toast } from "../../components/Toast";
import { Flex } from "../../components/style/Flex_styled";
import {DateTime} from 'luxon'
export const EditInvestmentModal = ({ add, open, setOpen = () => { }, data, }) => {
    const investment = useSelector((state) => state.investment);
    const [config_id, set_config_id] = useState(0);
    const [disabled, set_disabled] = useState(false);
    const dropDownRef = useRef(null);
    const formRef=useRef(null);
    const isToday = ( ) => DateTime.fromMillis(unixDate) >=  DateTime.now().toFormat('MM-dd-yyyy')
    const [project_data, set_project_data] = useState({
        user_id: "",
        project_id: "",
        project_name: "",
        payment_type: "",
        installment: "",
        project_desc: "",
        type_id: "",
        popular_loc: "",
        district_id: "",
        thana_id: "",
        address: "",
        est_cost: "",
        no_share: "",
        unit_price: "",
        no_share_for_sell: "",
        total_size: "",
        est_start_date: "",
        est_complete_date: "",
        distict: "",
        thana: "",
        buy_date:"",
    })

    const dispatch = useDispatch();

    useEffect(() => {
        set_project_data(data);
        set_config_id(data.config_id || "");
    }, [data]);

    const SubmitForm = (values) => {
        add ? "" : values.config_id = config_id;
        values.buy_date=DateTime.now().toFormat('MM-dd-yyyy');
        dispatch(updatetype(values));
        set_disabled(true);
    };




    const validate = (Values) => {
        let errors = {};

        if (!Values.no_share) {
            errors.no_share = ("Share buy is required");
        } else if (Values.no_share.length > 100) {
            errors.no_share = ("Maximum 100 Characters are allowed ");
        }

        if (!Values.total_amount) {
            errors.total_amount = ("Share price is required");
        } else if (Values.total_amount.length > 200) {
            errors.total_amount = ("Maximum 200 Characters are allowed ");
        }

        return errors;
    };

    useEffect(() => {
        if (investment.addUpdateLoading == "succeeded") {
            setTimeout(() => {formRef.current.resetForm(); dispatch(initLoader()); set_disabled(false); setOpen(false) }, 5000);
        } else if (investment.addUpdateLoading != "idle") {
            setTimeout(() => { set_disabled(false); dispatch(initLoader()); }, 5000);
        }
    }, [investment.addUpdateLoading]);


    return (<>
        {investment.addUpdateLoading != "idle" ? (
            investment.addUpdateLoading == "failed" ? (
                <Toast msg={investment.msg} color="error" />
            ) : (
                <Toast color="success" icon="task_alt" msg={investment.msg} />
            )
        ) : (
            ""
        )}

        <Modal
            md={8}
            sm={10}
            xs={12}
            title={add ? ("New Investment") : ("Edit Investment")}
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
                        setFieldValue,
                    } = formik;

                    return (
                        <div>
                            <form onSubmit={handleSubmit}>


                                <Flex padding="0!important" md={12}>
                                    <Flex row>
                                        <Flex padding="0 10px 10px 0 !important" md={6}>
                                        </Flex>
                                        <Flex padding="0 0 10px 10px !important" md={6}>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label color="cardfont">{("Amount in Wallet")} </Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        type="text"
                                                        name="amnt_wallet"
                                                        value={values.amnt_wallet || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* {
                                                    errors.payment_method && touched.payment_method ? <Label>{errors.payment_method}</Label> : null
                                                } */}

                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>

                                    <Flex row>
                                        <Flex padding="10px 10px 0 0 !important" md={6}>

                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label color="font">Project Name</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
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
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label color="font">Description</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        type="text"
                                                        name="project_desc"
                                                        placeholder={("type description")}
                                                        value={values.project_desc || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />
                                                    {/* {
                errors.project_desc && touched.project_desc ? <Label>{errors.project_desc}</Label> : null
            } */}
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label color="font">Project type</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        type="text"
                                                        name="project_type"
                                                        placeholder={("type project-type")}
                                                        value={values.project_type || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />

                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label color="font">Popular Location</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        type="text"
                                                        name="popular_loc"
                                                        placeholder={("type popular location")}
                                                        value={values.popular_loc || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />

                                                </Flex>

                                            </Flex>

                                        </Flex>
                                        <Flex padding="10px 0 0 10px !important" md={6}>

                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label color="font">#of Shares</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        type="text"
                                                        name="share"
                                                        placeholder={("type number of shares")}
                                                        value={values.share || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />

                                                </Flex>

                                            </Flex>

                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label color="font">Price/Share</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        type="text"
                                                        name="unit_price"
                                                        placeholder={("type price/share")}
                                                        value={values.unit_price || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />

                                                </Flex>

                                            </Flex>

                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label color="font">#of Shares for sell</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        type="text"
                                                        name="no_share_for_sell"
                                                        placeholder={("type shares for sell")}
                                                        value={values.no_share_for_sell || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />
                                                    {/* {
                errors.no_share_for_sell && touched.no_share_for_sell ? <Label>{errors.no_share_for_sell}</Label> : null
            } */}
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label color="font">Total Size</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        type="text"
                                                        name="total_size"
                                                        placeholder={("type total size")}
                                                        value={values.total_size || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />
                                                    {/* {
                errors.total_size && touched.total_size ? <Label>{errors.total_size}</Label> : null
            } */}
                                                </Flex>

                                            </Flex>
                                        </Flex>
                                    </Flex>

                                    <Flex row>
                                        <Flex padding="20px 10px 10px 0 !important" md={6}>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label color="cardfont">{("District")} </Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        type="text"
                                                        name="district_id"
                                                        placeholder={("type district")}
                                                        value={values.district_id || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />
                                                    {/* {
                                                    errors.payment_method && touched.payment_method ? <Label>{errors.payment_method}</Label> : null
                                                } */}

                                                </Flex>
                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label color="cardfont">{("Thana")} </Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        type="text"
                                                        name="thana_id"
                                                        placeholder={("type thana")}
                                                        value={values.thana_id || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />
                                                    {/* {
                                                    errors.payment_method && touched.payment_method ? <Label>{errors.payment_method}</Label> : null
                                                } */}

                                                </Flex>
                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label color="font">Address</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        type="text"
                                                        name="address"
                                                        placeholder={("type address")}
                                                        value={values.address || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />
                                                    {/* {
                                                        errors.address && touched.address ? <Label>{errors.address}</Label> : null
                                                    } */}
                                                </Flex>

                                            </Flex>
                                        </Flex>
                                        <Flex padding="20px 0 10px 10px !important" md={6}>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label color="cardfont">{("Est Start Date")} </Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        type="text"
                                                        name="est_start"
                                                        placeholder={("type start date")}
                                                        value={values.est_start || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />
                                                    {/* {
                                                    errors.payment_method && touched.payment_method ? <Label>{errors.payment_method}</Label> : null
                                                } */}

                                                </Flex>
                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label color="cardfont">{("Est End Date")} </Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        type="text"
                                                        name="est_end"
                                                        placeholder={("type thana")}
                                                        value={values.est_end || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />
                                                    {/* {
                                                    errors.payment_method && touched.payment_method ? <Label>{errors.payment_method}</Label> : null
                                                } */}

                                                </Flex>
                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label color="font">Project Status</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        type="text"
                                                        name="pro_status"
                                                        placeholder={("type status")}
                                                        value={values.pro_status || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />
                                                    {/* {
                                                        errors.pro_atatus && touched.pro_atatus ? <Label>{errors.pro_atatus}</Label> : null
                                                    } */}
                                                </Flex>

                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Flex row>
                                        <Flex padding="10px 10px 0 0 !important" md={6}>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label color="font">Shares to Buy</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        type="text"
                                                        name="no_share"
                                                        onKeyPress={(event) => {
                                                            if (!/[0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        }}
                                                        placeholder={("type shares to buy")}
                                                        value={values.no_share || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.no_share && touched.no_share ? <Label>{errors.no_share}</Label> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label color="font">Shares Price</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        type="text"
                                                        name="total_amount"
                                                        onKeyPress={(event) => {
                                                            if (!/[0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        }}
                                                        placeholder={("type shares price")}
                                                        value={values.total_amount || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.total_amount && touched.total_amount ? <Label>{errors.total_amount}</Label> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                        </Flex>
                                        <Flex padding="10px 0 0 10px !important" md={6}></Flex>
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
