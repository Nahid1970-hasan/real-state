

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import { Label } from "../components/style/Label";
import { Select } from "../components/style/Select_styled";
import { Button, DownloadButton } from "../components/Button";
import { Loader } from "react-feather";
import { Suspense } from "react";
import { Loading } from "../components/Loading";
import { initProgresslist, loadProjectNameList, loadSubProjectProgressData } from "../features/custViewProjectProgress/cust_project_progress_slice";
import { useState } from "react";
import { CardBody, InfoCard } from "../components/style/Card_styled";
import DataGrid from "../components/DataGrid";
import { Typography } from "../components/style/Typography_styled";
import { SubItemData } from "../features/progress/SubItemData";
import { useLocation } from "react-router-dom";
import { EmptyBox } from "../components/EmptyBox";
import styled from "styled-components";

const ScrollDiv = styled.div`
    height: 60vh;
    overflow: hidden scroll;
`;

const CustFlex = styled(Flex)`
  padding: 0 10px 0 0;
`;

const CustDiv = styled.div`
  display: flex;
  margin-top: 0.15rem;
  justify-content:${({ end }) => (end ? 'flex-end' : 'flex-start')}; 
  & button:first-child {
      margin: 0 0 2px 0;
    }
  
`;
export const CustProjectProgressPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(state => state.user);
  const projectProgressData = useSelector(state => state.custProjectProgressData);
  const [sub_project_id, set_sub_project_id] = useState("");

  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      dispatch(initProgresslist());
      dispatch(loadProjectNameList());
    }
    dispatch(loadPage({ title: "Project Progress", button: false }));
  }, [location]);


  useEffect(() => {
    projectProgressData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [projectProgressData.loading]);

  useEffect(() => {
    projectProgressData.detailLoading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [projectProgressData.detailLoading]);

  const colums = [
    {
      headerName: "SL#",
      field: "sub_id",
      key: true,
      type: "number",
      sortable: false,
      width: "40px"
    },
    {
      headerName: "Work Details",
      field: "works_detail",
      description: "Work Details",
      type: "custinput",
      inputwidth: "300px",
      width: "300px"
    },
    {
      headerName: "% of works",
      field: "work_percent",
      description: "Work Percentage",
      type: "custinput",
      inputwidth: "80px",
      width: "90px"
    },
    {
      headerName: "Completed Date",
      field: "complete_date",
      description: "Completed Date",
      type: "custinput",
      inputwidth: "120px",
      width: "150px"
    },

  ];

  function handleSubmitChange(e) {
    e.preventDefault();
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      setIsLoading(true);
      let data = {
        project_id: sub_project_id,
      };
      dispatch(loadSubProjectProgressData(data));
    }
  }

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Flex row>
          <CustFlex md={1.2} sm={6} xs={12}>
            <Label color="font">Select Project</Label>
          </CustFlex>
          <CustFlex md={3} sm={6} xs={12}>

            <Select app onChange={(d) => set_sub_project_id(d.target.value)} value={sub_project_id || ""}>
              <option disabled value={""}> {("-- select value")}</option>
              {
                projectProgressData?.projectList?.map((d, i) => (<option key={i} value={d.project_id}> {d.project_name}</option>))
              }
            </Select>
          </CustFlex>
          <CustFlex md={3} sm={12} xs={12}>
            <CustDiv>
              <Button
                type="submit"
                disabled={!sub_project_id} onClick={handleSubmitChange}>
                {("Submit")}
              </Button>
            </CustDiv>
          </CustFlex>
          <Flex row>
            {projectProgressData?.list?.length ?
              <Flex row><Flex md={12} padding="10px 0 0 0 !important">
                <ScrollDiv>
                  {projectProgressData?.list?.map((item, i) => (
                    <SubItemData key={i} item={item} serial={i} />
                  ))}
                </ScrollDiv> </Flex></Flex> : <Flex row><Flex md={12} padding="0 !important"><Typography fontSize="bodyContentFontSize" >
                  {projectProgressData.detailLoading == "pending" ? <EmptyBox msg="-----" height="50px" /> : <EmptyBox msg="There is not data to show" />}
                </Typography></Flex></Flex>}
          </Flex>

        </Flex>
      </Suspense>
      <Loading open={isLoading} />
    </>
  );
};
