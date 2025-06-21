

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import { Typography } from "../components/style/Typography_styled";
import { Loading } from "../components/Loading";
import { CardBody, CardHeaderButton } from "../components/style/Card_styled";
import DataGrid from "../components/DataGrid";
import { loadInvtransferConfig } from "../features/invTransfer/inv_transfer_slice";
import { PrimaryButton } from "../components/Button";
import { Label } from "../components/style/Label";
import { Select } from "../components/style/Select_styled";
import { Input } from "../components/style/Input_styled";
import { InvTransferModal } from "../features/invTransfer/InvTransferModal";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

export const InvTransferPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const invtransfer = useSelector((state) => state.invtransfer);
  const [project_id, set_project_id] = useState(0);
  const [data, setData] = useState({});
  const [to_id, set_to_id] = useState(0);
  const dropDownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const location= useLocation();
  useEffect(() => {
    setIsLoading(true);
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      dispatch(loadInvtransferConfig())
    }
   
    dispatch(
      loadPage({
        title: ("Transfer"),
        button: false,
        onClick: () => {
          setOpen(true);
        },
        // buttonText: "New Releasae",
        // buttonIcon: "add",
      })
    );
  }, [location]);
  function submitTransfer(e) {
    e.preventDefault();
    setOpen(true);
  }
//   function submitTransferproject(e) {
//     e.preventDefault();
//     setOpen(true);
//     let data = {
//         project_id: dropDownRef.current.value,
//     };
//     dispatch(loadInvtransfer(data));
// }

  const colums = [
    {
      headerName: "ID",
      field: "project_id",
      key: true,
      type: "number",
      hide: true,
      sortable: false,
    },
    {
      headerName: ("Project Name"),
      field: "project_name",
      description: "Project Name",
      sortable: true,
      filterable: true,
      type: "string",
    },
    {
      headerName: ("Type"),
      field: "release_approved",
      description: "Release Type",
    },
    {
      headerName: ("Location"),
      field: "location",
      description: "Location",
    },
    {
      headerName: ("Shares Bought"),
      field: "share",
      description: "Shares Bought",
      type:"number"
    },
    {
      headerName: ("Price/Share"),
      field: "price",
      description: "Price/Share",
      type:"number"
    },
    {
      headerName: ("Total Investment"),
      field: "inv_total",
      description: "Total Investment",
      type:"number"
    },
    {
      headerName: ("Inv Date"),
      field: "inv_date",
      description: "Investment Date",
      sortable: true,
      filterable: true,
      type: "date",
    },

    {
      headerName: ("action"),
      field: "",
      type: "action",
      icons: ["check"],
      colors: ["success"],
      descriptions: ["Transfer"],
      callBacks: [
        (project_id) => {
          var rowdata = rows.find((d) => d.project_id == project_id);
          setOpen(true);
          setData(rowdata);
        },

      ],
    },
  ];


  useEffect(() => {
    invtransfer.loading == "pending"? setIsLoading(true) : setTimeout(() =>  setIsLoading(false), 2000);
  }, [invtransfer.loading]);
  return (
    <>
      <Flex row>
        <Flex padding="10px 0 0 0 !important" md={6}>
          <Typography fontSize="bodySubTitleFontSize" fontWeight="bold" textAlign="left">
            Investment Detail
          </Typography>
        </Flex>
        <Flex padding="5px 0 10px 0 !important" md={6}>
          <CardHeaderButton top="5px">
            <PrimaryButton
              type="submit"
              onClick={submitTransfer}
            >
              Transfer ALL
            </PrimaryButton>
          </CardHeaderButton>
        </Flex>
        <Flex padding="0 !important" md={12}>
          <CardBody>
            {
              <DataGrid colums={colums} rows={invtransfer.list||[]} />
            }
          </CardBody>
        </Flex>


        <Flex padding="20px 0 20px 0 !important" md={6}>
          <Flex row>
            <Typography fontSize="bodyContentFontSize" fontWeight="bold" textAlign="left">
              Transfer To
            </Typography>
          </Flex>
          <Flex row>
            <Flex padding="0 !important" md={4}>
              <Label color="cardfont">{("Select Investor")} </Label>
            </Flex>
            <Flex padding="0 !important" md={8}>
              <Select
                app
                ref={dropDownRef}
              //   name="request_for"
              // // value={values.request_for || "DEFAULT"}
              >

                <option disabled value="DEFAULT">
                  {("select investor")}
                </option>
                {invtransfer.list?.map((d, i) => (
                  <option key={i} value={d.project_id}>
                    {d.project_name}
                  </option>
                ))}

              </Select>
              {/* {
                errors.request_for && touched.request_for ? <Label>{errors.request_for}</Label> : null
              } */}

            </Flex>
          </Flex>
          <Flex row>
            <Flex padding="0 !important" md={4}>
              <Label color="cardfont">{("District")} </Label>
            </Flex>
            <Flex padding="0 !important" md={8}>
              <Input
                app
                type="text"
                name="district"
                // value={values.amount || ""}
                disabled

              />


            </Flex>
          </Flex>
          <Flex row>
            <Flex padding="0 !important" md={4}>
              <Label >{("Thana")} </Label>
            </Flex>
            <Flex padding="0 !important" md={8}>
              <Input
                app
                type="text"
                name="thana"
                // value={values.amount || ""}
                disabled

              />


            </Flex>
          </Flex>
          <Flex row>
            <Flex padding="0 !important" md={4}>
              <Label >{("Address")} </Label>
            </Flex>
            <Flex padding="0 !important" md={8}>
              <Input
                app
                type="text"
                name="address"
                // value={values.amount || ""}
                disabled

              />
            </Flex>
          </Flex>
          <Flex row>
            <Flex padding="0 !important" md={4}>
              <Label >{("Mobile")} </Label>
            </Flex>
            <Flex padding="0 !important" md={8}>
              <Input
                app
                type="text"
                name="mobile"
                // value={values.amount || ""}
                disabled

              />
            </Flex>
          </Flex>
        </Flex>

      </Flex>
      <InvTransferModal open={open} setOpen={setOpen} data={{}} add />
      <Loading open={isLoading} />
    </>
  );
};
