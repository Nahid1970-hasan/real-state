import {  useState } from "react";
import {  useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { AdminBankModal } from "./AdminBankModal";
import { AdminBankInfoDelete } from "./AdminBankInfoDelete";
import { Toast } from "../../components/Toast";
export const AdminBankGrid = () => {
  const bankInfo = useSelector((state) => state.bankInfo);
  const userReadOnly = useSelector((state) => state.user.read_only);
  const [open, setOpen] = useState(false);
  const [bank_id, set_bank_id] = useState(0);
  const [remove, setRemove] = useState(false);
  const [data, setData] = useState({});


    
  const colums = [
    {
      headerName: "ID",
      field: "bank_id",
      key: true,
      type: "number",
      hide: true,
      sortable: false,
    },
    {
      headerName: ("Bank Name"),
      field: "bank_name",
      description: "Bank Name",
      sortable: true,
      filterable: true,
      type: "string",
      width:"200px"

    },
    {
      headerName: ("Short Name"),
      field: "bank_shortname",
      description: "Bank Short Name",
      width:"150px"
    },
    {
      headerName: ("Branch Name"),
      field: "branch_name",
      description: "Branch Name",
      width:"180px"
    },
    {
        headerName: ("Account No#"),
        field: "account_no",
        description: "Account Number",
        type:"number",
        alignment:"center",
        width:"180px"
      },
    {
        headerName: ("Bank Address"),
        field: "bank_address",
        description: "Bank Address",
      },
    {
      headerName: ("Routing Number"),
      field: "route_no",
      description: "Routing Number",
      type:"number",
      width:"150px"
    },
    {
        headerName: ("action"),
        field: "",
        hide: userReadOnly,
        type: "action",
        icons: ["edit", "delete"],
        colors: ["success", "error"],
        descriptions: ["Update", "Delete"],
        callBacks: [
          (bank_id) => {
            var data = bankInfo?.list?.find((d) => d.bank_id == bank_id);
            setOpen(true);
            setData(data);
          },
          (bank_id) => {
            setRemove(true);
            set_bank_id(bank_id);
          },
        ],
      },
   
  ];
 
  return (
      <>
      {(bankInfo.addUpdateLoading == "idle" || bankInfo.addUpdateLoading == "pending")?<></>: (
                bankInfo.addUpdateLoading == "succeeded" ? (
                    <Toast msg={bankInfo.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={bankInfo.msg} />
                )
            )}
        <DataGrid colums={colums} rows={bankInfo?.list || []} />
        
        <AdminBankModal open={open} setOpen={setOpen} data={data} />
        <AdminBankInfoDelete open={remove} setOpen={setRemove} data={{bank_id }} />
      </>

  );
};
