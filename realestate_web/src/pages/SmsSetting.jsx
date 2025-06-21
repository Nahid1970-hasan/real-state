import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { useState } from "react";  
import { SMSConfigGrid } from "../features/smsconfig/SMSConfigGrid";
import { SMSConfigModal } from "../features/smsconfig/SMSConfigModal";
import { Loading } from "../components/Loading";
import { initLoader, loadSMSConfig } from "../features/smsconfig/smsConfig_slice";
import { useLocation } from "react-router-dom";
export const SmsSetting = () => {
  const smsConfig = useSelector((state) => state.smsConfig);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false); 
  const [open, setOpen] = useState(false);

  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){dispatch(loadSMSConfig()); } 
    dispatch(
      loadPage({
        title: ("SMS Configuration"),
        button: isvalid,
        onClick: () => {
          setOpen(isvalid);
        },
        buttonText: "Add New", 
      })
    );
  }, [location]);

  useEffect(() => {
    smsConfig.loading == "pending"?  setIsLoading(true) : setTimeout(() =>  setIsLoading(false), 2000);
  }, [smsConfig.loading]);
  
  useEffect(() => {
    if (smsConfig.addUpdateLoading == "pending") {
      setIsLoading(true);
    } else if ( smsConfig.addUpdateLoading == "succeeded") {
      setIsLoading(false);
      setTimeout(() => { dispatch(initLoader());}, 5000);
    } else if (smsConfig.addUpdateLoading != "idle") {
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false) }, 5000);
    }
  }, [smsConfig.addUpdateLoading]);

  return smsConfig.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <SMSConfigGrid open={open} />
        </Flex>
      </Flex>
      <SMSConfigModal open={open} setOpen={setOpen} data ={{}}  add />
      <Loading open={isLoading}/>
    </>
  );
};


