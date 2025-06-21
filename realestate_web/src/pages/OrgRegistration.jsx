import { AlertButton, Button, PrimaryButton } from "../components/Button";
import { Center } from "../components/style/Center_styled";
import { Container } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled"; 
import loginSvg from "../assets/reg.jpg";
import { FormStyled } from "../components/style/From_style";
import { Input } from "../components/style/Input_styled";
import { Typography } from "../components/style/Typography_styled";
import { Select } from "../components/style/Select_styled";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setOrgRegistration } from "../features/registration/org_registration_slice";
import { Alert } from "../components/Alert";
import { Loader } from "../components/style/Loader_styled";
import { loadOrg } from "../features/orgType/orgType_slice";
import { loadDistrict } from "../features/district/district_slice";
import { loadThana } from "../features/thana/thana_slice";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Label } from "../components/style/Label";
import { Formik } from "formik";
import { Toast } from "../components/Toast";
import { theme } from "../styles/theme";

const Span = styled.span`
  font-size:12px;
`;
const CustFlex = styled(Flex)` 
  padding: 2px 8px;
  margin:0;
  display: flex; 
`;

export const OrgRegistration = () => { 
 
  const [contact_no_check_enable, set_contact_no_check_enable] = useState(false);
  const [email_check_enable, set_email_check_enable] = useState(false);
  const [email_as_username, set_email_as_username] = useState(false);
  const [contact_no_as_username, set_contact_no_as_username] = useState(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const org_registration = useSelector((state) => state.org_registration);
  const orgType = useSelector((state) => state.orgType);
  const district = useSelector((state) => state.district);
  const thana = useSelector((state) => state.thana);

  useEffect(() => {  
    set_contact_no_check_enable(false);
    set_email_check_enable(false);
    //dispatch(loadOrg());
    //dispatch(loadDistrict());
  }, []); 

  function set_district_id_change(event) {
    let districtID = event.target.value;
    const message = {
      district_id: districtID,
    };
  //  dispatch(loadThana(message));  
  }


  const initialValues = {
    email:'',
    username:'',
    password:'',
    contact_number:'',
    org_name:'',
    org_type_id:'',
    contact_personname:'',
    designation:'',
    default_lang:'',
    district_id:'',
    thana_id:'',
    address:'',
    allow_api:0,
    allow_rss_feed:0,
  };

  const validate = (values) => {

    let errors = {};
    if (!values.email) {
      errors.email = t("err_email");
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = t("err_email_invalid");
    }
    
    if (!values.username) {
      errors.username = t("err_username");
    }
    if (values.username.length < 10) {
      errors.username = t("err_username_length");
    }
    if (!values.contact_number) {
      errors.contact_number = t("err_contact_no");
    } else if (!/(^(01){1}[3456789]{1}(\d){8})$/i.test(values.contact_number)) {
      errors.contact_number = t("err_contact_no_invalid");
    }
    if (!values.password) {
      errors.password = t("err_password");
    }
    if (!values.org_name) {
      errors.org_name = t("err_org_name");
    }
    if (!values.org_type_id) {
      errors.org_type_id = t("err_org_type");
    }
    if (!values.contact_personname) {
      errors.contact_personname = t("err_contact_person");
    }
    if (!values.district_id) {
      errors.district_id = t("err_district");
    }
    if (!values.thana_id) {
      errors.thana_id = t("err_thana");
    }
    return errors;
  };

  function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    } else if ( key < 48 || key > 57 ) {
        return false;
    } else {
        return true;
    }
};

  const submitForm = (values, actions) => { 
  //  dispatch(setOrgRegistration(values));
    org_registration.loading == "succeeded" ? actions.resetForm():"";
  };


  return (
    <>
    {org_registration.loading != "idle" &&
          (org_registration.loading == "failed" ? (
            <Toast msg={org_registration.msg} color="error" />
          ) : (
            org_registration.loading == "succeeded" ? (<Toast color="success" icon="task_alt" msg={org_registration.msg} />):(<></>)
          ))}
      <Container bottomBorder={"2px solid " + theme.colors.primaryBorder}>
        <Flex row>
          <Flex md={6} sm={12}>
            <div>
              <FormStyled>
                <div>
                  <Typography textAlign="left" fontSize="bodyTitleFontSize">{t("reg_org_title")}</Typography>
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
                          setFieldValue,
                          resetForm
                        } = formik;

                        return (
                          <div>
                            <form onSubmit={handleSubmit}>
                              <Input
                                type="email"
                                name="email"
                                placeholder={t("email")}
                                value={values.email}
                                onChange={(e) => {
                                  set_email_check_enable(e.target.value.length>9)
                                  formik.handleChange(e);
                                }}
                                onBlur={handleBlur}
                              />
                              {
                                errors.email && touched.email ? <Label>{errors.email}</Label> : null
                              }
                              <Label htmlFor="email_as_username" color="font">
                                <Input
                                  type="checkbox"
                                  display="inline-block"
                                  name="email_as_username"
                                  disabled={!email_check_enable?"disabled":""}
                                  id="email_as_username"
                                  checked={email_as_username}
                                  onChange={(e) => { 
                                    e.target.checked?
                                    (
                                      setFieldValue('username', values.email),
                                      set_email_as_username(e.target.checked),
                                      set_contact_no_as_username(!e.target.checked)
                                      ):set_email_as_username(e.target.checked);
                                         
                                    formik.handleChange();
                                  }} 
                                />
                                <Label color="font">{t("chck_email_username")}</Label>
                              </Label>

                              <Input
                                type="text"
                                name="contact_number"
                                placeholder={t("ph_contact_no")}
                                value={values.contact_number}
                                onChange={(e) => {
                                  set_contact_no_check_enable(e.target.value.length>10)
                                  formik.handleChange(e);
                                }} 
                                onBlur={handleBlur}
                              /> 
                              {
                                errors.contact_number && touched.contact_number ? <Label>{errors.contact_number}</Label> : null
                              }
                              <Label htmlFor="contact_no_as_username" color="#000000">
                                <Input
                                  type="checkbox"
                                  name="contact_no_as_username"
                                  id="contact_no_as_username"
                                  display="inline-block"
                                  disabled={!contact_no_check_enable?"disabled":""}
                                  checked={contact_no_as_username}
                                  onChange={(e) => {  
                                    console.log(e.target.checked)
                                    e.target.checked?
                                    (
                                      set_contact_no_as_username(e.target.checked),
                                      set_email_as_username(!e.target.checked),
                                      setFieldValue('username', values.contact_number),
                                      console.log(values.username)
                                      ):set_contact_no_as_username(e.target.checked);  
                                  }}/>
                                <Label color="font">{t("chck_no_username")}</Label>
                              </Label>
                              <Input
                                type="text"
                                name="username"
                                disabled={(contact_no_as_username || email_as_username) ? "disabled" : ""}
                                placeholder={t("username")}
                                value={contact_no_as_username?values.contact_number:email_as_username?values.email:values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {
                                errors.username && touched.username ? <Label>{errors.username}</Label> : null
                              }
                              <Input
                                type="password"
                                name="password"
                                placeholder={t("password")}
                                value={values.password} 
                                onChange={handleChange} 
                                onBlur={handleBlur}
                                />
                                {
                                  errors.password && touched.password ? <Label>{errors.password}</Label> : null
                                }
                          
                              <Input
                                type="text"
                                name="org_name"
                                placeholder={t("org_name")}
                                value={values.org_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                                {
                                  errors.org_name && touched.org_name ? <Label>{errors.org_name}</Label> : null
                                }

                              <Select
                                defaultValue={"DEFAULT"}
                                name="org_type_id"
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option disabled value="DEFAULT">
                                  {t("ph_org_type")}
                                </option>
                                {orgType?.list.map((d, i) => (
                                  <option value={d.org_type_id} key={i}> 
                                    {i18n.resolvedLanguage == "bn" ? d.org_type_bn : d.org_type_en}
                                  </option>
                                ))}
                              </Select>
                              {
                                  errors.org_type_id && touched.org_type_id ? <Label>{errors.org_type_id}</Label> : null
                                }

                              <Input
                                type="text"
                                name="contact_personname"
                                placeholder={t("org_contact_person")}
                                value={values.contact_personname}
                                onChange={handleChange} 
                                onBlur={handleBlur}
                                />
                                {
                                  errors.contact_personname && touched.contact_personname ? <Label>{errors.contact_personname}</Label> : null
                                }

                              <Input
                                type="text"
                                name="designation"
                                placeholder={t("designation")}
                                value={values.designation}
                                onChange={handleChange} 
                              />

                              <Select
                                defaultValue={"DEFAULT"}
                                name="default_lang"
                                onChange={handleChange} 
                              >
                                <option disabled value="DEFAULT">
                                  {t("ph_default_lang")}
                                </option>
                                <option value="bn">বাংলা</option>
                                <option value="en">English</option>
                              </Select>

                              <Select
                                defaultValue={"DEFAULT"}
                                name="district_id"
                                onChange={(e) => {
                                  set_district_id_change(e)
                                  formik.handleChange(e);
                                }}
                                onBlur={handleBlur}
                              >
                                <option disabled value="DEFAULT">
                                  {t("ph_district")}
                                </option>
                                {district?.list.map((d, i) => (
                                  <option value={d.district_id} key={i}>
                                    {i18n.resolvedLanguage == "bn" ? d.district_name_bn : d.district_name_en}
                                  </option>
                                ))}
                              </Select>
                              {
                                  errors.district_id && touched.district_id ? <Label>{errors.district_id}</Label> : null
                                }

                              <Select
                                defaultValue={"DEFAULT"}
                                name="thana_id"
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option disabled value="DEFAULT">
                                  {t("ph_thana")}
                                </option>
                                {thana?.list.map((d, i) => (
                                  <option value={d.thana_id} key={i}> 
                                    {i18n.resolvedLanguage == "bn" ? d.thana_name_bn : d.thana_name_en}
                                  </option>
                                ))}

                                {/* {thanaList?.list.map((d,i)=> <option value={d.org_type_id} key={i}>{d.org_type_en}</option>)} */}
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
                                onBlur={handleBlur}/>

                              
                                <Flex row>
                                  <Flex padding="0 !important" md={6}>
                                     <Flex row>
                                      <Flex padding="0 !important" md={1}>
                                      <Input
                                        type="checkbox"
                                        name="allow_api"
                                        id="allow_api"
                                        checked={values.allow_api}
                                        onChange={(e) => { 
                                          setFieldValue('allow_api', +e.target.checked)
                                        }}
                                      />
                                      </Flex>
                                      <Flex padding ="10px 10px 0 10px !important" md={11}>
                                      <Label color="font" htmlFor="allow_api">
                                        {t("allow_api")}
                                      </Label>
                                      </Flex>
                                     </Flex>
                                  </Flex>
                                  <Flex padding="0 !important" md={6}>
                                    <Flex row>
                                      <Flex padding="0 !important" md={1}>
                                      <Input
                                        type="checkbox"
                                        name="allow_rss_feed"
                                        id="allow_rss_feed"
                                        checked={values.allow_rss_feed}
                                        onChange={(e) => { 
                                          setFieldValue('allow_rss_feed', +e.target.checked)
                                        }}
                                      />
                                      </Flex>
                                      <Flex padding ="10px 10px 0 10px !important" md={11}>
                                      <Label color="font" htmlFor="allow_rss_feed">
                                        {t("allow_rss_feed")}
                                      </Label>
                                      </Flex>
                                    </Flex>
                                  </Flex>
                                </Flex>
                                <Flex row> 
                                  <Flex padding="0 5px 0 0 !important" md={6}>
                                    <AlertButton 
                                      full 
                                      type="reset"
                                      onClick={(e) => {
                                        resetForm(e);
                                        set_contact_no_check_enable(false);
                                        set_email_check_enable(false);
                                      }}>
                                      {t("reset")}
                                    </AlertButton>
                                  </Flex>
                                  <Flex padding="0 0 0 5px !important" md={6}>
                                    <PrimaryButton  
                                      full 
                                      type="submit"
                                      className={!(dirty && isValid) ? "disabled-btn" : ""}
                                      disabled={!(dirty && isValid)}>
                                      {t("submit")}
                                      </PrimaryButton>
                                  </Flex>
                                </Flex> 
                              
                              {org_registration.loading == "pending" ? <Loader /> : <></>}
                              <Typography textAlign="center">
                                {t("signin_msg")} {" "}
                                <Link to="/login"> {t("login_title")} </Link>
                              </Typography>
                            </form>
                          </div>
                        );

                      }}
                  </Formik>
                  
                  
                </div>
              </FormStyled>
            </div>
          </Flex>
          <Flex md={6} sm={12}>
            <img
              style={{ paddingLeft: "50px", paddingRight: "50px" }}
              src={loginSvg}
              alt=""
              srcSet=""
            />
          </Flex>
        </Flex>
      </Container>
    </>
  );
};
