

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice"; 
import { ProgressGrid } from "../features/progress/ProgressGrid";
import { loadProgressConfig } from "../features/progress/progress_slice";
import { Loading } from "../components/Loading";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const ProgressMonitorpage = () => {
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.progress);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      dispatch(loadProgressConfig());
    }
    
    dispatch(loadPage({ title: "Progress Monitor", button: false }));
  }, [location]);

  useEffect(() => {
    progress.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [progress.loading]);
 
  useEffect(() => {
    progress.detailLoading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [progress.detailLoading]);

  return (
    <>
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <ProgressGrid />
        </Flex>
      </Flex>
      <Loading open={isLoading} />
    </>
  );
};
