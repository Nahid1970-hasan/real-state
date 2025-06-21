
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import { Loading } from "../components/Loading";
import { useState } from "react";
import { Select } from "../components/style/Select_styled";
import { Button, DownloadButton } from "../components/Button";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { initLoader, loadUserConfig, submitExternalConfig } from "../features/externalUser/external_Slice";
import { Label } from "../components/style/Label";
import { ExternalGrid } from "../features/externalUser/ExternalGrid";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import UnAuthorized from "./UnAuthorized";
const CustFlex = styled(Flex)`
  padding: 0 10px 0 0;
`;

const CustDiv = styled.div`
  display: flex;
  margin-top: 0.15rem;
  justify-content:${({ end }) => (end ? 'flex-end' : 'flex-start')}; 
  & button:first-child {
      margin: 0 0 2px 0;
    }
  
`;

export const ExternalUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, set_disabled] = useState(false);
  const external = useSelector(state => state.external);
  const [get_value, set_value] = useState("");
  const dropDownRef = useRef(null);

  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) { dispatch(loadUserConfig()); }
    dispatch(loadPage({ title: "External Users", button: false }));
  }, [location]);

  useEffect(() => {
    external.loading == "pending" ? setIsLoading(true) : setTimeout(() => { setIsLoading(false); set_disabled(false) }, 2000);
  }, [external.loading]);


  useEffect(() => {
    if (external.addUpdateLoading == "pending") {
      setIsLoading(true)
    } else if (external.addUpdateLoading == "succeeded") {
      setIsLoading(false);
      dispatch(loadUserConfig());
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (external.addUpdateLoading != "idle") {
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    }
  }, [external.addUpdateLoading]);


  function submitExternal(e) {
    e.preventDefault();
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      let data = {
        user_type: get_value,
      };
      dispatch(submitExternalConfig(data));
      set_disabled(true);
    }
  }

  const handleChangeOption = () => {
    let searchID = dropDownRef.current.value;
    set_value(searchID);
  };

  return (external.loading === "unauthorized" ? (
    <UnAuthorized />
  ) :
    (
      <>

        <Flex row>
          <CustFlex md={1.2} sm={6} xs={12}>
            <Label >Login Type</Label>
          </CustFlex>
          <CustFlex md={3} sm={6} xs={12}>
            <Select
              app
              name="user_type"
              ref={dropDownRef}
              value={get_value}
              onChange={handleChangeOption}
            >
              <option disabled value="">--select Value</option>
              <option value="ALL">All</option>
              <option value="INVESTOR">Investor</option>
              <option value="CUSTOMER">Customer</option>
              <option value="INV-CUST">Both</option>
            </Select>
          </CustFlex>
          <CustFlex md={3} sm={12} xs={12}>
            <CustDiv>
              <Button 
                type="submit"
                disabled={!get_value || disabled}
                onClick={submitExternal}>
                {("Submit")}
              </Button>
            </CustDiv>
          </CustFlex>
        </Flex>

        <Flex row>
          <Flex padding="10px 0 0 0 !important" md={12}>
            <ExternalGrid />
          </Flex>
        </Flex>
        <Loading open={isLoading} />
      </>
    )
  );
};
