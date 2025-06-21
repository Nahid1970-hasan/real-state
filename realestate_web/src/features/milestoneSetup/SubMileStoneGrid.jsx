import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Card, CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { Button, DownloadButton, PrimaryButton } from "../../components/Button";
import { loadPage } from "../page/page_slice";



export const SubMileStoneGrid = () => {

    const dispatch = useDispatch();
    const [dataRow, setDataRow] = useState([]);
    const [dData, setDData] = useState([]);
    const [disabled, set_disabled] = useState(false);

    useEffect(() => { 
        dispatch(loadPage({ title: "Milestone Setup", button: false }));
      }, []);
    
    useEffect(()=>{ setDData(rows)},[])
    const columsSUB = [
        {
            headerName: "SL#",
            field: "sub_id",
            key: true,
            type: "number",
            sortable: false,
            width: "80px"
        },
        {
            headerName: "Works",
            field: "works_details",
            description: "works detail",
            type: "custinput",
            width: "300px"
        },
        
    ];

    function getAllRows(allrows) {
        setDataRow(allrows);
    }
    let rows = {
        list:[
            { "sub_id": 1, "works_details": "work1" }
        ]
    }


    return <>
        <Suspense fallback={<Loader />}>
            <CardBody> 
               <DataGrid colums={columsSUB} rows={dData?.list ?? []} getAllRows={getAllRows} />
            </CardBody>
            <CardHeaderButton style={{ marginTop: "20px" }}>
                <PrimaryButton
                    type="button"
                    onClick={() => {
                        var item_json = {
                            item_json: dataRow
                        }
                        console.log(dataRow);
                    }}
                    className={disabled ? "disabled-btn" : ""}
                    disabled={disabled}
                >
                    Submit
                </PrimaryButton>
            </CardHeaderButton>
        </Suspense>
    </>;
}