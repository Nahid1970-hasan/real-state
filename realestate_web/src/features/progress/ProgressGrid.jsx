import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { CardBody } from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { detailDataInit, loadProgressDetail } from "./progress_slice";
import { ProgressModal } from "./ProgressModal";

export const ProgressGrid = () => {

    const progress = useSelector((state) => state.progress);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const dispatch = useDispatch(); 
    const [open, setOpen] = useState(false);
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
            headerName: ("Project Name"),
            field: "project_name",
            description: "Project Name",
            sortable: true,
            filterable: true,
            type: "string", 
        }, 
        {
            headerName: ("Location"),
            field: "popular_loc",
            description: "Popular Location",
            type: "text",
            width:"130px"
        }, 
        {
            headerName: ("Started Date"),
            field: "est_start_date",
            description: "Estimated Start Date",
            type: "date",
            width:"120px"
        }, 
        {
            headerName: ("Completion Date"),
            field: "est_complete_date",
            description: "Estimated Completion Date",
            type: "date",
            width:"150px"
        }, 
        {
            headerName: ("Status"),
            description: "Status",
            field: "status",
            width:"120px"
        },
        {
            headerName: ("Progress (%)"),
            description: "Progress Percentage",
            field: "progress_percent",
            width:"120px"
        },

        {
            headerName: ("action"),
            field: "",
            hide: userReadOnly,
            type: "action",
            icons: ["preview",],
            colors: ["preview",],
            descriptions: ["View Progress",],
            callBacks: [
                (project_id) => {
                    var rowdata = progress?.list?.find((d) => d.project_id == project_id);
                    dispatch(detailDataInit());
                    dispatch(loadProgressDetail({ "project_id": project_id})); 
                    setOpen(true); 
                    setData(rowdata);
                },

            ],
        },
    ];
 

    return <>

        <Suspense fallback={<Loader />}>
            <CardBody>
                <DataGrid colums={colums} rows={progress?.list|| []} />
            </CardBody>
            <ProgressModal open={open} setOpen={setOpen} data={data} />
        </Suspense>
    </>;
}