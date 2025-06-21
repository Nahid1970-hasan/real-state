import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../components/DataGrid";
import { CardBody } from "../components/style/Card_styled";
import { Loader } from "react-feather";
import { loadPage } from "../features/page/page_slice";
import { loadInvBankInfoConfig,initLoader } from "../features/invcompanybank/inv_company_banl_Slice";
import { Loading } from "../components/Loading";

export const InvCompanyBank = () => {

    const invcompbankinfo = useSelector((state) => state.invcompbankinfo);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
  
    

    useEffect(() => {
        setIsLoading(true);
        dispatch(
            loadPage({
              title: ("Company Bank Information"),

            })
          );
        (invcompbankinfo.addUpdateLoading == "succeeded" ||
            invcompbankinfo.loading == "idle") &&
            dispatch(loadInvBankInfoConfig());

        setTimeout(() => dispatch(initLoader()), 5000);

    }, [invcompbankinfo.addUpdateLoading]);

    const colums = [
        {
            headerName: "ID",
            field: "project_id",
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
            width:"220px"
        },
        {
            headerName: ("Short Name"),
            field: "bank_shortname",
            description: "Short Name",
            width:"150px"
        },
        {
            headerName: ("Branch Name"),
            field: "bank_name",
            description: "Branch Name",
            width:"200px"
        },
        {
            headerName: ("Account Number"),
            field: "account_no",
            description: "Account Number",
            type:"number",
            width:"180px",
            alignment:"center"
        },
        {
            headerName: ("Routing No."),
            field: "route_no",
            description: "Routing Number",
            type:"number",
            width:"170px"
        },
        {
            headerName: ("Address"),
            field: "bank_address",
            description: "Address",
        },
        
    ];
    useEffect(() => {
        invcompbankinfo.loading != "pending" &&  setTimeout(() =>  setIsLoading(false), 2000);
      }, [invcompbankinfo.loading]);
    
    // let rows = invcompbankinfo.list;
    return <Suspense fallback={<Loader />}>
        <>
                <CardBody>
                    {
                        <DataGrid colums={colums} rows={invcompbankinfo.list||[]} />
                       
                    }
                </CardBody>
                <Loading open={isLoading}/>
            
        </>

    </Suspense>;
}