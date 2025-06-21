import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, DownloadButton, PrimaryButton } from "../components/Button";
import { Flex } from "../components/style/Flex_styled";
import { Input } from "../components/style/Input_styled";
import { Select } from "../components/style/Select_styled";
import { loadPage } from "../features/page/page_slice";

import { ErrLabel, Label } from "../components/style/Label";
import { loadProjectListInit, loadProjectRefData, loadProjectList, initLoader } from "../features/createViewProject/create_project_slice";
import { CreateViewGrid } from "../features/createViewProject/CreateViewGrid";
import { CreateViewModal } from "../features/createViewProject/CreateViewModal";
import { initLoader as imgInitLoader } from "../features/bmdPortal/photo_gallery_slice";
import { Loading } from "../components/Loading";
import { Toast } from "../components/Toast";
import { Typography } from "../components/style/Typography_styled";
import { useLocation } from "react-router-dom";


const CustDiv = styled.div`
  display: flex;
  justify-content:${({ end }) => (end ? 'flex-end' : 'flex-start')}; 
  margin-top: 30px;
  & button:first-child {
      margin: 0 0 2px 0;
    }
  
`;

export const CreateViewProjectPage = () => {
  const dispatch = useDispatch();
  const [get_value, set_value] = useState("project_name");
  const createproject = useSelector((state) => state.createproject);
  const photoGalleryData = useSelector((state) => state.photoGallery);
  const dropDownInputRef = useRef(null);
  const dropDownRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [search_value_err, set_search_value_err] = useState(null);
  const user = useSelector((state) => state.user);
  const location= useLocation();

  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      dispatch(loadProjectRefData());
      dispatch(loadProjectListInit());
    }
   
    dispatch(loadPage({ title: "View Projects", button: false }));
  }, [location]);


  useEffect(() => {
    createproject.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [createproject.loading]);

  useEffect(() => {
    createproject.refLoading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [createproject.refLoading]);

  useEffect(() => {
    if (createproject.addUpdateLoading == "pending") {
      setIsLoading(true);
    } else if (createproject.addUpdateLoading == "succeeded") {
      setIsLoading(false);
      dispatch(loadProjectListInit());
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (createproject.addUpdateLoading != "idle") {
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 5000);
    }
  }, [createproject.addUpdateLoading]);


  useEffect(() => {
    if (photoGalleryData.uploading == "pending") {
      setIsLoading(true);
    } else if (photoGalleryData.uploading == "succeeded") {
      setIsLoading(false);
      setTimeout(() => { dispatch(imgInitLoader()); }, 5000);
    } else if (photoGalleryData.uploading != "idle") {
      setTimeout(() => { dispatch(imgInitLoader()); setIsLoading(false); }, 5000);
    }
  }, [photoGalleryData.uploading]);

  useEffect(() => {
    photoGalleryData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [photoGalleryData.loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      set_search_value_err(null);
      let searchVal = dropDownInputRef.current.value;
      if (searchVal) {
        let data = {
          search_by: dropDownRef.current.value,
          search_value: searchVal,
        };
        dispatch(loadProjectList(data));
        set_search_value_err(null);
      } else {
        set_search_value_err("This field is required.");
      }
    }else{
      set_search_value_err("Sorry! You are not authorized user to view this page");
    }
    
  };
  const handleChangeOption = () => {
    let searchID = dropDownRef.current.value;
    set_value(searchID);
  };

  const handleChangeValue = () => {
    let searchVal = dropDownInputRef.current.value;
    searchVal ? set_search_value_err(null) : set_search_value_err("This field is required.");
  };

  const searchType = [
    { key: "project_name", value: "Project Name" },
    { key: "type_id", value: "Project Type" },
    { key: "address", value: "Address" },
    { key: "status", value: "Status" },
  ];

  function submitCreateProject(e) {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    e.preventDefault();
    if(isvalid){
      dispatch(loadProjectRefData());
      setOpen(true);
    }
    
  }
  return (
    <>
      {(photoGalleryData.uploading == "idle" || photoGalleryData.uploading == "pending") ? <></> : (
        photoGalleryData.uploading == "succeeded" ? (
          <Toast msg={photoGalleryData.msg} icon="task_alt" color="success" />
        ) : (
          <Toast color="error" msg={photoGalleryData.msg} />
        )
      )}

      <Flex row>
        <Flex padding="0 10px 0 0 !important" md={2} sm={6} xs={12}>
          <Typography margin="0 0 10px 0" fontWeight="bold" textAlign="left" > Search By</Typography>
          <Select
            app
            ref={dropDownRef}
            name="search_col"
            id="search_col"
            onChange={handleChangeOption}
          >
            <option disabled>--select value</option>
            {searchType?.map((d, i) => (
              <option key={i} value={d.key}>
                {" "}
                {d.value}
              </option>
            ))}
          </Select>
        </Flex>
        <Flex padding="0 10px 0 0 !important" md={3} sm={6} xs={12}>
          <Typography margin="0 0 10px 0" fontWeight="bold" textAlign="left" > Search Value</Typography>

          {(
            get_value === "project_name" ||
            get_value === "address") && (
              <Input
                app
                ref={dropDownInputRef}
                type="text"
                name="search_str"
                id="search_str"
                onChange={handleChangeValue}
                placeholder="search value"
              />
            )}
          {get_value === "type_id" && (
            <Select
              app
              ref={dropDownInputRef}
              name="search_type"
              id="search_type"
              defaultValue={""}
            >
              <option disabled value={""}>--select value</option>

              {createproject?.projectType?.map((d, i) => (
                <option key={i} value={d.type_id}>
                  {d.type_name}
                </option>
              ))}
            </Select>
          )}
          {get_value === "status" && (
            <Select
              app
              ref={dropDownInputRef}
              name="search_status"
              id="search_status"
            >
              <option disabled>--select value</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </Select>
          )}
          {search_value_err ? <ErrLabel margin="0px">{search_value_err}</ErrLabel> : null}
        </Flex>
        <Flex padding="0 10px 0 0 !important" md={2} sm={12} xs={12}>
          <CustDiv>
            <DownloadButton
              app
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </DownloadButton>
          </CustDiv>
        </Flex>
        <Flex padding={"0 !important"} md={5} sm={12} xs={12}>
          <CustDiv end={'true'}>
            <PrimaryButton
              app
              type="button"
              onClick={submitCreateProject}
            >
              Create Project
            </PrimaryButton>
          </CustDiv>


        </Flex>
      </Flex>
      <Flex row>
        <Flex padding="10px 0 0 0 !important" md={12} sm={12} xs={12}>
          <CreateViewGrid />
        </Flex>
      </Flex>

      <CreateViewModal open={open} setOpen={setOpen} data={{}} add />
      <Loading open={isLoading} />
    </>
  );
};
