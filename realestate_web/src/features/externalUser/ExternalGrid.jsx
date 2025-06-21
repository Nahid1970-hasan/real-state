import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import {
  CardBody,
} from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { ExternalModal } from "./ExternalModal";
import { loadUserConfig } from "./external_Slice";
export const ExternalGrid = () => {
  const external = useSelector((state) => state.external);
  const userReadOnly = useSelector((state) => +state.user.read_only);
  const dispatch = useDispatch(); 
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false); 
 
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
      headerName: "Full Name",
      field: "fullname",
      description: "Full Name",
      sortable: true, 
      type: "string",
    },

    {
      headerName: "District",
      field: "district_name",
      description: "District",
      width:"180px"
    },
    {
      headerName: "Thana",
      field: "thana_name",
      description: "thana",
      width:"180px"
    },
    {
      headerName: "Address",
      field: "address",
      description: "Address",
    },
    {
      headerName: "Username",
      field: "username",
      type: "string",
      description: "Username",
      width:"150px"
    },
 
    {
      headerName: "status",
      field: "status",
      type: "state",
      description: "Status",
      width:"120px",
      alignment:"center"
    }, 
    {
      headerName: "action",
      field: "",
      type: "action",
      hide: userReadOnly,
      icons: ["edit" ],
      colors: ["success"],
      descriptions: ["Edit"],
      callBacks: [
        (user_id) => {
          var data = rows.find((d) => d.user_id == user_id);
          data.status = data.status.label; 
          setData(data);
          setOpen(true);
        }, 
      ],
    },
  ];

  let rows = external.list.map((d) => ({
    ...d,
    status: {
      label: d.status,
      color: d.status == "Approved" ? "success" : "error",
    },
  }));

  return (
    <Suspense fallback={<Loader />}>
      <>
        {(external.addUpdateLoading == "idle" || external.addUpdateLoading == "pending") ? <></> : (
          external.addUpdateLoading == "succeeded" ? (
            <Toast msg={external.msg} icon="task_alt" color="success" />
          ) : (
            <Toast color="error" msg={external.msg} />
          )
        )}

        <CardBody>
          <DataGrid colums={colums} rows={rows || []} />
        </CardBody>
        
        <ExternalModal open={open} setOpen={setOpen} data={data} />
      </>
    </Suspense>
  );
};
