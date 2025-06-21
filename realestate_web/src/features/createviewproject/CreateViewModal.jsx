import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { Formik } from "formik";
import { useRef } from "react";
import { initLoader, saveProjectInfo, updateProjectInfo } from "./create_project_slice";
import { Flex } from "../../components/style/Flex_styled";
import { ErrLabel, Label } from "../../components/style/Label";
import { Input } from "../../components/style/Input_styled";
import { Select } from "../../components/style/Select_styled";
import { loadThana } from "../thana/thana_slice";
import Flatpickr from "react-flatpickr";
import { DateTime } from "luxon";
import { checkNumber, numberWithCommas } from "../../utils/helper";
import { Loading } from "../../components/Loading";

export const CreateViewModal = ({ add, open, setOpen = () => { }, data, }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const createproject = useSelector((state) => state.createproject);
    const [disabled, set_disabled] = useState(false);
    const thana = useSelector((state) => state.thana);
    const [config_id, set_config_id] = useState(0);
    const [initData, setInitData] = useState({
        project_name: "",
        project_desc: "",
        project_shortname:"",
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
        est_complete_date: ""
    });


    const validate = (values) => {
        let errors = {};

        if (!values.project_name) {
            errors.project_name = "Project name  is required";
        }else if (values.project_name.length > 100) {
            errors.project_name = ("Maximum 100 Characters are allowed ");
        }
        
        if (!values.project_shortname) {
            errors.project_shortname = "Project short name  is required";
        }else if (values.project_shortname.length > 40) {
            errors.project_shortname = ("Maximum 40 Characters are allowed ");
        }

        if (!values.project_desc) {
            errors.project_desc = ("Description is required");
        } 

        if (!values.type_id) {
            errors.type_id = "Project type is required";
        }

        if (!values.address) {
            errors.address = "Address is required";
        }
        if (!values.popular_loc) {
            errors.popular_loc = "Popular location is required";
        }
        if (!values.district_id) {
            errors.district_id = "Please select distrcit";
        }
        if (!values.thana_id) {
            errors.thana_id = "Please select thana";
        }
        if (!values.est_cost) {
            errors.est_cost = "Estimated cost is required.";
        }
        if (!values.no_share) {
            errors.no_share = "No of Share is required";
        } else {
            if (parseFloat(values.no_share) > parseFloat(values.est_cost || 0)) {
                errors.no_share = "Invalid No. of share value";
            }
        }
        if (!values.unit_price) {
            errors.unit_price = "Unit price is required";
        } else {
            if (parseFloat(values.unit_price) > parseFloat(values.est_cost)) {
                errors.unit_price = "Invalid unit price value";
            }
        }
        if (!values.no_share_for_sell) {
            errors.no_share_for_sell = "No of Share for sell is required";
        } else {
            if (parseFloat(values.no_share_for_sell) > parseFloat(values.no_share)) {
                errors.no_share_for_sell = "Invalid Share for sell value";
            }
        }

        if (!values.total_size) {
            errors.total_size = "Total size is required";
        }
        if (!values.est_start_date) {
            errors.est_start_date = "Estimate start date is required";
        }
        if (!values.est_complete_date) {
            errors.est_complete_date = "Estimate complete date is required";
        }
        if (!values.status) {
            errors.status = "Status is required.";
        }

        return errors;
    };

    function set_district_id_change(event) {
        let districtID = event.target.value;
        const message = {
            district_id: districtID,
        };
        dispatch(loadThana(message));
    }

    useEffect(() => {
        add ? "" : setInitData(createproject.projectInfo);
        set_config_id(data.config_id || "");
    }, [createproject.projectInfo]);

    useEffect(() => {
        set_config_id(data.config_id || "");
    }, [data]);

    const submitForm = (values) => {
        add ? "" : values.config_id = config_id;
        dispatch(add ? saveProjectInfo(values) : updateProjectInfo(values));
        set_disabled(true);
    };

    function clearForm() {
        setInitData({
            type_id: "", 
            district_id: "",
            thana_id: "",
            status: ""
        })
    }
    function getSharePercent(e) {
        var val = parseInt(e.target.value || 0);
        var shareVal = parseInt(formRef.current?.values?.est_cost || 0);
        var sharetage = shareVal / val || 0;
        formRef.current.setFieldValue("unit_price", sharetage.toFixed(0) || 0);
        var dVal = parseInt(createproject?.sharesell || 0);
        var percentage = (val * dVal) / 100;
        formRef.current.setFieldValue("no_share_for_sell", percentage.toFixed(0) || 0);
    }

    function getShareValue(e) {
        var val = parseInt(e.target.value || 0);
        var shareVal = parseInt(formRef.current?.values?.no_share || 0);
        var sharetage = val / shareVal;
        formRef.current.setFieldValue("unit_price", sharetage.toFixed(0) || 0);
    }
    useEffect(() => {
        if (createproject.addUpdateLoading == "succeeded") {
            setTimeout(() => { formRef.current.resetForm(); clearForm(); set_disabled(false); setOpen(false) }, 3000);
        } else if (createproject.addUpdateLoading != "idle" && createproject.addUpdateLoading != "pending") {
            setTimeout(() => { set_disabled(false); }, 4000);
        }
    }, [createproject.addUpdateLoading]);

    return (
        <>
            <Modal
                md={8}
                sm={10}
                xs={12}
                title={add ? ("Create Project") : ("Edit Project")}
                open={open}
                outsideclick
                onClose={() => {
                    setOpen(false);
                }}
            >
                <Formik
                    initialValues={initData}
                    validate={validate}
                    innerRef={formRef}
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
                                                    <Label>Project Name</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="project_name"
                                                        placeholder={("type project name")}
                                                        value={values.project_name || ""}
                                                        onChange={handleChange}
                                                        disabled={!add}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.project_name && touched.project_name ? <ErrLabel>{errors.project_name}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Short Name</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="project_shortname"
                                                        placeholder={("type project short name")}
                                                        value={values.project_shortname || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.project_shortname && touched.project_shortname ? <ErrLabel>{errors.project_shortname}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Description</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="project_desc"
                                                        placeholder={("type description")}
                                                        value={values.project_desc || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.project_desc && touched.project_desc ? <ErrLabel>{errors.project_desc}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label >Project type</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Select
                                                        app
                                                        name="type_id"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled={!add}
                                                        value={values.type_id || ""}
                                                    >
                                                        <option disabled value="">
                                                            {("select type")}
                                                        </option>
                                                        {
                                                            createproject?.projectType?.map((d, i) => (
                                                                <option key={i} value={d.type_id}>
                                                                    {d.type_name}
                                                                </option>
                                                            ))
                                                        }
                                                    </Select>
                                                    {
                                                        errors.type_id && touched.type_id ? <ErrLabel>{errors.type_id}</ErrLabel> : null
                                                    }
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
                                                        placeholder={("type popular location")}
                                                        value={values.popular_loc || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.popular_loc && touched.popular_loc ? <ErrLabel>{errors.popular_loc}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>District</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Select
                                                        app
                                                        name="district_id"
                                                        value={values.district_id || ""}
                                                        onChange={(e) => {
                                                            set_district_id_change(e)
                                                            formik.handleChange(e);
                                                        }}
                                                        onBlur={handleBlur}
                                                        color={errors.district_id && touched.district_id ? "error" : null}
                                                        disabled={!add}
                                                    >
                                                        <option disabled value={""}>
                                                            {("select district")}
                                                        </option>
                                                        {
                                                            add ? createproject?.districtList?.map((d, i) => (
                                                                <option key={i} value={d.district_id}>
                                                                    {d.district_name}
                                                                </option>
                                                            )) : <option value={values.district_id}> {values.district_name}</option>
                                                        }
                                                    </Select>
                                                    {
                                                        errors.district_id && touched.district_id ? <ErrLabel>{errors.district_id}</ErrLabel> : null
                                                    }
                                                </Flex>
                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Thana</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Select
                                                        app
                                                        name="thana_id"
                                                        value={values.thana_id || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={errors.thana_id && touched.thana_id ? "error" : null}
                                                        disabled={!add}
                                                    >
                                                        <option disabled value={""}>
                                                            {("select thana")}
                                                        </option>
                                                        {add ? thana?.list?.map((d, i) => (
                                                            <option key={i} value={d.thana_id}>{d.thana_name}</option>
                                                        )) : <option value={values.thana_id}>{values.thana_name}</option>

                                                        }
                                                    </Select>
                                                    {
                                                        errors.thana_id && touched.thana_id ? <ErrLabel>{errors.thana_id}</ErrLabel> : null
                                                    }
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
                                                        placeholder={("type address")}
                                                        value={values.address || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.address && touched.address ? <ErrLabel>{errors.address}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                        </Flex>

                                        <Flex padding="0 0 0 10px!important" md={6}>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Est. Cost</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="est_cost"
                                                        onKeyDown={(event) => !checkNumber(event.key) && event.preventDefault()}
                                                        maxLength={20}
                                                        placeholder={("type est. cost")}
                                                        value={values.est_cost || ""}
                                                        onBlur={handleBlur}
                                                        onChange={(e) => {
                                                            getShareValue(e);
                                                            formik.handleChange(e);

                                                        }}
                                                    />
                                                    {
                                                        errors.est_cost && touched.est_cost ? <ErrLabel>{errors.est_cost}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>#of Shares</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="no_share"
                                                        onKeyDown={(event) => !checkNumber(event.key) && event.preventDefault()}
                                                        maxLength={20}
                                                        placeholder={("type number of shares")}
                                                        value={values.no_share || ""}
                                                        onChange={(e) => {
                                                            getSharePercent(e);
                                                            formik.handleChange(e);
                                                        }}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.no_share && touched.no_share ? <ErrLabel>{errors.no_share}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Price/Share</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="unit_price"
                                                        placeholder={("type price/share")}
                                                        value={values.unit_price || ""}
                                                        onKeyDown={(event) => !checkNumber(event.key) && event.preventDefault()}
                                                        maxLength={20}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.unit_price && touched.unit_price ? <ErrLabel>{errors.unit_price}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>#of Shares for sell</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="no_share_for_sell"
                                                        onKeyDown={(event) => !checkNumber(event.key) && event.preventDefault()}
                                                        maxLength={20}
                                                        placeholder={("type shares for sell")}
                                                        value={values.no_share_for_sell || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.no_share_for_sell && touched.no_share_for_sell ? <ErrLabel>{errors.no_share_for_sell}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Total Size</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Input
                                                        app
                                                        type="text"
                                                        name="total_size"
                                                        placeholder={("type total size")}
                                                        onKeyDown={(event) => !checkNumber(event.key) && event.preventDefault()}
                                                        maxLength={20}
                                                        value={values.total_size || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.total_size && touched.total_size ? <ErrLabel>{errors.total_size}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label >Est Start Date</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Flatpickr
                                                        readOnly
                                                        options={{
                                                            dateFormat: "Y-m-d",
                                                            defaultDate: DateTime.now().toFormat("yyyy-MM-dd")
                                                        }}
                                                        name="est_start_date"
                                                        onBlur={handleBlur}
                                                        value={values.est_start_date || ""}
                                                        onChange={(e, str) => {
                                                            setFieldValue("est_start_date", str);
                                                        }}
                                                        render={({ value, ...props }, ref) => {
                                                            return (
                                                                <Input
                                                                    {...props}
                                                                    app
                                                                    type="text"
                                                                    name="est_start_date"
                                                                    placeholder="pick a date"
                                                                    value={values.est_start_date || ""}
                                                                    ref={ref}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                    {
                                                        errors.est_start_date && touched.est_start_date ? <ErrLabel>{errors.est_start_date}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                            <Flex row>
                                                <Flex padding="0 !important" md={5}>
                                                    <Label>Est End Date</Label>
                                                </Flex>
                                                <Flex padding="0 !important" md={7}>
                                                    <Flatpickr
                                                        readOnly
                                                        options={{
                                                            dateFormat: "Y-m-d",
                                                            minDate: DateTime.fromFormat(
                                                                values.est_start_date ||
                                                                DateTime.now().toFormat("yyyy-MM-dd"),
                                                                "yyyy-MM-dd"
                                                            )
                                                                .plus({ days: 1 })
                                                                .toFormat("yyyy-MM-dd"),
                                                        }}
                                                        name="est_complete_date"
                                                        onBlur={handleBlur}
                                                        value={values.est_complete_date || ""}
                                                        onChange={(e, str) => {
                                                            setFieldValue("est_complete_date", str);
                                                        }}
                                                        render={({ value, ...props }, ref) => {
                                                            return (
                                                                <Input
                                                                    {...props}
                                                                    app
                                                                    type="text"
                                                                    name="est_complete_date"
                                                                    placeholder="pick a date"
                                                                    value={values.est_complete_date || ""}
                                                                    ref={ref}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                    {
                                                        errors.est_complete_date && touched.est_complete_date ? <ErrLabel>{errors.est_complete_date}</ErrLabel> : null
                                                    }
                                                </Flex>

                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Flex row>
                                        <Flex padding="0 10px 0 0 !important" md={6}>
                                            <Flex row>
                                                <Flex padding="0!important" md={5}>
                                                    <Label >Project Status</Label>
                                                </Flex>
                                                <Flex padding="0!important" md={7}>
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
                                                        <option value="Ongoing">Ongoing</option>
                                                        <option value="Upcoming">Upcoming</option> 
                                                    </Select>
                                                    {
                                                        errors.status && touched.status ? <ErrLabel>{errors.status}</ErrLabel> : null
                                                    }
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <CardHeaderButton>
                                        <Button
                                            color="error"
                                            fontColor="barFont"
                                            type="reset"
                                            onClick={()=>{
                                                clearForm();
                                                formik.resetForm()
                                            }}
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
