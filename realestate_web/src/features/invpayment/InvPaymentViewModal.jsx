import { useEffect } from "react";
import { Modal } from "../../components/Modal";
import { Flex } from "../../components/style/Flex_styled";
import { Typography } from "../../components/style/Typography_styled";
import { useState } from "react";
import { Chip, HLChip } from "../../components/Chip";
import { HLLabel } from "../../components/style/Label";
import { formatGridDate, numberWithCommas } from "../../utils/helper";

export const InvPaymentViewModal = ({ open, setOpen = () => { }, data }) => {
    const [detailsData, setDetailsData] = useState({});
    useEffect(() => { setDetailsData(data) }, [data]);
    return (
        <Modal
            md={8}
            sm={10}
            xs={12}
            title={("View Payment Information")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <>
                <Flex row>
                    <Flex padding="0 5px 5px 0 !important" md={6} sm={12}>
                        <Flex row>
                            <Flex padding="0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Payment Type ")}
                            </Typography></Flex>
                            <Flex padding="0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.payment_method || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Cheque No")}
                            </Typography></Flex>

                            <Flex padding="5px 0 0 0  !important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.cheque_no || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0  !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Payment Date")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0  !important" md={8} sm={6} xs={12} > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "}{detailsData?.payment_date?formatGridDate(detailsData?.payment_date):"----"}
                            </Typography>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex padding="0 0 5px 5px !important" md={6} sm={12}>
                        <Flex row>
                            <Flex padding="0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Payment Amount ")}
                            </Typography></Flex>
                            <Flex padding="0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodySubTitleFontSize">
                                {":"} {" "} {numberWithCommas(detailsData?.amount ||0)}{" "}{"Tk"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 0  !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Status")}
                            </Typography></Flex>

                            <Flex padding="5px 0 0 0  !important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} <HLChip background={"primary"} color={"primaryFont"} label={detailsData?.added_to_wallet == "Yes" ? "Added to Wallet" : detailsData?.payment_verified == "Yes" ? "Verified" : detailsData?.payment_submitted == "Yes" ? "Submitted" : "Requested" || "----"} />
                            </Typography>
                            </Flex>
                        </Flex>

                    </Flex>
                    <Flex padding="0 5px 5px 0 !important" md={6} sm={12}>
                        <Flex row>
                            <Flex padding="5px 5px 5px 0 !important" md={12}>
                                <HLLabel>
                                    <Typography textAlign="left" color="primaryFont" fontWeight="bold">
                                        {("Company Bank")}
                                    </Typography>
                                </HLLabel>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 5px 0 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Bank Name ")}
                            </Typography></Flex>
                            <Flex padding="5px 5px 0 0 !important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.company_bank?.bank_name || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 5px 0 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Branch Name ")}
                            </Typography></Flex>
                            <Flex padding="5px 5px 0 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.company_bank?.branch_name || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 5px 0 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Account No#")}
                            </Typography></Flex>
                            <Flex padding="5px 5px 0 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.company_bank?.account_no || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 5px 0 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Routing No#")}
                            </Typography></Flex>
                            <Flex padding="5px 5px 0 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.company_bank?.route_no || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                         
                    </Flex>
                    <Flex padding="0 0 5px 5px !important" md={6} sm={12}>
                        <Flex row>
                            <Flex padding="5px 0 5px 5px !important" md={12}>
                                <HLLabel>
                                    <Typography textAlign="left" color="primaryFont" fontWeight="bold">
                                        {("Own Bank ")}
                                    </Typography>
                                </HLLabel>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 5px !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Bank Name ")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.own_bank?.bank_name || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 5px !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Branch Name ")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.own_bank?.branch_name || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 5px !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Account No#")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.own_bank?.account_no || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="5px 0 0 5px !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {("Routing No#")}
                            </Typography></Flex>
                            <Flex padding="5px 0 0 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {" "} {detailsData?.own_bank?.route_no || "----"}
                            </Typography>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </>

        </Modal>
    );
};
