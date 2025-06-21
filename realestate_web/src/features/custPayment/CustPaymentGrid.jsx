import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Card, CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { initLoader, loadCustPaymentInfo, loadNewCustPayment } from "./cust_payment_slice";
import { ViewPaymentDelete } from "./CustPaymentDelete";
import { CustPaymentModal } from "./CustPaymentModal";
import { CustpaymentAcknowledge } from "./CustpaymentAcknowledge";
import { CustPaymentViewModal } from "./CustPaymentViewModal";
import styled from "styled-components";

const Scroll = styled.div`
overflow:hidden scroll;
height: 580px;
`;

export const ViewpaymentGrid = () => {

    const viewpayment = useSelector((state) => state.custPayemntData);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const dispatch = useDispatch();
    const [acknowledge, setAcknowledge] = useState(false);
    const [remove, setRemove] = useState(false);
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
            headerName: ("Sub-project Name"),
            field: "sub_project_name",
            description: "Sub Project Name",
            width: "150px"
        },
        {
            headerName: ("Payment Method"),
            field: "payment_method",
            description: "Payment Method",
            sortable: true,
            filterable: true,
            type: "string",
            width:"130px"
        },
        {
            headerName: ("Purpose For"),
            field: "payment_for",
            description: "Purpose For",
            width: "150px"
        },
        
        {
            headerName: ("Installment#"),
            field: "installment_no",
            description: "Installment Number",
            type:"number",
            width:"90px"
        },
        {
            headerName: ("Company Bank"),
            field: "com_bank",
            description: "Company Bank",
            hide: true,
        },
        {
            headerName: ("Own Bank"),
            field: "own_bank",
            description: "Own Bank",
            hide: true,
        },
        {
            headerName: ("Cheque#"),
            field: "cheque_no",
            description: "Cheque",
            width: "120px",
            hide:true
        },
        {
            headerName: ("Amount"),
            field: "amount",
            description: "Amount",
            width: "120px",
            type:"currency"
        },
        {
            headerName: ("Verified"),
            field: "payment_verified",
            description: "Payment Verified",
            alignment:"center",
            width: "120px"
        }, 
        {
            headerName: ("Payment Date"),
            field: "payment_date",
            description: "Payment Date",
            type:"date",
            width: "150px"
        },
        {
            headerName: ("action"),
            field: "",
            hide: userReadOnly,
            type: "custaction", 
            icons: [
                {
                    icon:"edit",
                    color:"success",
                    hoverDesc:"Edit"
                },
                {
                    icon:"check",
                    color:"success",
                    hoverDesc:"Acknowledge"
                },
                {
                    icon:"delete",
                    color:"error",
                    hoverDesc:"Delete"
                }, 
                {
                    icon:"preview",
                    color:"preview",
                    hoverDesc:"View Details"
                } 
            ], 
            callBacks: [
                (payment_id) => {
                    var rowdata = rows.find((d) => d.payment_id == payment_id);
                    setOpen(true);
                    setData(rowdata);
                    dispatch(loadNewCustPayment())
                },
                (payment_id) => {
                    // let data = rows.find((d) => d.payment_id == payment_id);
                    setAcknowledge(true);
                    set_payment_id(payment_id);
                },
                (payment_id) => {
                    setRemove(true);
                    set_payment_id(payment_id);
                },
                (payment_id) => {
                    var detailsdata = rows.find((d) => d.payment_id == payment_id);
                    setData(detailsdata);
                    setView(true); 
                },
            ],
        },
         
    ];
 
    let rows = viewpayment?.list.map((d) => ({
        ...d,
        actiontype: d.payment_submitted == "Yes" ? [false, false, false, true] : [true, true, true, false],
      }))||[];

    return <Suspense fallback={<Loader />}>
        <>
            <CardBody>
                <Scroll>
                <DataGrid colums={colums} rows={rows} /></Scroll>
            </CardBody>
            <ViewPaymentDelete open={remove} setOpen={setRemove} data={{ payment_id }} />
            <CustpaymentAcknowledge open={acknowledge} setOpen={setAcknowledge} data={{ payment_id }} />
            <CustPaymentModal open={open} setOpen={setOpen} data={data} />
            <CustPaymentViewModal open={view} setOpen={setView} data={data} />
        </>

    </Suspense>;
}