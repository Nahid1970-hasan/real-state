
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { CardBody } from "../../components/style/Card_styled";
import { Toast } from "../../components/Toast";
import { InvSubmit, invRefresh } from "./inv_investment_Slice";
import { InvestmentDelete } from "./InvestmentDelete";
import { InvInvestmentAckModal } from "./InvInvestmentAckModal";
import { InvestmentModal } from "./InvestmentModal";
import { InvestmentView } from "./InvestmentView";
import { useState } from "react";
import styled from "styled-components";

export const InvestmentGrid = ({ setViewOpen, setUserData }) => {

    const investment = useSelector((state) => state.investment);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [view, setView] = useState(false);
    const [share_id, set_share_id] = useState(0);
    const [project_id, set_project_id] = useState(0);
    const [acknowledge, setAcknowledge] = useState(false);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    const Scroll = styled.div`
overflow:hidden scroll;
height: 580px;
`;

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
            width: "230px"
        },
        {
            headerName: ("Type"),
            field: "type_name",
            description: "Type Name",
            width: "180px"
        },
        {
            headerName: ("Location"),
            field: "popular_loc",
            description: "Location",
            width: "120px",
            hide: true
        },
        {
            headerName: ("Shares"),
            field: "buy_share",
            description: "Shares Bought",
            width: "100px",
            type: "number",
            alignment: "center",
        },
        {
            headerName: ("Price/Share"),
            field: "unit_price",
            description: "Price/Share",
            width: "150px",
            type: "currency"
        },
        {
            headerName: ("Investment"),
            field: "total_amount",
            description: "Total Investment",
            width: "150px",
            type: "currency"
        },
        {
            headerName: ("Approved"),
            field: "buy_approved",
            description: "Approved",
            alignment: "center",
            width: "120px"
        },
        {
            headerName: ("Date"),
            field: "investment_date",
            description: "Investment Date",
            sortable: true,
            filterable: true,
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
                (share_id) => {
                    var rowdata = rows.find((d) => d.share_id == share_id);
                    setOpen(true);
                    dispatch(invRefresh());
                    dispatch(InvSubmit({ project_id: rowdata.project_id }));
                    setData(rowdata);
                },
                (share_id) => {
                    var data = rows.find((d) => d.share_id == share_id);
                    setAcknowledge(true);
                    set_share_id(share_id);
                    set_project_id(data.project_id);
                },
                (share_id) => {
                    var deletedata = rows.find((d) => d.share_id == share_id);
                    setRemove(true);
                    set_share_id(share_id);
                    set_project_id(deletedata.project_id);
                },
                (share_id) => {
                    var detailsdata = rows.find((d) => d.share_id == share_id);
                    setData(detailsdata);
                    setView(true);
                },
            ],
        },
    ];
    let rows = investment?.list.map((d) => ({
        ...d,
        actiontype: d.buy_submitted == "Yes" ? [false, false, false, true] : [true, true, true, false],
    })) || [];

    return (
        <>
            {(investment.addUpdateLoading == "idle" || investment.addUpdateLoading == "pending") ? <></> : (
                investment.addUpdateLoading == "succeeded" ? (
                    <Toast msg={investment.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={investment.msg} />
                )
            )}
            <CardBody>
                <Scroll>
                    <DataGrid colums={colums} rows={rows} /> </Scroll>
            </CardBody>
            <InvestmentDelete open={remove} setOpen={setRemove} data={{ "share_id": share_id, "project_id": project_id }} />
            <InvestmentModal open={open} setOpen={setOpen} data={data} />
            {/* <EditInvestmentModal open={open} setOpen={setOpen} data={data} /> */}
            <InvInvestmentAckModal open={acknowledge} setOpen={setAcknowledge} data={{ "share_id": share_id, "project_id": project_id }} />
            <InvestmentView open={view} setOpen={setView} data={data} />
        </>

    );
}