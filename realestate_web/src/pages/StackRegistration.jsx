import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { useState } from "react";  
import { StackRegistrationGrid } from "../features/stackRegistration/StackRegistrationGrid";
import { approveLoader, initLoader, loadRegistration } from "../features/stackRegistration/stack_registration_slice";
import { Loading } from "../components/Loading";
import { Toast } from "../components/Toast";
import { useLocation } from "react-router-dom";
export const StackRegistrationPage = () => {
  const stackRegData = useSelector((state) => state.stackRegistration);
  const dispatch = useDispatch(); 
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const location= useLocation();

  useEffect(() => {  
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      dispatch(loadRegistration());
    }
    dispatch(
      loadPage({
        title: ("View Registration"),
      })
    );
   
  }, [location]);
 
  
  useEffect(() => {
    stackRegData.loading == "pending"? setIsLoading(true) :  setTimeout(() =>  setIsLoading(false), 2000);
  }, [stackRegData.loading]);

  useEffect(() => {
    if(stackRegData.approveLoading == "pending"){
      setIsLoading(true)
    }else if (stackRegData.approveLoading == "succeeded") { 
        setIsLoading(false);
        dispatch(loadRegistration());
        setTimeout(() => { dispatch(approveLoader());  }, 5000);
    } else if (stackRegData.approveLoading != "idle") {
        setIsLoading(false)
        setTimeout(() => { dispatch(approveLoader()); }, 5000);
    }
}, [stackRegData.approveLoading]);

useEffect(() => {
  if(stackRegData.addUpdateLoading == "pending"){
    setIsLoading(true)
  }else if (stackRegData.addUpdateLoading == "succeeded") {
    setIsLoading(false);
    dispatch(loadRegistration());
    setTimeout(() => { dispatch(initLoader()); }, 5000);
  } else if (stackRegData.addUpdateLoading != "idle") {
      setIsLoading(false)
      setTimeout(() => { dispatch(initLoader()); }, 5000);
  }
}, [stackRegData.addUpdateLoading]);
 

  return stackRegData.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
    {(stackRegData.approveLoading == "idle" || stackRegData.approveLoading == "pending") ? <></> : (
      stackRegData.approveLoading == "succeeded" ? (
        <Toast msg={stackRegData.msg} icon="task_alt" color="success" />
      ) : (
        <Toast color="error" msg={stackRegData.msg} />
      )
    )}
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <StackRegistrationGrid />
        </Flex>
      </Flex>
      <Loading open={isLoading}/>
    </>
  );
};


