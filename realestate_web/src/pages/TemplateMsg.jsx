import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { useState } from "react";
import { Loading } from "../components/Loading";
import { MessageGrid } from "../features/message/MessageGrid";
import { MessageModal } from "../features/message/MessageModal";
import { initLoader, loadMessageConfig } from "../features/message/message_Slice";
import { useLocation } from "react-router-dom";


export const TemplateMsgPage = () => {
  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const location= useLocation();

  useEffect(() => { 
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      dispatch(loadMessageConfig());
    }
   
    dispatch(
      loadPage({
        title: ("Message Template"),
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
    message.loading == "pending"? setIsLoading(true) : setTimeout(() =>  setIsLoading(false), 2000);
  }, [message.loading]);

  
  useEffect(() => {
    if (message.addUpdateLoading == "pending") {
        setIsLoading(true);
    } else if (message.addUpdateLoading == "succeeded") { 
        setIsLoading(false);
        dispatch(loadMessageConfig());
        setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (message.addUpdateLoading != "idle") { 
        setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 5000);
    }
}, [message.addUpdateLoading]);
 
  return message.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <MessageGrid/>
        </Flex>
      </Flex>
      <MessageModal open={open} setOpen={setOpen} data ={{}} add />
      <Loading open={isLoading}/>
    </>
  );
};
