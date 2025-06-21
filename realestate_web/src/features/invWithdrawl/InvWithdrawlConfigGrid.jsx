import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { CardBody} from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { WithdrawlDelete } from "./WithdrawlDelete";
import { investRefresh, loadInvWithdrawlConfig, submitWithdrawlConfig } from "./inv_withdrawl_slice";
import { WithdrawlACK } from "./WithdrawlACK";
import { InvWithdrawlModal } from "./InvWithdrawlModal";
import { InvWithdrawlView } from "./InvWithdrawlView";
import styled from "styled-components";

const Scroll = styled.div`
overflow:hidden scroll;
height: 580px;
`;

export const InvWithdrawlConfigGrid = () => {
  const invwithdrawl = useSelector((state) => state.invwithdrawl);
  const userReadOnly = useSelector((state) => state.user.read_only);
  const dispatch = useDispatch();
  const [remove, setRemove] = useState(false);
  const [acknowledge, setAcknowledge] = useState(false);
  const [project_id, set_project_id] = useState(0);
  const [withdrawl_id, set_withdrawl_id] = useState(0);
  const [amount, set_amount] = useState(0);
  const [request_for, set_request_for] = useState("");
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);

  // useEffect(() => {
  //   invwithdrawl.addUpdateLoading == "succeeded" && dispatch(loadInvWithdrawlConfig());
  // }, [invwithdrawl.addUpdateLoading]);

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
      headerName: ("Withdrawal Type"),
      field: "request_for",
      description: "Withdrawal Type",
      width:"180px"
    },
    {
      headerName: ("Amount"),
      field: "amount",
      description: "Amount",
      type: "currency",
      alignment:"right",
      width:"150px"
    },
    {
      headerName: ("Submitted"),
      field: "withdrawl_submitted",
      description: "Submitted",
      alignment:"center",
      width:"130px"
    },
    {
      headerName: ("Submit Date"),
      field: "submit_date",
      description: "Submit Date",
      width:"180px"
    },
    {
      headerName: ("Approved"),
      field: "withdrawl_approved",
      description: "Approved",
      alignment:"center",
      width:"120px"
    },
    {
      headerName: ("Withdrawal Date"),
      field: "approved_date",
      description: "Withdrawal Date",
      width:"180px"
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
          icon: "check",
          color: "success",
          hoverDesc: "Acknowledge"
        },
        {
          icon: "delete",
          color: "error",
          hoverDesc: "Delete"
        },
        {
          icon: "preview",
          color: "preview",
          hoverDesc: "View Details"
        }
      ],
      callBacks: [
        (withdrawl_id) => {
          var data = rows.find((d) => d.withdrawl_id == withdrawl_id);
          setOpen(true);
          dispatch(investRefresh());
          dispatch(submitWithdrawlConfig({ project_id: data.project_id }));
          setData(data);
        },
        (withdrawl_id) => {
          var data = rows.find((d) => d.withdrawl_id == withdrawl_id);
          setAcknowledge(true);
          set_withdrawl_id(withdrawl_id);
          set_project_id(data.project_id);
          set_request_for(data.request_for);
          set_amount(data.amount)
        },
        (withdrawl_id) => {
          var data = rows.find((d) => d.withdrawl_id == withdrawl_id);
          setRemove(true);
          set_withdrawl_id(withdrawl_id);
          set_project_id(data.project_id);
        },
        (withdrawl_id) => {
          var data = rows.find((d) => d.withdrawl_id == withdrawl_id);
          setData(data);
          setView(true);
        },
      ],
    }

  ];

  let rows = invwithdrawl?.list.map((d) => ({
    ...d,
    actiontype: d.withdrawl_submitted == "Yes" ? [false, false, false, true] : [true, true, true, false],
  })) || [];

  return (
    <Suspense fallback={<Loader />}>
      <>
        {(invwithdrawl.addUpdateLoading == "idle" || invwithdrawl.addUpdateLoading == "pending") ? <></> : (
          invwithdrawl.addUpdateLoading == "succeeded" ? (
            <Toast msg={invwithdrawl.msg} icon="task_alt" color="success" />
          ) : (
            <Toast color="error" msg={invwithdrawl.msg} />
          )
        )}
        <CardBody>
          <Scroll>
          <DataGrid colums={colums} rows={rows} /></Scroll>
        </CardBody>
        <WithdrawlDelete open={remove} setOpen={setRemove} data={{ "withdrawl_id": withdrawl_id, "project_id": project_id }} />
        <WithdrawlACK open={acknowledge} setOpen={setAcknowledge} data={{ "withdrawl_id": withdrawl_id, "project_id": project_id,"amount":amount,"request_for":request_for}} />
        <InvWithdrawlModal open={open} setOpen={setOpen} data={data} />
        <InvWithdrawlView open={view} setOpen={setView} data={data} />
      </>
    </Suspense>
  );
};
