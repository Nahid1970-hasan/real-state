import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import DataGrid from "../../components/DataGrid";
import { Card, CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import {
    loadEmailConfig,
    initLoader,
} from "./emailConfig_slice";
import { EmailConfigDelete } from "./EmailConfigDelete";
import { EmailConfigModal } from "./EmailConfigModal";

export const EmailConfigGrid = () => {

    const emailConfig = useSelector((state) => state.emailConfig);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [config_id, set_config_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        emailConfig.addUpdateLoading == "succeeded" && dispatch(loadEmailConfig());
    }, [emailConfig.addUpdateLoading]);

    const colums = [
        {
            headerName: "ID",
            field: "config_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: ("Sender Name"),
            field: "sender_name",
            description: "Sender Name",
            sortable: true,
            filterable: true,
            type: "string",
            width: "150px"
        },
        {
            headerName: ("sending_email"),
            field: "sending_email_address",
            description: "Sending Email",
            type: "email",
            width: "200px"
        },
        {
            headerName: ("Email Server"),
            field: "email_server",
            description: "Email Server",
            width: "180px",
            type: "board"
        },
        {
            headerName: ("Enable SSL"),
            field: "enable_ssl",
            description: "Enable SSL",
            width: "90px",
            alignment:"center"
        },
        {
            headerName: ("Network Email"),
            field: "network_cred_user_email",
            description: "Network Cred Email",
            type: "email",
            width: "210px"
        },
        {
            headerName: ("Password"),
            field: "network_cred_pass",
            description: "Network Cred Password",
            hide: true,
        },
        {
            headerName: ("Port"),
            field: "port",
            type: "number",
            width: "80px",
            description: "Port",
        },
        {
            headerName: ("Used For"),
            description: "Used For",
            field: "used_for",
            width: "100px"
        },

        {
            headerName: ("action"),
            field: "",
            hide: userReadOnly,
            type: "action",
            icons: ["edit", "delete"],
            colors: ["success", "error"],
            descriptions: ["Edit", "Delete"],
            callBacks: [
                (config_id) => {
                    var rowdata = rows.find((d) => d.config_id == config_id);
                    console.log(rowdata);
                    setOpen(true);
                    setData(rowdata);
                },
                (config_id) => {
                    setRemove(true);
                    set_config_id(config_id);
                },
            ],
        },
    ];

    let rows = emailConfig.list || [];

    return <>
        {
            (emailConfig.addUpdateLoading == "idle" || emailConfig.addUpdateLoading == "pending") ? <></> : (
                emailConfig.addUpdateLoading == "succeeded" ? (
                    <Toast msg={emailConfig.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={emailConfig.msg} />
                )
            )
        }
        <Suspense fallback={<Loader />}>
            <CardBody>
                <DataGrid colums={colums} rows={rows} />
            </CardBody>
            <EmailConfigDelete open={remove} setOpen={setRemove} data={{ config_id }} />
            <EmailConfigModal open={open} setOpen={setOpen} data={data} />
        </Suspense>
    </>;
}