

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import { Typography } from "../components/style/Typography_styled";
import { SellGrid } from "../features/adminTransaction/SellGrid";
import { ProfitDistributionGrid } from "../features/adminTransaction/ProfitDistributionGrid";
import { InvReleaseGrid } from "../features/adminTransaction/InvReleaseGrid";
import { TranInvestmentGrid } from "../features/adminTransaction/tranInvestmentGrid";
import { Label } from "../components/style/Label";
import { useRef } from "react";
import { Select } from "../components/style/Select_styled";
import { Input } from "../components/style/Input_styled";
import { Formik } from "formik";
import { useState } from "react";
import { loadSummaryConfig, submitTransaction } from "../features/adminTransaction/admin_transaction_slice";
import { DownloadButton } from "../components/Button";
import { Loading } from "../components/Loading";

export const TransactionSummary = () => {
  const dispatch = useDispatch();
  const tranctionsummary = useSelector((state) => state.tranctionsummary);
  const dropDownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [project_data, set_project_data] = useState({
    user_id: "",
    project_id: "",
    project_name: "",
    type_id: "",
    location: "",
    total_size: "",
    start_date: "",
    complete_date: "",
  })

  useEffect(() => {
    setIsLoading(true);
    dispatch(loadSummaryConfig())
    dispatch(loadPage({ title: "Transaction Summary", button: false }));
  }, []);
  function submitExternal(e) {
    e.preventDefault();
    setOpen(true);
    let data = {
        project_id: dropDownRef.current.value,
    };
    setIsLoading(true);
    dispatch(submitTransaction(data));
}

useEffect(() => {
  tranctionsummary.loading != "pending" &&  setTimeout(() =>  setIsLoading(false), 2000);
}, [tranctionsummary.loading]);

  return (<>
    <Formik
      initialValues={project_data}
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
                <Flex padding="0 !important" md={6} sm={4} xs={8}>
                  <Flex row>
                    <Flex padding="0 !important" md={3} sm={3} xs={8}>
                      <Label color="font">Select project</Label>
                    </Flex>
                    <Flex padding="0 0 0 10px !important" md={7} sm={4} xs={8}>
                      <Select
                        app
                        ref={dropDownRef}
                      >
                        <option disabled> {("select inv progress")}</option>
                        {tranctionsummary.list?.map((d, i) => (
                          <option key={i} value={d.project_id}>
                            {d.project_name}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                    <Flex padding="0 10px 0 0" md={2} sm={8} xs={4}>
                        <DownloadButton margin="4px" onClick={submitExternal} >{("Submit")}</DownloadButton>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex md={5}>

                <Flex row>
                  <Flex padding="10px 0 0 0 !important" md={4}>
                    <Label color="cardfont">{("Project name")} </Label>
                  </Flex>
                  <Flex padding="10px 0 0 0 !important" md={8}>
                    <Input
                      app
                      type="text"
                      name="project_name"
                      value={values.project_name || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                    />
                    {/* {
                                                    errors.payment_method && touched.payment_method ? <Label>{errors.payment_method}</Label> : null
                                                } */}

                  </Flex>
                </Flex>
                <Flex row>
                  <Flex padding="0 !important" md={4}>
                    <Label color="font">Project type</Label>
                  </Flex>
                  <Flex padding="0 !important" md={8}>
                    <Input
                      type="text"
                      name="project_type"
                      placeholder={("type project-type")}
                      value={values.project_type || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                    />

                  </Flex>

                </Flex>
                <Flex row>
                  <Flex padding="0 !important" md={4}>
                    <Label color="font">Location</Label>
                  </Flex>
                  <Flex padding="0 !important" md={8}>
                    <Input
                      type="text"
                      name="location"
                      placeholder={("type location")}
                      value={values.location || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                    />

                  </Flex>

                </Flex>
                <Flex row>
                  <Flex padding="0 !important" md={4}>
                    <Label color="font">Start Date</Label>
                  </Flex>
                  <Flex padding="0 !important" md={8}>
                    <Input
                      type="text"
                      name="location"
                      placeholder={("type location")}
                      value={values.location || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                    />

                  </Flex>

                </Flex>
                <Flex row>
                  <Flex padding="0 !important" md={4}>
                    <Label color="font">Complete Date</Label>
                  </Flex>
                  <Flex padding="0 !important" md={8}>
                    <Input
                      type="text"
                      name="location"
                      placeholder={("type location")}
                      value={values.location || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                    />

                  </Flex>

                </Flex>
                <Flex row>
                  <Flex padding="0 !important" md={4}>
                    <Label color="font">Status</Label>
                  </Flex>
                  <Flex padding="0 !important" md={8}>
                    <Input
                      type="text"
                      name="status"
                      placeholder={("type location")}
                      value={values.status || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                    />

                  </Flex>

                </Flex>
              </Flex>

            </form>

          </div>
        );
      }}
    </Formik>

    <Flex row>
      <Flex padding="0 10px 20px 0 !important" md={6} >
        <Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
          Investment
        </Typography><br />
        <TranInvestmentGrid />
      </Flex>
      <Flex padding="0 0 20px 10px !important" md={6} >
        <Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
          Sell
        </Typography><br />
        <SellGrid />
      </Flex>
    </Flex>
    <Flex row>
      <Flex padding="20px 10px 20px 0 !important" md={6} >
        <Flex row>
          <Flex padding="0!important" md={3}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
              {"Total Expenses"}
            </Typography>

          </Flex>
          <Flex padding="0!important" md={1}>
            :
          </Flex>
          <Flex padding="0!important" md={8}>
            <Typography textAlign="left" fontSize="bodyContentFontSize" >
              { }
            </Typography>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
    <Flex row>
      <Flex padding="0 10px 20px 0 !important" md={6} >
        <Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
          Profit Distribution
        </Typography><br />
        <ProfitDistributionGrid />
      </Flex>
      <Flex padding="0 0 20px 10px !important" md={6} >
        <Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
          Investment Release
        </Typography><br />
        <InvReleaseGrid />
      </Flex>
    </Flex>
    <Loading open={isLoading}/>
  </>
  );
};
