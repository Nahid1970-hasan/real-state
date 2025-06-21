import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { useState } from "react";
import { EmailConfigGrid } from "../features/emailConfig/EmailConfigGrid";
import { EmailConfigModal } from "../features/emailConfig/EmailConfigModal";
import { Loading } from "../components/Loading";
import { initLoader, loadEmailConfig } from "../features/emailConfig/emailConfig_slice";
import { useLocation } from "react-router-dom";

export const EmailSetting = () => {
  const emailConfig = useSelector((state) => state.emailConfig);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
   
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){ dispatch(loadEmailConfig()); }
    dispatch(
      loadPage({
        title: ("Email Configuration"),
        button: isvalid,
        onClick: () => {
          setOpen(isvalid);
        },
        buttonText: "Add New",
        // buttonIcon: "add",
      }));
  }, [location]);
  
  useEffect(() => {
    emailConfig.loading == "pending" ? setIsLoading(true) : setTimeout(() =>  setIsLoading(false), 2000);
  }, [emailConfig.loading]);
 
  useEffect(() => {
    if (emailConfig.addUpdateLoading == "pending") {
      setIsLoading(true);
    } else if ( emailConfig.addUpdateLoading == "succeeded") {
      setIsLoading(false);
      setTimeout(() => { dispatch(initLoader());}, 5000);
    } else if (emailConfig.addUpdateLoading != "idle") {
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false) }, 5000);
    }
  }, [emailConfig.addUpdateLoading]);

  return emailConfig.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <EmailConfigGrid />
        </Flex>
      </Flex>
      <EmailConfigModal open={open} setOpen={setOpen} data ={{}} add />
      <Loading open={isLoading}/>
    </>
  );
};
