import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { CardBody } from "../../components/style/Card_styled";
import { initLoader, loadStackInvvestmnet, loadStackPayment, loadStackProperty, loadStakeholderDetail } from "./stackholder_info_slice";
import { ViewStackholderModal } from "./StackDetailsInfo";

import { StackInvInfoModal } from "./StackInvInfo";
import { StackPropertyInfoModal } from "./StackPropertyInfo";
import { StackPaymentInfoModal } from "./StackPaymentInfo";
import styled from "styled-components";

const Scroll = styled.div`
overflow:hidden scroll;
height: 580px;
`;

export const ViewStackholderGrid = () => {
  const stackInfoData = useSelector((state) => state.stackInfo);
  const userReadOnly = useSelector((state) => state.user.read_only);
  const [type, setType] = useState("");
  const [Open, setOpen] = useState(false);
  const [PayOpen, setPayOpen] = useState(false);
  const [InvOpen, setInvOpen] = useState(false);
  const [ProOpen, setProOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [payData, setPayData] = useState({});
  const [invData, setinvData] = useState({});
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
      sortable: true,
      filterable: true,
      type: "string"
    },
    {
      headerName: "district",
      field: "district_name",
      description: "District",
      width: "110px"
    },

    {
      headerName: "Mobile",
      field: "mobile_no",
      description: "Mobile",
      width: "130px"
    },
    {
      headerName: "email",
      field: "email",
      description: "Email",
      type: "email",
    },
    {
      headerName: "Type",
      field: "req_type",
      description: "Request Type",
      width: "120px"
    },


    {
      headerName: ("action"),
      field: "",
      hide: userReadOnly,
      type: "custaction",
      icons: [
        {
          icon: "preview",
          color: "preview",
          hoverDesc: "View Stackholder"
        },
        {
          icon: "payments",
          color: "payment",
          hoverDesc: "View Payment"
        },
        {
          icon: "credit_card",
          color: "success",
          hoverDesc: "View Investment"
        },
        {
          icon: "real_estate_agent",
          color: "property",
          hoverDesc: "View Property"
        },
      ],
      callBacks: [
        (user_id) => {
          dispatch(loadStakeholderDetail({ user_id }));
          setOpen(true);

        },
        (user_id) => {
          dispatch(loadStackPayment({ user_id }));
          var data = rows.find((d) => d.user_id == user_id);
          setPayOpen(true);
          setPayData(data);
        },
        (user_id) => {
          dispatch(loadStackInvvestmnet({ user_id }));
          var data = rows.find((d) => d.user_id == user_id);
          setInvOpen(true);
          setinvData(data);
        },
        (user_id) => {
          dispatch(loadStackProperty({ user_id }));
          var data = rows.find((d) => d.user_id == user_id);
          setProOpen(true);
          setinvData(data);
        },
      ],
    },
  ];
  let rows = stackInfoData?.list.map((d) => ({
    ...d,
    req_type: d.req_type == "INV-CUST" ? "BOTH" : d.req_type,
    actiontype: [true, true, d.req_type != "CUSTOMER", d.req_type != "INVESTOR"]
  })) || [];

  return (
    <Suspense fallback={<Loader />}>
      <>
        {(stackInfoData.addUpdateLoading == "idle" || stackInfoData.addUpdateLoading == "pending") ? <></> : (
          stackInfoData.addUpdateLoading == "succeeded" ? (
            <Toast msg={stackInfoData.msg} icon="task_alt" color="success" />
          ) : (
            <Toast color="error" msg={stackInfoData.msg} />
          )
        )}

        <CardBody>
          <Scroll>
            <DataGrid colums={colums} rows={rows || []} />
          </Scroll>
        </CardBody>
        <ViewStackholderModal
          open={Open}
          setOpen={setOpen}
          newInitValues={userData}
        />
        <StackPaymentInfoModal open={PayOpen} setOpen={setPayOpen} data={payData} />
        <StackInvInfoModal open={InvOpen} setOpen={setInvOpen} data={invData} />
        <StackPropertyInfoModal open={ProOpen} data={{ select_user_id: userData.user_id || 0 }} setOpen={setProOpen} />
      </>
    </Suspense>
  );
};
