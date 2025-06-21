import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import DataGrid from "../../components/DataGrid";
import {
  Card,
  CardBody,
  CardHeaderButton,
} from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { UpdatePaymentWalletModal } from "./UpdatePaymentWallet";
import { StackPaymentAckModal } from "./StackPaymentAck";
import { loadTemplateList } from "./stack_payment_slice";
import { StackPaymentView } from "./StackPaymentView";
import styled from "styled-components";

const Scroll = styled.div`
overflow:hidden scroll;
height: 550px;
`;

export const StackPaymentGrid = () => {
  const stpayment = useSelector((state) => state.stackPayment);
  const userReadOnly = useSelector((state) => state.user.read_only);
  const dispatch = useDispatch();
  const [wallet, set_wallet] = useState(false);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);

  const colums = [
    {
      headerName: "ID",
      field: "payment_id",
      key: true,
      type: "number",
      hide: true,
      sortable: false,
    },
    {
      headerName: ("Payee Name"),
      field: "payee_name",
      description: "Payee Name",
      sortable: true,
      filterable: true,
      type: "string",
    },
    {
      headerName: ("Sub-project Name"),
      field: "sub_project_name",
      description: "Sub-Project Name",
      sortable: true,
      filterable: true,
      type: "string",
    },

    {
      headerName: ("Payee Type"),
      field: "payee_type",
      description: "Payee Type",
      width: "120px"
    },

    {
      headerName: "Cheque No",
      field: "cheque_no",
      description: "Cheque Number",
      hide:true,
      width: "120px"
    },
    {
      headerName: "Amount",
      field: "amount",
      description: "Amount",
      width: "120px",
      type: "currency"
    },
    {
      headerName: "Payment Date",
      field: "payment_date",
      type: "date",
      description: "Payment Date",
      width: "150px"
    },
    {
      headerName: "Verified",
      field: "payment_verified",
      description: "Payment Verified",
      width: "90px",
      alignment: "center"

    },
    {
      headerName: "Wallet",
      field: "added_to_wallet",
      description: "Add to Wallet",
      width: "90px",
      alignment: "center"
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
          icon: "wallet",
          color: "wallet",
          hoverDesc: "Add to Wallet"
        },
        {
          icon: "preview",
          color: "preview",
          hoverDesc: "View Details"
        },
      ],
      callBacks: [
        (payment_id) => {
          var data = rows.find((d) => d.payment_id == payment_id);
          setOpen(true);
          setData(data);
          dispatch(loadTemplateList())
        },
        (payment_id) => {
          var data = rows.find((d) => d.payment_id == payment_id);
          setData(data);
          set_wallet(true);
        },
        (payment_id) => {
          var data = rows.find((d) => d.payment_id == payment_id);
          setData(data);
          setView(true);
        },
      ],
    }

  ];

  let rows = stpayment?.list.map((d) => ({
    ...d,
    payee_type: d.payee_type == "INV-CUST" ? "BOTH" : d.payee_type,
    added_to_wallet: d.payment_for == "BuyShare" ? d.added_to_wallet : "",
    actiontype: [d.payment_verified != "Yes", (d.payment_for == "BuyShare" && d.payment_verified == "Yes" && d.added_to_wallet != "Yes"), true]
  })) || [];

  return (
    <>
      {(stpayment.addUpdateLoading == "idle" || stpayment.addUpdateLoading == "pending") ? <></> : (
        stpayment.addUpdateLoading == "succeeded" ? (
          <Toast msg={stpayment.msg} icon="task_alt" color="success" />
        ) : (
          <Toast color="error" msg={stpayment.msg} />
        )
      )}
      <CardBody>
        <Scroll>
        <DataGrid colums={colums} rows={rows} /></Scroll>
      </CardBody>
      <UpdatePaymentWalletModal open={wallet} setOpen={set_wallet} data={data} />
      <StackPaymentAckModal open={open} setOpen={setOpen} data={data} />
      <StackPaymentView open={view} setOpen={setView} data={data} />
    </>

  );
};
