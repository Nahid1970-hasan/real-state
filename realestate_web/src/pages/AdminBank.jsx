import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { useState } from "react";  
import { Loading } from "../components/Loading";
import { AdminBankGrid } from "../features/bankInfo/AdminBankGrid";
import { loadBankInfo,initLoader } from "../features/bankInfo/admin_bank_info_slice";
import { AdminBankModal } from "../features/bankInfo/AdminBankModal";
import { useLocation } from "react-router-dom";

export const AdminBankInfo = () => {
  const bankInfo = useSelector((state) => state.bankInfo);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); 
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const location= useLocation();

  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      dispatch(loadBankInfo())
    }
  
    dispatch(
      loadPage({
        title: ("Bank Information"),
        button: isvalid,
        onClick: () => {
          if(isvalid){
            setOpen(true);
          }
          
        },
        buttonText: "Add New", 
      })
    );
  }, [location]);

  useEffect(() => {
    bankInfo.loading == "pending"? setIsLoading(true) : setTimeout(() =>  setIsLoading(false), 2000);
  }, [bankInfo.loading]);

  useEffect(() => {
    if (bankInfo.addUpdateLoading == "pending") {
        setIsLoading(true);
    } else if (bankInfo.addUpdateLoading == "succeeded") { 
        setIsLoading(false);
        dispatch(loadBankInfo());
        setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (bankInfo.addUpdateLoading != "idle") { 
        setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 5000);
    }
}, [bankInfo.addUpdateLoading]);
   
  return bankInfo.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <AdminBankGrid />
        </Flex>
      </Flex>
      <AdminBankModal open={open} setOpen={setOpen} data ={{}}  add />
      <Loading open={isLoading}/>
    </>
  );
};


