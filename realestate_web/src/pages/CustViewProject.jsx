

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import { initLoader, initSubLoader, initiateDetails, loadProject, loadProjectInt, loadProjectTypeList, loadSubProjectNamelist } from "../features/custViewProject/cust_view_project_slice";
import { Loading } from "../components/Loading";
import { useState } from "react";
import { CardBody } from "../components/style/Card_styled";
import { Suspense } from "react";
import DataGrid from "../components/DataGrid";
import { Loader } from "react-feather";
import styled from "styled-components";
import { Select } from "../components/style/Select_styled";
import { ErrLabel, Label } from "../components/style/Label";
import { Input } from "../components/style/Input_styled";
import { DownloadButton } from "../components/Button";
import { Typography } from "../components/style/Typography_styled";
import { CustSubProjectModal } from "../features/custViewProject/CustSubProjectModal";
import { useLocation } from "react-router-dom";

const CustFlex = styled(Flex)`
  padding: 0 !important;
  margin-right:10px;
`;

const CustDiv = styled.div`
  display: flex;
  justify-content:${({ end }) => (end ? 'flex-end' : 'flex-start')}; 
  margin-top: 30px;
  & button:first-child {
      margin: 0 0 2px 0;
    }
  
`;

export const CustViewProjectPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const custProjectData = useSelector((state) => state.custProjectData);
  const [isLoading, setIsLoading] = useState(false);
  const dropDownInputRef = useRef(null);
  const dropDownRef = useRef(null);
  const [get_value, set_value] = useState("project_name");
  const [search_value_err, set_search_value_err] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
 

  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      dispatch(loadProjectInt());
      dispatch(loadProjectTypeList());
    } 
    dispatch(loadPage({ title: "Projects", button: false }));
  }, [location]);


  useEffect(() => {
    custProjectData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [custProjectData.loading]);

  useEffect(() => {
    if (custProjectData.subProjectLoading == "pending") {
      setIsLoading(true);
    } else if (custProjectData.subProjectLoading == "succeeded") {
      setIsLoading(false);
      setTimeout(() => { dispatch(initSubLoader()); }, 5000);
    } else if (custProjectData.subProjectLoading != "idle") {
      setIsLoading(false);
      setTimeout(() => { dispatch(initSubLoader()); }, 5000);
    }
  }, [custProjectData.subProjectLoading]);

  useEffect(() => {
    if (custProjectData.addUpdateLoading == "pending") {
      setIsLoading(true);
    } else if (custProjectData.addUpdateLoading == "succeeded") {
      setIsLoading(false);
      dispatch(loadProjectInt());
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (custProjectData.addUpdateLoading != "idle") {
      setIsLoading(false);
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    }
  }, [custProjectData.addUpdateLoading]);

  const colums = [
    {
      headerName: "ID",
      field: "project_id",
      key: true,
      type: "number",
      hide: true,
      sortable: false,
    },
    {
      headerName: "Project Name",
      field: "project_name",
      description: "Project Name",
      sortable: true,
      filterable: true,
      type: "string",
      width:"250px"
    },

    {
      headerName: "Type",
      field: "type_name",
      description: "Type Name",
      width: "230px"
    },

    {
      headerName: "Location",
      field: "popular_loc",
      description: "Popular Location",
      width: "120px"
    },

    {
      headerName: "Share#",
      field: "no_share",
      description: "No of Share",
      width: "90px",
      type: "number"
    }, {
      headerName: "Est. Cost",
      field: "est_cost",
      description: "Estimated Cost",
      width: "130px",
      type: "currency"
    }, , {
      headerName: "Unit Price",
      field: "unit_price",
      description: "Unit Price",
      width: "130px",
      type: "currency"
    },
    {
      headerName: "Status",
      field: "status",
      type: "state",
      description: "Status",
      width: "120px"
    },

    {
      headerName: "action",
      field: "",
      type: "action",
      icons: ["preview"],
      colors: ["preview"],
      descriptions: ["Details View"],
      callBacks: [
        (project_id) => {
          dispatch(initiateDetails());
          dispatch(loadSubProjectNamelist({ project_id }));
          setViewOpen(true);
        },

      ],
    },
  ];

  let rows = custProjectData.list.map((d) => ({
    ...d,
    status: {
      label: d.status,
      color: d.status == "Approved" ? "success" : "error",
    }
  }));

  const searchType = [
    { key: "project_name", value: "Project Name", },
    { key: "address", value: "Address" },
    { key: "popular_loc", value: "Popular Location" },
    { key: "type_id", value: "Project Type" },
    { key: "status", value: "Status" }
  ];


  const handleSubmit = (e) => {
    e.preventDefault();
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      set_search_value_err(null);
      let searchVal = dropDownInputRef.current.value;
      if (searchVal) {
        let data = {
          search_by: dropDownRef.current.value,
          search_value: dropDownInputRef.current.value
        };
        dispatch(loadProject(data));
        set_search_value_err(null);
      } else {
        set_search_value_err("This field is required.");
      }
    }else{
      set_search_value_err("Sorry! You are not authorized user to view this page.");
    }
    
  };
  const handleChangeOption = (values) => {
    let searchID = dropDownRef.current.value;
    set_value(searchID)
  };

  const handleChangeValue = () => {
    let searchVal = dropDownInputRef.current.value;
    searchVal ? set_search_value_err(null) : set_search_value_err("This field is required.");
  };

  return (
    <>
      {(custProjectData.subProjectLoading == "idle" || custProjectData.subProjectLoading == "pending") ? <></> : (
        custProjectData.subProjectLoading != "succeeded" && (
          <Toast color="error" msg={custProjectData.msg} />
        )
      )}
      <Suspense fallback={<Loader />}>
        <Flex row>
          <CustFlex md={12}>
            <form>
              <Flex row>
                <Flex padding="0 10px 0 0 !important" md={2} sm={6} xs={12}>
                  <Typography margin="0 0 10px 0" fontWeight="bold" textAlign="left" > {("Search Type")}</Typography>
                  <Select
                    app
                    ref={dropDownRef}
                    name="search_by"
                    onChange={handleChangeOption}>
                    <option disabled> {("select value")}</option>
                    {
                      searchType?.map((d, i) => (<option key={i} value={d.key}>{d.value}</option>))
                    }
                  </Select>

                </Flex>
                <Flex padding="0 10px 0 0 !important" md={3} sm={6} xs={12}>
                  <Typography margin="0 0 10px 0" fontWeight="bold" textAlign="left" > {("Search Value")} </Typography>

                  {
                    (get_value === 'project_name' ||
                      get_value === 'address' ||
                      get_value === 'popular_loc') &&
                    <Input
                      app
                      ref={dropDownInputRef}
                      type="text"
                      name="search_value"
                      onChange={handleChangeValue}
                      placeholder={("search value")}
                    />
                  }
                  {
                    get_value === 'type_id' &&
                    <Select
                      app
                      ref={dropDownInputRef}
                      onChange={handleChangeValue}
                      defaultValue={""}
                      name="search_value">
                      <option disabled value={""}>  {("--select value")}</option>
                      {
                        custProjectData?.typeList?.map((d, i) => (
                          <option key={i} value={d.type_id}>{d.type_name}
                          </option>
                        ))
                      }
                    </Select>
                  }
                  {
                    get_value === 'status' &&
                    <Select
                      app
                      ref={dropDownInputRef}
                      onChange={handleChangeValue}
                      defaultValue={""}
                      name="search_value">
                      <option disabled value={""}> {("--select status")} </option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Upcoming">Upcoming</option>
                
                    </Select>
                  }
                  {search_value_err ? (
                    <ErrLabel margin="5px 0 0 0 ">{search_value_err}</ErrLabel>
                  ) : null}


                </Flex>
                <Flex padding="0 10px 0 0 !important" md={2} sm={12} xs={12}>
                  <CustDiv>
                    <DownloadButton
                      app
                      margin="12px"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      {("Submit")}
                    </DownloadButton>
                  </CustDiv>
                </Flex>

              </Flex>

            </form>
          </CustFlex>
          <Flex padding="10px 0 0 0 !important" md={12} sm={12} xs={12}>
            <CardBody>
              <DataGrid colums={colums} rows={rows} />
            </CardBody>
          </Flex>
        </Flex>
      </Suspense>
      <CustSubProjectModal open={viewOpen} data={{}} setOpen={setViewOpen} />
      <Loading open={isLoading} />
    </>
  );
};
