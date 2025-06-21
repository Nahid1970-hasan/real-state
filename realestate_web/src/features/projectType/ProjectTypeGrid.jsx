import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import DataGrid from "../../components/DataGrid";
import { Card, CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { ProjectTypeModal } from "./ProjectTypeModal";
import { ProTypeDelete } from "./ProTypeDelete";
import { initLoader, loadProTypeConfig } from "./pro_Type_slice";

export const ProjectTypeGrid = () => {
    const protype = useSelector((state) => state.protype);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [project_id, set_project_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
  
    const colums = [
        {
            headerName: "ID",
            field: "type_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: ("Project Type"),
            field: "type_name",
            description: "Project Type",
            sortable: true,
            filterable: true,
            type: "string",
        },
        {
            headerName: ("Commercial Space"),
            field: "commercial_space",
            description: "Commercial Space",
            alignment:"center"
        },
        {
            headerName: ("Apartment"),
            field: "apartment",
            description: "Apartment",
            alignment:"center"
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
                (type_id) => {
                    var rowdata = protype?.list?.find((d) => d.type_id == type_id);
                    setOpen(true);
                    setData(rowdata);
                },
                (type_id) => {
                    setRemove(true);
                    set_project_id(type_id);
                },
            ],
        },
    ];
 
    return <Suspense fallback={<Loader />}>
        <> 
             {(protype.addUpdateLoading == "idle" || protype.addUpdateLoading == "pending")?<></>: (
                protype.addUpdateLoading == "succeeded" ? (
                    <Toast msg={protype.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={protype.msg} />
                )
            )}
            <DataGrid colums={colums} rows={protype?.list || []} />
            <ProTypeDelete open={remove} setOpen={setRemove} data={{ type_id: project_id }} />
            <ProjectTypeModal open={open} setOpen={setOpen} data={data} />
        </>

    </Suspense>;
}