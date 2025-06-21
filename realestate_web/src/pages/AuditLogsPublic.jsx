import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { DownloadButton } from "../components/Button";
import DataGrid from "../components/DataGrid";
import { Card, CardBody } from "../components/style/Card_styled";
import { Flex } from "../components/style/Flex_styled";
import { Input } from "../components/style/Input_styled";
import { Loader } from "../components/style/Loader_styled";
import Flatpickr from "react-flatpickr";
import { Typography } from "../components/style/Typography_styled";
import { loadPage } from "../features/page/page_slice";
import JSONPretty from "react-json-pretty";
import JSONPrettyMon from 'react-json-pretty/dist/monikai';
import { loadPubALData, loadPubALDataInit } from "../features/dashboard/pub_audit_log_slice";
import { DateTime } from "luxon";
import { Modal } from "../components/Modal";
import { Loading } from "../components/Loading";
import { useLocation } from "react-router-dom";
const CustFlex = styled(Flex)`
  padding: 0;
  padding-top: 0;
`;

const CustDiv = styled.div`
  display: flex;
  margin: 0 0 0 0;
  align-items: center;
  & input {
    height: 35px;
    width: auto;
    margin: 0;
  }
  & :first-child {
    margin-right: 8px;
  }
  & :last-child {
    margin-left: 8px;
  }
`;
const Scroll = styled.div`
overflow:hidden scroll;
height: 580px;
`;
export const PublicAuditLogsPage = () => {
  const dispatch = useDispatch();
  const auditLogsData = useSelector((state) => state.pubLogData);
  const userReadOnly = useSelector((state) => state.user.read_only);
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const [date, setDate] = useState("");
  const [viewOpen, setViewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewData, setViewData] = useState("");
  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      dispatch(loadPubALDataInit())
      setIsLoading(true);
      var today = DateTime.now().toFormat("yyyy-MM-dd");
      setDate(today);
    }
    dispatch(loadPage({ title: ("Audit Logs (Public)"), button: false }));
  }, [location]);

  useEffect(() => {
    auditLogsData.loading != "pending" && setTimeout(() => setIsLoading(false), 2000);
  }, [auditLogsData.loading]);

  const auditLogsColums = [
    {
      headerName: "Id",
      field: "audit_id",
      key: true,
      type: "number",
      hide: true,
    },
    {
      headerName: "type",
      description: "request_type",
      field: "request_type",
      type: "string",
      width: "100px"
    },

    {
      headerName: "Fullname",
      field: "username",
      description: "username",
      type: "string",
      width: "150px"

    },
    {
      headerName: "Method",
      field: "method",
      description: "Request Method",
      type: "string",
      width: "100px"
    },
    {
      headerName: "req_desc",
      description: "req_desc",
      field: "request_desc",
      type: "string",
    },

    {
      headerName: "Timestamp",
      field: "timestamp",
      description: "time",
      type: "string",
      width: "200px"
    },
    {
      headerName: "action",
      field: "",
      hide: userReadOnly,
      type: "action",
      icons: ["preview"],
      colors: ["info"],
      descriptions: ["View Details"],
      callBacks: [
        (id) => {
          var data = auditLogsData?.dataList.find((d) => d.audit_id == id);
          setViewData(data);
          setViewOpen(data ?? true);
        },
      ],
    },
  ];

  function loadAuditData(date) {
    var data = {
      date: date,
    };
    dispatch(loadPubALData(data));
  }

  function handleSubmit() {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if (isvalid) {
      setIsLoading(true)
      loadAuditData(date);
    }
  }
  return (
    <>
      <Flex row>
        <Flex padding={"0 0 0 0 !important"} md={12}>
          <Suspense fallback={<Loader />}>
            <CardBody>
              <form>
                <Flex row>
                  <Flex padding="0 !important" md={4} sm={12} xs={12}>
                    <CustDiv>
                      <Typography
                        textAlign="left"
                      >
                        {("Date")}
                      </Typography>
                      <Flatpickr
                        app
                        readOnly
                        options={{
                          dateFormat: "Y-m-d",
                        }}
                        value={date || ""}
                        onChange={(e, str) => {
                          setDate(str);
                        }}
                        render={({ value, ...props }, ref) => {
                          return (
                            <Input
                              {...props}
                              type="text"
                              name="date"
                              minWidth="auto"
                              placeholder={("pick date")}
                              value={date || ""}
                              ref={ref}
                            />
                          );
                        }}
                      />
                      <DownloadButton
                        margin="7px"
                        type="button"
                        onClick={() => handleSubmit()}
                      >
                        {("Submit")}
                      </DownloadButton>
                    </CustDiv>
                  </Flex>
                </Flex>
              </form>
            </CardBody>
            <CardBody>
              <Flex row>
                <Flex padding={"0 0 0 !important"} md={12}>
                  <Scroll> <DataGrid
                    colums={auditLogsColums}
                    rows={auditLogsData?.dataList || []}
                  /></Scroll>

                </Flex>
              </Flex>

            </CardBody>
          </Suspense>
        </Flex>
      </Flex>

      <Modal
        title={("Audit Detail")}
        open={viewOpen}
        md={6}
        sm={8}
        xs={11}
        onClose={() => {
          setViewOpen(false);
        }}
        outsideclick
      >
        <div style={{ padding: '10px 5px' }}>
          <Flex row>
            <Flex padding="0 0 0px 0 !important" md={12}>
              <Card>
                <JSONPretty style={{ height: "auto", maxHeight: '450px', background: '#272822', padding: "10px" }} id="json-pretty" data={viewData?.detail ?? {}} theme={JSONPrettyMon}></JSONPretty>
              </Card>
            </Flex>
          </Flex>
        </div>
      </Modal>
      <Loading open={isLoading} />
    </>
  );
};
