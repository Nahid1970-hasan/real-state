import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { CardBody } from "../../components/style/Card_styled";
import { Modal } from "../../components/Modal";
import { Flex } from "../../components/style/Flex_styled";
import { Typography } from "../../components/style/Typography_styled";

export const StackInvInfoModal = ({ open,
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
      headerName: "Project Name",
      field: "project_name",
      description: "Project Name",
      sortable: true,
      filterable: true,
      type: "string",
    },
    {
      headerName: "Project Type",
      field: "type_name",
      sortable: true,
      filterable: true,
      type: "string",
      description: "Project Type",
    },
    {
      headerName: "Location",
      field: "popular_loc",
      description: "Popular Location",
      width: "120px",
      sortable: true,
      filterable: true,
      type: "string",
    },
    {
      headerName: "Share#",
      field: "no_share",
      type: "number",
      description: "Number of share",
      width: "90px",
    },
    {
      headerName: "Price",
      field: "unit_price",
      type: "currency",
      description: "Unit Price",
      width: "120px",
    },

    {
      headerName: "Amount",
      field: "total_amount",
      description: "Total Amount",
      type:"currency",
      width: "120px",
    },
    {
      headerName: "Date",
      field: "inv_date",
      type: "date",
      description: "Investment Date",
      width: "120px",
    },

   

  ];

  let rows = stackInfoData?.investList?.map((d, i) => ({ ...d, "pay_id": i + 1 }));

  return (
    <Modal
      md={8}
      sm={10}
      xs={12}
      title={("View Investment")}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      outsideclick
    >
      <>
        <Flex row>
          <Flex padding="0 0 10px 0!important" md={12}>
            <Flex row>
              <Flex padding="5px 0 0 0 !important" md={3} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                {("Name ")}
              </Typography></Flex> 
              <Flex padding="5px 0 0 0!important" md={9} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
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
              <Flex padding="0 0 0 0 !important" md={3} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                {("Address")}
              </Typography></Flex> 
              <Flex padding="0 !important" md={9} sm={6} xs={12} > <Typography textAlign="left" fontSize="bodyContentFontSize" >
              {":"} {" "}{data?.address}
              </Typography>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <CardBody>
          <DataGrid colums={colums} rows={rows || []} />
        </CardBody>
      </>

    </Modal>
  );
};
