

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import { InvWithdrawlConfigGrid } from "../features/invWithdrawl/InvWithdrawlConfigGrid";
import { Loading } from "../components/Loading";
import { InvWithdrawlModal } from "../features/invWithdrawl/InvWithdrawlModal";
import { useState } from "react";
import { initLoader, investRefresh, loadInvWithdrawlConfig, loadNewWithdrawl } from "../features/invWithdrawl/inv_withdrawl_slice";
import { useLocation } from "react-router-dom";

export const InvWithdrawPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const invwithdrawl = useSelector((state) => state.invwithdrawl);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      dispatch(loadInvWithdrawlConfig())
    }

    dispatch(
      loadPage({
        title: ("Withdrawal"),
        button: isvalid,
        onClick: () => {
          if (isvalid) {
            dispatch(investRefresh());
            setOpen(true);
            dispatch(loadNewWithdrawl())
          }

        },
        buttonText: "New Withdrawal",
      })
    );
  }, [location]);

  useEffect(() => {
    invwithdrawl.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [invwithdrawl.loading]);

  useEffect(() => {
    if (invwithdrawl.addUpdateLoading == "pending") {
      setIsLoading(true);
    } else if (invwithdrawl.addUpdateLoading == "succeeded") {
      setIsLoading(false);
      dispatch(loadInvWithdrawlConfig());
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (invwithdrawl.addUpdateLoading != "idle") {
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 5000);
    }
  }, [invwithdrawl.addUpdateLoading]);

  return (
    <>
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <InvWithdrawlConfigGrid />
        </Flex>
      </Flex>
      <InvWithdrawlModal open={open} setOpen={setOpen} data={{}} add />
      <Loading open={isLoading} />
    </>
  );
};
