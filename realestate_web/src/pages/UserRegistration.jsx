import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; 
import loginSvg from "../assets/reg.jpg";
import { Alert } from "../components/Alert";
import { AlertButton, Button, PrimaryButton } from "../components/Button";
import { Container } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled";
import { FormStyled } from "../components/style/From_style";
import { Input } from "../components/style/Input_styled";
import { Loader } from "../components/style/Loader_styled";
import { Select } from "../components/style/Select_styled";
import { loadDistrict } from "../features/district/district_slice";
import { loadGender } from "../features/gender/gender_slice";
import { initURLoader, setUserRegistration } from "../features/registration/user_registration_slice";
import { loadThana } from "../features/thana/thana_slice";
import { theme } from "../styles/theme";
import { Formik } from "formik";
import { Label } from "../components/style/Label";
import styled from "styled-components";
import { Toast } from "../components/Toast";
import { Typography } from "../components/style/Typography_styled";

const CustFlex = styled(Flex)` 
  padding: 2px 8px;
  margin:0;
  display: flex; 
`;
export const UserRegistration = () => {
 
  const { t, i18n } = useTranslation();

  const user_registration = useSelector((state) => state.user_registration);
  const gender = useSelector((state) => state.gender);
  const district = useSelector((state) => state.district);
  const thana = useSelector((state) => state.thana);

  const dispatch = useDispatch(); 

  // useEffect(() => {
  //   console.log(gender);
  //   dispatch(loadGender());
  //   dispatch(loadDistrict());
  // }, []);

  function set_district_id_change(event) {
    let districtID = event.target.value;
    const message = {
      district_id: districtID,
    };
    //dispatch(loadThana(message));
   // console.log(thana);
    //set_district_id(event.target.value);
  }
 
  const initialValues = {
    fullname: '',
    profession: '',
    birth_date: '',
    gender_id: '',
    district_id: '',
    thana_id: '',
    address: '',
    contact_number: '',
    email: '',
  };

  const validate = (values) => {

    let errors = {};
      if (!values.fullname.length >100 ) {
        errors.fullname = t("err_fullname");
      }
      if (!values.profession) {
        errors.profession = t("err_profession");
      }
      if (!values.birth_date) {
          errors.birth_date = t("err_birth_date");
      }

      if (!values.gender_id) {
      errors.gender_id = t("err_gender");
      }
      if (!values.district_id) {
      errors.district_id = t("err_district");;
      }
      if (!values.thana_id) {
      errors.thana_id = t("err_thana");;
      }
      if (!values.address) {
        errors.address = t("err_address");
      }
      if (!values.contact_number) {
          errors.contact_number = t("err_contact_no");
      }else if (!/(^(01){1}[3456789]{1}(\d){8})$/i.test(values.contact_number)) {
        errors.contact_number = t("err_contact_no_invalid");
      }
      if (!values.email) {
          errors.email =t("err_email");
      }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = t("err_email_invalid");
      }
    return errors;
  };

  const submitForm = (values, actions) => {
    console.log(values);
    //dispatch(setUserRegistration(values)); 
  }; 
  useEffect(() => { 
    user_registration.addUpdateloading == "succeeded"
    && setTimeout(()=>{dispatch(initURLoader())}, 5000)
  }, [ user_registration.addUpdateloading ]);

  return (
    <>
     {user_registration.addUpdateloading != "idle" &&
          (user_registration.addUpdateloading == "failed" || user_registration.addUpdateloading == "unauthorized"? (
            <Toast msg={user_registration.msg} color="error" />
          ) : (
            user_registration.addUpdateloading == "succeeded" ? (<Toast color="success" icon="task_alt" msg={user_registration.msg} />):(<></>)
          ))}
      <Container bottomBorder={"2px solid " + theme.colors.primaryBorder}>
        <Flex row>
          <Flex md={6} sm={12}>
            <div>
              <FormStyled>
                <div>
                  <Typography textAlign="left" fontSize="bodyTitleFontSize"> {t("reg_indv_title")}</Typography>
                  <Typography margin="10px 0 0 0" textAlign="left" fontSize="bodySubTitleFontSize">{t("reg_subtitle")}</Typography>

                  <Formik
                    initialValues={initialValues}
                    validate={validate}
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
                        setFieldValue
                      } = formik;
                     
                      return (
                        <div>

                          <form onSubmit={handleSubmit}>



                            <Input
                              type="text"
                              name="fullname"
                              placeholder={t("fullname")}
                              value={values.fullname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              color={errors.fullname && touched.fullname ? "error" : null}
                            />
                            {
                              errors.fullname && touched.fullname ? <Label>{errors.fullname}</Label> : null
                            }

                            <Input
                              type="text"
                              name="profession"
                              placeholder={t("profession")}
                              value={values.profession}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              color={errors.profession && touched.profession ? "error" : null}
                            />
                            {
                              errors.profession && touched.profession ? <Label>{errors.profession}</Label> : null
                            }

                            <Flatpickr
                              readOnly
                              options={{ 
                                dateFormat: "Y-m-d",
                               }}
                                value={values.birth_date}
                                onChange={(e,str) => { 
                                    setFieldValue('birth_date',str)
                                }}
                              render={({ defaultValue, value, ...props }, ref) => {
                                return (
                                  <Input
                                    {...props}
                                    type="text"
                                    name="birth_date"
                                    placeholder={t("birth_date")}
                                    value={values.birth_date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    color={errors.birth_date && touched.birth_date ? "error" : null}
                                    ref={ref}
                                  />
                                );
                              }}
                            />
                            {
                              errors.birth_date && touched.birth_date ? <Label>{errors.birth_date}</Label> : null
                            }

                            <Select
                              defaultValue={"DEFAULT"}
                              name="gender_id"
                              //value={values.gender_id}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              color={errors.gender_id && touched.gender_id ? "error" : null}
                            // onChange={set_gender_id_change}
                            >
                              <option disabled value={"DEFAULT"}>
                                {t("ph_gender")}
                              </option>
                              {
                                gender?.list?.map((d, i) => (
                                  <option key={i} value={d.gender_id}>{i18n.resolvedLanguage == "bn" ? d.gender_bn : d.gender_en}
                                  </option>
                                ))
                                // gender.list.map((d, i) => (
                                //   <option key={i} value={d.gender_id}>
                                //     {d.gender_en}
                                //   </option>
                                // ))
                              }
                            </Select>
                            {
                              errors.gender_id && touched.gender_id ? <Label>{errors.gender_id}</Label> : null
                            }

                            <Select
                              defaultValue={"DEFAULT"}
                              name="district_id"
                              // onChange={set_district_id_change}
                              // value={values.district_id}
                              onChange={(e) => {
                                set_district_id_change(e)
                                formik.handleChange(e);
                              }} 
                              onBlur={handleBlur}
                              color={errors.district_id && touched.district_id ? "error" : null}
                            >
                              <option disabled value={"DEFAULT"}>
                                {t("ph_district")}
                              </option>
                              {
                                district?.list?.map((d, i) => (
                                  <option key={i} value={d.district_id}>{i18n.resolvedLanguage == "bn" ? d.district_name_bn : d.district_name_en}
                                  </option>
                                )) 
                              }
                            </Select>
                            {
                              errors.district_id && touched.district_id ? <Label>{errors.district_id}</Label> : null
                            }

                            <Select
                              name="thana_id"
                              defaultValue={"DEFAULT"}
                              //value={values.thana_id}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              color={errors.thana_id && touched.thana_id ? "error" : null}
                            // onChange={set_thana_id_change}
                            >
                              <option disabled value={"DEFAULT"}>
                                {t("ph_thana")}
                              </option>
                              {
                                thana?.list?.map((d, i) => (
                                  <option key={i} value={d.thana_id}>{i18n.resolvedLanguage == "bn" ? d.thana_name_bn : d.thana_name_en}
                                  </option>
                                ))
                                
                              }
                            </Select>
                            {
                              errors.thana_id && touched.thana_id ? <Label>{errors.thana_id}</Label> : null
                            }


                            <Input
                              type="text"
                              name="address"
                              placeholder={t("address")}
                              value={values.address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              color={errors.address && touched.address ? "error" : null}
                            />
                            {
                              errors.address && touched.address ? <Label>{errors.address}</Label> : null
                            }

                            <Input
                              type="text"
                              name="contact_number"
                              placeholder={t("ph_contact_no")}
                              value={values.contact_number}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              color={errors.contact_number && touched.contact_number ? "error" : null}
                            />
                            {
                              errors.contact_number && touched.contact_number ? <Label>{errors.contact_number}</Label> : null
                            }

                            <Input
                              type="email"
                              name="email"
                              placeholder={t("email")}
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              color={errors.email && touched.email ? "error" : null}
                            />
                            {
                              errors.email && touched.email ? <Label>{errors.email}</Label> : null
                            } 
                         
                            <CustFlex row> 
                              <CustFlex md={6}>
                                <AlertButton  full  onClick={resetForm} type="reset">{t("reset")}</AlertButton>
                              </CustFlex>
                              <CustFlex md={6}>
                                <PrimaryButton  full  type="submit" 
                                className={!(dirty && isValid) ? "disabled-btn" : ""}
                                disabled={!(dirty && isValid)}>
                                  {t("submit")}
                                </PrimaryButton>
                              </CustFlex>
                            </CustFlex>
                            {user_registration.loading == "pending" ? <Loader /> : <></>}
                            <p>
                            <Typography fontSize="bodyContentFontSize">{t("signin_msg")} {" "}
                              <Link to="/login"> {t("login_title")}</Link></Typography>
                            </p>

                          </form>

                        </div>
                      );
                    }}
                  </Formik>



                  {user_registration.loading == "failed" && (
                    // <Collapse open={open}>
                    <Alert type="error">{user_registration.msg}</Alert>
                    // </Collapse>
                  )}
                </div>
              </FormStyled>
            </div>
          </Flex>
          <Flex md={6} sm={12}>
            <img
              style={{ paddingLeft: "50px", paddingRight: "50px" }}
              src={loginSvg}
              alt=""
              srcset=""
            />
          </Flex>
        </Flex>
      </Container>
    </>
  );
};
