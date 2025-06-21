import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBankInfoConfig, initLoader } from "../features/compbankinfo/comp_bank_info_slice";
import DataGrid from "../components/DataGrid";
import { CardBody } from "../components/style/Card_styled";
import { Loader } from "react-feather";
import { loadPage } from "../features/page/page_slice";
import { Loading } from "../components/Loading";
import { useLocation } from "react-router-dom";

export const CustComBankInfoPage = () => {

    const compbankinfo = useSelector((state) => state.compbankinfo); 
    const user = useSelector((state) => state.user); 
    const dispatch = useDispatch();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
        if(isvalid){
            dispatch(loadBankInfoConfig())
        dispatch(
            loadPage({
                title: ("Company Bank Information"),
            })
        );
        }
        
    }, [location]);

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
            description: "Short Name",
            width:"130px"
        },
        {
            headerName: ("Account Number"),
            field: "account_no",
            width:"150px",
            description: "Account Number",
            type:"number",
            alignment:"center"
        },
        {
            headerName: ("Routing Number"),
            field: "route_no",
            width:"130px",
            description: "Routing Number",
            type:"number"
        },
        {
            headerName: ("Address"),
            field: "bank_address",
            description: "Bank Address",
            width:"250px"
        },

    ];

      useEffect(() => {
        compbankinfo.loading == "pending"? setIsLoading(true) : setTimeout(() =>  setIsLoading(false), 2000);
      }, [compbankinfo.loading]);

    return <Suspense fallback={<Loader />}>
        <>
            <CardBody> 
                <DataGrid colums={colums} rows={compbankinfo.list || []} />  
            </CardBody>
            <Loading open={isLoading}/>
        </>

    </Suspense>;
}