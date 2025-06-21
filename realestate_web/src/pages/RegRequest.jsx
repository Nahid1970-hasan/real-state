import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { RegReqGrid } from "../features/regRequest/RegReqGrid";
import { RegReqModal } from "../features/regRequest/RegReqModal";

export const RegRequestPage = () => {
  const regreq = useSelector((state) => state.regreq);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(
      loadPage({
        title: ("Registration Request"),
        // button: true,
        // onClick: () => {
        //   setOpen(true);
        // },
        // buttonText: "add_new",
        // buttonIcon: "add",
      })
    );
  }, []);

  // console.log(regreq);

  return regreq.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <RegReqGrid />
        </Flex>
      </Flex>
      <RegReqModal open={open} setOpen={setOpen} data ={{}} add />
    </>
  );
};
