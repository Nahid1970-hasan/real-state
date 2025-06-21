import { useEffect } from "react";
import { Modal } from "../../components/Modal";
import { Flex } from "../../components/style/Flex_styled";
import { Typography } from "../../components/style/Typography_styled";
import { useState } from "react";
import { Chip, HLChip } from "../../components/Chip";
import { HLLabel } from "../../components/style/Label";
import { formatGridDate, numberWithCommas } from "../../utils/helper";

export const StackPaymentView = ({ open, setOpen = () => { }, data }) => {
    const [detailsData, setDetailsData] = useState({});
    useEffect(() => { setDetailsData(data) }, [data]);
    function prjtshrname(a, b) {
        return a ? b ? a + "( " + b + ")" : a : "----";;
    }
    return (
        <Modal
            md={6}
            sm={8}
            xs={12}
            title={("View Payment Information")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <>
                <Flex padding="0 !important" md={12} sm={12}>
                    <Flex row>
                        <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontWeight="bold">
                            {("Payee Name ")}
                        </Typography></Flex>
                        <Flex padding="0 0 5px 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left"  >
                            {":"} {" "} {detailsData?.payee_name || "----"}
                        </Typography>
                        </Flex>
                    </Flex>
                    {
                        detailsData?.payee_type == "INVESTOR" ? <></> :
                            <><Flex row>
                                <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontWeight="bold">
                                    {("Project Name ")}
                                </Typography></Flex>
                                <Flex padding="0 0 5px 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left"  >
                                    {":"} {" "} {prjtshrname(detailsData?.project_name, detailsData?.project_shortname)}
                                </Typography>
                                </Flex>
                            </Flex>
                                <Flex row>
                                    <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontWeight="bold">
                                        {("Sub-project Name ")}
                                    </Typography></Flex>
                                    <Flex padding="0 0 5px 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left"  >
                                        {":"} {" "} {detailsData?.sub_project_name || "----"}
                                    </Typography>
                                    </Flex>
                                </Flex></>
                    }

                    <Flex row>
                        <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontWeight="bold">
                            {("Mobile Number")}
                        </Typography></Flex>
                        <Flex padding="0 0 5px 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left"  >
                            {":"} {" "} {detailsData?.mobile_no || "----"}
                        </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontWeight="bold">
                            {("Payee Type")}
                        </Typography></Flex>

                        <Flex padding="0 0 5px 0 !important" md={8} sm={6} xs={12}> <Typography textAlign="left"  >
                            {":"} {" "} {detailsData?.payee_type || "----"}
                        </Typography>
                        </Flex>
                    </Flex>

                    <Flex row>
                        <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontWeight="bold">
                            {("Payment For")}
                        </Typography></Flex>

                        <Flex padding="0 0 5px 0 !important" md={8} sm={6} xs={12}> <Typography textAlign="left"  >
                            {":"} {" "} {detailsData?.payment_for || "----"}
                        </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontWeight="bold">
                            {("Payment Method")}
                        </Typography></Flex>

                        <Flex padding="0 0 5px 0 !important" md={8} sm={6} xs={12}> <Typography textAlign="left"  >
                            {":"} {" "} {detailsData?.payment_method || "----"}
                        </Typography>
                        </Flex>
                    </Flex>

                    {detailsData?.payment_for == "Installment" ? <Flex row>
                        <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontWeight="bold">
                            {("Installment#")}
                        </Typography></Flex>

                        <Flex padding="0 0 5px 0 !important" md={8} sm={6} xs={12}> <Typography textAlign="left"  >
                            {":"} {" "} {detailsData?.installment_no || "----"}
                        </Typography>
                        </Flex>
                    </Flex> : <></>}

                    {
                        detailsData?.payment_method == "Cash" ? <></> : <>
                            <Flex row>
                                <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontWeight="bold">
                                    {("Bank Name")}
                                </Typography></Flex>

                                <Flex padding="0 0 5px 0 !important" md={8} sm={6} xs={12}> <Typography textAlign="left"  >
                                    {":"} {" "} {detailsData?.bank_name || "----"}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row>
                                <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontWeight="bold">
                                    {("Branch Name")}
                                </Typography></Flex>

                                <Flex padding="0 0 5px 0 !important" md={8} sm={6} xs={12}> <Typography textAlign="left"  >
                                    {":"} {" "} {detailsData?.branch_name || "----"}
                                </Typography>
                                </Flex>
                            </Flex>

                            <Flex row>
                                <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontWeight="bold">
                                    {("Cheque Number")}
                                </Typography></Flex>

                                <Flex padding="0 0 5px 0!important" md={8} sm={6} xs={12}> <Typography textAlign="left"  >
                                    {":"} {" "} {detailsData?.cheque_no || "----"}
                                </Typography>
                                </Flex>
                            </Flex>
                        </>
                    }
                    <Flex row>
                        <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontWeight="bold">
                            {("Payment Amount ")}
                        </Typography></Flex>
                        <Flex padding="0!important" md={8} sm={6} xs={12}> <Typography textAlign="left" >
                            {":"} {" "} {numberWithCommas(detailsData?.amount || 0)}{" "}{"Tk"}
                        </Typography>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontWeight="bold">
                            {("Payment Date")}
                        </Typography></Flex>
                        <Flex padding="0 !important" md={8} sm={6} xs={12} > <Typography textAlign="left"  >
                            {":"} {" "}  {detailsData?.payment_date ? formatGridDate(detailsData?.payment_date) : "----"}
                        </Typography>
                        </Flex>
                    </Flex>


                    <Flex row>
                        <Flex padding="0 0 5px 0 !important" md={4} sm={6} xs={12}><Typography textAlign="left" fontWeight="bold">
                            {("Status")}
                        </Typography></Flex>

                        <Flex padding="0 0 5px 0 !important" md={8} sm={6} xs={12}> <Typography textAlign="left"  >
                            {":"} {" "} <HLChip background={"primary"} color={"primaryFont"} label={detailsData?.added_to_wallet == "Yes" ? "Added to Wallet" : detailsData?.payment_verified == "Yes" ? "Verified" : "Requested" || "----"} />
                        </Typography>
                        </Flex>
                    </Flex>
                </Flex>

            </>

        </Modal>
    );
};
