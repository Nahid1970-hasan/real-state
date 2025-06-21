import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Card, CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { saveAdminSettingsData, initLoader, loadAdminSetting } from "./admin_settings_slice";
import { Button, DownloadButton, PrimaryButton } from "../../components/Button";
import { useLocation } from "react-router-dom";



export const AdminSettingsGrid = () => {
    const adminConfigData = useSelector((state) => state.adminSettings);
    const user = useSelector((state) => state.user);
    const location= useLocation();
    const dispatch = useDispatch(); 
    const [dataRow, setDataRow] = useState([]);
    const [disabled, set_disabled] = useState(false);

    function getAllRows(allrows) {
        setDataRow(allrows);
    }

    const colums = [
        {
            headerName: "ID",
            field: "item_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: "Items",
            field: "item_name",
            description: "Item Name",
            sortable: true,
            filterable: true,
            type: "string",
        },
        {
            headerName: "Item value",
            field: "item_value",
            description: "Item Value",
            type: "input",
            width: "200px"
        },
        {
            headerName: "Item Unit",
            field: "item_unit",
            description: "Item Unit",
            type: "string",
            width: "250px"
        },

    ];
  
    useEffect(() => {
        if (adminConfigData.addUpdateLoading != "idle" && adminConfigData.addUpdateLoading != "pending" ){ 
          setTimeout(() => {set_disabled(false);}, 5000);
        }
      }, [adminConfigData.addUpdateLoading]);


    return <>
        {
            (adminConfigData.addUpdateLoading == "idle" || adminConfigData.addUpdateLoading == "pending") ? <></> : (
                adminConfigData.addUpdateLoading == "succeeded" ? (
                    <Toast msg={adminConfigData.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={adminConfigData.msg} />
                )
            )
        }

        <Suspense fallback={<Loader />}>
            <CardBody>
                <DataGrid colums={colums} rows={adminConfigData?.list ?? []} getAllRows={getAllRows} />
            </CardBody>
            <CardHeaderButton style={{ marginTop: "20px" }}>
                <PrimaryButton
                    type="submit"
                    onClick={() => {
                        var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
                        if(isvalid){
                            var item_json = {
                                item_json: dataRow
                            }
                            dispatch(saveAdminSettingsData(item_json));
                            set_disabled(true);
                        } 
                    }}
                    className={disabled ? "disabled-btn" : ""}
                    disabled={disabled}
                >
                    Save
                </PrimaryButton>
            </CardHeaderButton>
        </Suspense>
    </>;
}