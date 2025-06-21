

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import { WalletGrid } from "../features/adminWallet/WalletGrid";
import { Loading } from "../components/Loading";
import { WalletModal } from "../features/adminWallet/WalletModal";
import { loadAdminWalletInfo, initLoader, loadAdminWallet } from "../features/adminWallet/wallet_slice";
import { Typography } from "../components/style/Typography_styled";
import Flatpickr from "react-flatpickr";
import { DownloadButton } from "../components/Button";
import { Input } from "../components/style/Input_styled";
import { Formik } from "formik";
import { DateTime } from "luxon";
import { CardHeaderButton } from "../components/style/Card_styled";
import { useLocation } from "react-router-dom";


export const WalletPage = () => {
  const adminWallet = useSelector((state) => state.adminWallet);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dropDownInputRef = useRef(null);
  const dropDownRef = useRef(null);
  const [get_value, set_value] = useState("payment_id");
  const [search_value_err, set_search_value_err] = useState(null);
  const [disabled, set_disabled] = useState(false);
  const [project_data, set_project_data] = useState({
    start_date: DateTime.now().minus({ days: 1 }).toFormat('yyyy-MM-dd'),
    end_date: DateTime.now().toFormat('yyyy-MM-dd')
  });
  const user = useSelector((state) => state.user);
  const location = useLocation();
  useEffect(() => {
    set_project_data({
      start_date: DateTime.now().minus({ days: 1 }).toFormat('yyyy-MM-dd'),
      end_date: DateTime.now().toFormat('yyyy-MM-dd')
    })
  }, []);

  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      dispatch(loadAdminWalletInfo())
    }

    dispatch(
      loadPage({
        title: ("View Wallet"),
        button: isvalid,
        onClick: () => {
          if (isvalid) {
            setOpen(true);
          }

        },
        buttonText: "Add Money",
        // buttonIcon: "add",
      })
    );
  }, [location]);

  useEffect(() => {
    adminWallet.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [adminWallet.loading]);

  useEffect(() => {
    if (adminWallet.addUpdateLoading == "pending") {
      setIsLoading(true);
    } else if (adminWallet.addUpdateLoading == "succeeded") {
      setIsLoading(false);
      dispatch(loadAdminWalletInfo({ "payment_id": 0 }))
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (adminWallet.addUpdateLoading != "idle") {
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false) }, 5000);
    }
  }, [adminWallet.addUpdateLoading]);


  const SubmitForm = (values) => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      dispatch(loadAdminWallet(values));
      set_disabled(true);
    }
  };

  const validate = (Values) => {
    let errors = {};

    if (!Values.start_date) {
      errors.start_date = ("Select start date");
    }
    if (!Values.end_date) {
      errors.end_date = ("Select end date");
    }
    return errors;
  };


  return (
    <>

      <Formik
        initialValues={project_data}
        validate={validate}
        enableReinitialize
        onSubmit={SubmitForm}
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
                  <Flex md={6} padding="0!important">
                    <Flex row>
                      <Flex padding="0!important" md={4}>
                        <Typography margin="0 0 10px 0" fontWeight="bold" textAlign="left" >Start Date</Typography>
                        <Flatpickr
                          readOnly
                          options={{
                            dateFormat: "Y-m-d",
                            defaultDate: DateTime.now().minus({days:1}).toFormat("yyyy-MM-dd"),
                            maxDate: DateTime.fromFormat(
                              values.end_date ||
                              DateTime.now().toFormat("yyyy-MM-dd"),
                              "yyyy-MM-dd"
                            ).toFormat("yyyy-MM-dd"),
                          }}
                          name="start_date"
                          onBlur={handleBlur}
                          value={values.start_date || ""}
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
                                value={values.start_date || ""}
                                ref={ref}
                              />
                            );
                          }}
                        />
                      </Flex>
                      <Flex padding="0 0 0 10px!important" md={4}>
                        <Typography margin="0 0 10px 0" fontWeight="bold" textAlign="left" >End Date</Typography>
                        <Flatpickr
                          readOnly
                          options={{
                            dateFormat: "Y-m-d",
                            defaultDate: DateTime.now().toFormat("yyyy-MM-dd"),
                            minDate: DateTime.fromFormat(
                              values.start_date ||
                              DateTime.now().toFormat("yyyy-MM-dd"),
                              "yyyy-MM-dd"
                            ).toFormat("yyyy-MM-dd"),
                          }}
                          name="end_date"
                          onBlur={handleBlur}
                          value={values.end_date || ""}

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
                                value={values.end_date || ""}
                                ref={ref}
                              />
                            );
                          }}
                        />
                      </Flex>

                      <Flex padding="32px 0 0 0!important" md={2}>
                        <CardHeaderButton>
                          <DownloadButton
                            type="submit"
                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                            disabled={!(dirty && isValid) || disabled}
                          >
                            {("Submit")}
                          </DownloadButton>
                        </CardHeaderButton>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex md={6} padding=" 15px 10px 0 0!important">
                    <Typography margin="10px 0 0 0" fontSize="bodyTitleFontSize" fontWeight="bold" textAlign="right" >{"Wallet"}{" "} {":"}{" "} {adminWallet?.walletAmount || "0"}{" "} {" "}{"Tk"} </Typography>

                  </Flex>

                </Flex>

              </form>

            </div>
          );
        }}
      </Formik>
      <Flex row>
        <Flex padding="10px 0 0 0!important" md={12} sm={12} xs={12}>
          <WalletGrid />
        </Flex>
      </Flex>
      <WalletModal open={open} setOpen={setOpen} data={{}} add />
      <Loading open={isLoading} />
    </>
  );
};
