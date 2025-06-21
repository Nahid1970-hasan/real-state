import { useEffect } from "react";
import { Modal } from "../../components/Modal";
import { Flex } from "../../components/style/Flex_styled";
import { Typography } from "../../components/style/Typography_styled";
import { useState } from "react";
import { HLChip } from "../../components/Chip";
import { formatGridDate, numberWithCommas } from "../../utils/helper";
import { useSelector } from "react-redux";

export const SubprojectViewDetailes = ({ open, setOpen = () => { }, data }) => {
    const [detailsData, setDetailsData] = useState({});
    const createsubproject = useSelector((state) => state.createsubproject);
    useEffect(() => { setDetailsData(data) }, [data]);
    return (
        <Modal
            md={8}
            sm={10}
            xs={12}
            title={("Sub-project Information")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <>
                <Flex row>

                    <Flex padding="0 0 0 10px !important" md={6} sm={12}>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Sub-Project Name ")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {createsubproject?.infolist?.sub_project_name || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Sub-Project Type ")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {createsubproject?.infolist?.sub_type_name || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0!important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Down Payment")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "}  {numberWithCommas(createsubproject?.infolist?.down_payment || 0)}{" "}{"Tk"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0!important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Installment Number")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "}  {numberWithCommas(createsubproject?.infolist?.no_installment || 0)}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0!important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Installment amount")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "}  {numberWithCommas(createsubproject?.infolist?.installment_amnt || 0)}{" "}{"Tk"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("No of Floor")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {numberWithCommas(createsubproject?.infolist?.floor_no || 0)}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Position Unit")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {numberWithCommas(createsubproject?.infolist?.position_unit || 0)}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Size")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {numberWithCommas(createsubproject?.infolist?.size_sqft || 0)}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Estimated delivery Date")}
                            </Typography></Flex>

                            <Flex padding="5px 0 0 0 !important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "}{createsubproject?.infolist?.est_delivery ? formatGridDate(createsubproject?.infolist?.est_delivery) : "----"}
                            </Typography>
                            </Flex>
                        </Flex>


                    </Flex>
                    <Flex padding="0 10px 0 0 !important" md={6}>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("No of Living")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {numberWithCommas(createsubproject?.infolist?.no_living || 0)}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("No of Bed Rooms")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {numberWithCommas(createsubproject?.infolist?.no_bedrooms || 0)}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("No of Kitchen")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {numberWithCommas(createsubproject?.infolist?.no_kitchen || 0)}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("No of Lobby")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {numberWithCommas(createsubproject?.infolist?.no_lobby || 0)}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("No of Drawing")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {numberWithCommas(createsubproject?.infolist?.no_drawing || 0)}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("No of Balcony")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {numberWithCommas(createsubproject?.infolist?.no_balcony || 0)}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("No of Toilets")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {numberWithCommas(createsubproject?.infolist?.no_toilets || 0)}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Others")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {createsubproject?.infolist?.other || 0}
                            </Typography>
                            </Flex>
                        </Flex>

                      
                        <Flex row>
                            <Flex padding="5px 0 0 0!important" md={5} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Status")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0 !important" md={7} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} <HLChip background={"primary"} color={"primaryFont"} label={createsubproject?.infolist?.status || "----"} />
                            </Typography>
                            </Flex>


                        </Flex>

                    </Flex>
                   
                        <Flex row>
                            <Flex padding="0 0 0 10px !important" md={2} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Booking Notes")}
                            </Typography></Flex>
                            <Flex padding="0!important" md={10} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {createsubproject?.infolist?.booking_notes || "---"}
                            </Typography>
                            </Flex>
                        </Flex>
                 


                </Flex>
            </>

        </Modal>
    );
};
