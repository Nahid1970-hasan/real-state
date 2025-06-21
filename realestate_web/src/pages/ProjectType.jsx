import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { useState } from "react";
import { ProjectTypeGrid } from "../features/projectType/ProjectTypeGrid";
import { ProjectTypeModal } from "../features/projectType/ProjectTypeModal";
import { Loading } from "../components/Loading";
import { initLoader, loadProTypeConfig } from "../features/projectType/pro_Type_slice";
import { useLocation } from "react-router-dom";


export const ProjectTypePage = () => {
  const protype = useSelector((state) => state.protype);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location= useLocation();


  useEffect(() => { 
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      dispatch(loadProTypeConfig());
    }
   
    dispatch(
      loadPage({
        title: "Project Type",
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
    protype.loading == "pending"? setIsLoading(true) :  setTimeout(() =>  setIsLoading(false), 2000);
  }, [protype.loading]);

  useEffect(() => {
    if ( protype.addUpdateLoading == "pending") {
        setIsLoading(true);
    } else if ( protype.addUpdateLoading == "succeeded") { 
      dispatch(loadProTypeConfig());
      setIsLoading(false);
      setTimeout(() => { dispatch(initLoader());}, 5000);
    }else if (protype.addUpdateLoading !=  "idle"){ 
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false)}, 5000);
    }
  }, [protype.addUpdateLoading]);

  return protype.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <ProjectTypeGrid/>
        </Flex>
      </Flex>
      <ProjectTypeModal open={open} setOpen={setOpen} data ={{}} add />
      <Loading open={isLoading}/>
    </>
  );
};
