import { useEffect } from "react";
import { Modal } from "../../components/Modal";
import { Flex } from "../../components/style/Flex_styled";
import { Typography } from "../../components/style/Typography_styled";
import { useState } from "react";
import { HLChip } from "../../components/Chip";
import { formatGridDate, numberWithCommas } from "../../utils/helper";

export const PorjectDetailsModal = ({ open, setOpen = () => { }, data }) => {
    const [detailsData, setDetailsData] = useState({});
    useEffect(() => { setDetailsData(data) }, [data]);
    return (
        <Modal
            md={6}
            sm={8}
            xs={12}
            title={("Porject Information")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <>
                <Flex row>

                    <Flex padding="0 0 0 10px !important" md={12} sm={12}>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Project Name ")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.project_name || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Short Name ")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0 !important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.project_shortname || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Project Type ")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.type_name || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Popular Location")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.popular_loc || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0!important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Estimated Cost")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "}  {numberWithCommas(detailsData?.est_cost || 0)}{" "}{"Tk"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Price/Share")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {numberWithCommas(detailsData?.unit_price || 0)}{" "}{"Tk"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0!important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("No. of Share")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.no_share || "0"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0!important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Share For Sell")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.no_share_for_sell || "0"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0!important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Share Sold")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.share_sold || "0"}
                            </Typography>
                            </Flex>
                        </Flex>
                       
                        <Flex row>
                            <Flex padding="5px 0 0 0!important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Estimated Start Date")}
                            </Typography></Flex>

                            <Flex padding="5px 0 0 0 !important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "}{detailsData?.est_start_date ? formatGridDate(detailsData?.est_start_date) : "----"}
                            </Typography>
                            </Flex>
                        </Flex>

                        <Flex row>
                            <Flex padding="5px 0 0 0!important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Estimated Complete Date")}
                            </Typography></Flex>

                            <Flex padding="5px 0 0 0 !important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "}{detailsData?.est_complete_date ? formatGridDate(detailsData?.est_complete_date) : "----"}
                            </Typography>
                            </Flex>
                        </Flex>

 
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Status")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0 !important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} <HLChip background={"primary"} color={"primaryFont"} label={detailsData?.status|| "----"} />
                            </Typography>
                            </Flex>


                        </Flex>


                    </Flex>

                </Flex>
            </>

        </Modal>
    );
};
