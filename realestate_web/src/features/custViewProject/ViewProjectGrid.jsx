
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { loadProjectInt } from "./cust_view_project_slice";

export const ViewProjectGrid = ({ type_id, setViewOpen, set_type_id, setUserData }) => {
  const viewproject = useSelector((state) => state.project);
  const userReadOnly = useSelector((state) => state.user.read_only);
  const dispatch = useDispatch();
  // const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   dispatch(loadProjectInt({ type_id }));
  //   setTimeout(() => dispatch(initLoader()), 5000);
  // }, [type_id, viewproject.updateLoading]);

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
      headerName: "Project Name",
      field: "project_name",
      description: "Project Name",
      sortable: true,
      filterable: true,
      type: "string",
    },

    {
      headerName: "Type",
      field: "type",
      description: "Type",
    },
    {
      headerName: "district",
      field: "district",
      description: "district",
    },

    {
      headerName: "thana",
      field: "thana",
      description: "thana",

    },
    {
      headerName: "Location",
      field: "location",
      description: "Location",
    },

    {
      headerName: "Apt/Pos",
      field: "apt",
      description: "Apt",
      hide: false,
    }, {
      headerName: "Available",
      field: "available",
      description: "Available",
    }, {
      headerName: "Start Date",
      field: "start_date",
      type: "date",
      description: "start_date",
    },
    {
      headerName: "End Date",
      field: "end_date",
      type: "date",
      description: "end_date",
    },

    {
      headerName: "Status",
      field: "status",
      type: "state",
      description: "status",
    },

    {
      headerName: "action",
      field: "",
      hide: userReadOnly,
      type: "action",
      icons: ["preview"],
      colors: ["preview"],
      descriptions: ["View"],
      callBacks: [

        (type_id) => {
          setViewOpen(true);
          let data = rows.find((d) => d.type_id == type_id);
          setUserData(data);
        },

      ],
    },
  ];

  let rows = viewproject.list.map((d) => ({
    ...d,
    status: {
      label: d.status,
      color: d.status == "Approved" ? "success" : "error",
    },
    allow_api: {
      label: d.allow_api ? "YES" : "NO",
      color: d.allow_api ? "success" : "error",
    },
    allow_rss_feed: {
      label: d.allow_rss_feed ? "YES" : "NO",
      color: d.allow_rss_feed ? "success" : "error",
    }
  }));


  return (
    <Suspense fallback={<Loader />}>
      <>
        {(viewproject.updateLoading == "idle" || viewproject.updateLoading == "pending") ? <></> : (
          viewproject.updateLoading == "succeeded" ? (
            <Toast msg={viewproject.msg} icon="task_alt" color="success" />
          ) : (
            <Toast color="error" msg={viewproject.msg} />
          )
        )}

        <DataGrid colums={colums} rows={rows} />

      </>
    </Suspense>
  );
};
