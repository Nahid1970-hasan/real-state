import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { useState } from "react";
import { Loading } from "../components/Loading";
import { initLoader, loadInternalUserConfig } from "../features/InternalUser/internal_user_Slice";
import { InternalUserGrid } from "../features/InternalUser/InternalUserGrid";
import { InternalUserModal } from "../features/InternalUser/InternalUserModal";
import { initLoader as initRoleLoader } from "../features/externalUser/userRole_slice";
import { Toast } from "../components/Toast";
import { useLocation } from "react-router-dom";


export const InternalUserPage = () => {
  const userConfig = useSelector((state) => state.internal);
  const UserRole = useSelector(state => state.userrole);
  const userReadOnly = useSelector((state) => +state.user.read_only);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => { 
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){ dispatch(loadInternalUserConfig());} 
    dispatch(
      loadPage({
        title: ("Internal Users"),
        button: !userReadOnly? isvalid :false,
        onClick: () => {
          setOpen(isvalid);
        },
        buttonText: "add_new", 
      })
    );
  }, [location]);

  useEffect(() => {
    userConfig.loading == "pending"?setIsLoading(true):setTimeout(() =>  setIsLoading(false), 2000);
  }, [userConfig.loading]);

  useEffect(() => {
    userConfig.addUpdateLoading == "pending"?setIsLoading(true) : setTimeout(() =>  setIsLoading(false), 2000);
  }, [userConfig.addUpdateLoading]);
 
  useEffect(() => {
    if (userConfig.addUpdateLoading == "pending") {
      setIsLoading(true);
    } else if (userConfig.addUpdateLoading == "succeeded") { 
      setIsLoading(false);
      dispatch(loadInternalUserConfig());
      setTimeout(() => { dispatch(initLoader());}, 5000);
    } else if (userConfig.addUpdateLoading != "idle") { 
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false);}, 5000);
    }
  }, [userConfig.addUpdateLoading]);

  useEffect(() => {
    UserRole.loading == "pending" ? setIsLoading(true) :  setTimeout(() =>  setIsLoading(false), 2000);
  }, [UserRole.loading]);

useEffect(() => {
    if ( UserRole.updateLoading == "pending") {
        setIsLoading(true);
    } else if ( UserRole.updateLoading == "succeeded") { 
        setTimeout(() => { dispatch(initRoleLoader()); setIsLoading(false);}, 5000);
    }else if (UserRole.updateLoading !=  "idle"){ 
        setTimeout(() => { dispatch(initRoleLoader()); setIsLoading(false);}, 5000);
    }
  }, [UserRole.updateLoading]);


  return userConfig.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
    {(UserRole.updateLoading == "idle" || UserRole.updateLoading == "pending") ? <></> : (
          UserRole.updateLoading == "succeeded" ? (
            <Toast msg={UserRole.msg} icon="task_alt" color="success" />
          ) : (
            <Toast color="error" msg={UserRole.msg} />
          )
        )}  
      <Flex row>
          <InternalUserGrid />
      </Flex>
      <InternalUserModal open={open} setOpen={setOpen} data={{}} add />
      <Loading open={isLoading}/>
    </>
  );
};