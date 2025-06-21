import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { CardBody } from "../../components/style/Card_styled";
import { Modal } from "../../components/Modal";
import { Flex } from "../../components/style/Flex_styled";
import { Typography } from "../../components/style/Typography_styled";
import styled from "styled-components";

const Scroll = styled.div`
overflow:hidden scroll;
height: 400px;
`;

export const StackPaymentInfoModal = ({ open,
  setOpen = () => { }, data }) => {
  const stackInfoData = useSelector(state => state.stackInfo);

  const colums = [
    {
      headerName: "ID",
      field: "pay_id",
      key: true,
      type: "number",
      hide: true,
      sortable: false,
    },
    {
      headerName: "Payment For",
      field: "payment_for",
      description: "payment for",
      type: "string",
      width: "120px"
    },

    {
      headerName: "Bank Name",
      field: "bank_name",
      description: "bank name",
      type: "string"
    },
    {
      headerName: "Branch",
      field: "branch_name",
      type: "string",
      description: "branch",
    },
    {
      headerName: "Cheque No ",
      field: "cheque_no",
      description: "check",
      width: "120px"
    },
    {
      headerName: "Amount",
      field: "amount",
      description: "amount",
      type: "currency",
      width: "120px"
    },
    {
      headerName: "Pmt Date",
      field: "payment_date",
      type: "date",
      description: "payment date",
      width: "120px"
    },

    {
      headerName: "Approve Date",
      field: "approve_date",
      type: "date",
      description: "approve date",
      width: "120px"
    },


  ];
  let rows = stackInfoData?.paymentList?.map((d, i) => ({ ...d, "pay_id": i + 1 }));

  return (
    <Modal
      md={8}
      sm={10}
      xs={12}
      title={("View Payment")}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      outsideclick
    >

      <>

        <Flex padding="0 0 10px 0 !important" md={12}>
          <Flex row>
            <Flex padding="0 !important" md={3} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
              {("Name ")}
            </Typography></Flex>
            <Flex padding="0!important" md={9} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "} {data?.fullname || ""}
            </Typography>
            </Flex>
          </Flex>
          <Flex row>
            <Flex padding="0 0 0 0 !important" md={3} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
              {("Mobile Number")}
            </Typography></Flex>

            <Flex padding="0 !important" md={8} sm={9} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "} {data?.mobile_no}
            </Typography>
            </Flex>
          </Flex>
          <Flex row>
            <Flex padding="0 0 0 0 !important" md={3} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
              {("Email")}
            </Typography></Flex>
            <Flex padding="0 !important" md={9} sm={6} xs={12} > <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "}  {data?.email}
            </Typography>
            </Flex>
          </Flex>
          <Flex row>
            <Flex padding="0 0 0 0 !important" md={3} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
              {("Registration Type")}
            </Typography></Flex>
            <Flex padding="0 !important" md={9} sm={6} xs={12} > <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "} {data?.req_type}
            </Typography>
            </Flex>
          </Flex>
          <Flex row>
            <Flex padding="0 !important" md={3} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
              {("Address")}
            </Typography></Flex>
            <Flex padding="0 !important" md={9} sm={6} xs={12} > <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "}{data?.address}
            </Typography>
            </Flex>
          </Flex>
        </Flex>

        <CardBody>
          <Scroll><DataGrid colums={colums} rows={rows || []} /></Scroll>
        </CardBody>

      </>

    </Modal>
  );
};
