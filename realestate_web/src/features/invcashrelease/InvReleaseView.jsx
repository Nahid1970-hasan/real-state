import { useEffect } from "react";
import { Modal } from "../../components/Modal";
import { Flex } from "../../components/style/Flex_styled";
import { Typography } from "../../components/style/Typography_styled";
import { useState } from "react";
import { Chip, HLChip } from "../../components/Chip";
import { HLLabel } from "../../components/style/Label";
import { formatGridDate, numberWithCommas } from "../../utils/helper";

export const InvReleaseView = ({ open, setOpen = () => { }, data }) => {
    const [detailsData, setDetailsData] = useState({});
    useEffect(() => { setDetailsData(data) }, [data]);
    return (
        <Modal
            md={4}
            sm={6}
            xs={12}
            title={("View Cash Release Information")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <>
                <Flex row>
                        
                    <Flex padding="0 !important" md={12} sm={12}>
                        <Flex row>
                            <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Project Name ")}
                            </Typography></Flex>
                            <Flex padding="0 0 5px 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.project_name || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 5px 0!important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Total Investment")}
                            </Typography></Flex>
                            <Flex padding="0 0 5px 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "}  {numberWithCommas(detailsData?.investment_amount || 0)}{" "}{"Tk"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 5px 0!important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Withdrawl Type")}
                            </Typography></Flex>
                            <Flex padding="0 0 5px 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.request_for || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Amount")}
                            </Typography></Flex>
                            <Flex padding="0 0 5px 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {numberWithCommas(detailsData?.amount ||0)}{" "}{"Tk"}
                            </Typography>
                            </Flex>
                        </Flex>
                 
                        <Flex row>
                            <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Request Date")}
                            </Typography></Flex>

                            <Flex padding="0 0 5px 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "}{detailsData?.request_date?formatGridDate(detailsData?.request_date):"----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        
                        
                        <Flex row>
                            <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Release Date")}
                            </Typography></Flex>
                            <Flex padding="0 0 5px 0 !important" md={8} sm={6} xs={12} > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "}{detailsData?.approved_date?formatGridDate(detailsData?.approved_date):"----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Release Approved")}
                            </Typography></Flex>

                            <Flex padding="0 0 5px 0 !important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} <HLChip background={"primary"} color={"primaryFont"} label={detailsData?.release_approved == "Yes" ? "Approved" : detailsData?.release_submitted == "Yes" ? "Submitted" : "Requested" || "----"} />
                            </Typography>
                            </Flex>
                        </Flex>
                       

                    </Flex>
                    
                </Flex>
            </>

        </Modal>
    );
};
