import { Form, Formik } from "formik";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { HLLabel, Label } from "../../components/style/Label";
import { Toast } from "../../components/Toast";
import {
    updateBookingInfo,
    updateBookingAllotment,
} from "./allotment_slice";
import { Typography } from "../../components/style/Typography_styled";
import { Flex } from "../../components/style/Flex_styled";
import { HLChip } from "../../components/Chip";
import { formatGridDate } from "../../utils/helper";

export const ViewDetailsModal = ({ add, open, setOpen = () => { }, data }) => {
    const allotment = useSelector((state) => state.allotment);
    const [booking_id, set_booking_id] = useState(0);
    const [b_disabled, set_b_disabled] = useState(false);
    const [a_disabled, set_a_disabled] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        set_booking_id(data.booking_id || "");
    }, [data]);

    const submitForm = () => {
        dispatch(updateBookingInfo({ booking_id: booking_id, sub_project_id: data.sub_project_id }));
        set_b_disabled(true);
    };
    const submitAllotment = () => {
        dispatch(updateBookingAllotment({ booking_id: booking_id }));
        set_a_disabled(true);
    };

    useEffect(() => {
        if (allotment.addUpdateLoading == "succeeded") {
            setTimeout(() => { set_a_disabled(false); setOpen(false); set_b_disabled(false); }, 3000);
        } else if (allotment.addUpdateLoading != "idle" && allotment.addUpdateLoading != "pending") {
            setTimeout(() => { set_a_disabled(false); set_b_disabled(false); }, 4000);
        }
    }, [allotment.addUpdateLoading]);


    return (
        <>
            <Modal
                md={6}
                sm={8}
                xs={10}
                title={("View Details")}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                outsideclick
            >
                <Flex row>
                    <Flex padding="0 0 10px 0 !important" md={12}>
                        <HLLabel>
                            <Typography textAlign="left" color="primaryFont" fontSize="bodyContentFontSize" fontWeight="bold">
                                Customer Detail
                            </Typography>
                        </HLLabel>
                    </Flex>
                    

                    <Flex row>
                        <Flex padding="0 0 0 5px !important" md={3}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Customer  Name")}
                            </Typography>
                        </Flex>
                        <Flex padding="0!important" md={9}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}    {allotment?.infolist?.fullname || "----"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding=" 0 0 0 5px !important" md={3}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Address")}
                            </Typography>
                        </Flex>
                        <Flex padding="0!important" md={7.9}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}   {allotment?.infolist?.address || "----"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding=" 0 0 0 5px !important" md={3}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Booking Notes")}
                            </Typography>
                        </Flex>
                        <Flex padding="0!important" md={7.9}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}    {allotment?.infolist?.booking_notes || "----"}
                            </Typography>
                        </Flex>
                    </Flex>


                    <Flex row>
                        <Flex md={6} padding="10px 5px 0 0 !important">
                            <HLLabel>
                                <Typography textAlign="left" color="primaryFont" fontSize="bodyContentFontSize" fontWeight="bold">
                                    Project Detail
                                </Typography>
                            </HLLabel>
                            <Flex row>
                                <Flex padding="10px 0 0 5px !important" md={5}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Project Name")}
                                    </Typography>
                                </Flex>
                                <Flex padding="10px 0 0 0 !important" md={7}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"} {allotment?.infolist?.project_name || "----"}
                                    </Typography>
                                </Flex>
                            </Flex>
                            <Flex row>
                                <Flex padding="0 0 0 5px !important" md={5}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Location")}
                                    </Typography>
                                </Flex>
                                <Flex padding="0!important" md={7}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}  {allotment?.infolist?.popular_loc || "----"}
                                    </Typography>
                                </Flex>
                            </Flex>
                            <Flex row>
                                <Flex padding="0 0 0 5px !important" md={5}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Project Type")}
                                    </Typography>
                                </Flex>
                                <Flex padding="0!important" md={7}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}  {allotment?.infolist?.type_name || "----"}
                                    </Typography>
                                </Flex>
                            </Flex>
                            <Flex row>
                                <Flex padding="0 0 0 5px !important" md={5}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Floor")}
                                    </Typography>
                                </Flex>
                                <Flex padding="0!important" md={7}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}    {allotment?.infolist?.floor_no || "----"}
                                    </Typography>
                                </Flex>
                            </Flex>
                            <Flex row>
                                <Flex padding="0 0 0 5px !important" md={5}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Position/Unit")}
                                    </Typography>
                                </Flex>
                                <Flex padding="0!important" md={7}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"} {allotment?.infolist?.position_unit || "----"}
                                    </Typography>
                                </Flex>
                            </Flex>
                            <Flex row>
                                <Flex padding="0 0 0 5px !important" md={5}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Size (s/ft)")}
                                    </Typography>
                                </Flex>
                                <Flex padding="0!important" md={7}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}  {allotment?.infolist?.size_sqft || "----"}
                                    </Typography>
                                </Flex>
                            </Flex>
                        </Flex> 
                        <Flex md={6} padding="10px 0 0 5px !important">
                            <HLLabel>
                                <Typography textAlign="left" color={"primaryFont"} fontSize="bodyContentFontSize" fontWeight="bold">
                                    Booking Detail
                                </Typography>
                            </HLLabel>
                            <Flex row>
                                <Flex padding="10px 0 0 5px !important" md={5}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Sub-project Name")}
                                    </Typography>
                                </Flex>
                                <Flex padding="10px 0 0 0 !important" md={7}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}   {allotment?.infolist?.sub_project_name || "----"}
                                    </Typography>
                                </Flex>
                            </Flex>
                            <Flex row>
                                <Flex padding="0 0 0 5px !important" md={5}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Booking Date")}
                                    </Typography>
                                </Flex>
                                <Flex padding="0 0 0 0 !important" md={7}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}   {allotment?.infolist?.booking_date ? formatGridDate(allotment?.infolist?.booking_date) : allotment?.infolist?.booking_date || "----"}
                                    </Typography>
                                </Flex>
                            </Flex>
                            <Flex row>
                                <Flex padding="0 0 0 5px !important" md={5}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Booking Expiry")}
                                    </Typography>
                                </Flex>
                                <Flex padding="0!important" md={7}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"} {allotment?.infolist?.confirmed == "Yes"?"----":allotment?.infolist?.expiry_date ?formatGridDate(allotment?.infolist?.expiry_date) : allotment?.infolist?.expiry_date || "----"}
                                    </Typography>
                                </Flex>
                            </Flex>
                            <Flex row>
                                <Flex padding="0 0 0 5px !important" md={5}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Confirmed Date")}
                                    </Typography>
                                </Flex>
                                <Flex padding="0 !important" md={7}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"} {allotment?.infolist?.confirmed_date ? formatGridDate(allotment?.infolist?.confirmed_date) : allotment?.infolist?.confirmed_date || "----"}
                                    </Typography>
                                </Flex>
                            </Flex>
                            <Flex row>
                                <Flex padding="0 0 0 5px !important" md={5}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Handed Over Date")}
                                    </Typography>
                                </Flex>
                                <Flex padding="0!important" md={7}>
                                    <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"} {allotment?.infolist?.handed_over_date ? formatGridDate(allotment?.infolist?.handed_over_date) : allotment?.infolist?.handed_over_date || "----"}
                                    </Typography>
                                </Flex>
                            </Flex>
                            <Flex row>
                                <Flex padding="0 0 0 5px  !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Status")}
                                </Typography></Flex>

                                <Flex padding="0 !important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {" "} <HLChip background={"primary"} color={"primaryFont"} label={allotment?.infolist?.handed_over == "Yes" ? "Handed Over" : allotment?.infolist?.confirmed == "Yes" ? "Booked" : "Booking" || "----"} />
                                </Typography>
                                </Flex>
                            </Flex>
                        </Flex> 
                    </Flex>

                    <Flex md={12} padding="10px 0!important">
                        <CardHeaderButton>
                            {allotment.bookLoading == "pending" || allotment?.infolist?.confirmed == "Yes" || allotment?.infolist?.handed_over == "Yes" ? <></> :
                                <PrimaryButton
                                    type="button"
                                    color="primaryButton"
                                    fontColor="primaryButtonFont"
                                    disabled={b_disabled}
                                    onClick={submitForm}
                                >
                                    Confirm Booking
                                </PrimaryButton>}
                            {allotment.bookLoading == "pending" || allotment?.infolist?.confirmed == "No" || allotment?.infolist?.handed_over == "Yes" ? <></> :
                                <PrimaryButton
                                    type="button"
                                    color="primaryButton"
                                    fontColor="primaryButtonFont"
                                    disabled={a_disabled}
                                    onClick={submitAllotment}
                                >
                                    Confirm Allotment
                                </PrimaryButton>}
                        </CardHeaderButton>
                    </Flex>
                </Flex>
            </Modal>
        </>
    );
};
