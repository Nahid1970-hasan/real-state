import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { useState } from "react";
import { ViewpaymentGrid } from "../features/custPayment/CustPaymentGrid";
import {CustPaymentModal} from "../features/custPayment/CustPaymentModal";
import { initLoader, loadCustPaymentInfo, loadNewCustPayment } from "../features/custPayment/cust_payment_slice";
import { Loading } from "../components/Loading";
import { Toast } from "../components/Toast";
import { useLocation } from "react-router-dom";



export const CustPaymentPage = () => {
  const user = useSelector((state) => state.user);
  const custPayment = useSelector((state) => state.custPayemntData);
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { 
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      dispatch(loadCustPaymentInfo());
    } 
    dispatch(
      loadPage({
        title: ("Payments"),
        button: isvalid,
        onClick: () => {
          if(isvalid){
            setOpen(true);
            dispatch(loadNewCustPayment()); 
          } 
        },
        buttonText: "New Payment", 
      })
    );
  }, []);
  useEffect(() => {
    custPayment.loading == "pending" ? setIsLoading(true) : setTimeout(() =>  setIsLoading(false), 2000);
  }, [custPayment.loading]);
 
  useEffect(() => {
    if (custPayment.addUpdateLoading == "pending") {
        setIsLoading(true);
    } else if (custPayment.addUpdateLoading == "succeeded") {
        setIsLoading(false);
        dispatch(loadCustPaymentInfo()); 
        setTimeout(() => {dispatch(initLoader());}, 5000);
    } else if (custPayment.addUpdateLoading != "idle") {
        setTimeout(() => { setIsLoading(false); dispatch(initLoader()); }, 5000);
    }
}, [custPayment.addUpdateLoading]);

  return custPayment.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
    {(custPayment.addUpdateLoading  == "idle" || custPayment.addUpdateLoading  == "pending") ? <></> : (
          custPayment.addUpdateLoading == "succeeded" ? (
            <Toast msg={custPayment.msg} icon="task_alt" color="success" />
          ) : (
            <Toast color="error" msg={custPayment.msg} />
          )
        )}  
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <ViewpaymentGrid />
        </Flex>
      </Flex>
      <CustPaymentModal open={open} setOpen={setOpen} data ={{}} add />
      <Loading open={isLoading}/>
    </>
  );
};
