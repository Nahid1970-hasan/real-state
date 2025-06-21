import { useEffect } from "react";
import { Modal } from "../../components/Modal";
import { Flex } from "../../components/style/Flex_styled";
import { Typography } from "../../components/style/Typography_styled";
import { useState } from "react";
import { HLLabel } from "../../components/style/Label";
import { formatGridDate, numberWithCommas } from "../../utils/helper";
import { HLChip } from "../../components/Chip";
import { TextSpanView } from "../../components/TextSpanView";

export const StackWithdrawlView = ({ open, setOpen = () => { }, data }) => {
    const [detailsData, setDetailsData] = useState({});
    useEffect(() => { setDetailsData(data) }, [data]);
    return (
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={("View Withdrawal Information")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <>
                    <Flex padding=" 0 !important" md={12} sm={12}>
                        <Flex row>
                            <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Project Name ")}
                            </Typography></Flex>
                            <Flex padding="0 0 5px 0!important" md={8} sm={6} xs={12}> <TextSpanView textAlign="left" fontSize="bodyContentFontSize" >
                               {detailsData?.project_name || "----"}
                            </TextSpanView>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Investor Name")}
                            </Typography></Flex>

                            <Flex padding="0 0 5px 0 !important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.investor_name || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Mobile Number")}
                            </Typography></Flex>

                            <Flex padding="0 0 5px 0 !important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.mobile_no || "----"}
                            </Typography>
                            </Flex>
                        </Flex>

                        <Flex row>
                            <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Withdrawal Type")}
                            </Typography></Flex>

                            <Flex padding="0 0 5px 0 !important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.request_for || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                       
                       
                        <Flex row>
                            <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Amount ")}
                            </Typography></Flex>
                            <Flex padding="0 0 5px 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize">
                                {":"} {" "} {numberWithCommas(detailsData?.amount ||0)}{" "}{"Tk"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Request Date")}
                            </Typography></Flex>
                            <Flex padding="0 0 5px 0 !important" md={8} sm={6} xs={12} > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "}  {detailsData?.request_date?formatGridDate(detailsData?.request_date):"----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Status")}
                            </Typography></Flex>
                            <Flex padding="0 0 5px 0 !important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} <HLChip background={"primary"} color={"primaryFont"} label={detailsData?.withdrawl_approved == "Yes" ? "Approved" : "Requested" || "----"} />
                            </Typography>
                            </Flex>

                            
                        </Flex>

                        
                        
                    </Flex>
   
            </>

        </Modal>
    );
};
