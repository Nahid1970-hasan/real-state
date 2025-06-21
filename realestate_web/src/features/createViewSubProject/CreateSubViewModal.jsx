import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { Formik } from "formik";
import { TextArea } from "../../components/style/TextArea";
import styled from "styled-components";
import { Toast } from "../../components/Toast";
import { useRef } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { ErrLabel, Label } from "../../components/style/Label";
import { Input } from "../../components/style/Input_styled";
import { Select } from "../../components/style/Select_styled";
import { loadThana } from "../thana/thana_slice";
import { loadDistrict } from "../district/district_slice";
import Flatpickr from "react-flatpickr";
import { DateTime } from "luxon";
import { updateSubProjectInfo, initLoader, saveSubProjectInfo } from "./create_sub_project_slice";
import { checkAnyNumber, checkNumber } from "../../utils/helper";

const CustTextArea = styled(TextArea)`
  min-height: 80px !important;
  max-height: 150px !important;
`;

export const CreateSubViewModal = ({ add, open, setOpen = () => { }, data }) => {
    const createsubproject = useSelector((state) => state.createsubproject);
    const dispatch = useDispatch();
    const formikRef = useRef(null);
    const [disabled, set_disabled] = useState(false);
    const [initData, setInitData] = useState({
        sub_type_id: "",
        sub_project_name: "",
        project_name: "",
        floor_no: "",
        position_unit: "",
        size_sqft: "",
        down_payment: "",
        no_installment: "",
        sub_project_amount: "",
        installment_amnt:"",
        est_delivery: "",
        no_bedrooms: "",
        no_toilets: "",
        no_balcony: "",
        no_drawing: "",
        no_kitchen: "",
        no_living: "",
        no_lobby: "",
        other: "",
        status: "",
        files_json: ""
    });


    const validate = (values) => {
        let errors = {};

        if (!values.sub_type_id) {
            errors.sub_type_id = "Project Sub-type  is required";
        } 
        if (!values.sub_project_name) {
            errors.sub_project_name = "Sub-project name  is required";
        } 
        if (!values.floor_no) {
            errors.floor_no = "Floor no. is required";
        } 
        if (!values.position_unit) {
            errors.position_unit = "Position/Unit is required";
        }
        if (!values.size_sqft) {
            errors.size_sqft = "Size is required";
        } 
        if (!values.down_payment) {
            errors.down_payment = "Down-payment is required";
        } 
        if (!values.no_installment) {
            errors.no_installment = "No of installment is required";
        } 
        if (!values.installment_amnt) {
            errors.installment_amnt = "Installment amount is required";
        } 
        if (!values.est_delivery) {
            errors.est_delivery = "Estimated delivery date is required";
        } 
        if (!values.no_bedrooms) {
            errors.no_bedrooms = "No of Bedroom is required";
        } 
        if (!values.no_toilets) {
            errors.no_toilets = "No of Toilets is required";
        } 
        if (!values.no_balcony) {
            errors.no_balcony = "No fo Belcony is required";
        } 
        if (!values.no_drawing) {
            errors.no_drawing = "No fo Drawing room is required";
        } 
        if (!values.no_kitchen) {
            errors.no_kitchen = "No fo Kitchen is required";
        } 
        if (!values.no_living) {
            errors.no_living = "No fo Living room is required";
        }
        if (!values.no_lobby) {
            errors.no_lobby = "No fo Lobby is required";
        } 
        if (!values.other) {
            errors.other = "Other is required";
        }
        if (!add && !values.status) {
            errors.status = "Status is required";
        }

        return errors;
    };

    useEffect(() => {
        add ? "" : setInitData(createsubproject?.infolist); 
    }, [createsubproject?.infolist]);

    const submitForm = (values) => {
        values.project_id = parseInt(data.project_id) || 0;
        values.files_json = {};
        var subprjdata = createsubproject?.infolist;
        add ? "" : values.sub_type_id = subprjdata.sub_type_id;
        add ? "" : values.floor_no = subprjdata.floor_no;
        add ? "" : values.position_unit = subprjdata.position_unit;
        add ? "" : values.installment_amnt = subprjdata.sub_project_amount;
        dispatch(add ? saveSubProjectInfo(values) : updateSubProjectInfo(values));
        set_disabled(true);
    };

    useEffect(() => {
        if (createsubproject.addUpdateLoading == "succeeded") {  
            setTimeout(() => { formikRef.current?.resetForm(); set_disabled(false); setOpen(false); }, 3000)
        } else if (createsubproject.addUpdateLoading != "pending" && createsubproject.addUpdateLoading != "idle") {
            setTimeout(() => { set_disabled(false) }, 4000);
        }
    }, [createsubproject.addUpdateLoading]);

    return (
        <>
            <Modal
                md={8}
                sm={10}
                xs={12}
                title={add ? ("Create Sub-project") : ("Edit Sub-project")}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                outsideclick
            >
                <Formik
                    initialValues={initData}
                    validate={validate}
                    innerRef={formikRef}
                    onSubmit={submitForm}
                    enableReinitialize
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
                                        <Flex padding="0 10px 0 0!important" md={6}>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Sub-project Name</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="sub_project_name"
                                                        placeholder={("type sub-project name")}
                                                        value={values?.sub_project_name || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.sub_project_name && touched.sub_project_name ? <ErrLabel>{errors.sub_project_name}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                        </Flex>
                                        <Flex padding="0 !important" md={6}>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Project Name</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Label >{data?.project_name || ""}</Label>
                                                </Flex>

                                            </Flex>
                                        </Flex>
                                    </Flex>

                                    <Flex row>
                                        <Flex padding="0 10px 0 0! important" md={6}>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Sub-project Type</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Select
                                                        app
                                                        name="sub_type_id"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values?.sub_type_id || ""}
                                                        disabled={!add}
                                                    >
                                                        <option disabled value={""}>--Select Value</option>
                                                        {createsubproject.sublist?.map((d, i) => (
                                                            <option key={i} value={d.sub_type_id}>
                                                                {d.sub_type_name}
                                                            </option>
                                                        ))}
                                                    </Select>
                                                    {
                                                        errors.sub_type_id && touched.sub_type_id ? <ErrLabel>{errors.sub_type_id}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Floor</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="floor_no"
                                                        placeholder={("type floor")}
                                                        value={values?.floor_no || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    // disabled={!add}
                                                    />
                                                    {
                                                        errors.floor_no && touched.floor_no ? <ErrLabel>{errors.floor_no}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Position/Unit</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="position_unit"
                                                        placeholder={("type position/unit")}
                                                        value={values?.position_unit || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    // disabled={!add}
                                                    />
                                                    {
                                                        errors.position_unit && touched.position_unit ? <ErrLabel>{errors.position_unit}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Size (Sqr Ft)</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="size_sqft"
                                                        placeholder={("type size")}
                                                        value={values?.size_sqft || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.size_sqft && touched.size_sqft ? <ErrLabel>{errors.size_sqft}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Down-payment</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="down_payment"
                                                        maxLength={20}
                                                        onKeyDown={(event) => { if (!checkAnyNumber(event)) event.preventDefault(); }}
                                                        placeholder={("type down-payment")}
                                                        value={values?.down_payment || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.down_payment && touched.down_payment ? <ErrLabel>{errors.down_payment}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label># of Installments</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="no_installment"
                                                        maxLength={4}
                                                        placeholder={("type no. of installment")}
                                                        onKeyDown={(event) => { if (!checkNumber(event.key)) event.preventDefault(); }}
                                                        value={values?.no_installment || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.no_installment && touched.no_installment ? <ErrLabel>{errors.no_installment}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Installment Amount</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="installment_amnt"
                                                        maxLength={20}
                                                        onKeyDown={(event) => { if (!checkAnyNumber(event)) event.preventDefault(); }}
                                                        placeholder={("type installment amount")}
                                                        value={values?.installment_amnt || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.installment_amnt && touched.installment_amnt ? <ErrLabel>{errors.installment_amnt}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Est Delivery</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Flatpickr
                                                        readOnly
                                                        options={{
                                                            dateFormat: "Y-m-d",

                                                        }}
                                                        name="est_delivery"
                                                        onBlur={handleBlur}
                                                        value={values?.est_delivery || ""}
                                                        onChange={(e, str) => {
                                                            setFieldValue("est_delivery", str);
                                                        }}
                                                        render={({ value, ...props }, ref) => {
                                                            return (
                                                                <Input
                                                                    {...props}
                                                                    app
                                                                    type="text"
                                                                    name="est_delivery"
                                                                    placeholder="pick a date"
                                                                    value={values?.est_delivery || ""}
                                                                    ref={ref}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                    {
                                                        errors.est_delivery && touched.est_delivery ? <ErrLabel>{errors.est_delivery}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>

                                        </Flex>
                                        <Flex padding="10px 10px 0 0! important" md={6}>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label># Bedrooms</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="no_bedrooms"
                                                        maxLength={4}
                                                        onKeyDown={(event) => { if (!checkNumber(event.key)) event.preventDefault(); }}
                                                        placeholder={("type no. of bedrooms")}
                                                        value={values?.no_bedrooms || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.no_bedrooms && touched.no_bedrooms ? <ErrLabel>{errors.no_bedrooms}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label># Toilets</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="no_toilets"
                                                        maxLength={4}
                                                        onKeyDown={(event) => { if (!checkNumber(event.key)) event.preventDefault(); }}
                                                        placeholder={("type no. of toilets")}
                                                        value={values?.no_toilets || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.no_toilets && touched.no_toilets ? <ErrLabel>{errors.no_toilets}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>#Balcony</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="no_balcony"
                                                        maxLength={4}
                                                        onKeyDown={(event) => { if (!checkNumber(event.key)) event.preventDefault(); }}
                                                        placeholder={("type no. of balcony")}
                                                        value={values?.no_balcony || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.no_balcony && touched.no_balcony ? <ErrLabel>{errors.no_balcony}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Drawing Room</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="no_drawing"
                                                        maxLength={4}
                                                        onKeyDown={(event) => { if (!checkNumber(event.key)) event.preventDefault(); }}
                                                        placeholder={("type no. of drawing room")}
                                                        value={values?.no_drawing || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.no_drawing && touched.no_drawing ? <ErrLabel>{errors.no_drawing}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Kitchen</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="no_kitchen"
                                                        maxLength={4}
                                                        onKeyDown={(event) => { if (!checkNumber(event.key)) event.preventDefault(); }}
                                                        placeholder={("type no. of kitchen")}
                                                        value={values?.no_kitchen || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.no_kitchen && touched.no_kitchen ? <ErrLabel>{errors.no_kitchen}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Living Room</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="no_living"
                                                        maxLength={4}
                                                        onKeyDown={(event) => { if (!checkNumber(event.key)) event.preventDefault(); }}
                                                        placeholder={("type no. of living room")}
                                                        value={values?.no_living || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.no_living && touched.no_living ? <ErrLabel>{errors.no_living}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Lobby</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="no_lobby"
                                                        maxLength={4}
                                                        onKeyDown={(event) => { if (!checkNumber(event.key)) event.preventDefault(); }}
                                                        placeholder={("type no. of lobby")}
                                                        value={values?.no_lobby || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.no_lobby && touched.no_lobby ? <ErrLabel>{errors.no_lobby}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label >Others</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="other"
                                                        placeholder={("type others")}
                                                        value={values?.other || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.other && touched.other ? <ErrLabel>{errors.other}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>

                                        </Flex>
                                    </Flex>
                                    {!add && <Flex row>
                                      
                                    </Flex>}

                                    <CardHeaderButton>
                                        <Button
                                            color="error"
                                            fontColor="barFont"
                                            type="reset"
                                            onClick={resetForm}
                                        >
                                            Reset
                                        </Button>
                                        <Button
                                            color="primary"
                                            fontColor="barFont"
                                            type="submit"
                                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                                            disabled={!(dirty && isValid) || disabled}
                                        >
                                            Submit
                                        </Button>
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
