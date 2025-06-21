import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Card } from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import {
    loadFaq,
    initLoader,
} from "./pub_faq_slice";

export const PubFaqGrid= () => {

    const pubFaqData = useSelector((state) => state.pubFaqData);
    const dispatch = useDispatch();

    useEffect(() => {

        (pubFaqData.addUpdateLoading == "succeeded" ||
        pubFaqData.loading == "idle") &&
            dispatch(loadFaq());

        setTimeout(() => dispatch(initLoader()), 5000);

    }, [pubFaqData.addUpdateLoading]);

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
            discription: "question",
            sortable: true,
            filterable: true,
            type: "string",
        }, 
        {
            headerName: ("Answer"),
            field: "answer",
           
        },


    ];

    let rows =pubFaqData.list;

    return <Suspense fallback={<Loader />}>
        <>{pubFaqData.addUpdateLoading != "idle" && (
            pubFaqData.addUpdateLoading == "failed" ? (
                <Toast msg={pubFaqData.msg} color="error" />
            ) : (
                <Toast color="success" icon="task_alt" msg={pubFaqData.msg} />
            )
        )}
            <Card>
                
                    <DataGrid colums={colums} rows={rows} />
                
            </Card>
        </>

    </Suspense>;
}