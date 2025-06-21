import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import {
  CardBody,
} from "../../components/style/Card_styled";
import { loadReleaseMSGTemp } from "./stack_release_slice";
import { SendReleaseAckModal } from "./StackReleaseAck";
import { Toast } from "../../components/Toast";
import { StackReleaseView } from "./StackReleaseView";
import styled from "styled-components";

const Scroll = styled.div`
overflow:hidden scroll;
height: 580px;
`;

export const StackReleaseGrid = () => {
  const stckReleaseData = useSelector((state) => state.stackRelease);
  const userReadOnly = useSelector((state) => state.user.read_only);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);

  const colums = [
    {
      headerName: "ID",
      field: "release_id",
      key: true,
      type: "number",
      hide: true,
      sortable: false,
    },
    {
      headerName: ("Project Name"),
      field: "project_name",
      description: "Project Name",
      sortable: true,
      filterable: true,
      type: "string",
    }, 
    {
      headerName: ("Investor Name"),
      field: "investor_name",
      description: "Investor Name",
      sortable: true,
      filterable: true,
      type: "string",
    },
    {
      headerName: ("Request For"),
      field: "request_for",
      description: "Request For",
      type: "string",
      width:"150px"
    },
    {
      headerName: "Amount",
      field: "amount",
      description: "Amount",
      type: "currency",
      width:"150px"
    },
    {
      headerName: "Request Date",
      field: "request_date",
      type: "date",
      description: "Request Date", 
      width:"200px"
    },
    {
      headerName: ("action"),
      field: "",
      hide: userReadOnly,
      type: "custaction",
      icons: [
        {
          icon: "check",
          color: "success",
          hoverDesc: "Approve"
        }, 
        {
          icon: "preview",
          color: "preview",
          hoverDesc: "View Details"
        },
      ],
      callBacks: [
        (release_id) => {
          var data = stckReleaseData?.list?.find((d) => d.release_id == release_id); 
            dispatch(loadReleaseMSGTemp());
            setOpen(true);
            setData(data);
        },
        (release_id) => {
          var data = stckReleaseData?.list?.find((d) => d.release_id == release_id); 
          setData(data);
          setView(true);
        } 
      ],
    } 
  ];

  let rows = stckReleaseData?.list.map((d) => ({
    ...d, 
    actiontype: [d.release_approved != "Yes", true]
  })) || [];

  return ( 
        <> {(stckReleaseData.addUpdateLoading == "idle" || stckReleaseData.addUpdateLoading == "pending") ? <></> : (
          stckReleaseData.addUpdateLoading == "succeeded" ? (
            <Toast msg={stckReleaseData.msg} icon="task_alt" color="success" />
          ) : (
            <Toast color="error" msg={stckReleaseData.msg} />
          )
        )}
          <CardBody><Scroll>
            <DataGrid colums={colums} rows={rows || []} /></Scroll>
          </CardBody>
          <SendReleaseAckModal open={open} setOpen={setOpen} data={data} />
          <StackReleaseView open={view} setOpen={setView} data={data} />

        </> 
  );
};
