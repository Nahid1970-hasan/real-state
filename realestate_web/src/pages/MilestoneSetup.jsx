import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Flex } from "../components/style/Flex_styled";
import { Select } from "../components/style/Select_styled";
import { loadPage } from "../features/page/page_slice";
import { ErrLabel, Label } from "../components/style/Label";
import { Loading } from "../components/Loading";
import { Toast } from "../components/Toast";
import { Constants } from "../utils/helper";
import { loadPhotoData } from "../features/bmdPortal/photo_gallery_slice";
import { CardBody } from "../components/style/Card_styled";
import DataGrid from "../components/DataGrid";
import { initLoader, loadMilestoneDetail, loadMilestoneInfo, loadProjectNameList, subMilestoneInit } from "../features/milestoneSetup/milestonesetup_slice";
import { MilestoneModal } from "../features/milestoneSetup/MilestoneModal";
import { MilestoneDetailModal } from "../features/milestoneSetup/MilestoneDetailModal";
import { MileStoneDelete } from "../features/milestoneSetup/MileStoneDelete";
import { useLocation } from "react-router-dom";

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

export const Milestonepage = () => {
  const dispatch = useDispatch();
  const [get_value, set_value] = useState(0);
  const [get_name, set_name] = useState("");
  const [dropValue, setDropValue] = useState("");
  const milestonesetup = useSelector((state) => state.milestonesetup);
  const userReadOnly = useSelector((state) => state.user.read_only);
  const dropDownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [milestone_id, set_mileStone_id] = useState(0);
  const [remove, setRemove] = useState(false);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [search_value_err, set_search_value_err] = useState(null);
  const user = useSelector((state) => state.user);
  const location = useLocation();

  function submitFormValue() {
    let data = {
      project_id: get_value,
    };
    get_value && dispatch(loadMilestoneInfo(data));
  }

  useEffect(() => { 
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      setIsLoading(true);
      dispatch(loadProjectNameList());
    } 
    dispatch(loadPage({ title: "Milestone Setup", button: false }));
  }, [location]);



  useEffect(() => {
    milestonesetup.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [milestonesetup.loading]);


  useEffect(() => {
    if (milestonesetup.addUpdateLoading == "pending") {
      setIsLoading(true);
    } else if (milestonesetup.addUpdateLoading == "succeeded") {
      setIsLoading(false);
      submitFormValue(); 
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (milestonesetup.addUpdateLoading != "pending") {
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 5000);
    }
  }, [milestonesetup.addUpdateLoading]);

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
      var dropData = milestonesetup?.dropdoenlist?.find((d) => d.project_id == searchID);
      set_name(dropData.project_name)
      set_value(searchID);
      setDropValue(searchID)
    }

  };

  const colums = [
    {
      headerName: "ID",
      field: "milestone_id",
      key: true,
      type: "number",
      hide: true,
      sortable: false,
    },
    {
      headerName: "Major Works",
      field: "major_works",
      type: "string",
      description: "Major Works",
      sortable: true,
      filterable: true,
    },

    {
      headerName: "Works(%)",
      field: "work_percent",
      type: "number",
      description: "Wokrs Done",
      width: "120px"
    },

    {
      headerName: "Start Date",
      field: "start_date",
      description: "Start Date",
      width: "180px",
      type: "date",
      sortable: true
    },
    {
      headerName: "End Date",
      field: "end_date",
      description: "End date",
      sortable: true,
      type: "date",
      width: "180px"
    },
    {
      headerName: "Status",
      field: "status",
      type: "text",
      description: "Status",
      sortable: true,
      filterable: true,
      width: "100px"
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
          hoverDesc: "Approve"
        }, 
        {
          icon: "preview",
          color: "preview",
          hoverDesc: "View Details"
        },
        {
          icon: "delete",
          color: "error",
          hoverDesc: "Delete"
        },
      ],
      callBacks: [
        (milestone_id) => {
          var rowdata = milestonesetup?.list?.find((d) => d.milestone_id == milestone_id)
          setEditOpen(true);
          setData(rowdata);
        },
        (milestone_id) => {
          var rowdata = milestonesetup?.list?.find((d) => d.milestone_id == milestone_id);
          dispatch(subMilestoneInit());
          dispatch(loadMilestoneDetail({ milestone_id: milestone_id, project_id: rowdata.project_id }));
          setOpenDetail(true);
          setData(rowdata);
        },
        (milestone_id) => {
          setRemove(true);
          set_mileStone_id(milestone_id);
        },
      ],
    } 
  ];

  let rows = milestonesetup?.list.map((d) => ({
    ...d, 
    actiontype: [d.status != "Completed", true, d.status != "Completed"]
  })) || [];

  return (
    <>
      {(milestonesetup.addUpdateLoading == "idle" || milestonesetup.addUpdateLoading == "pending") ? <></> : (
        milestonesetup.addUpdateLoading == "succeeded" ? (
          <Toast msg={milestonesetup.msg} icon="task_alt" color="success" />
        ) : (
          <Toast color="error" msg={milestonesetup.msg} />
        )
      )}
      <form>
        <Flex row>
          <CustFlex md={1.2} sm={6} xs={12}>
            <Label>Select Project</Label>
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
              {milestonesetup.dropdoenlist?.map((d, i) => (
                <option key={i} value={d.project_id}>
                  {" "}
                  {d.project_name}
                </option>
              ))}
            </Select>
            {
              search_value_err ? <ErrLabel margin="0">{search_value_err}</ErrLabel> : null
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
                onClick={() => { 
                  var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
                  if (isvalid) {
                    get_value && setOpen(true);
                  } }}
              >
                Add Milestone
              </Button>
            </CustDiv>


          </Flex>

        </Flex>
      </form>
      <CustFlex>
        <Flex md={12}><CardBody> <DataGrid colums={colums} rows={rows || []} /></CardBody>
        </Flex>
      </CustFlex>
      <MilestoneModal open={open} setOpen={setOpen} data={{ project_id: get_value, project_name: get_name }} add />
      <MilestoneDetailModal open={openDetail} setOpen={setOpenDetail} data={data} />
      <MileStoneDelete open={remove} setOpen={setRemove} data={{ project_id: get_value, milestone_id: milestone_id }} />
      <MilestoneModal open={editOpen} setOpen={setEditOpen} data={data} />
      <Loading open={isLoading} />
    </>
  );
};
