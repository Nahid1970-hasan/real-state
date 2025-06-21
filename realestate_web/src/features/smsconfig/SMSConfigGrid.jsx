import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import DataGrid from "../../components/DataGrid";
import {
  Card,
  CardBody,
  CardHeaderButton,
} from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { loadSMSConfig, initLoader } from "./smsConfig_slice";
import { SMSConfigModal } from "./SMSConfigModal";
import { SMSConfigDelete } from "./SMSConfigDelete";

export const SMSConfigGrid = () => {
  const smsConfig = useSelector((state) => state.smsConfig);
  const userReadOnly = useSelector((state) => state.user.read_only);
  const dispatch = useDispatch();
  const [remove, setRemove] = useState(false);
  const [config_id, set_config_id] = useState(0);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    smsConfig.addUpdateLoading == "succeeded" && dispatch(loadSMSConfig());
  }, [smsConfig.addUpdateLoading]);
    
  const colums = [
    {
      headerName: "ID",
      field: "config_id",
      key: true,
      type: "number",
      hide: true,
      sortable: false,
    },
    {
      headerName: ("Company Name"),
      field: "company_name",
      description: "Company Name",
      sortable: true,
      filterable: true,
      type: "string",
      width: "230px"
    },
    {
      headerName: ("Base URL"),
      field: "base_url",
      description: "Base URL",
    },
    {
      headerName: ("Username"),
      field: "gateway_username",
      description: "Username",
      width: "150px"
    },
    {
      headerName: ("Password"),
      field: "gateway_password",
      description: "Password",
      width: "100px",
      hide: true,
    },
    {
      headerName: ("API Key"),
      field: "gateway_api_key",
      description: "Api Key",
      width: "150px"
    },
    {
      headerName: ("Sender Id"),
      field: "gateway_sender_id",
      type: "string",
      description: "Sender Id",
      width: "150px"
    },
    {
      headerName: ("Type"),
      field: "sms_type",
      description: "SMS Type",
      width: "150px"
    },
    {
      headerName: ("Stock"),
      field: "sms_stock",
      type: "number",
      description: "SMS Stock",
      width: "80px"

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
        (config_id) => {
          var data = rows.find((d) => d.config_id == config_id);
          setOpen(true);
          setData(data);
        },
        (config_id) => {
          setRemove(true);
          set_config_id(config_id);
        },
      ],
    },
  ];
 
  let rows = smsConfig?.list || [];

  return (
    <Suspense fallback={<Loader />}>
      <>
      {(smsConfig.addUpdateLoading == "idle" || smsConfig.addUpdateLoading == "pending") ? <></> : (
          smsConfig.addUpdateLoading == "succeeded" ? (
            <Toast msg={smsConfig.msg} icon="task_alt" color="success" />
          ) : (
            <Toast color="error" msg={smsConfig.msg} />
          )
        )}
        
        <CardBody>
          <DataGrid colums={colums} rows={rows} /> 
        </CardBody>
        <SMSConfigDelete open={remove} setOpen={setRemove} data={{config_id }} />
        <SMSConfigModal open={open} setOpen={setOpen} data={data} />
      </>
    </Suspense>
  );
};
