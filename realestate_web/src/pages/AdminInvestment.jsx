import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { useState } from "react";
import { Loading } from "../components/Loading";
import { AdminInvGrid } from "../features/adminINV/AdminInvGrid";
import { adminRefresh, initRefresh, loadAdminInvInfo, loadNewAdminInv, initLoader, loadAdminInv } from "../features/adminINV/admin_inv_slice";
import { AdminInvModal } from "../features/adminINV/AdminInvModal";
import { Typography } from "../components/style/Typography_styled";
import { Input } from "../components/style/Input_styled";
import Flatpickr from "react-flatpickr";
import { DateTime } from "luxon";
import { CardHeaderButton } from "../components/style/Card_styled";
import { DownloadButton } from "../components/Button";
import { Formik } from "formik";
import { useLocation } from "react-router-dom";


export const AdminInvesment = () => {
  const adminInv = useSelector((state) => state.adminInv);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, set_disabled] = useState(false);
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const [project_data, set_project_data] = useState({
    start_date: DateTime.now().minus({ days: 1 }).toFormat('yyyy-MM-dd'),
    end_date: DateTime.now().toFormat('yyyy-MM-dd')
  })
  useEffect(() => {
    set_project_data({
      start_date: DateTime.now().minus({ days: 1 }).toFormat('yyyy-MM-dd'),
      end_date: DateTime.now().toFormat('yyyy-MM-dd')
    })
  }, []);

  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      dispatch(loadAdminInvInfo({ "project_id": 0 }))
    }

    dispatch(
      loadPage({
        title: ("View Investments"),
        button: isvalid,
        onClick: () => {
          if (isvalid) {
            dispatch(adminRefresh());
            dispatch(loadNewAdminInv())
            setOpen(true);
          }

        },
        buttonText: "New Investment",
        // buttonIcon: "add",
      })
    );
  }, [location]);
  useEffect(() => {
    if (adminInv.loading == "pending") {
      setIsLoading(true);
    } else if (adminInv.loading == "succeeded") {
      setIsLoading(false);
      setTimeout(() => { dispatch(initRefresh()); }, 4000);
    } else if (adminInv.loading != "idle") {
      setTimeout(() => { setIsLoading(false); dispatch(initRefresh()); }, 4000);
    }
  }, [adminInv.loading]);

  useEffect(() => {
    if (adminInv.addUpdateLoading == "pending") {
      setIsLoading(true);
    } else if (adminInv.addUpdateLoading == "succeeded") {
      setIsLoading(false);
      dispatch(loadAdminInvInfo({ "project_id": 0 }))
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (adminInv.addUpdateLoading != "idle") {
      setTimeout(() => { setIsLoading(false); dispatch(initLoader()); }, 5000);
    }
  }, [adminInv.addUpdateLoading]);

  const SubmitForm = (values) => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      dispatch(loadAdminInv(values));
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


  return adminInv.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
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
                  <Flex padding="0!important" md={2}>
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

                  <Flex padding="0 0 0 10px!important" md={2}>
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

                  <Flex padding="32px 0 0 0 !important" md={1}>
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
              </form>

            </div>
          );
        }}
      </Formik>


      <Flex row>
        <Flex padding="10px 0 0 0!important" md={12} sm={12} xs={12}>
          <AdminInvGrid />
        </Flex>
      </Flex>
      <AdminInvModal open={open} setOpen={setOpen} add />
      <Loading open={isLoading} />
    </>
  );
};
