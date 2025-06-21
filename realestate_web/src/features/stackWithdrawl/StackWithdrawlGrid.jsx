import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import DataGrid from "../../components/DataGrid";
import {
  CardBody,
} from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled"; 
import { initLoader, loadMsgTemplateInfo, loadWithdrawlInfo } from "./stack_withdrawl_slice";
import { SendWithdrawlAckModal } from "./StackWithdrawAck";
import { StackWithdrawlView } from "./StackWithdrawlView";
import styled from "styled-components";

const Scroll = styled.div`
overflow:hidden scroll;
height: 580px;
`;

export const WithdrawlGrid = () => {
  const withdrawl = useSelector((state) => state.stackwithdrawl);
  const userReadOnly = useSelector((state) => state.user.read_only);
  const dispatch = useDispatch();
  const [withdrawl_id, set_withdrawl_id] = useState(0);
  const [data, setData] = useState({});
  const [paydata, setpayData] = useState({});
  const [view, setView] = useState(false);
  const [open, setOpen] = useState(false);

  const colums = [
    {
      headerName: "ID",
      field: "withdrawl_id",
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
      width:"150px"
    },
    {
      headerName: "Amount",
      field: "amount",
      description: "Amount",
      type:"currency"
,      width:"150px"
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
        (withdrawl_id) => {
          var data =  withdrawl?.list?.find((d) => d.withdrawl_id == withdrawl_id);
          set_withdrawl_id(withdrawl_id);
          dispatch(loadMsgTemplateInfo());
          setOpen(true);
          setData(data);
        },
        (withdrawl_id) => {
          var data =  withdrawl?.list?.find((d) => d.withdrawl_id == withdrawl_id);
          setData(data);
          setView(true);
        } 
      ],
    }
 
  ];
  
  let rows = withdrawl?.list.map((d) => ({
    ...d, 
    actiontype: [d.withdrawl_approved != "Yes", true]
  })) || [];
   
  return ( <> 
          <CardBody>
            <Scroll>
            <DataGrid colums={colums} rows={rows||[]} /></Scroll>
          </CardBody>
          <SendWithdrawlAckModal open={open} setOpen={setOpen} data={data} />
          <StackWithdrawlView open={view} setOpen={setView} data={data} />
        </> );
};
