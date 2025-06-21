import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Flex } from "../components/style/Flex_styled";
import { Input } from "../components/style/Input_styled";
import { Select } from "../components/style/Select_styled";
import { loadPage } from "../features/page/page_slice";
import { theme } from "../styles/theme";
import { ErrLabel, Label } from "../components/style/Label";
import { loadSubProjectType, loadProjectNameList, loadSubProjectInfo, loadSubProjectEdit, initLoader } from "../features/createViewSubProject/create_sub_project_slice";

import { CreateSubViewModal } from "../features/createViewSubProject/CreateSubViewModal";
import { Loading } from "../components/Loading";
import { Toast } from "../components/Toast";
import { CreateSubViewDelete } from "../features/createViewSubProject/CreateSubViewDelete";
import { Constants } from "../utils/helper";
import { loadPhotoData } from "../features/bmdPortal/photo_gallery_slice";
import { CardBody } from "../components/style/Card_styled";
import DataGrid from "../components/DataGrid";
import { ProjectImageModal } from "../features/createViewProject/ProjectImageModal";
import { initLoader as imgInitLoader } from "../features/bmdPortal/photo_gallery_slice";
import { useLocation } from "react-router-dom";
import { SubprojectViewDetailes } from "../features/createViewSubProject/SubprojectViewDetailes";

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

