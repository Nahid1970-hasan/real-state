import { useEffect, useState } from "react";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import { useDispatch, useSelector } from "react-redux";
import { AdminSettingsGrid } from "../features/adminsettings/AdminSettingsGrid";
import { Loading } from "../components/Loading";
import { initLoader, loadAdminSetting } from "../features/adminsettings/admin_settings_slice";
import { useLocation } from "react-router-dom";

export const AdminSetting = () => {
  const dispatch = useDispatch();
  const adminSettings = useSelector((state) => state.adminSettings);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const location= useLocation();

  useEffect(() => { 
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      dispatch(loadAdminSetting()); 
    } 
    dispatch( loadPage({ title: "Admin Settings", button: false}));
  }, [location]);

  useEffect(() => {
    adminSettings.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [adminSettings.loading]);

  useEffect(() => {
    if ( adminSettings.addUpdateLoading == "pending") { 
      setIsLoading(true) 
    } else if ( adminSettings.addUpdateLoading == "succeeded") {  
      dispatch(loadAdminSetting()); 
      setIsLoading(false);
      setTimeout(() => { dispatch(initLoader());}, 2000);
    }else if (adminSettings.addUpdateLoading !=  "idle"){ 
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false);}, 5000);
    }
  }, [adminSettings.addUpdateLoading]);

  return (
    <>
      <Flex row>
        <Flex padding="0" md={12} sm={12} xs={12}>
          <AdminSettingsGrid />
        </Flex>
      </Flex>
      <Loading open={isLoading} />
    </>
  );
};
