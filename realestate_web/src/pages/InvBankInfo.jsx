import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { useState } from "react";  
import { Loading } from "../components/Loading";
import { InvBankGrid } from "../features/invBankInfo/InvBankGrid";
import { initLoader, loadInvBankInfo } from "../features/invBankInfo/inv_bank_slice";
import { InvBankModal } from "../features/invBankInfo/InvBankModal";
import { useLocation } from "react-router-dom";

export const InvBankInfo = () => {
    const invBank = useSelector((state) => state.invBank);
    const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); 
  const [open, setOpen] = useState(false);
  const [validuser, setValidUser] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname)||"");
    if(isvalid){ 
      setIsLoading(true);
      dispatch(loadInvBankInfo()); 
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
    invBank.loading == "pending"? setIsLoading(true) : setTimeout(() =>  setIsLoading(false), 2000);
  }, [invBank.loading]);

  useEffect(() => {
    if (invBank.addUpdateLoading == "pending") {
        setIsLoading(true);
    } else if (invBank.addUpdateLoading == "succeeded") { 
        setIsLoading(false);
        dispatch(loadInvBankInfo());
        setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (invBank.addUpdateLoading != "idle") { 
        setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 5000);
    }
}, [invBank.addUpdateLoading]);

  return invBank.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <InvBankGrid/>
        </Flex>
      </Flex>
      <InvBankModal open={open} setOpen={setOpen} data ={{}}  add />
      <Loading open={isLoading}/>
    </>
  );
};


