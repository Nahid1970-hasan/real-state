import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { CardBody} from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { initLoader, loadRegRequest } from "./reg_req_Slice";
import { RequestDelete } from "./RequestDelete";
import { RegReqModal } from "./RegReqModal";


export const RegReqGrid = () => {

    const regreq = useSelector((state) => state.regreq);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [user_id, set_user_id] = useState(0);
    const [data, setData] = useState({});
    const [UserData, setUserData] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {

        (regreq.addUpdateLoading == "succeeded" ||
            regreq.loading == "idle") &&
            dispatch(loadRegRequest());

        setTimeout(() => dispatch(initLoader()), 5000);

    }, [regreq.addUpdateLoading]);

    const colums = [
        {
            headerName: "ID",
            field: "user_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: ("Name"),
            field: "name",
            description: "Name",
            sortable: true,
            filterable: true,
            type: "string",
        },
        {
            headerName: ("District"),
            field: "district",
            description: "District",
        },
        {
            headerName: ("Thana"),
            field: "thana",
            description: "Thana",
        },
        {
            headerName: ("Org Address"),
            field: "org_address",
            description: "Org Address",
        },
        {
            headerName: ("Mobile"),
            field: "mobile",
            description: "Mobile",
        },
        {
            headerName: ("Email"),
            field: "email",
            description: "Email",
        },
        {
            headerName: ("Reg Type"),
            field: "reg_type",
            description: "Reg Type",
        },
        {
            headerName: ("Reg Date"),
            field: "reg_date",
            description: "Reg Date",
        },
        {
            headerName: ("action"),
            field: "",
            hide: userReadOnly,
            type: "action",
            icons: ["preview", "delete"],
            colors: ["preview", "error"],
            descriptions: ["view", "Delete"],
            callBacks: [
                (user_id) => {
                    var data = rows.find((d) => d.user_id == user_id); 
                    setOpen(true); 
                    setUserData(data);
                },
                (user_id) => {
                    setRemove(true);
                    set_user_id(user_id);
                },
            ],
        },
    ];

    // let rows = regreq.list;
    let rows =[{"user_id":"1","name":"abdul","district":"dhaka","thana":"dhaka","org_address":"old dhaka","mobile":"01515232323","email":"ho@gamil.com","reg_type":"customer","reg_date":"19/08/23"}]


    return <Suspense fallback={<Loader />}>
        <>{regreq.addUpdateLoading != "idle" && (
            regreq.addUpdateLoading == "failed" ? (
                <Toast msg={regreq.msg} color="error" />
            ) : (
                <Toast color="success" icon="task_alt" msg={regreq.msg} />
            )
        )}
                <CardBody>
                    {
                              <DataGrid colums={colums} rows={rows} />
                        // regreq.loading == "succeeded" ? (
                        //     <DataGrid colums={colums} rows={rows} />
                        // ) : (
                        //     <Loader />
                        // )
                    }
                </CardBody>
            <RequestDelete open={remove} setOpen={setRemove} data={{ user_id }} />
            <RegReqModal open={open} setOpen={setOpen} data={data} />
        </>

    </Suspense>;
}