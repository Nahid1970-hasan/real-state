import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { useState } from "react";
import { Loading } from "../components/Loading";
import { CustBankGrid } from "../features/custBankInfo/CustBankGrid";
import { loadCustBankInfo,initLoader } from "../features/custBankInfo/cust_bank_slice";
import { CustBankModal } from "../features/custBankInfo/CustBankModal";
import { useLocation } from "react-router-dom";

export const CustBankInfo = () => {
    const custBankInfo = useSelector((state) => state.custBankInfo);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
        if(isvalid){
            dispatch(loadCustBankInfo())
            setIsLoading(true);
        } 
        dispatch(
            loadPage({
                title: ("Bank Information"),
                button: isvalid,
                onClick: () => {
                   if(isvalid)setOpen(true);
                },
                buttonText: "Add New",
            })
        );
    }, [location]);


    useEffect(() => {
        custBankInfo.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [custBankInfo.loading]);

    useEffect(() => {
        if (custBankInfo.addUpdateLoading == "pending") {
            setIsLoading(true);
        } else if (custBankInfo.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadCustBankInfo());
            setTimeout(() => { dispatch(initLoader()); }, 5000);
        } else if (custBankInfo.addUpdateLoading != "idle") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 5000);
        }
    }, [custBankInfo.addUpdateLoading]);

    return custBankInfo.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>
            <Flex row>
                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                    <CustBankGrid />
                </Flex>
            </Flex>
            <CustBankModal open={open} setOpen={setOpen} data={{}} add />
            <Loading open={isLoading} />
        </>
    );
};


