import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Badge } from "../components/Badge";
import { Img } from "../components/style/Img_Styled";
import DataGrid from "../components/DataGrid";
import { Loading } from "../components/Loading";
import {
  CardBody,
  InfoCard,
  InfoSubTitle,
  InfoTitle,
  ShadowCard,
} from "../components/style/Card_styled";
import { Flex } from "../components/style/Flex_styled";
import { Loader } from "../components/style/Loader_styled";
import { Typography } from "../components/style/Typography_styled";
import { loadDashboardState } from "../features/dashboard/dashboard_slice";
import { loadPage } from "../features/page/page_slice";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HLChip } from "../components/Chip";
import ProgressBar from "@ramonak/react-progress-bar";

const NBadge = styled.div`  
    transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    display: inline-block;
    position: absolute;
    min-width: 10px;
    padding: 3px 7px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    color: rgb(255, 255, 255);
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    background-color: rgb(212, 19, 13);
    border-radius: 10px;
    top: 5px;
    right: 5px;
    transform: rotateX(0deg); 
    cursor: pointer;
    &>a{
      text-decoration:none;
      color:#fff;
    }
`;

const IconImage = styled.span`
  padding: 10px;
  height: 100%; 
  font-size: 36px;
  background: #7091c1;
  background: ${({ background, theme }) => (background ? theme.colors[background] : theme.colors.bodyContentFont)};
  color: #fff;
  border-radius: 10px;

`;

