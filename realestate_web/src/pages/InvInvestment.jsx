import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { useState } from "react";
import { InvestmentModal } from "../features/invinvestment/InvestmentModal";
import { InvestmentGrid } from "../features/invinvestment/InvestmentGrid";
import { initLoader, initRefresh, invRefresh, loadInvestmentConfig, loadNewInvestment } from "../features/invinvestment/inv_investment_Slice";
import { Loading } from "../components/Loading";
import { useLocation } from "react-router-dom";


export const InvInvestment = () => {
  const investment = useSelector((state) => state.investment);
  const user = useSelector((state) => state.user); 
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

 
  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      dispatch(loadInvestmentConfig({"project_id":0}))
    } 
    if (isvalid) {
      
      dispatch(
        loadPage({
          title: ("Investments"),
          button: isvalid,
          onClick: () => {
            if(isvalid){
              setOpen(true); 
              dispatch(invRefresh());
              dispatch(loadNewInvestment())
             
            }
          },
          buttonText: "New Investment",
          // buttonIcon: "add",
        })
      );
    }
   
  }, [location]);
  
  useEffect(() => {
    if (investment.loading == "pending") {
      setIsLoading(true);
    } else if (investment.loading == "succeeded") {
      setIsLoading(false);
      setTimeout(() => { dispatch(initRefresh()); }, 4000);
    } else if (investment.loading != "idle") {
      setTimeout(() => { setIsLoading(false); dispatch(initRefresh()); }, 4000);
    }
  }, [investment.loading]);

  useEffect(() => {
    if (investment.addUpdateLoading == "pending") {
      setIsLoading(true);
    } else if (investment.addUpdateLoading == "succeeded") {
      setIsLoading(false);
      dispatch(loadInvestmentConfig({"project_id":0}))
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (investment.addUpdateLoading != "idle") {
      setTimeout(() => { setIsLoading(false); dispatch(initLoader()); }, 5000);
    }
  }, [investment.addUpdateLoading]);

  return investment.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <InvestmentGrid />
        </Flex>
      </Flex>
      <InvestmentModal open={open} setOpen={setOpen} add />
      <Loading open={isLoading} />
    </>
  );
};
