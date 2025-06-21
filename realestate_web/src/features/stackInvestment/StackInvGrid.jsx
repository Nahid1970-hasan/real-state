import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import DataGrid from "../../components/DataGrid";
import {
  CardBody,
} from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast"; 
import { loadMSGTemplate } from "./stack_investment_slice";
import { StackInvAckModal } from "./StackInvAckModal";
import { StackInvViewModal } from "./StackInvViewModal";
import styled from "styled-components";
const Scroll = styled.div`
overflow:hidden scroll;
height: 580px;
`;
export const StackInvGrid = () => {
  const stinvestment = useSelector((state) => state.stinvestment);
  const userReadOnly = useSelector((state) => state.user.read_only);
  const dispatch = useDispatch(); 
  const [data, setData] = useState({}); 
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);

  const colums = [
    {
      headerName: "ID",
      field: "share_id",
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
      width:"250px"
    },
    {
      headerName: ("Investor Name"),
      field: "investor_name",
      description: "Investor Name",
      sortable: true,
      filterable: true,
      type: "string",
      width:"200px"
    },
    {
      headerName: "Share for Sell",
      field: "no_share_for_sell",
      description: "Share for Sell",
      type:"number",
      width:"120px"
    },
   
    {
      headerName: "Buy Share",
      field: "buy_share",
      type:"number",
      description: "Buy Share",
      width:"120px"
    },

    {
      headerName: "Unit Price",
      field: "unit_price",
      hide: false,
      type:"currency",
      description: "Unit Price",
      width:"100px"
    },

    {
      headerName: "Amount",
      field: "total_amount",
      description: "Total Amount",
      type:"currency",
      width:"120px"
    },
    {
      headerName: "Request Date",
      field: "request_date",
      type: "date",
      description: "Request date",
      width:"120px"
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
        (share_id) => {
          var data = rows.find((d) => d.share_id == share_id); 
          setOpen(true);
          setData(data);
          dispatch(loadMSGTemplate())
        },
        (share_id) => {
          var data = rows.find((d) => d.share_id == share_id);
          setData(data);
          setView(true);
          console.log(data)
        },
      ],
    }
    
  ];
 
  let rows = stinvestment?.list.map((d) => ({
    ...d, 
    actiontype: [d.buy_approved != "Yes", true]
  })) || [];

  return (
    <>
      <Suspense fallback={<Loader />}>
        <>
          {(stinvestment.addUpdateLoading == "idle" || stinvestment.addUpdateLoading == "pending") ? <></> : (
            stinvestment.addUpdateLoading == "succeeded" ? (
              <Toast msg={stinvestment.msg} icon="task_alt" color="success" />
            ) : (
              <Toast color="error" msg={stinvestment.msg} />
            )
          )}
          <CardBody>
            <Scroll>
            <DataGrid colums={colums} rows={rows} /></Scroll>
          </CardBody>
          <StackInvAckModal open={open} setOpen={setOpen} data={data} />
          <StackInvViewModal open={view} setOpen={setView} data={data} />
        </>
      </Suspense>

    </>
  );
};
