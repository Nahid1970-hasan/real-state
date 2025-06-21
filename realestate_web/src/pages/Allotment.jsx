import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Flex } from "../components/style/Flex_styled";
import { Select } from "../components/style/Select_styled";
import { loadPage } from "../features/page/page_slice";
import { ErrLabel, Label } from "../components/style/Label";
import { Loading } from "../components/Loading";
import { Toast } from "../components/Toast";
import { Constants } from "../utils/helper";
import { CardBody } from "../components/style/Card_styled";
import DataGrid from "../components/DataGrid";
import { loadBookingDetail, loadBookingInfo, loadBookingPayment,initLoader, initiatePayments, initiateDetails, loadBookingInfoInt } from "../features/allotment/allotment_slice";
import { DeleteBookingModal } from "../features/allotment/DeleteBookingModal";
import { ViewDetailsModal } from "../features/allotment/ViewDetailsModal";
import { ViewPaymantModal } from "../features/allotment/ViewPaymantModal";
import { useLocation } from "react-router-dom";
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

const Scroll = styled.div`
overflow:hidden scroll;
height: 580px;
`;
export const Allotmentpage = () => {
  const dispatch = useDispatch();
  const [get_value, set_value] = useState("");
  const allotment = useSelector((state) => state.allotment);
  const userReadOnly = useSelector((state) => state.user.read_only);
  const dropDownInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [OpenPay, setOpenPay] = useState(false);
  const [booking_id, set_booking_id] = useState(0);
  const [remove, setRemove] = useState(false);
  const [data, setData] = useState({});
  const [paydata, setPayData] = useState({});
  const [isLoading, setIsLoading] = useState(false); 
  const [search_value_err, set_search_value_err] = useState(null);
  const user = useSelector((state) => state.user);
  const location= useLocation();
 
  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      dispatch(loadBookingInfoInt(data));
    } 
    dispatch(loadPage({ title: "Allotment/Booking", button: false }));
  }, [location]);
 
  useEffect(() => {
    if (allotment.addUpdateLoading == "pending") {
        setIsLoading(true);
    } else if (allotment.addUpdateLoading == "succeeded") {
        setIsLoading(false);  
        dispatch(loadBookingInfo({view_criteria:""}));
        setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (allotment.addUpdateLoading != "idle") {
        setIsLoading(false);
        setTimeout(() => { dispatch(initLoader());}, 5000);
    }
}, [allotment.addUpdateLoading]);

  useEffect(() => {
    allotment.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [allotment.loading]);

  useEffect(() => {
    allotment.paymentLoading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [allotment.paymentLoading]);

  useEffect(() => {
    allotment.bookLoading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [allotment.bookLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      setIsLoading(true);
      dispatch(loadBookingInfo({view_criteria:get_value}));
      set_search_value_err(null);
    }else{
      set_search_value_err("Sorry! You are not authorized user to view this page");
    }
   
  };

  const handleChangeOption = () => {
    let searchID = dropDownInputRef.current.value;
    set_value(searchID);
  };

  const colums = [
    {
      headerName: "ID",
      field: "booking_id",
      key: true,
      type: "number",
      hide: true,
      sortable: false,
    },
    {
      headerName: "Sub-project Name",
      field: "sub_project_name",
      type: "string",
      description: "Project Name",
      sortable: true, 
      width:"220px"
    },
    {
      headerName: "Customer Name",
      field: "fullname",
      description: "Customer Name",
      width:"150px"
    },
    {
      headerName: "Floor",
      field: "floor_no",
      description: "Floor Number",
      sortable: true, 
      width:"80px"
    },
    {
      headerName: "Position/Unit",
      field: "position_unit",
      description: "Position/Unit",
      sortable: true, 
      width:"100px"
    },
     
    {
      headerName: "Booked",
      field: "confirmed",
      type: "text",
      description: "Booking Status",
      sortable: true, 
      alignment:"center",
      width:"100px"
    },
    {
      headerName: "Handed Over",
      field: "handed_over",
      type: "text",
      description: "Handed Over",
      sortable: true, 
      alignment:"center",
      width:"100px"
    },
    {
      headerName: ("action"),
      field: "",
      hide: userReadOnly,
      type: "custaction", 
      icons: [
          {
            
              icon:"payments",
              color:"payment",
              hoverDesc:"Payment Details"
          },
          {
              icon:"preview",
              color:"preview",
              hoverDesc:"View Details"
          },
          {
              icon:"delete",
              color:"error",
              hoverDesc:"Delete"
          },  
      ], 
      callBacks: [
        (booking_id) => {
          dispatch(initiatePayments());
          dispatch(loadBookingPayment({booking_id:booking_id}));
          var rowpaydata = allotment?.dropdoenlist?.find((d) => d.booking_id == booking_id);
          set_booking_id(booking_id);
          setOpenPay(true);
          setPayData(rowpaydata);
        },
        (booking_id) => {
          dispatch(initiateDetails());
          dispatch(loadBookingDetail({booking_id:booking_id}));
          var rowdata = allotment?.dropdoenlist?.find((d) => d.booking_id == booking_id);
          set_booking_id(booking_id);
          setEditOpen(true);
          setData(rowdata);
        },
        (booking_id) => {
          setRemove(true);
          set_booking_id(booking_id);
        },
      ],
  } 
  ];

  let rows = allotment?.dropdoenlist?.map((d) => ({
    ...d,
    actiontype: d.handed_over == "Yes" || d.confirmed == "Yes" ? [true, true, false] : [false, true, true],
  }))||[];


  return (
    <>
      {(allotment.addUpdateLoading == "idle" || allotment.addUpdateLoading == "pending") ? <></> : (
        allotment.addUpdateLoading == "succeeded" ? (
          <Toast msg={allotment.msg} icon="task_alt" color="success" />
        ) : (
          <Toast color="error" msg={allotment.msg} />
        )
      )}
      <form>
        <Flex row>
          <CustFlex md={1.2} sm={6} xs={12}>
            <Label >View Criteria</Label>
          </CustFlex>
          <CustFlex md={3} sm={6} xs={12}>
            <Select
              app
              ref={dropDownInputRef}
              name="search_col"
              id="search_col"
              value={get_value}
              onChange={handleChangeOption}
            >
              <option disabled value="">
                {("--select value")}
              </option>
              <option value="New Booking">New Booking</option>
              <option value="Booked">Booked</option>
              <option value="Handed Over">Handed Over</option>
            </Select>
            {
              search_value_err ? <ErrLabel>{search_value_err}</ErrLabel> : null
            }
          </CustFlex>

          <CustFlex md={3} sm={12} xs={12}>
            <CustDiv>
              <Button 
                type="button"
                disabled={!get_value}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </CustDiv>
          </CustFlex>


        </Flex>
      </form>

      <CustFlex>
        <Flex md={12}><CardBody><Scroll> <DataGrid colums={colums} rows={rows || []} /></Scroll></CardBody>
        </Flex>
      </CustFlex>
      <ViewPaymantModal open={OpenPay} setOpen={setOpenPay} data={paydata} /> 
      <ViewDetailsModal open={editOpen} setOpen={setEditOpen} data={data} /> 
      <DeleteBookingModal open={remove} setOpen={setRemove} data={{booking_id:booking_id }} />
      <Loading open={isLoading} />
    </>
  );
};
