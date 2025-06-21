import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "../../components/Button"
import { Modal } from "../../components/Modal"
import { CardHeaderButton } from "../../components/style/Card_styled"
import { Input } from "../../components/style/Input_styled";

import { ErrLabel, Label } from "../../components/style/Label";
import { loadInvProfile, updateProfile } from "./inv_profile_slice";
import { Formik } from "formik";
import { Flex } from "../../components/style/Flex_styled";


export const InvProfileModal = ({ open, setOpen }) => {

    const self = useSelector(state => state.self);
    const dispatch = useDispatch();
    const invProfileData = useSelector(state => state.invprofile);
    const data = self.user;
    const formRef = useRef();
    const [disabled, set_disabled] = useState(false);
    const [profile_data, set_profile_data] = useState({
        user_id: "",
        fullname: "",
        fathers_name: "",
        mothers_name: "",
        spouse_name: "",
        mobile_no: "",
        email: ""
    })
    function clearForm() {
        set_profile_data({
            user_id: "",
            fullname: "",
            fathers_name: "",
            mothers_name: "",
            spouse_name: "",
            mobile_no: "",
            email: ""
        });
        formRef.current.resetForm();
    }
    useEffect(() => {
        set_profile_data({
            fullname: invProfileData?.user?.fullname,
            fathers_name: invProfileData?.user?.fathers_name,
            mothers_name: invProfileData?.user?.mothers_name,
            spouse_name: invProfileData?.user?.spouse_name,
            mobile_no: invProfileData?.user?.mobile_no,
            email: invProfileData?.user?.email,

        });

    }, [invProfileData.user]);
 
    useEffect(() => {
        if (invProfileData.updateLoading == "succeeded") { 
          setTimeout(() => {set_disabled(false); setOpen(false) }, 3000);
        } else if (invProfileData.updateLoading != "idle" && invProfileData.updateLoading != "pending") { 
          setTimeout(() => {set_disabled(false); }, 4000);
        }
      }, [invProfileData.updateLoading]);


    const validate = (Values) => {
        let errors = {};
        if (!Values.fullname) {
            errors.fullname = ("Full name is required");
        } else if (Values.fullname.length > 60) {
            errors.fullname = ("Maximum 60 Characters are allowed ");
        }
        if (!Values.fathers_name) {
            errors.fathers_name = ("Father's name is required");
        } else if (Values.fathers_name.length > 60) {
            errors.fathers_name = ("Maximum 60 Characters are allowed ");
        }
        if (!Values.mothers_name) {
            errors.mothers_name = ("Mother's name is required");
        } else if (Values.mothers_name.length > 60) {
            errors.mothers_name = ("Maximum 60 Characters are allowed ");
        }
        if (!Values.spouse_name) {
            errors.spouse_name = ("Spouse name is required");
        } else if (Values.spouse_name.length > 60) {
            errors.spouse_name = ("Maximum 60 Characters are allowed ");
        }
        if (!Values.mobile_no) {
            errors.mobile_no = ("Mobile Number is required");
          } else if (!/(^(01){1}[3456789]{1}(\d){8})$/i.test(Values.mobile_no)) {
            errors.mobile_no = ("This is not valid Mobile Number");
          }
        if (Values.email) {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Values.email)) {
                errors.email = ("This is not valid email");
            }
        } else {
            errors.email = ("Email is  required");
        }


        return errors;
    };


    const editUserProfile = (values) => {
        let pData = invProfileData?.user || {};
        let data = Object.assign({
            ...pData, fullname: values?.fullname,
            fathers_name: values?.fathers_name,
            mothers_name: values?.mothers_name,
            spouse_name: values?.spouse_name,
            mobile_no: values?.mobile_no,
            email: values?.email
        }); 
        dispatch(updateProfile(data));
        set_disabled(true);
    }

    return <Modal open={open} onClose={() => setOpen(false)} md={4} sm={6} xs={10} title="Edit Profile">
        <Formik
            initialValues={profile_data}
            validate={validate}
            enableReinitialize
            innerRef={formRef}
            onSubmit={editUserProfile}
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
                            <CardHeaderButton>
                                <PrimaryButton
                                    type="submit"
                                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                                    disabled={!(dirty && isValid) || disabled}>
                                    {"Update"}
                                </PrimaryButton>
                            </CardHeaderButton>
                            <Flex row>
                                <Flex md={12} padding="0 !important">
                                    <Label >{("Fullname")}</Label>
                                    <Input
                                        app
                                        type="text"
                                        name="fullname"
                                        placeholder="type full name"
                                        value={values.fullname || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    // onChange={(e) => setFullname(e.target.value)}
                                    />
                                    {
                                        errors.fullname && touched.fullname ? <ErrLabel margin="5px 0 0 0">{errors.fullname}</ErrLabel> : null
                                    }
                                </Flex>

                                <Flex md={12} padding="0 !important">
                                    <Label >{("Father's name")}</Label>
                                    <Input
                                        app
                                        type="text"
                                        name="fathers_name"
                                        placeholder="type father's name"
                                        value={values.fathers_name || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    // onChange={(e) => setFathers(e.target.value)}
                                    />
                                    {
                                        errors.fathers_name && touched.fathers_name ? <ErrLabel margin="5px 0 0 0">{errors.fathers_name}</ErrLabel> : null
                                    }
                                </Flex>
                                <Flex md={12} padding="0 !important">
                                    <Label color="font">{("Mother's Name")}</Label>
                                    <Input
                                        app
                                        type="text"
                                        id="mothers_name"
                                        placeholder="type mother's name"
                                        value={values.mothers_name || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    // onChange={(e) => setMothersname(e.target.value)}
                                    />
                                    {
                                        errors.mothers_name && touched.mothers_name ? <ErrLabel margin="5px 0 0 0">{errors.mothers_name}</ErrLabel> : null
                                    }
                                </Flex>
                                <Flex md={12} padding="0 !important">
                                    <Label >{("Spouse Name")}</Label>
                                    <Input
                                        app
                                        type="text"
                                        id="spouse_name"
                                        placeholder="type spouse name"
                                        value={values.spouse_name || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    // onChange={(e) => setSpousename(e.target.value)}
                                    />
                                    {
                                        errors.spouse_name && touched.spouse_name ? <ErrLabel margin="5px 0 0 0">{errors.spouse_name}</ErrLabel> : null
                                    }
                                </Flex>
                                <Flex md={12} padding="0 !important">
                                    <Label>{("Mobile Number")}</Label>
                                    <Input
                                        app
                                        type="text"
                                        id="mobile_no"
                                        placeholder="type mobile number"
                                        value={values.mobile_no || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    // onChange={(e) => setMobile(e.target.value)}
                                    />
                                    {
                                        errors.mobile_no && touched.mobile_no ? <ErrLabel margin="5px 0 0 0">{errors.mobile_no}</ErrLabel> : null
                                    }
                                </Flex>
                                <Flex md={12} padding="0 !important">
                                    <Label >{("Email")}</Label>
                                    <Input
                                        app
                                        type="text"
                                        id="email"
                                        placeholder="type email"
                                        value={values.email || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    // onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {
                                        errors.email && touched.email ? <ErrLabel margin="5px 0 0 0">{errors.email}</ErrLabel> : null
                                    }
                                </Flex>
                            </Flex>

                        </form>

                    </div>
                );
            }}
        </Formik>

        <form>


        </form>
    </Modal>
}