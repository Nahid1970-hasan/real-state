import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { useState } from "react";
import { SubProjectGrid } from "../features/subprojecttype/SubProjectGrid";
import { SubProjectModal } from "../features/subprojecttype/SubProjectModal";
import { Loading } from "../components/Loading";
import { initLoader, loadSubProtypeConfig } from "../features/subprojecttype/sub_project_type_Slice";
import { useLocation } from "react-router-dom";
  
export const SubProjectTypePage = () => {
  const subprotype = useSelector((state) => state.subprotype);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location= useLocation();

  useEffect(() => { 
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      dispatch(loadSubProtypeConfig());
    }
    
    dispatch(
      loadPage({
        title: ("Sub-project Type"),
        button: isvalid,
        onClick: () => {
          if(isvalid){
            setOpen(true);
          }
          
        },
        buttonText: "Add New",
        // buttonIcon: "add",
      })
    );
  }, [location]);
  
  useEffect(() => {
    subprotype.loading == "pending"? setIsLoading(true) :  setTimeout(() =>  setIsLoading(false), 2000);
  }, [subprotype.loading]);

  useEffect(() => {
    if ( subprotype.addUpdateLoading == "pending") {
        setIsLoading(true);
    } else if ( subprotype.addUpdateLoading == "succeeded") {
      dispatch(loadSubProtypeConfig());
      setIsLoading(false);
      setTimeout(() => { dispatch(initLoader());}, 5000);
    }else if (subprotype.addUpdateLoading !=  "idle"){ 
      setTimeout(() => { dispatch(initLoader());setIsLoading(false); }, 5000);
    }
  }, [subprotype.addUpdateLoading]);


  return subprotype.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <SubProjectGrid/>
        </Flex>
      </Flex>
      <SubProjectModal open={open} setOpen={setOpen} data ={{}} add />
      <Loading open={isLoading}/>
    </>
  );
};
