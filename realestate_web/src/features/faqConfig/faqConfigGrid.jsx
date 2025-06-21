import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Card, CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import {
    loadfaqConfig,
    initLoader,
} from "./faqConfig_slice";
import { FaqConfigDelete } from "./FaqConfigDelete";
import { FaqConfigModal } from "./FaqConfigModal";

export const FaqConfigGrid = () => {

    const faqConfig = useSelector((state) => state.faqConfig);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [faq_id, set_faq_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {

        (faqConfig.addUpdateLoading == "succeeded" ||
        faqConfig.loading == "idle") &&
            dispatch(loadfaqConfig());

        setTimeout(() => dispatch(initLoader()), 5000);

    }, [faqConfig.addUpdateLoading]);

    const colums = [
        {
            headerName: "ID",
            field: "faq_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: ("Question"),
            field: "question",
            description: "Question",
            sortable: true,
            filterable: true,
            type: "string",
            width:"500px"
        }, 
        {
            headerName: ("Answer"),
            field: "answer",
            description: "Answer",
           
        },

        {
            headerName: ("Action"),
            field: "",
            hide: userReadOnly,
            type: "action",
            icons: ["edit", "delete"],
            colors: ["update", "error"],
            descriptions:[ "update","delete"],
            callBacks: [
                (faq_id) => {
                    var rowdata = rows.find((d) => d.faq_id == faq_id);
                    console.log(rowdata); 
                    setOpen(true); 
                    setData(rowdata);
                },
                (faq_id) => {
                    setRemove(true);
                    set_faq_id(faq_id);
                },
            ],
        },
    ];

    let rows =faqConfig.list;

    return <Suspense fallback={<Loader />}>
        <>{faqConfig.addUpdateLoading != "idle" && (
            faqConfig.addUpdateLoading == "failed" ? (
                <Toast msg={faqConfig.msg} color="error" />
            ) : (
                <Toast color="success" icon="task_alt" msg={faqConfig.msg} />
            )
        )}
                <CardBody>
                    <DataGrid colums={colums} rows={rows} />
                </CardBody>
            <FaqConfigDelete open={remove} setOpen={setRemove} data={{ faq_id }} />
            <FaqConfigModal open={open} setOpen={setOpen} data={data} />
        </>

    </Suspense>;
}