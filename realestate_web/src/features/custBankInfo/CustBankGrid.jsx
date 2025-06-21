import {  useState } from "react";
import { useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Toast } from "../../components/Toast";
import { CustBankModal } from "./CustBankModal";
import { CustBankDelete } from "./CustBankDelete";

export const CustBankGrid = () => {
  const custBankInfo = useSelector((state) => state.custBankInfo);
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
      width:"180px"
    },
    {
      headerName: ("Short Name"),
      field: "bank_shortname",
      description: "Bank Short Name",
      width:"130px"
    },
    {
      headerName: ("Branch Name"),
      field: "branch_name",
      description: "Branch Name",
      width:"130px"
    },
    {
        headerName: ("Account Number"),
        field: "account_no",
        description: "Account Number",
        type:"number",
        width:"150px",
        alignment:"center"
      },
   
    {
      headerName: ("Routing Number"),
      field: "route_no",
      description: "Routing Number",
      width:"120px",
      type:"number",
    },
    {
      headerName: ("Address"),
      field: "bank_address",
      description: "Bank Address",
      width:"250px"
    },
    {
        headerName: ("Action"),
        field: "",
        hide: userReadOnly,
        type: "action",
        icons: ["edit", "delete"],
        colors: ["success", "error"],
        descriptions: ["Edit", "Delete"],
        callBacks: [
          (bank_id) => {
            var data = custBankInfo?.list?.find((d) => d.bank_id == bank_id); 
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
       {(custBankInfo.addUpdateLoading == "idle" || custBankInfo.addUpdateLoading == "pending")?<></>: (
                custBankInfo.addUpdateLoading == "succeeded" ? (
                    <Toast msg={custBankInfo.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={custBankInfo.msg} />
                )
            )}
        <DataGrid colums={colums} rows={custBankInfo?.list || []} />
        <CustBankModal open={open} setOpen={setOpen} data={data} />
        <CustBankDelete open={remove} setOpen={setRemove} data={{bank_id }} />
      </>

  );
};
