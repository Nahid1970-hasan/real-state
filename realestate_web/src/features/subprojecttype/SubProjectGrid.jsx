import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Card, CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { initLoader, loadSubProtypeConfig } from "./sub_project_type_Slice";
import { SubProjectDelete } from "./SubProjectDelete";
import { SubProjectModal } from "./SubProjectModal";

export const SubProjectGrid = () => {

    const subprotype = useSelector((state) => state.subprotype);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [sub_type_id, set_sub_type_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
 
    const colums = [
        {
            headerName: "ID",
            field: "sub_type_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: "Sub-project Type",
            field: "sub_type_name",
            description: "Sub-project Type",
            sortable: true,
            filterable: true,
            type: "string",
        },
        {
            headerName: "Description",
            field: "sub_type_desc",
            description: "Description",
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
                (sub_type_id) => {
                    var rowdata = subprotype?.list?.find((d) => d.sub_type_id == sub_type_id)||{}; 
                    setOpen(true);
                    setData(rowdata);
                },
                (sub_type_id) => {
                    setRemove(true);
                    set_sub_type_id(sub_type_id);
                },
            ],
        },
    ];

    let rows = [{ "sub_project_id": "1", "sub_type_name": "new project", "sub_type_desc": "Contains bedrooms/wash-room/drawing/dining etc" }]

    return <Suspense fallback={<Loader />}>
        <>
            {(subprotype.addUpdateLoading == "idle" || subprotype.addUpdateLoading == "pending")?<></>: (
                subprotype.addUpdateLoading == "succeeded" ? (
                    <Toast msg={subprotype.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={subprotype.msg} />
                )
            )}
            <DataGrid colums={colums} rows={ subprotype?.list || []} />
            <SubProjectDelete open={remove} setOpen={setRemove} data={{ sub_type_id }} />
            <SubProjectModal open={open} setOpen={setOpen} data={data} />
        </>

    </Suspense>;
}