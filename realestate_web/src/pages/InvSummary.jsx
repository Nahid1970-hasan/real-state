import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { useState } from "react";
import { DipositGrid } from "../features/invsummary/DipositGrid";
import {  ReleaseGrid } from "../features/invsummary/ReleasGrid";
import { WithdrawGrid } from "../features/invsummary/WithdrawGrid";
import { InvestmentSumGrid } from "../features/invsummary/InvestmentSumGrid";
import { Label } from "../components/style/Label";
import { Input } from "../components/style/Input_styled";
import { Loading } from "../components/Loading";
import { Typography } from "../components/style/Typography_styled";
import { loadInvSummaryConfig } from "../features/invsummary/inv_summary_Slice";
import { InfoCard } from "../components/style/Card_styled";
import { useLocation } from "react-router-dom";

export const InvSummaryPage = () => {
  const invSummaryData = useSelector((state) => state.invsummary);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch(); 
  const [isLoading, setIsLoading] = useState(false);
  const location= useLocation();

  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      dispatch(loadInvSummaryConfig())
    } 
   
    dispatch(
      loadPage({
        title: ("Transaction Summary"),
      })
    );
  }, [location]);
  useEffect(() => {
    invSummaryData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [invSummaryData.loading]);

  return invSummaryData.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
      <Flex row>
        <Flex padding="0 5px 5px 0 !important" md={6} >
          <InfoCard>
            <Typography margin="10px 0 " fontSize="bodySubTitleFontSize" fontWeight="bold">
              Deposit Detail
            </Typography>
            <DipositGrid />
          </InfoCard>
        </Flex>
        <Flex padding="0 0 5px 5px !important" md={6} >
          <InfoCard>
            <Typography  margin="10px 0 "  fontSize="bodySubTitleFontSize" fontWeight="bold">
              Investment Detail
            </Typography>
            <InvestmentSumGrid />
          </InfoCard>
        </Flex>
      </Flex>
      <Flex row>
        <Flex padding="5px 5px 5px 0 !important" md={6} >
          <InfoCard>
            <Typography  margin="10px 0 "  fontSize="bodySubTitleFontSize" fontWeight="bold">
              Release Detail
            </Typography>
            <ReleaseGrid />
          </InfoCard>
        </Flex>
        <Flex padding="5px 0 5px 5px !important" md={6} >
          <InfoCard>
            <Typography  margin="10px 0 "  fontSize="bodySubTitleFontSize" fontWeight="bold">
              Withdrawl Detail
            </Typography>
            <WithdrawGrid />
          </InfoCard>
        </Flex>
      </Flex>
      <Loading open={isLoading} />
    </>
  );
};
