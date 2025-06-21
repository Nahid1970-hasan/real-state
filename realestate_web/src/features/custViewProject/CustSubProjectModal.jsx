import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Formik, useFormik } from "formik";
import { CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { ErrLabel, Label } from "../../components/style/Label";
import UnAuthorized from "../../pages/UnAuthorized";
import { Toast } from "../../components/Toast";
import { Flex } from "../../components/style/Flex_styled";
import { Input } from "../../components/style/Input_styled";
import { PrimaryButton } from "../../components/Button";
import { initLoader, loadSubProjectInfo, saveBookingConfig } from "./cust_view_project_slice";
import { Modal } from "../../components/Modal";
import { Select } from "../../components/style/Select_styled";
import { useRef } from "react";
import { TextArea } from "../../components/style/TextArea";
import { Typography } from "../../components/style/Typography_styled";
import { HLChip } from "../../components/Chip";


export const CustSubProjectModal = ({ add, open, setOpen = () => { }, data, }) => {
    const custProjectData = useSelector((state) => state.custProjectData);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [sub_project_id, set_sub_project_id] = useState("");
    const [disabled, set_disabled] = useState(false);
    const [allow, set_allow] = useState(false);
    const dropDownRef = useRef(null);
    const formRef = useRef(null);
    const [savedData, setSavedData] = useState({
        sub_type_name: '',
        sub_name: '',
        floor_no: '',
        position_unit: '',
        size_sqft: '',
        down_payment: '',
        installment_amnt: '',
        inst_amount: '',
        est_delivery: '',
        no_bedrooms: '',
        no_toilets: '',
        no_balcony: '',
        no_drawing: '',
        book: '',
        no_living: '',
        no_lobby: '',
        other: '',
        booking_notes: '',
    });

    const validate = (values) => {
        let errors = {};

        if (!values.booking_notes) {
            errors.booking_notes = ("Note is required");
        } else if (values.booking_notes.length > 1000) {
            errors.booking_notes = ("Maximum 1000 characters are allowed.");
        }
        return errors;
    };


    const submitForm = (values) => {
        var regData = {
            "sub_project_id": values.sub_project_id,
            "booking_notes": values.booking_notes,
        }
        dispatch(saveBookingConfig(regData));
        set_disabled(true);
    };

    useEffect(() => {
        formRef.current.setFieldValue("booking_notes", "");
        set_sub_project_id("");
    }, [custProjectData.subProjectName]);

    useEffect(() => {
        if (custProjectData.addUpdateLoading == "succeeded") {
            setTimeout(() => { formRef.current.setFieldValue("booking_notes", ""); set_disabled(false); setOpen(false) }, 4000);
        } else if (custProjectData.addUpdateLoading != "idle") {
            setTimeout(() => { set_disabled(false); }, 4000);
        }
    }, [custProjectData.addUpdateLoading]);

    const handleChangeOption = (e) => {
        set_sub_project_id(e.target.value);
        dispatch(loadSubProjectInfo({ "sub_project_id": e.target.value }));
    };
    useEffect(() => {
        setSavedData(custProjectData.subProjectDetails);
        set_allow(custProjectData?.subProjectDetails?.booking_notes=="")
    }, [custProjectData.subProjectDetails]);

    return custProjectData.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>
            {(custProjectData.addUpdateLoading == "idle" || custProjectData.addUpdateLoading == "pending") ? <></> : (
                custProjectData.addUpdateLoading == "succeeded" ? (
                    <Toast msg={custProjectData.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={custProjectData.msg} />
                )
            )}
            <Modal
                md={8}
                sm={8}
                xs={12}
                title={("New Booking Information")}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                outsideclick
            >
                <Flex row>
                    <Flex padding="0 10px 0 0!important" md={6}>
                        <Flex row>
                            <Flex padding="0 !important" md={4}>
                                <Label >Sub-project</Label>
                            </Flex>
                            <Flex padding="0 !important" md={8}>
                                <Select
                                    app
                                    onChange={handleChangeOption}
                                    value={sub_project_id || ""}
                                    
                                >
                                    <option disabled value={""}>--select value</option>
                                    {custProjectData.subProjectName?.map((d, i) => (
                                        <option key={i} value={d.sub_project_id}>
                                            {d.sub_project_name}
                                        </option>
                                    ))}
                                </Select>

                            </Flex>


                        </Flex>
                    </Flex>
                    <Flex padding="0 10px 0 0!important" md={6}>
                        <Flex row>
                            <Flex padding=" 5px 0  0 10px !important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Status")}
                                </Typography>
                            </Flex>
                            <Flex padding="5px 0  0 10px !important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {custProjectData?.subProjectDetails?.status ? <HLChip background={"primary"} color={"primaryFont"} label={custProjectData?.subProjectDetails?.status=="Booked" || allow? custProjectData?.subProjectDetails?.status:"Booking Requested"} /> : "----"}
                                </Typography>
                            </Flex>


                        </Flex>
                    </Flex>
                </Flex>

                <Flex row>
                    <Flex padding="0 !important" md={12} sm={12} xs={12}>
                        <Formik
                            initialValues={savedData}
                            validate={validate}
                            enableReinitialize
                            onSubmit={submitForm}
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
                                    setFieldValue
                                } = formik;


                                return (
                                    <div>
                                        <form onSubmit={handleSubmit}>
                                            <Flex row>
                                                <Flex padding="10px 10px  0 0 !important" md={6} sm={8} xs={12}>
                                                    <Flex row>
                                                        <Flex padding="0 !important" md={4}><Label>Sub-type Name</Label></Flex>
                                                        <Flex padding="0 !important" md={8}>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="sub_type_name"
                                                                placeholder={("----")}
                                                                value={values.sub_type_name || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled="disabled"
                                                            />
                                                            {
                                                                errors.sub_type_name && touched.sub_type_name ? <ErrLabel>{errors.sub_type_name}</ErrLabel> : null
                                                            }
                                                        </Flex>

                                                    </Flex>
                                                    <Flex row>
                                                        <Flex padding="0 !important" md={4}><Label>Floor</Label></Flex>
                                                        <Flex padding="0 !important" md={8}>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="floor_no"
                                                                placeholder={("----")}
                                                                value={values.floor_no || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled="disabled"
                                                            />
                                                            {
                                                                errors.floor_no && touched.floor_no ? <ErrLabel>{errors.floor_no}</ErrLabel> : null
                                                            }
                                                        </Flex>



                                                    </Flex>
                                                    <Flex row>
                                                        <Flex padding="0 !important" md={4}><Label >Position/Unit</Label></Flex>
                                                        <Flex padding="0 !important" md={8}>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="position_unit"
                                                                placeholder={("----")}
                                                                value={values.position_unit || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled="disabled"
                                                            />
                                                            {
                                                                errors.position_unit && touched.position_unit ? <ErrLabel>{errors.position_unit}</ErrLabel> : null
                                                            }
                                                        </Flex>



                                                    </Flex>
                                                    <Flex row>
                                                        <Flex padding="0 !important" md={4}><Label >Size(Sqr Ft)</Label></Flex>
                                                        <Flex padding="0 !important" md={8}>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="size_sqft"
                                                                placeholder={("0")}
                                                                value={values.size_sqft || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled="disabled"
                                                            />
                                                            {
                                                                errors.size_sqft && touched.size_sqft ? <ErrLabel>{errors.size_sqft}</ErrLabel> : null
                                                            }
                                                        </Flex>



                                                    </Flex>
                                                    <Flex row>
                                                        <Flex padding="0 !important" md={4}><Label >Down-payment</Label></Flex>
                                                        <Flex padding="0 !important" md={8}>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="down_payment"
                                                                placeholder={("0")}
                                                                value={values.down_payment || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled="disabled"
                                                            />
                                                            {
                                                                errors.down_payment && touched.down_payment ? <ErrLabel>{errors.down_payment}</ErrLabel> : null
                                                            }
                                                        </Flex>



                                                    </Flex>
                                                    <Flex row>
                                                        <Flex padding="0 !important" md={4}><Label >No. of Installments</Label></Flex>
                                                        <Flex padding="0 !important" md={8}>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="no_installment"
                                                                placeholder={("0")}
                                                                value={values.no_installment || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled="disabled"
                                                            />
                                                            {
                                                                errors.no_installment && touched.no_installment ? <ErrLabel>{errors.no_installment}</ErrLabel> : null
                                                            }
                                                        </Flex>



                                                    </Flex>
                                                    <Flex row>
                                                        <Flex padding="0 !important" md={4}><Label >Installment Amnt</Label></Flex>
                                                        <Flex padding="0 !important" md={8}>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="installment_amnt"
                                                                placeholder={("0")}
                                                                value={values.installment_amnt || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled="disabled"
                                                            />
                                                            {
                                                                errors.installment_amnt && touched.installment_amnt ? <ErrLabel>{errors.installment_amnt}</ErrLabel> : null
                                                            }
                                                        </Flex>



                                                    </Flex>
                                                    <Flex row>
                                                        <Flex padding="0 !important" md={4}><Label>Est Delivery</Label></Flex>
                                                        <Flex padding="0 !important" md={8}>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="est_delivery"
                                                                placeholder={("-----")}
                                                                value={values.est_delivery || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled="disabled"
                                                            />
                                                            {
                                                                errors.est_delivery && touched.est_delivery ? <ErrLabel>{errors.est_delivery}</ErrLabel> : null
                                                            }
                                                        </Flex>



                                                    </Flex>

                                                </Flex>
                                                <Flex padding="10px 0 0 10px !important" md={6} sm={8} xs={12}>
                                                    <Flex row>
                                                        <Flex padding="0 !important" md={4}><Label>Bedrooms#</Label></Flex>
                                                        <Flex padding="0 !important" md={8}>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="no_bedrooms"
                                                                placeholder={("0")}
                                                                value={values.no_bedrooms || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled="disabled"
                                                            />
                                                            {
                                                                errors.no_no_bedrooms && touched.no_bedrooms ? <ErrLabel>{errors.no_bedrooms}</ErrLabel> : null
                                                            }
                                                        </Flex>

                                                    </Flex>
                                                    <Flex row>
                                                        <Flex padding="0 !important" md={4}><Label>Toilets#</Label></Flex>
                                                        <Flex padding="0 !important" md={8}>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="no_toilets"
                                                                placeholder={("0")}
                                                                value={values.no_toilets || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled="disabled"
                                                            />
                                                            {
                                                                errors.no_toilets && touched.no_toilets ? <ErrLabel>{errors.no_toilets}</ErrLabel> : null
                                                            }
                                                        </Flex>



                                                    </Flex>
                                                    <Flex row>
                                                        <Flex padding="0 !important" md={4}><Label >Balcony#</Label></Flex>
                                                        <Flex padding="0 !important" md={8}>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="no_balcony"
                                                                placeholder={("0")}
                                                                value={values.no_balcony || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled="disabled"
                                                            />
                                                            {
                                                                errors.no_balcony && touched.no_balcony ? <ErrLabel>{errors.no_balcony}</ErrLabel> : null
                                                            }
                                                        </Flex>



                                                    </Flex>
                                                    <Flex row>
                                                        <Flex padding="0 !important" md={4}><Label >Drawing Room</Label></Flex>
                                                        <Flex padding="0 !important" md={8}>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="no_drawing"
                                                                placeholder={("0")}
                                                                value={values.no_drawing || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled="disabled"
                                                            />
                                                            {
                                                                errors.no_drawing && touched.no_drawing ? <ErrLabel>{errors.no_drawing}</ErrLabel> : null
                                                            }
                                                        </Flex>

                                                    </Flex>

                                                    <Flex row>
                                                        <Flex padding="0 !important" md={4}><Label>Kitchen#</Label></Flex>
                                                        <Flex padding="0 !important" md={8}>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="no_kitchen"
                                                                placeholder={("0")}
                                                                value={values.no_kitchen || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled="disabled"
                                                            />
                                                            {
                                                                errors.no_kitchen && touched.no_kitchen ? <ErrLabel>{errors.no_kitchen}</ErrLabel> : null
                                                            }
                                                        </Flex>



                                                    </Flex>
                                                    <Flex row>
                                                        <Flex padding="0 !important" md={4}><Label>Living Room</Label></Flex>
                                                        <Flex padding="0 !important" md={8}>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="no_living"
                                                                placeholder={("0")}
                                                                value={values.no_living || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled="disabled"
                                                            />
                                                            {
                                                                errors.no_living && touched.no_living ? <ErrLabel>{errors.no_living}</ErrLabel> : null
                                                            }
                                                        </Flex>



                                                    </Flex>
                                                    <Flex row>
                                                        <Flex padding="0 !important" md={4}><Label>Lobby#</Label></Flex>
                                                        <Flex padding="0 !important" md={8}>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="no_lobby"
                                                                placeholder={("0")}
                                                                value={values.no_lobby || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled="disabled"
                                                            />
                                                            {
                                                                errors.no_lobby && touched.no_lobby ? <ErrLabel>{errors.no_lobby}</ErrLabel> : null
                                                            }
                                                        </Flex>



                                                    </Flex>
                                                    <Flex row>
                                                        <Flex padding="0 !important" md={4}><Label>Others</Label></Flex>
                                                        <Flex padding="0 !important" md={8}>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="other"
                                                                placeholder={("0")}
                                                                value={values.other || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled="disabled"
                                                            />
                                                            {
                                                                errors.other && touched.other ? <ErrLabel>{errors.other}</ErrLabel> : null
                                                            }
                                                        </Flex>



                                                    </Flex>

                                                </Flex>
                                                <Flex row>
                                                    <Flex padding="10px 0 0 0 !important" md={2}><Label >Booking Note</Label></Flex>
                                                    <Flex padding="10px 0 0 0 !important" md={10}>
                                                        <Input
                                                            app
                                                            type="text"
                                                            name="booking_notes"
                                                            placeholder={("type note here..")}
                                                            value={values.booking_notes || ""}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            disabled={values?.status !="Running" || !allow}
                                                        />
                                                        {
                                                            errors.booking_notes && touched.booking_notes ? <ErrLabel>{errors.booking_notes}</ErrLabel> : null
                                                        }
                                                    </Flex>



                                                </Flex>
                                                { (values.status =="Running" && allow) && <Flex md={12}>
                                                    <CardHeaderButton>
                                                        <PrimaryButton
                                                            type="submit"
                                                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                            disabled={!(dirty && isValid) || disabled}
                                                        >
                                                            {("Book Now")}
                                                        </PrimaryButton>
                                                    </CardHeaderButton>
                                                </Flex>
                                                } 
                                            </Flex>
                                        </form>

                                    </div>
                                );
                            }}
                        </Formik>


                    </Flex>
                </Flex>
            </Modal>
        </>
    );
};
