import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { Formik } from "formik";
import { TextArea } from "../../components/style/TextArea";
import { useRef } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { ErrLabel, Label } from "../../components/style/Label";
import { Input } from "../../components/style/Input_styled";
import { Select } from "../../components/style/Select_styled";
import Flatpickr from "react-flatpickr";
import { saveMilestonesetup } from "./milestonesetup_slice";
import { checkNumber } from "../../utils/helper";

export const MilestoneModal = ({ add, open, setOpen = () => { }, data }) => {
    const milestonesetup = useSelector((state) => state.milestonesetup);
    const dispatch = useDispatch();
    const formikRef = useRef(null);
    const [disabled, set_disabled] = useState(false);
    const [initData, setInitData] = useState({
        project_id: "",
        milestone_id: "",
        project_name: "",
        major_works: "",
        start_date: "",
        end_date: "",
        work_percent: "",
        status: "",
    });
    useEffect(() => {
        setInitData(data)
    }, [data])
    
    

    const validate = (values) => {
        let errors = {};

        if (!values.major_works) {
            errors.major_works = "Major work is required";
        }
        if (!values.start_date) {
            errors.start_date = "Start date is required";
        }
        if (!values.end_date) {
            errors.end_date = "End date is required";
        }
        if (!values.work_percent) {
            errors.work_percent = "Work percentage is required";
        }else{
            if (parseInt(values.work_percent||0)>100) {
                errors.work_percent = "Work percentage is not valid";
            }
        }
        if (!add && !values.status) {
            errors.status = "Status is required";
        }

        return errors;
    };
 
    const submitForm = (values) => {
        values.project_id = parseInt(data.project_id) || 0;
        values.milestone_id = add ? 0 : data.milestone_id;
        dispatch(saveMilestonesetup(values));
        set_disabled(true);
    };

    useEffect(() => {
        if (milestonesetup.addUpdateLoading == "succeeded") { 
            setTimeout(() => { formikRef.current?.resetForm(); set_disabled(false); setOpen(false);}, 3000)
        } else if (milestonesetup.addUpdateLoading != "pending" && milestonesetup.addUpdateLoading != "idle") {
            setTimeout(() => { set_disabled(false) }, 4000);
        }
    }, [milestonesetup.addUpdateLoading]);

    return (
        <>
            <Modal
                md={6}
                sm={8}
                xs={12}
                title={add ? ("Create Milestone Setup") : ("Edit Milestone Setup")}
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
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label>Project Name</Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    readOnly
                                                    app
                                                    type="text"
                                                    name="project_name"
                                                    placeholder={("type project name")}
                                                    value={values?.project_name || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled
                                                />
                                                {
                                                    errors.project_name && touched.project_name ? <ErrLabel>{errors.project_name}</ErrLabel> : null
                                                }
                                            </Flex>

                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label>Major Works</Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <TextArea
                                                    app
                                                    type="text"
                                                    name="major_works"
                                                    placeholder={("type major work")}
                                                    value={values?.major_works || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {
                                                    errors.major_works && touched.major_works ? <ErrLabel>{errors.major_works}</ErrLabel> : null
                                                }
                                            </Flex>

                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label>Start Date</Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Flatpickr
                                                    readOnly
                                                    options={{
                                                        dateFormat: "Y-m-d",

                                                    }}
                                                    name="start_date"
                                                    onBlur={handleBlur}
                                                    value={values?.start_date || ""}
                                                    onChange={(e, str) => {
                                                        setFieldValue("start_date", str);
                                                    }}
                                                    render={({ value, ...props }, ref) => {
                                                        return (
                                                            <Input
                                                                {...props}
                                                                app
                                                                type="text"
                                                                name="start_date"
                                                                placeholder="pick a date"
                                                                value={values?.start_date || ""}
                                                                ref={ref}
                                                            />
                                                        );
                                                    }}
                                                />
                                                {
                                                    errors.start_date && touched.start_date ? <ErrLabel>{errors.start_date}</ErrLabel> : null
                                                }
                                            </Flex>

                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label>End Date</Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Flatpickr
                                                    readOnly
                                                    options={{
                                                        dateFormat: "Y-m-d",
                                                        minDate: values.start_date , 
                                                      }}
                                                    name="end_date"
                                                    onBlur={handleBlur}
                                                    value={values?.end_date || ""}
                                                    onChange={(e, str) => {
                                                        setFieldValue("end_date", str);
                                                    }}
                                                    render={({ value, ...props }, ref) => {
                                                        return (
                                                            <Input
                                                                {...props}
                                                                app
                                                                type="text"
                                                                name="end_date"
                                                                placeholder="pick a date"
                                                                value={values?.end_date || ""}
                                                                ref={ref}
                                                            />
                                                        );
                                                    }}
                                                />
                                                {
                                                    errors.end_date && touched.end_date ? <ErrLabel>{errors.end_date}</ErrLabel> : null
                                                }
                                            </Flex>

                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label>% of works</Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Input
                                                    app
                                                    type="test"
                                                    onKeyDown={((event)=>{if(!checkNumber(event.key)){event.preventDefault()}})}
                                                    name="work_percent"
                                                    placeholder={("type % of works")}
                                                    value={values?.work_percent || ""}
                                                    onChange={handleChange}
                                                    min={0}
                                                    max={100}
                                                    maxLength={3}
                                                    onBlur={handleBlur}
                                                />
                                                {
                                                    errors.work_percent && touched.work_percent ? <ErrLabel>{errors.work_percent}</ErrLabel> : null
                                                }
                                            </Flex>

                                        </Flex>
                                        <Flex row>
                                            <Flex padding="0 !important" md={4}>
                                                <Label>Status</Label>
                                            </Flex>
                                            <Flex padding="0 !important" md={8}>
                                                <Select
                                                    name="status"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values?.status || "DEFAULT"}
                                                >
                                                    <option disabled value="DEFAULT">
                                                        {("select type")}
                                                    </option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Running">Running</option>
                                                    <option value="Completed">Completed</option>
                                                </Select>
                                                {
                                                    errors.status && touched.status ? <ErrLabel>{errors.status}</ErrLabel> : null
                                                }
                                            </Flex>

                                        </Flex>
                                    </Flex>

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
