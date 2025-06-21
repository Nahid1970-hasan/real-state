import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { CardBody } from "../../components/style/Card_styled";
import { StackRegistrationModal } from "./StackRegistrationModal";
import { StackRegistrationDelete } from "./StackRegistrationDelete";
import { Loading } from "../../components/Loading";
import { initDetailsLoader, loadRegisterDetail } from "./stack_registration_slice";

export const StackRegistrationGrid = () => {
  const stackRegData = useSelector((state) => state.stackRegistration);
  const userReadOnly = useSelector((state) => state.user.read_only);
  const [type, setType] = useState("");
  const [Open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [remove, setRemove] = useState(false);
  const [user_id, set_user_id] = useState(0);
  const dispatch = useDispatch();

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
      headerName: "Name",
      field: "fullname",
      description: "Name",
      width: "180px"
    },
    {
      headerName: "district",
      field: "district_name",
      description: "District",
      width: "110px"
    },
    {
      headerName: "thana",
      field: "thana_name",
      description: "Thana",
      hide: true,
    },
    {
      headerName: "address",
      field: "address",
      hide: false,
      description: "Address",
    },
    {
      headerName: "Mobile",
      field: "mobile_no",
      description: "Mobile",
      width: "150px"
    },
    {
      headerName: "email",
      field: "email",
      type: "email",
      description: "Email",
      width: "200px"
    },
    {
      headerName: "Type",
      field: "type",
      description: "Type",
      width: "130px"
    },

    {
      headerName: "Registration Date",
      field: "reg_date",
      type: "date",
      description: "Registration Date",
      width: "180px"
    },

    {
      headerName: "action",
      field: "",
      hide: userReadOnly,
      type: "action",
      icons: ["preview", "delete"],
      colors: ["preview", "error"],
      descriptions: ['Details', "Delete"],
      callBacks: [
        (user_id) => { 
          dispatch(loadRegisterDetail({"user_id" : user_id }));
          dispatch(initDetailsLoader());
          var data = rows.find((d) => d.user_id == user_id);
          setOpen(true);
          setUserData(data);
        },
        (user_id) => {
          setRemove(true);
          set_user_id(user_id);
        },
      ],
    },
  ];

  let rows = stackRegData.list.map((d) => ({
    ...d,
    type: d.req_type == "INV-CUST" ? "BOTH" : d.req_type
  }));
 
  return (<>
    {(stackRegData.addUpdateLoading == "idle" || stackRegData.addUpdateLoading == "pending") ? <></> : (
      stackRegData.addUpdateLoading == "succeeded" ? (
        <Toast msg={stackRegData.msg} icon="task_alt" color="success" />
      ) : (
        <Toast color="error" msg={stackRegData.msg} />
      )
    )}
    <Suspense fallback={<Loader />}>

      <CardBody>
        <DataGrid colums={colums} rows={rows || []} />
      </CardBody>
      <StackRegistrationModal
        open={Open}
        setOpen={setOpen}
        newInitValues={userData}
      />
      <StackRegistrationDelete open={remove} setOpen={setRemove} data={{ user_id }} />

    </Suspense>
  </>
  );
};
