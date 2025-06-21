import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/Button";
import { Flex } from "../components/style/Flex_styled";
import { Input } from "../components/style/Input_styled";
import { Loader } from "../components/style/Loader_styled";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useRef, useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLogin, initLoader } from "../features/user/user_slice";
import { Formik } from "formik";
import { ErrLabel, Label } from "../components/style/Label";
import { Typography } from "../components/style/Typography_styled";
import { Toast } from "../components/Toast";
import { Loading } from "../components/Loading";
import logo from "../assets/img/logo.png";
import styled from "styled-components";
import { getBNFont } from "../utils/helper";
const SpanLink = styled.div`
  display: inline-flex;
  justify-content: center;
  width: 100%;
  &> a{
    margin-top: 10px;
    margin-left: 5px;
    font-size: ${({ fontSize, theme  }) => getBNFont(theme.fontSize[fontSize ? fontSize:'bodyContentFontSize'])};
  }

`;

export const Login = () => {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const nevigate = useNavigate();
  const { t, i18n } = useTranslation();

  const initialValues = {
    username: '',
    password: ''
  };

  const validate = (values) => {

    let errors = {};
    if (!values.username) {
      errors.username = t("err_username");
    }
    if (!values.password) {
      errors.password = t("err_password");
    } else if ((values.password.length < 5)) {
      errors.password = t("err_password_length");
    }

    return errors;
  };

  const submitForm = (values) => {
    dispatch(getLogin(values));
  };

  useEffect(() => {
    i18n.changeLanguage("en");
    if (user.login) {
      if (user.user_type == "INV-CUST") {
        nevigate("/reg-type");
      } else if (user.user_type == "INVESTOR") {
        nevigate("/inv")
      } else if (user.user_type == "CUSTOMER") {
        nevigate("/cust")
      } else {
        nevigate("/app");
      }
    }
  }, [user]);

  useEffect(() => {
    if (user.loading == "pending") {
      setIsLoading(true);
    } else if (user.loading == "succeeded") {
      setIsLoading(false);
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (user.loading != "idle") {

      setTimeout(() => { dispatch(initLoader()); setIsLoading(false); formRef.current.setFieldValue("password", "") }, 5000);
    }
  }, [user.loading]);

  return (
    <>
      {(user.loading == "idle" || user.loading == "pending") ? <></> : (
        user.loading != "succeeded" && <Toast color="error" msg={user.msg} />
      )}
      <Suspense fallback={<Loader />}>
        <div style={{ display: "flex", alignItems: "center", height: "80vh", justifyContent: "center" }}>

          <Formik
            initialValues={initialValues}
            validate={validate}
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
                setFieldValue,
                resetForm
              } = formik;


              return (
                <div style={{ background: "#fff", position: "absolute", width: "400px", top: "10%", padding: "20px" }}>
                  <Flex row>
                    <Flex md="12">
                      <div className="applogo">
                        <Link to={"/"}>
                          <img src={logo} alt="LOGO" />
                        </Link>
                      </div> 
                    </Flex>

                    <Flex md="12">
                      <Typography textAlign="center" fontSize="bodyTitleFontSize" fontWeight="bold" >{("Login")}</Typography>
                    </Flex>

                    <Flex padding="20px 0 0 0 !important" md="12">
                      <form onSubmit={handleSubmit}>
                        <Label htmlFor="email">{('Username')}</Label>
                        <Input
                          app
                          type="text"
                          placeholder={('username')}
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          color={errors.username && touched.username ? "error" : null}
                        />
                        {
                          errors.username && touched.username ? <ErrLabel>{errors.username}</ErrLabel> : null
                        }
                        <Label margin="10px 0 0 0" htmlFor="password">{('Password')}</Label>
                        <Input
                          app
                          type="password"
                          name="password"
                          placeholder={('password')}
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          color={errors.password && touched.password ? "error" : null}
                        />
                        {
                          errors.password && touched.password ? <ErrLabel>{errors.password}</ErrLabel> : null
                        }
                        <section>
                          <div style={{ display: "flex", paddingBottom: "5px", justifyContent: "flex-start", alignItems: "center" }} >
                            <Input app type="checkbox" value="login" id="rememverMe" name="login" />
                            <Label margin="0" htmlFor="rememverMe">{('Remember me')}</Label>
                          </div>
                        </section>

                        <PrimaryButton
                          type="submit"
                          full
                          className={!(dirty && isValid) ? "disabled-btn" : ""}
                          disabled={!(dirty && isValid)}
                        >
                          {("Login")}
                        </PrimaryButton>
                        <SpanLink fontSize={"bodySubTitleFontSize"}><Link to="/reset">{("Forgot Password?")}</Link></SpanLink>
                         <SpanLink>
                        <Typography margin="10px 0" fontSize="bodyContentFontSize">{("Don’t have an account.")} {" "}
                          </Typography><Link to="/reg-app"> {("Join us today")}</Link>
                        </SpanLink>
                      </form>

                    </Flex>

                  </Flex>
                </div>
              );
            }}
          </Formik>


        </div>
      </Suspense>
      <Loading open={isLoading} />
    </>

  );
};
