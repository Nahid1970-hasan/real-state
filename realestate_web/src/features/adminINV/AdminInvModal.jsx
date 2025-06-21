import { Formik } from "formik";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { ErrLabel, Label } from "../../components/style/Label";
import { Select } from "../../components/style/Select_styled";
import Flatpickr from "react-flatpickr";

import {
    updateAdminInvInfo as updatetype,
    saveAdminInvInfo as savetype,
    initLoader,
    AdminInvSubmit,
} from "./admin_inv_slice";
import { Flex } from "../../components/style/Flex_styled";
import { DateTime } from 'luxon'
import { Typography } from "../../components/style/Typography_styled";
import { numberWithCommas } from "../../utils/helper";

export const AdminInvModal = ({ add, open, setOpen = () => { }, data }) => {
    const adminInv = useSelector((state) => state.adminInv);
    const [amnt_wallet, set_amnt_wallet] = useState(0);
    const [disabled, set_disabled] = useState(false);
    const dropDownRef = useRef(null);
    const formRef = useRef(null);
    const isToday = () => DateTime.fromMillis(unixDate) >= DateTime.now().toFormat('MM-dd-yyyy')
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
        no_share: 0,
        unit_price: "",
        no_share_for_sell: 0,
        total_size: "",
        est_start_date: "",
        est_complete_date: "",
        distict: "",
        thana: "",
        buy_date: "",
        thana_name: "",
        type_name: "",
        district_name: "",
        share_sold: "",
        buy_share: 0,
        remain_share: 0,
        total_amount: 0,
        status: ""
    })

    const dispatch = useDispatch();
    useEffect(() => {
        set_project_data({
            user_id: 0,
            project_id: 0,
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
            no_share: 0,
            unit_price: "",
            no_share_for_sell: 0,
            total_size: "",
            est_start_date: "",
            est_complete_date: "",
            distict: "",
            thana: "",
            buy_date: "",
            thana_name: "",
            type_name: "",
            district_name: "",
            share_sold: 0,
            buy_share: 0,
            remain_share: 0,
            total_amount: 0,
            status: ""
        })
    }, []);

    useEffect(() => {
        var invData = Object.assign({
            ...adminInv?.Invlist || {}, buy_share: data?.buy_share || "0", total_amount: data?.total_amount || "0", remain_share: " " + parseInt(adminInv?.Invlist?.no_share|| 0) - parseInt(adminInv?.Invlist?.share_sold || 0)
        });
        set_project_data(invData);
    }, [adminInv.Invlist, data]);

    useEffect(() => {
        set_amnt_wallet(adminInv.walletAmount);
    }, [adminInv.walletAmount]);


    const SubmitForm = (values) => {

        var reqData = {
            "share_id": add ? "0" : data?.share_id || 0,
            "project_id": project_data.project_id,
            "buy_share": values?.buy_share || 0,
            "total_amount": values?.total_amount || 0,
            "buy_date": DateTime.now().toFormat('MM-dd-yyyy')
        }

        dispatch(add ? savetype(reqData) : updatetype(reqData));
        set_disabled(true);
    };

    function submitproject(e) {
        let data = {
            project_id: dropDownRef.current.value,
        };
        dispatch(AdminInvSubmit(data));
    }


    const validate = (Values) => {
        let errors = {};

        if (!Values.no_share) {
            errors.no_share = ("Share buy is required");
        } else if (Values.no_share.length > 100) {
            errors.no_share = ("Maximum 100 Characters are allowed ");
        }

        if (!Values.total_amount) {
            errors.total_amount = ("Share price is required");
        } else if (Values.total_amount > amnt_wallet) {
            errors.total_amount = ("Total amount not be more than wallet");
        }

        if (!Values.buy_share) {
            errors.buy_share = ("Buy share is required");
        } else if (Values.buy_share > Values.remain_share) {
            errors.buy_share = ("buy share not be more than share for sell");
        }

        return errors;
    };

    useEffect(() => {
        if (adminInv.addUpdateLoading == "succeeded") {
            setTimeout(() => { formRef.current.resetForm(); set_disabled(false); setOpen(false) }, 3000);
        } else if (adminInv.addUpdateLoading != "idle") {
            setTimeout(() => { set_disabled(false); }, 4000);
        }
    }, [adminInv.addUpdateLoading]);



    function countSharePrice(e) {
        var share = parseInt(e.target.value || 0);
        var unitprice = adminInv?.Invlist?.unit_price || 0;
        var sharePrice = share * unitprice;
        formRef.current.setFieldValue("total_amount", sharePrice);
    }
    return (<>

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
                                            {add ?
                                                <Flex row>
                                                    <Flex padding="0 !important" md={3}>
                                                        <Label >{("Select Project")} </Label>
                                                    </Flex>
                                                    <Flex padding="0 !important" md={6}>
                                                        <Select
                                                            app
                                                            ref={dropDownRef}
                                                            defaultValue={""}
                                                        >
                                                            <option disabled value="">
                                                                {("select project")}
                                                            </option>
                                                            {adminInv.projectlist?.map((d, i) => (
                                                                <option key={i} value={d.project_id}>
                                                                    {d.project_name}
                                                                </option>
                                                            ))}
                                                        </Select>


                                                    </Flex>
                                                    <Flex padding="0 !important" md={3}>
                                                        <CardHeaderButton top="5px">
                                                            <PrimaryButton
                                                                type="button"
                                                                onClick={submitproject}
                                                            >
                                                                Submit
                                                            </PrimaryButton>
                                                        </CardHeaderButton>
                                                    </Flex>
                                                </Flex> :
                                                <Flex row>
                                                    <Flex padding="0 !important" md={5}>
                                                        <Label >Project Name</Label>
                                                    </Flex>
                                                    <Flex padding="0 !important" md={7}>
                                                        <Input
                                                            app
                                                            type="text"
                                                            name="project_name"
                                                            placeholder={("----")}
                                                            value={project_data?.project_name || ""}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            disabled
                                                        />
                                                    </Flex>

                                                </Flex>
                                            }
                                        </Flex>
                                        <Flex padding="0 0 10px 10px !important" md={6}>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label >{("Amount in Wallet")} </Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Typography textAlign="right" fontSize="bodyTitleFontSize" fontWeight="bold" >
                                                        {numberWithCommas(amnt_wallet || 0)} {" "}{"Tk"}
                                                    </Typography>

                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>

                                    <Flex row>
                                        <Flex padding="10px 10px 0 0 !important" md={6}>

                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label >Description</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="project_desc"
                                                        placeholder={("----")}
                                                        value={values.project_desc || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label >Project type</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="type_name"
                                                        placeholder={("----")}
                                                        value={values.type_name || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />

                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Popular Location</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="popular_loc"
                                                        placeholder={("----")}
                                                        value={values.popular_loc || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />

                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label >{("District")} </Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="district_name"
                                                        placeholder={("----")}
                                                        value={values.district_name || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />

                                                </Flex>
                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label >{("Thana")} </Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="thana_name"
                                                        placeholder={("----")}
                                                        value={values.thana_name || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />

                                                </Flex>
                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Address</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="address"
                                                        placeholder={("----")}
                                                        value={values.address || ""}
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
                                                    <Label >#of Shares</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="no_share"
                                                        placeholder={("----")}
                                                        value={values.no_share || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />

                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label >Price/Share</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="unit_price"
                                                        placeholder={("----")}
                                                        value={values.unit_price || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />

                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label >#of Shares for sell</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="remain_share"
                                                        placeholder={("0")}
                                                        value={values.remain_share || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />

                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label >Total Size</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="total_size"
                                                        placeholder={("----")}
                                                        value={values.total_size || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />

                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label >{("Est Start Date")} </Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="est_start_date"
                                                        placeholder={("----")}
                                                        value={values.est_start_date || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />

                                                </Flex>
                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label >{("Est End Date")} </Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="est_complete_date"
                                                        placeholder={("----")}
                                                        value={values.est_complete_date || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />

                                                </Flex>
                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label >Project Status</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="status"
                                                        placeholder={("----")}
                                                        value={values.status || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />

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
                                                        app
                                                        type="text"
                                                        name="buy_share"
                                                        onKeyPress={(event) => {
                                                            if (!/[0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        }}
                                                        placeholder={("type shares to buy")}
                                                        value={values.buy_share || ""}
                                                        onChange={(e) => {
                                                            countSharePrice(e);
                                                            formik.handleChange(e)
                                                        }}
                                                        disabled={!values.unit_price || amnt_wallet < 1 || !values.remain_share}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.buy_share && touched.buy_share ? <ErrLabel>{errors.buy_share}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label >Shares Price</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
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
                                                        disabled={!values.buy_share || amnt_wallet < 1 || !values.remain_share}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.total_amount && touched.total_amount ? <ErrLabel>{errors.total_amount}</ErrLabel> : null
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

                        </div>
                    );
                }}
            </Formik>


        </Modal>
    </>
    );
};
