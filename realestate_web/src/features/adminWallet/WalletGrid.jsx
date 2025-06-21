
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { CardBody } from "../../components/style/Card_styled";
import { Toast } from "../../components/Toast";
import { useState } from "react";
import { WalletModal } from "./WalletModal";
import { WalletDelete } from "./WalletDelete";
import { WalletACkModal } from "./WalletACkModal";
import { AddWalletModal } from "./AddWalletModal";

export const WalletGrid = ({ setViewOpen, setUserData }) => {

    const adminWallet = useSelector((state) => state.adminWallet);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const adminType = useSelector((state) => state.user.admin_type);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [view, setView] = useState(false);
    const [payment_id, set_payment_id] = useState(0);
    const [add_amount, set_add_amount] = useState(0);
    const [acknowledge, setAcknowledge] = useState(false);
    const [addMoney, setAddmoney] = useState(false);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);


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
            headerName: ("Add Date"),
            field: "payment_date",
            description: "Add Date",
            sortable: true,
            filterable: true,
            type: "date",
         
        },

        {
            headerName: ("Add Amount"),
            field: "amount",
            description: "Add Amount",
            type: "currency",
         
        },
        {
            headerName: ("Verified"),
            field: "payment_verified",
            description: "Verified",
            alignment: "center",
           
        },
        {
            headerName: ("Submitted"),
            field: "payment_submitted",
            description: "Wallet",
            alignment: "center",
            hide: true
        },
        {
            headerName: ("Added to Wallet"),
            field: "added_to_wallet",
            description: "Added to Wallet",
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
                    icon: "check",
                    color: "purple",
                    hoverDesc: "Acknowledge"
                },

                {
                    icon: "verified",
                    color: "download",
                    hoverDesc: "Approve"
                },

                {
                    icon: "delete",
                    color: "error",
                    hoverDesc: "Delete"
                },

            ],
            callBacks: [
                (payment_id) => {
                    var rowdata = rows.find((d) => d.payment_id == payment_id);
                    setOpen(true);
                    setData(rowdata);
                },
                (payment_id) => {
                    var data = rows.find((d) => d.payment_id == payment_id);
                    setAcknowledge(true);
                    set_payment_id(data.payment_id);
                },

                (payment_id) => {
                    var data = rows.find((d) => d.payment_id == payment_id);
                    setAddmoney(true);
                    set_payment_id(data.payment_id);
                    set_add_amount(data.amount);
                },
                (payment_id) => {
                    setRemove(true);
                    set_payment_id(payment_id);
                }
            ],
        },
    ];

    let rows = adminWallet?.list?.map((d) => ({
        ...d,
        actiontype: [d.payment_verified != "Yes", d.payment_verified != "Yes", (d.payment_verified == "Yes" && d.added_to_wallet != "Yes" && adminType == 3), d.payment_verified != "Yes"],
    })) || [];

    // let rows =[{"payment_id":1,"wallet_amount":"123344","wallet_date":"-----","appprove_date":"------"}];
    return (
        <>
            {(adminWallet.addUpdateLoading == "idle" || adminWallet.addUpdateLoading == "pending") ? <></> : (
                adminWallet.addUpdateLoading == "succeeded" ? (
                    <Toast msg={adminWallet.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={adminWallet.msg} />
                )
            )}
            <CardBody>
                <DataGrid colums={colums} rows={rows} />
            </CardBody>

            <WalletModal open={open} setOpen={setOpen} data={data} />
            <WalletDelete open={remove} setOpen={setRemove} data={{ "payment_id": payment_id }} />
            <WalletACkModal open={acknowledge} setOpen={setAcknowledge} data={{ "payment_id": payment_id }} />
            <AddWalletModal open={addMoney} setOpen={setAddmoney} data={{ "payment_id": payment_id, "add_amount": add_amount }} />

        </>

    );
}