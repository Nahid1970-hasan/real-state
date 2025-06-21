
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { loadInvViewprgs } from "./inv_progs_drop_Slice";
import { initLoader } from "../user/user_slice";

export const InvProgressGrid = ({ sub_project_id, setViewOpen, set_sub_project_id, setUserData }) => {
  const invviewprgs = useSelector(state => state.invviewprgs);
  const userReadOnly = useSelector((state) => state.user.read_only);
  const dispatch = useDispatch();
  // const [open, setOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => dispatch(initLoader()), 5000);
  }, [sub_project_id, invviewprgs.updateLoading]);

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
      field: "complete_date",
      description: "date",
      sortable: true,
      filterable: true,
      type: "date",
      // width:"250px"
    },
    {
      headerName: "Work Description",
      field: "works_detail",
      description: "Work Description",
      sortable: true,
      filterable: true,
      type: "string",
    },

  ];

  return (
    <Suspense fallback={<Loader />}>
      <>
        {invviewprgs.updateLoading != "idle" &&
          (invviewprgs.updateLoading == "failed" ? (
            <Toast msg={invviewprgs.msg} color="error" />
          ) : (
            <Toast color="success" icon="task_alt" msg={invviewprgs.msg} />
          ))}
        <DataGrid colums={colums} rows={invviewprgs.progresslist || []} />


      </>
    </Suspense>
  );
};
