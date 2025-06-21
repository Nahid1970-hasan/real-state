

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import { InvProgressDropdown } from "../features/invviewprogress/InvProgressDropdown";
export const InvViewProgress = () => {
  const dispatch = useDispatch();

  useEffect(() => {  
    dispatch(loadPage({ title: "Project Progress", button: false }));
  }, []);
  
  
  return (
    <>
    <Flex row>
        <InvProgressDropdown />
    </Flex>
    </>
  );
};
