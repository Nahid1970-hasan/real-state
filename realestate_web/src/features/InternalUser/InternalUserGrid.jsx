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
import { loadInternalUserConfig } from "./internal_user_Slice";
import { InternalUserModal } from "./InternalUserModal";
import { UserRolemodal } from "../externalUser/UserRolemodal";
import { loadUserRole } from "../externalUser/userRole_slice";
import { InternalUserEdit } from "./InternalUserEdit";
import { InternalUserDelete } from "./InternalUserDelete";

export const InternalUserGrid = () => {
  const userConfig = useSelector((state) => state.internal);
  const userReadOnly = useSelector((state) => +state.user.read_only);
  const dispatch = useDispatch();
  const [remove, setRemove] = useState(false);
  const [user_id, set_user_id] = useState(0);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  
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
      filterable: true,
      type: "string",
    },
    {
      headerName: "Nick Name",
      field: "nickname",
      description: "Nick Name",
    },
    {
      headerName: "Designation",
      field: "designation",
      description: "Designation",
    },
    {
      headerName: "Contact Number",
      field: "mobile_no",
      description: "Contact Number",
    },
    {
      headerName: "Email",
      field: "email",
      description: "Email",
    },
    {
      headerName: "Status",
      field: "status",
      type: "state",
      description: "Status",
      alignment:"center",
      width:"120px"
    },


    {
      headerName: "action",
      field: "",
      type: "action",
      hide: userReadOnly,
      icons: ["edit", "settings", "delete"],
      colors: ["success", "warning", "error"],
      descriptions: ["Edit", "Settings", "Delete"],
      callBacks: [
        (user_id) => {
          var data = rows.find((d) => d.user_id == user_id);
          data.status = data.status.label;
          setData(data);
          setOpen(true);
        },
        (user_id) => {
          setSettingOpen(true);
          dispatch(loadUserRole({ role_user_id: user_id }));
          set_user_id(user_id);
        },
        (user_id) => {
          setRemove(true);
          set_user_id(user_id);
        },
      ],
    },
  ];

  let rows = userConfig.list.map((d) => ({
    ...d,
    status: {
      label: d.status,
      color: d.status == "Approved" ? "success" : "error",
    },
  }));

  return (<>
    {(userConfig.addUpdateLoading == "idle" || userConfig.addUpdateLoading == "pending") ? <></> : (
      userConfig.addUpdateLoading == "succeeded" ? (
        <Toast msg={userConfig.msg} icon="task_alt" color="success" />
      ) : (
        <Toast color="error" msg={userConfig.msg} />
      )
    )}
    <Suspense fallback={<Loader />}>
      <CardBody>
        <DataGrid colums={colums} rows={rows || []} />
      </CardBody>
      <UserRolemodal open={settingOpen} setOpen={setSettingOpen} data={{ role_user_id: user_id }} />
      <InternalUserEdit open={open} setOpen={setOpen} data={data} />
      <InternalUserDelete open={remove} setOpen={setRemove} data={{ user_id }} />

    </Suspense>

  </>);
}