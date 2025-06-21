import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { useState } from "react";
import { InvPaymentGrid } from "../features/invpayment/InvPaymentGrid";
import { InvPamentModal } from "../features/invpayment/InvPamentModal";
import { initLoader, loadInvPaymentConfig, loadInvPaymentRefData } from "../features/invpayment/inv_payment_Slice";
import { Loading } from "../components/Loading";
import { useLocation } from "react-router-dom";



export const InvPayment = () => {
  const invPaymentData = useSelector((state) => state.invpayment);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location= useLocation();

  useEffect(() => { 
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      dispatch(loadInvPaymentConfig());
    } 
    dispatch(
      loadPage({
        title: ("Payments"),
        button: isvalid,
        onClick: () => {
          if(isvalid){
            setOpen(true); 
            dispatch(loadInvPaymentRefData());
          }
        },
        buttonText: "New Payment",
        // buttonIcon: "add",
      })
    );
  }, [location]);



  useEffect(() => {
    invPaymentData.loading == "pending"? setIsLoading(true) : setTimeout(() =>  setIsLoading(false), 2000);
  }, [invPaymentData.loading]);
  
  
  useEffect(() => {
    if (invPaymentData.addUpdateLoading == "pending") {
      setIsLoading(true);
  } else if (invPaymentData.addUpdateLoading == "succeeded") {
        setIsLoading(false); 
        dispatch(loadInvPaymentConfig())
        setTimeout(() => { dispatch(initLoader());  }, 5000);
    } else if (invPaymentData.addUpdateLoading != "idle") {
        setTimeout(() => { setIsLoading(false); dispatch(initLoader()); }, 5000);
    }
}, [invPaymentData.addUpdateLoading]);

  return invPaymentData.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
     
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}> 
          <InvPaymentGrid />
        </Flex>
      </Flex>
      <InvPamentModal open={open} setOpen={setOpen} data ={{}} add />
      <Loading open={isLoading}/>
    </>
  );
};
