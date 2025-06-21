import { Suspense, useEffect, useState } from "react";
import DataGrid from "../../components/DataGrid";
import { CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Flex } from "../../components/style/Flex_styled";
import { Loader } from "../../components/style/Loader_styled";
import { CreateViewModal } from "./CreateViewModal";
import { CreateprojectDelete } from "./CreateViewDelete";
import { useDispatch, useSelector } from "react-redux";
import { loadProjectInfo, loadProjectListInit, loadProjectRefData } from "./create_project_slice";
import { Toast } from "../../components/Toast";
import { ProjectImageModal } from "./ProjectImageModal";
import { Constants } from "../../utils/helper";
import { loadPhotoData } from "../bmdPortal/photo_gallery_slice";
import { PorjectDetailsModal } from "./ProjectDetailsModal";

export const CreateViewGrid = () => {

    const dispatch = useDispatch();
    const [project_id, set_project_id] = useState(0);
    const createproject = useSelector((state) => state.createproject);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const [open, setOpen] = useState(false);
    const [view, setView] = useState(false);
    const [openPhoto, setOpenPhoto] = useState(false);
    const [remove, setRemove] = useState(false);
    const [data, setData] = useState({});

    const colums = [
        {
            headerName: "ID",
            field: "project_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: "Project Name",
            field: "project_name",
            description: "Project Name",
            sortable: true,
            filterable: true,
            type: "string",
            width:"220px"
        },
        {
            headerName: "Short Name",
            field: "project_shortname",
            description: "Short Name",
            type: "string",
            width:"120px"
        },

        {
            headerName: "Location",
            field: "popular_loc",
            description: "Popular Location",
            sortable: true,
            width: "100px",
            filterable: true,
        },
        {
            headerName: "Est. Cost",
            field: "est_cost",
            description: "Estimated Cost",
            sortable: true,
            width: "100px",
            type: "currency"
        },
        {
            headerName: "Shares#",
            field: "no_share",
            description: "No. of Shares",
            sortable: true,
            width: "100px",
            type: "number",
        },

        {
            headerName: "Sold#",
            field: "share_sold",
            description: "Shares Sold",
            sortable: true,
            width: "100px",
            type: "number",
        },
        {
            headerName: "Start Date",
            field: "est_start_date",
            type: "date",
            width: "120px",
            description: "Est. Start Date",
            sortable: true, 
        },
        {
            headerName: "Complete Date",
            field: "est_complete_date",
            type: "date",
            width: "140px",
            description: "Est. Complete Date",
            sortable: true,
            filterable: true,
            hide:true,
        },
        {
            headerName: "Status",
            field: "status",
            type: "string",
            width: "100px",
            description: "Status",
            sortable: true,
            alignment: "center",
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
                    icon:"photo_library",
                    color:"warning",
                    hoverDesc:"Photo View"
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
                (project_id) => {
                    var rowdata = createproject?.list?.find((d) => d.project_id == project_id);
                    setOpen(true);
                    dispatch(loadProjectInfo({ "project_id": project_id }))
                    dispatch(loadProjectRefData())
                    setData(rowdata);
                },
                (project_id) => {
                    dispatch(loadPhotoData({ "photo_type": Constants.photo_project, "photo_type_id": project_id }));
                    var rowdata = createproject?.list?.find((d) => d.project_id == project_id);
                    setOpenPhoto(true);
                    setData(rowdata);
                },
                (project_id) => {
                    setRemove(true);
                    set_project_id(project_id);
                },
                (project_id) => {
                    var rowdata = createproject?.list?.find((d) => d.project_id == project_id);
                    setData(rowdata);
                    setView(true); 
                },
            ],
        },
        
    ];

    let rows = createproject?.list.map((d) => ({
        ...d,
        actiontype: [d.status!="Completed", true, d.share_sold==0 && d.status!="Completed", d.share_sold!=0],
      }))||[];

     

    return (<>
        {(createproject.addUpdateLoading == "idle" || createproject.addUpdateLoading == "pending") ? <></> : (
            createproject.addUpdateLoading == "succeeded" ? (
                <Toast msg={createproject.msg} icon="task_alt" color="success" />
            ) : (
                <Toast color="error" msg={createproject.msg} />
            )
        )}
       
                <CardBody> <DataGrid colums={colums} rows={rows || []} /></CardBody>
               
           
            <CreateprojectDelete open={remove} setOpen={setRemove} data={{ project_id }} />
            <CreateViewModal open={open} setOpen={setOpen} data={data} />
            <PorjectDetailsModal open={view} setOpen={setView} data={data}/>
            <ProjectImageModal open={openPhoto} setOpen={setOpenPhoto} title="Project Photo" photo_type={Constants.photo_project} photo_type_id={data.project_id} data={data} />
      
    </>);
};
