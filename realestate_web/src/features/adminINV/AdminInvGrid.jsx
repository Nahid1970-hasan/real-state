
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { CardBody} from "../../components/style/Card_styled";
import { Toast } from "../../components/Toast";
import { useState } from "react";
import { AdminInvDelete } from "./AdminInvDelete";
import { AdminInvModal } from "./AdminInvModal";
import { AdminInvACKModal } from "./AdminInvACKModal";
import { AdminInvSubmit, adminRefresh } from "./admin_inv_slice";
import { AddWalletInvestment } from "./AddWalletInvestment";
import { AdminInvView } from "./AdminInvView";

export const AdminInvGrid = ({ setViewOpen, setUserData }) => {

    const adminInv = useSelector((state) => state.adminInv);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [view, setView] = useState(false);
    const [share_id, set_share_id] = useState(0);
    const [project_id, set_project_id] = useState(0);
    const [total_amount, set_total_amount] = useState(0);
    const [acknowledge, setAcknowledge] = useState(false);
    const [addMoney, setAddmoney] = useState(false);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
 

    const colums = [
        {
            headerName: "ID",
            field: "share_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: ("Project Name"),
            field: "project_name",
            description: "Project Name",
            sortable: true,
            filterable: true,
            type: "string",
            width:"220px"
        },
        {
            headerName: ("Type"),
            field: "type_name",
            description: "Type Name",
            width:"150px"
        },
        {
            headerName: ("Location"),
            field: "popular_loc",
            description: "Location",
            width:"120px",
            hide:true
        },
        {
            headerName: ("Shares"),
            field: "buy_share",
            description: "Shares Bought",
            width:"90px",
            type:"number",
            alignment:"center",
        },
        {
            headerName: ("Price/Share"),
            field: "unit_price",
            description: "Price/Share",
            width:"120px",
            type:"currency"
        },
        {
            headerName: ("Amount"),
            field: "total_amount",
            description: "Total Investment",
            width:"150px",
            type:"currency"
        },
        
        {
            headerName: ("Verified"),
            field: "buy_submitted",
            description: "Submitted",
            width:"90px",
            alignment:"center"
        },
        {
            headerName: ("Approved"),
            field: "buy_approved",
            description: "Approved",
            width:"90px",
            alignment:"center"
        },
        {
            headerName: ("action"),
            field: "",
            hide: userReadOnly,
            type: "custaction", 
            icons: [
                {
                    icon:"edit",
                    color:"success",
                    hoverDesc:"Edit"
                },
                {
                    icon:"check",
                    color:"success",
                    hoverDesc:"Acknowledge"
                },
                {
                    icon:"check",
                    color:"success",
                    hoverDesc:"Approve"
                },
                {
                    icon:"preview",
                    color:"preview",
                    hoverDesc:"View Details"
                } ,
                {
                    icon:"delete",
                    color:"error",
                    hoverDesc:"Delete"
                }, 
               
                
            ], 
            callBacks: [
                (share_id) => {
                    var rowdata = rows.find((d) => d.share_id == share_id);
                    setOpen(true);
                    dispatch(adminRefresh());
                    dispatch(AdminInvSubmit({project_id: rowdata.project_id}));
                    setData(rowdata);
                },
                (share_id) => {
                    var data = rows.find((d) => d.share_id == share_id);
                    setAcknowledge(true);
                    set_share_id(share_id);
                    set_project_id(data.project_id);
                },
                (share_id) => {
                    var data = rows.find((d) => d.share_id == share_id);
                    setAddmoney(true);
                    set_share_id(share_id);
                    setData(data);
                },
                (share_id) => {
                    var detailsdata = rows.find((d) => d.share_id == share_id);
                    setData(detailsdata);
                    setView(true);
                },
                (share_id) => {
                    var deletedata = rows.find((d) => d.share_id == share_id);
                    setRemove(true);
                    set_share_id(share_id);
                    set_project_id(deletedata.project_id);
                },
               
                
            ],
        },
    ];
    let rows = adminInv?.list?.map((d) => ({
        ...d,
        actiontype:[d.buy_submitted != "Yes", d.buy_submitted != "Yes", d.buy_submitted=="Yes"&& d.buy_approved != "Yes",d.buy_submitted || d.buy_approved == "Yes", d.buy_submitted != "Yes"] ,
      }))||[];
   
    return (
        <>
        {(adminInv.addUpdateLoading == "idle" || adminInv.addUpdateLoading == "pending") ? <></> : (
        adminInv.addUpdateLoading == "succeeded" ? (
          <Toast msg={adminInv.msg} icon="task_alt" color="success" />
        ) : (
          <Toast color="error" msg={adminInv.msg} />
        )
      )}
            <CardBody>
                 <DataGrid colums={colums} rows={rows} /> 
            </CardBody>
            <AdminInvDelete open={remove} setOpen={setRemove} data={{"share_id":share_id,"project_id":project_id}} />
            <AdminInvModal open={open} setOpen={setOpen} data ={data} />
            <AdminInvACKModal open={acknowledge} setOpen={setAcknowledge} data={{ "share_id":share_id, "project_id":project_id}} />
            <AddWalletInvestment  open={addMoney} setOpen={setAddmoney} data={{ "share_id":data.share_id, "project_id":data.project_id, "buy_share":data.buy_share, "total_amount":data.total_amount}} />
            <AdminInvView open={view} setOpen={setView} data={data} />
        </>

   );
}