export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const dashboardData = useSelector((state) => state.dashboardData);
  const location = useLocation();
  const nevigate = useNavigate();
  var userStatus = dashboardData?.dashboardState?.users_by_status;
  var userType = dashboardData?.dashboardState?.users_by_type;
  var stackType = dashboardData?.dashboardState?.stakeholder_type;

  useEffect(() => {
    i18n.changeLanguage("en");
    if (user.user_type == "INVESTOR") {
      nevigate("/inv")
    } else if (user.user_type == "CUSTOMER") {
      nevigate("/cust")
    } else if (user.user_type == "INV-CUST") {
      nevigate("/reg-type");
    }
  }, [user]);

  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      setIsLoading(true)
      dispatch(loadDashboardState()); 
      i18n.changeLanguage(localStorage.i18nextLng);
    }
    dispatch(loadPage({ title: t("dashboard"), button: false }));
  }, [location]);

  useEffect(() => {
    dashboardData.loading != "pending" && setTimeout(() => setIsLoading(false), 2000);
  }, [dashboardData.loading]);

  function gotoPage(type) {
    if (type == "payment") {
      var pagename = "/app/stk-pmt";
      var isvalid = !!(user?.pageList?.find((d) => d == pagename) || "");
      isvalid && nevigate(pagename);
    } else if (type == "invest") {
      var pagename = "/app/stk-invst";
      var isvalid = !!(user?.pageList?.find((d) => d == pagename) || "");
      isvalid &&nevigate(pagename);
    } else if (type == "withdraw") {
      var pagename = "/app/stk-with";
      var isvalid = !!(user?.pageList?.find((d) => d == pagename) || "");
      isvalid &&nevigate(pagename);
    } else if (type == "release") {
      var pagename = "/app/stk-rels";
      var isvalid = !!(user?.pageList?.find((d) => d == pagename) || "");
      isvalid &&nevigate(pagename);
    }
  }
  return (<>
    <Suspense>
      <Flex row>
        <Flex padding="0 5px 10px 0 !important" md={6} sm={12} xs={12}>
          <InfoCard background={"error"}>
            <Flex row>
              <Flex padding="10px 0 20px 0 !important" md={12}>
                <Typography
                  fontSize="bodyTitleFontSize"
                  width={"100%"}
                  textAlign="center"
                  fontWeight="bold"
                >
                  {("Project")}
                </Typography>
              </Flex>
              <Flex padding="0 10px 10px 0 !important" md={4}>
                <Flex row>
                  <Flex padding="0 !important" md={12}>
                    <Typography
                      fontSize="bodyTitleFontSize"
                      width={"100%"}
                      textAlign="center"
                      fontWeight="bold"
                    >
                      {dashboardData?.dashboardState?.upcoming || "0"}
                    </Typography>
                    <Typography
                      fontSize="bodySubTitleFontSize"
                      width={"100%"}
                      textAlign="center"
                    >
                      {("Upcoming")}
                    </Typography>
                  </Flex>

                </Flex>
              </Flex>
              <Flex padding="0 0 10px 0 !important" md={4}>
                <Flex row>
                  <Flex padding="0 !important" md={1}>
                    <div style={{ background: "#fff", width: "3px", height: "100%" }} />
                  </Flex>
                  <Flex padding="0 !important" md={10}>
                    <Typography
                      fontSize="bodyTitleFontSize"
                      width={"100%"}
                      textAlign="center"
                      fontWeight="bold"
                    >
                      {dashboardData?.dashboardState?.ongoing || "0"}
                    </Typography>
                    <Typography
                      fontSize="bodySubTitleFontSize"
                      width={"100%"}
                      textAlign="center"
                    >
                      {("Ongoing")}
                    </Typography>
                  </Flex>
                  <Flex padding="0 !important" md={1}>
                    <div style={{ background: "#fff", width: "2px", height: "100%" }} />
                  </Flex>
                </Flex>
              </Flex>
              <Flex padding="0 0 10px 10px !important" md={4}>
                <Flex row>
                  <Flex padding="0 !important" md={12}>
                    <Typography
                      fontSize="bodyTitleFontSize"
                      width={"100%"}
                      textAlign="center"
                      fontWeight="bold"
                    >
                      {dashboardData?.dashboardState?.completed || "0"}
                    </Typography>
                    <Typography
                      fontSize="bodySubTitleFontSize"
                      width={"100%"}
                      textAlign="center"
                    >
                      {("Completed")}
                    </Typography>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </InfoCard>
        </Flex>
        <Flex padding="0 0 10px 5px !important" md={6} sm={12} xs={12}>
          <InfoCard background={"download"}>
            <Flex row>
              <Flex padding="10px 0 20px 0 !important" md={12}>
                <Typography
                  fontSize="bodyTitleFontSize"
                  width={"100%"}
                  textAlign="center"
                  fontWeight="bold"
                >
                  {("Request")}
                </Typography>
              </Flex>
              <Flex padding="0 10px 10px 0 !important" md={4}>
                <Flex row>
                  <Flex padding="0 !important" md={12}>
                    <Typography
                      fontSize="bodyTitleFontSize"
                      width={"100%"}
                      textAlign="center"
                      fontWeight="bold"
                    >
                      {dashboardData?.dashboardState?.booking || "0"}
                    </Typography>
                    <Typography
                      fontSize="bodySubTitleFontSize"
                      width={"100%"}
                      textAlign="center"
                    >
                      {("Booking")}
                    </Typography>
                  </Flex>

                </Flex>
              </Flex>
              <Flex padding="0 0 10px 0 !important" md={4}>
                <Flex row>
                  <Flex padding="0 !important" md={1}>
                    <div style={{ background: "#fff", width: "2px", height: "100%" }} />
                  </Flex>
                  <Flex padding="0 !important" md={10}>
                    <Typography
                      fontSize="bodyTitleFontSize"
                      width={"100%"}
                      textAlign="center"
                      fontWeight="bold"
                    >
                      {dashboardData?.dashboardState?.feedback || "0"}
                    </Typography>
                    <Typography
                      fontSize="bodySubTitleFontSize"
                      width={"100%"}
                      textAlign="center"
                    >
                      {("Feedback")}
                    </Typography>
                  </Flex>
                  <Flex padding="0 !important" md={1}>
                    <div style={{ background: "#fff", width: "3px", height: "100%" }} />
                  </Flex>
                </Flex>
              </Flex>
              <Flex padding="0 0 10px 10px !important" md={4}>
                <Flex row>
                  <Flex padding="0 !important" md={12}>
                    <Typography
                      fontSize="bodyTitleFontSize"
                      width={"100%"}
                      textAlign="center"
                      fontWeight="bold"
                    >
                      {dashboardData?.dashboardState?.reg_request || "0"}
                    </Typography>
                    <Typography
                      fontSize="bodySubTitleFontSize"
                      width={"100%"}
                      textAlign="center"
                    >
                      {("Registration")}
                    </Typography>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </InfoCard>
        </Flex>

      </Flex>

      <Flex row>
        <Flex padding="0 5px 0 0 !important" md={3} sm={6} xs={12}>
          <InfoCard background={"girdHeader"}>
            <Flex row>
              <Flex padding="0 !important" md={9}>
                <Typography
                  fontSize="bodySubTitleFontSize"
                  width={"100%"}
                  textAlign="left"
                >
                  {("Payment")}
                </Typography>
                <Typography
                  fontSize="bodyTitleFontSize"
                  width={"100%"}
                  textAlign="left"
                  fontWeight="bold"
                >
                  {dashboardData?.dashboardState?.payments || "0"}
                </Typography>
              </Flex>
              <Flex padding="0 !important" md={3}>
                <Badge value={dashboardData?.dashboardState?.payments} iconbackground="success" background={"error"} onClick={() => { gotoPage("payment") }}>
                  <div className="material-icons">payments</div>
                </Badge >
              </Flex>
            </Flex>
          </InfoCard>
        </Flex>
        <Flex padding="0 5px 0 5px !important" md={3} sm={6} xs={12}>
          <InfoCard background={"girdHeader"}>
            <Flex row>
              <Flex padding="0 !important" md={9}>
                <Typography
                  fontSize="bodySubTitleFontSize"
                  width={"100%"}
                  textAlign="left"
                >
                  {("Investment")}
                </Typography>
                <Typography
                  fontSize="bodyTitleFontSize"
                  width={"100%"}
                  textAlign="left"
                  fontWeight="bold"
                >
                  {dashboardData?.dashboardState?.investment || "0"}
                </Typography>
              </Flex>
              <Flex padding="0 !important" md={3}>
                <Badge value={dashboardData?.dashboardState?.investment} iconbackground="download" background={"error"} onClick={() => { gotoPage("invest") }}>
                  <div className="material-icons">credit_card</div>
                </Badge >
              </Flex>
            </Flex>
          </InfoCard>
        </Flex>
        <Flex padding="0 5px 0 5px !important" md={3} sm={6} xs={12}>
          <InfoCard background={"girdHeader"}>
            <Flex row>
              <Flex padding="0 !important" md={9}>
                <Typography
                  fontSize="bodySubTitleFontSize"
                  width={"100%"}
                  textAlign="left"
                >
                  {("Withdraw")}
                </Typography>
                <Typography
                  fontSize="bodyTitleFontSize"
                  width={"100%"}
                  textAlign="left"
                  fontWeight="bold"
                >
                  {dashboardData?.dashboardState?.withdraw || "0"}
                </Typography>
              </Flex>
              <Flex padding="0 !important" md={3}>
                <Badge value={dashboardData?.dashboardState?.withdraw} iconbackground="purple" background={"error"} onClick={() => { gotoPage("withdraw") }}>
                  <div className="material-icons">request_quote</div>
                </Badge >

              </Flex>
            </Flex>
          </InfoCard>
        </Flex>
        <Flex padding="0 0 0 5px !important" md={3} sm={6} xs={12}>
          <InfoCard background={"girdHeader"}>
            <Flex row>
              <Flex padding="0 !important" md={9}>
                <Typography
                  fontSize="bodySubTitleFontSize"
                  width={"100%"}
                  textAlign="left"
                >
                  {("Release")}
                </Typography>
                <Typography
                  fontSize="bodyTitleFontSize"
                  width={"100%"}
                  textAlign="left"
                  fontWeight="bold"
                >
                  {dashboardData?.dashboardState?.release || "0"}
                </Typography>
              </Flex>
              <Flex padding="0 !important" md={3}>
                <Badge value={dashboardData?.dashboardState?.release} iconbackground="yellow" background={"error"} onClick={() => { gotoPage("release") }}>
                  <div className="material-icons">wallet</div>
                </Badge >

              </Flex>
            </Flex>
          </InfoCard>
        </Flex>
      </Flex>

      <Flex row>
        {
          dashboardData?.dashboardState?.latest_project?.map((d, i) =>
            <Flex key={i} padding={i == 0 ? "15px 5px 0 0 !important" : "15px 5px 0 5px !important"} md={3} sm={6} xs={12}>
              <Flex row>
                <InfoCard >
                  <Flex padding="0 !important" md={12}>
                    <Typography
                      fontSize="bodySubTitleFontSize"
                      width={"100%"}
                      textAlign="left"
                      fontWeight="bold"
                    >
                      {d?.project_name.length>28? d?.project_name.substr(0, 25).concat("..."):d?.project_name  || "{{Project Name}}"}
                    </Typography>
                    <Typography
                      fontSize="bodyContentFontSize"
                      width={"100%"}
                      textAlign="left"
                    >
                      {d?.type_name.length>33? d?.type_name.substr(0, 30).concat("..."):d?.type_name || "{{Project Type Name}}"}
                    </Typography>
                    <Typography
                      fontSize="bodyContentFontSize"
                      width={"100%"}
                      textAlign="left"
                    >
                      <HLChip background={d?.status == "Completed" ? "download" : "success"} label={d?.status || "{{status}}"} color="primaryFont" />
                    </Typography>
                    <div style={{ height: "140px" }}>
                      <Typography
                        margin="15px 0"
                        fontSize="bodyContentFontSize"
                        width={"100%"}
                        textAlign="justify"
                      >
                        {d?.project_desc?.length > 210 ? d?.project_desc?.substr(0, 207).concat("...") : d?.project_desc || "----"}
                      </Typography>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography
                        fontSize="bodyContentFontSize"
                        width={"100%"}
                        fontWeight="bold"
                        textAlign="left"
                      >
                        {("Progress")}
                      </Typography>
                      <Typography
                        fontSize="bodyContentFontSize"
                        width={"100%"}
                        fontWeight="bold"
                        textAlign="right"
                      >
                        {d?.progress_percent || "0"} {"%"}
                      </Typography>
                    </div>

                  </Flex>
                  <Flex padding="5px 0 !important" md={12}>
                    <div style={{ height: "100%", }}>
                      <ProgressBar isLabelVisible={false} baseBgColor="#fff" bgColor="#027ECA" completed={d?.progress_percent || 0} />
                    </div>

                  </Flex>
                </InfoCard>
              </Flex>
            </Flex>)
        }

      </Flex>
      <Loading open={isLoading} />
    </Suspense>

  </>
  );
};