export const CreateViewSubProjectPage = () => {
  const dispatch = useDispatch();
  const [get_value, set_value] = useState(0);
  const [get_name, set_name] = useState("");
  const [dropValue, setDropValue] = useState("");
  const photoGalleryData = useSelector((state) => state.photoGallery);
  const createsubproject = useSelector((state) => state.createsubproject);
  const userReadOnly = useSelector((state) => state.user.read_only);
  const dropDownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openPhoto, setOpenPhoto] = useState(false);
  const [sub_project_id, set_sub_project_id] = useState(0);
  const [remove, setRemove] = useState(false);
  const [data, setData] = useState({});
  const [view, setView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search_value_err, set_search_value_err] = useState(null);
  const user = useSelector((state) => state.user);
  const location = useLocation();

  function submitFormValue() {
    let data = {
      project_id: get_value,
    };
    get_value && dispatch(loadSubProjectInfo(data));
  }

  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      dispatch(loadProjectNameList());
    }

    dispatch(loadPage({ title: "View Sub-projects", button: false }));
  }, [location]);

  useEffect(() => {
    createsubproject.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [createsubproject.loading]);


  useEffect(() => {
    createsubproject.typeLoading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [createsubproject.typeLoading]);

  useEffect(() => {
    if (createsubproject.addUpdateLoading == "pending") {
      setIsLoading(true)
    } else if (createsubproject.addUpdateLoading == "succeeded") {
      setIsLoading(false);
      submitFormValue();
      setTimeout(() => { dispatch(initLoader()) }, 5000)
    } else if (createsubproject.addUpdateLoading != "pending") {
      setTimeout(() => { dispatch(initLoader()), setIsLoading(false) }, 5000);
    }
  }, [createsubproject.addUpdateLoading]);


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
    if (!get_value) {
      set_search_value_err("Please select project")
    } else {
      submitFormValue();
      set_search_value_err(null);
    }

  };

  const handleChangeOption = () => {
    let searchID = dropDownRef.current.value;
    if (!searchID) {
      set_search_value_err("Please select project")
    } else {
      set_search_value_err("")
      var dropData = createsubproject?.dropdoenlist?.find((d) => d.project_id == searchID);
      set_name(dropData.project_name)
      set_value(searchID);
      setDropValue(searchID)
    }
  };

  function submitcreatesubproject(e) {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    e.preventDefault();
    if (isvalid) {
      dispatch(loadSubProjectType());
      setOpen(true);
    }

  }

  const colums = [
    {
      headerName: "ID",
      field: "sub_project_id",
      key: true,
      type: "number",
      hide: true,
      sortable: false,
    },
    {
      headerName: "Name",
      field: "sub_project_name",
      type: "string",
      description: "Sub-project Name",
      sortable: true,
      width: "180px"
    },
    {
      headerName: "Sub-project Type",
      field: "sub_type_name",
      type: "string",
      description: "Sub-project-type",
      sortable: true,
      width: "180px"
    },
    {
      headerName: "Floor",
      field: "floor_no",
      description: "Floor No",
      sortable: true,
      width: "90px"
    },

    {
      headerName: "Size (sqr/ft)",
      field: "size_sqft",
      description: "Size (Sqr/Ft)",
      sortable: true,
      width: "100px",
      type: "number"
    },
    {
      headerName: "Amount",
      field: "sub_project_amount",
      description: "Installment Amount",
      sortable: true,
      width: "120px",
      type: "currency"
    },
    {
      headerName: "Est Delivery",
      field: "est_delivery",
      type: "date",
      description: "Est. Delivery",
      sortable: true,
      width: "100px"
    },
    {
      headerName: "Status",
      field: "status",
      type: "state",
      width: "120px",
      description: "Status",
      sortable: true,
      alignment: "center",
    },
    {
      headerName: ("action"),
      field: "",
      hide: userReadOnly,
      type: "custaction",
      icons: [
        {
          icon: "edit",
          color: "success",
          hoverDesc: "Edit"
        },
        {
          icon: "photo_library",
          color: "warning",
          hoverDesc: "Photo View"
        },
        {
          icon: "delete",
          color: "error",
          hoverDesc: "Delete"
        },
        {
          icon:"preview",
          color:"preview",
          hoverDesc:"View Details"
      }
      ],
      callBacks: [
        (sub_project_id) => {
          dispatch(loadSubProjectType());
          dispatch(loadSubProjectEdit({ sub_project_id }));
          setEdit(true)
        },
        (sub_project_id) => {
          set_sub_project_id(sub_project_id);
          dispatch(loadPhotoData({ "photo_type": Constants.photo_sub_project, "photo_type_id": sub_project_id }));
          var rowdata = createsubproject?.list?.find((d) => d.sub_project_id == sub_project_id);
          rowdata=Object.assign({
            ...rowdata,status:rowdata.status!="Running"?"Completed":rowdata.status
          })
          setOpenPhoto(true);
          setData(rowdata);
        },
        (sub_project_id) => {
          setRemove(true);
          set_sub_project_id(sub_project_id);
        },
        (sub_project_id) => {
          dispatch(loadSubProjectEdit({ sub_project_id }));
          var rowdata = createsubproject?.list?.find((d) => d.sub_project_id == sub_project_id);
          setData(rowdata);
          setView(true); 
      }
      ],
    },

  ];

  let rows = createsubproject?.list.map((d) => ({
    ...d,
    status: {
      label: d.status,
      color: d.status == "Running" ? "success" : "error",
    },
    actiontype: [d.status == "Running", true, d.status == "Running",d.status != "Running"],
  })) || [];


  return (
    <>
      {(createsubproject.addUpdateLoading == "idle" || createsubproject.addUpdateLoading == "pending") ? <></> : (
        createsubproject.addUpdateLoading == "succeeded" ? (
          <Toast msg={createsubproject.msg} icon="task_alt" color="success" />
        ) : (
          <Toast color="error" msg={createsubproject.msg} />
        )
      )}
      <form>
        <Flex row>
          <CustFlex md={1.2} sm={6} xs={12}>
            <Label>Project Name</Label>
          </CustFlex>
          <CustFlex md={3} sm={6} xs={12}>
            <Select
              app
              ref={dropDownRef}
              name="search_col"
              id="search_col"
              value={dropValue}
              onChange={handleChangeOption}
            >
              <option disabled value={""}>--select value</option>
              {createsubproject.dropdoenlist?.map((d, i) => (
                <option key={i} value={d.project_id}>
                  {" "}
                  {d.project_name}
                </option>
              ))}
            </Select>
            {
              search_value_err ? <ErrLabel margin={"0px"}>{search_value_err}</ErrLabel> : null
            }
          </CustFlex>

          <CustFlex md={3} sm={12} xs={12}>
            <CustDiv>
              <Button 
                type="submit"
                onClick={handleSubmit}
                disabled={!get_value}
              >
                Submit
              </Button>
            </CustDiv>
          </CustFlex>
          <Flex padding={"0 !important"} md={4.8} sm={12} xs={12}>
            <CustDiv end={'true'}>
              <Button
                display={get_value > 0 ? "block" : "none"}
                type="button"
                onClick={submitcreatesubproject}
              >
                Create Sub-project
              </Button>
            </CustDiv>


          </Flex>

        </Flex>
      </form>
      <CustFlex>
        <Flex md={12}><CardBody> <DataGrid colums={colums} rows={rows || []} /></CardBody>
        </Flex>
      </CustFlex>
      <CreateSubViewModal open={open} setOpen={setOpen} data={{ project_id: get_value, project_name: get_name }} add />
      <CreateSubViewDelete open={remove} setOpen={setRemove} data={{ sub_project_id }} />
      <CreateSubViewModal open={edit} setOpen={setEdit} data={{ project_id: get_value, project_name: get_name }} />
      <ProjectImageModal open={openPhoto} setOpen={setOpenPhoto} title="Sub-project Photo" photo_type={Constants.photo_sub_project} photo_type_id={sub_project_id} data={data} />
      <SubprojectViewDetailes open={view} setOpen={setView} data={data}/>
      <Loading open={isLoading} />
    </>
  );
};
