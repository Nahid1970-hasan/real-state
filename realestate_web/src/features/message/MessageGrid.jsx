import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid"; 
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { MessageDelete } from "./MessageDelete"; 
import { MessageModal } from "./MessageModal";

export const MessageGrid = () => {

    const message = useSelector((state) => state.message);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [template_id, set_template_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
 
    const colums = [
        {
            headerName: "ID",
            field: "template_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: "Name",
            field: "template_name",
            description: "Template Name",
            sortable: true,
            filterable: true,
            type: "string",
            width:"200px"
        },
        {
            headerName: "Message",
            field: "message",
            description: "Message",
            width:"250px"
        },
        {
            headerName: "Subject",
            field: "email_subject",
            description: " Email Subject",
            width:"250px"
        },
        {
            headerName: "Body",
            field: "email_body",
            description: "Email Body",
        },
        {
            headerName: "action",
            field: "",
            hide: userReadOnly,
            type: "action",
            icons: ["edit", "delete"],
            colors: ["success", "error"],
            descriptions: ["Edit", "Delete"],
            callBacks: [
                (template_id) => {
                    var rowdata = message?.list?.find((d) => d.template_id == template_id); 
                    setOpen(true);
                    setData(rowdata);
                },
                (template_id) => {
                    setRemove(true);
                    set_template_id(template_id);
                },
            ],
        },
    ];

    
    return <Suspense fallback={<Loader />}>
        <>
            {(message.addUpdateLoading == "idle" || message.addUpdateLoading == "pending")?<></>: (
                message.addUpdateLoading == "succeeded" ? (
                    <Toast msg={message.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={message.msg} />
                )
            )}
            <DataGrid colums={colums} rows={message?.list || []} />
            <MessageDelete open={remove} setOpen={setRemove} data={{ template_id }} />
            <MessageModal open={open} setOpen={setOpen} data={data} />
        </>

    </Suspense>;
}