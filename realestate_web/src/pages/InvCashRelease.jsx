import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { useState } from "react";
import { InvCashReleaseGrid } from "../features/invcashrelease/InvCashReleaseGrid";
import { InvNewRelease } from "../features/invcashrelease/InvNewRelease";
import { Loading } from "../components/Loading";
import { initLoader, loadInvRelesaeConfig, loadNewRelease, prRefresh } from "../features/invcashrelease/inv_cash_release_Slice";
import { useLocation } from "react-router-dom";


export const InvCashRelease = () => {
  const invrelesae = useSelector((state) => state.invrelesae);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location= useLocation();

  useEffect(() => { 
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      dispatch(loadInvRelesaeConfig());
    } 
   
    dispatch(
      loadPage({
        title: ("Release"),
        button: isvalid,
        onClick: () => {
          if(isvalid){
            dispatch(prRefresh());
            dispatch(loadNewRelease())
            setOpen(true);
          }
          
        },
        buttonText: "New Releasae", 
      })
    );
  }, [location]);
 
  useEffect(() => {
    invrelesae.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [invrelesae.loading]);


  useEffect(() => {
    if (invrelesae.addUpdateLoading == "pending") {
      setIsLoading(true);
    } else if (invrelesae.addUpdateLoading == "succeeded") {
      setIsLoading(false);
      dispatch(loadInvRelesaeConfig());
      setTimeout(() => { dispatch(initLoader());  }, 5000);
    } else if (invrelesae.addUpdateLoading != "idle") {
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 5000);
    }
  }, [invrelesae.addUpdateLoading]);

  return invrelesae.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <InvCashReleaseGrid />
        </Flex>
      </Flex>
      <InvNewRelease open={open} setOpen={setOpen} data={{}} add />
      <Loading open={isLoading} />
    </>
  );
};
