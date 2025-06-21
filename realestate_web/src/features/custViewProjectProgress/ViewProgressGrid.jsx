
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { loadProgress ,initLoader} from "./progress_Slice";

export const ViewProgressGrid = ({ sub_project_id, setViewOpen, set_sub_project_id, setUserData }) => {
  const vprogress = useSelector((state) => state.vprogress);
  const userReadOnly = useSelector((state) => state.user.read_only);
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(loadProgress({ sub_project_id })); 
  }, []);



  const colums = [
    {
      headerName: "ID",
      field: "sub_project_id",
      key: true,
      type: "number",
      hide: true,
      sortable: false,
    },
    {
      headerName: "Date",
      field: "date",
      description: "date",
      sortable: true,
      filterable: true,
      type: "string",
    },
    {
        headerName: "Work Description",
        field: "work_des",
        description: "Work description",
        sortable: true,
        filterable: true,
        type: "string",
      },

  ];

let rows = vprogress.list;
  return (
    <Suspense fallback={<Loader />}>
      <>
      {(vprogress.updateLoading == "idle" || vprogress.updateLoading == "pending") ? <></> : (
          vprogress.updateLoading == "succeeded" ? (
            <Toast msg={vprogress.msg} icon="task_alt" color="success" />
          ) : (
            <Toast color="error" msg={vprogress.msg} />
          )
        )}
         <DataGrid colums={colums} rows={rows} />

      </>
    </Suspense>
  );
};
