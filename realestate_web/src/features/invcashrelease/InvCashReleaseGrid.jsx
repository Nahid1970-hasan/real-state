import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Card, CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { InvCashReleaseDelete } from "./InvCashReleaseDelete";
import { loadInvRelesaeConfig, prRefresh, submitRelesaeConfig } from "./inv_cash_release_Slice";
import { InvEditRelease } from "./InvEditRelease";
import { InvReleaseAckModal } from "./InvReleaseAckModal";
import { InvNewRelease } from "./InvNewRelease";
import { InvReleaseView } from "./InvReleaseView";
import styled from "styled-components";

const Scroll = styled.div`
overflow:hidden scroll;
height: 580px;
`;

export const InvCashReleaseGrid = ({ setViewOpen, setUserData }) => {

    const invrelesae = useSelector((state) => state.invrelesae);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [acknowledge, setAcknowledge] = useState(false);
    const [release_id, set_release_id] = useState(0);
    const [project_id, set_project_id] = useState(0);
    const [amount, set_amount] = useState(0);
    const [request_for, set_request_for] = useState("");
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
            width: "220px"
        },
        {
            headerName: ("Release Type"),
            field: "request_for",
            description: "Release Type",
            width: "180px"
        },
        {
            headerName: ("Amount"),
            field: "amount",
            description: "Amount",
            type: "currency",
            width: "150px"
        },
        {
            headerName: ("Submitted"),
            field: "release_submitted",
            description: "Submitted",
            alignment: "center",
            width: "100px"
        },
        {
            headerName: ("Req Date"),
            field: "request_date",
            description: "Request Date",
            sortable: true,
            filterable: true,
            type: "date",
            width: "150px"
        },
        {
            headerName: ("Approved"),
            field: "release_approved",
            description: " Release Approved",
            alignment: "center",
            width: "100px"
        },
        {
            headerName: ("Release Date"),
            field: "approved_date",
            description: "Release Date",
            sortable: true,
            filterable: true,
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
                (release_id) => {
                    var rowdata = rows.find((d) => d.release_id == release_id);
                    setOpen(true);
                    dispatch(prRefresh());
                    dispatch(submitRelesaeConfig({ project_id: rowdata.project_id }));
                    setData(rowdata);
                },
                (release_id) => {
                    var data = rows.find((d) => d.release_id == release_id);
                    setAcknowledge(true);
                    set_release_id(release_id);
                    set_project_id(data.project_id);
                    set_amount(data.amount);
                    set_request_for(data.request_for)
                },
                (release_id) => {
                    var data = rows.find((d) => d.release_id == release_id);
                    setRemove(true);
                    set_release_id(release_id);
                    set_project_id(data.project_id);
                },
                (release_id) => {
                    var data = rows.find((d) => d.release_id == release_id);
                    setData(data);
                    setView(true);
                },
            ],
        }

    ];

    let rows = invrelesae?.list.map((d) => ({
        ...d,
        actiontype: d.release_submitted == "Yes" ? [false, false, false, true] : [true, true, true, false],
    })) || [];


    return <Suspense fallback={<Loader />}>
        <>
            {(invrelesae.addUpdateLoading == "idle" || invrelesae.addUpdateLoading == "pending") ? <></> : (
                invrelesae.addUpdateLoading == "succeeded" ? (
                    <Toast msg={invrelesae.msg} icon="task_alt" color="success" />
                ) : (<Toast color="error" msg={invrelesae.msg} />)
            )}
            <CardBody>
                <Scroll>
                    <DataGrid colums={colums} rows={rows} /> </Scroll>
            </CardBody>
            <InvCashReleaseDelete open={remove} setOpen={setRemove} data={{ "release_id": release_id, "project_id": project_id }} />
            <InvReleaseAckModal open={acknowledge} setOpen={setAcknowledge} data={{ "release_id": release_id, "project_id": project_id,"amount":amount,"request_for":request_for}} />
            <InvNewRelease open={open} setOpen={setOpen} data={data} />
            <InvReleaseView open={view} setOpen={setView} data={data} />
        </>

    </Suspense>;
}