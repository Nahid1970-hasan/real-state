import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Toast } from "../../components/Toast";
import { loadInvPaymentRefData } from "./inv_payment_Slice";
import { InvPaymentDelete } from "./InvPaymentDelete";
import { InvPamentModal } from "./InvPamentModal";
import { InvPaymentAckModal } from "./InvPaymentAckModal";
import { InvPaymentViewModal } from "./InvPaymentViewModal";
import styled from "styled-components";

const Scroll = styled.div`
overflow:hidden scroll;
height: 580px;
`;

export const InvPaymentGrid = ({ setViewOpen, setUserData }) => {

    const invpayment = useSelector((state) => state.invpayment);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [acknowledge, setAcknowledge] = useState(false);
    const [payment_id, set_payment_id] = useState(0);
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
            headerName: ("Payment Method"),
            field: "payment_method",
            description: "Payment Method",
            sortable: true,
            filterable: true,
            type: "string",
            width: "180px"
        },

        {
            headerName: ("Cheque Number"),
            field: "cheque_no",
            description: "Cheque",
            width: "150px"
        },
        {
            headerName: ("Amount"),
            field: "amount",
            width: "150px",
            description: "Amount",
            type: "currency"
        },
        {
            headerName: ("Verified"),
            field: "payment_verified",
            description: "Payment Verified",
            alignment: "center",
            width: "120px",
        },
        {
            headerName: ("Wallet"),
            field: "added_to_wallet",
            description: "Added to Wallet",
            alignment: "center",
            width: "120px"
        },
        {
            headerName: ("Payment Date"),
            field: "payment_date",
            description: "Payment Date",
            type: "date",
            width: "150px"
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
                (payment_id) => {
                    var rowdata = rows.find((d) => d.payment_id == payment_id);
                    dispatch(loadInvPaymentRefData());
                    setOpen(true);
                    setData(rowdata);

                },
                (payment_id) => {
                    setAcknowledge(true);
                    set_payment_id(payment_id);
                },
                (payment_id) => {
                    setRemove(true);
                    set_payment_id(payment_id);
                },
                (payment_id) => {
                    var rowdata = rows.find((d) => d.payment_id == payment_id);
                    setData(rowdata);
                    setView(true);
                },
            ],
        }

    ];


    let rows = invpayment?.list.map((d) => ({
        ...d,
        actiontype: d.payment_submitted == "Yes" ? [false, false, false, true] : [true, true, true, false],
    })) || [];

    return (
        <>
            {(invpayment.addUpdateLoading == "idle" || invpayment.addUpdateLoading == "pending") ? <></> : (
                invpayment.addUpdateLoading == "succeeded" ? (
                    <Toast msg={invpayment.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={invpayment.msg} />
                )
            )}
            <Scroll>
                <DataGrid colums={colums} rows={rows || []} />
            </Scroll>
            <InvPaymentDelete open={remove} setOpen={setRemove} data={{ payment_id }} />
            <InvPaymentAckModal open={acknowledge} setOpen={setAcknowledge} data={{ payment_id }} />
            <InvPamentModal open={open} setOpen={setOpen} data={data} />
            <InvPaymentViewModal open={view} setOpen={setView} data={data} />
        </>

    );
}