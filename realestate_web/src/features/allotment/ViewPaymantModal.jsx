
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../components/Modal";
import { CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Flex } from "../../components/style/Flex_styled";
import DataGrid from "../../components/DataGrid";
import { Typography } from "../../components/style/Typography_styled";
import { numberWithCommas } from "../../utils/helper";

export const ViewPaymantModal = ({ add, open, setOpen = () => { }, data }) => {
    const allotment = useSelector((state) => state.allotment);
    const dispatch = useDispatch();


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
            headerName: ("Scheduled Date"),
            field: "est_payment_date",
            description: "Scheduled Date",
            type: "date"
        },
        {
            headerName: ("Type"),
            field: "payment_for",
            description: "Payment Type",
        },

        {
            headerName: ("Installment#"),
            field: "installment_no",
            description: "Installment Number",
            type: "number",
        },
        {
            headerName: ("Amount"),
            field: "payment_amount",
            description: "Payment Amount",
            alignment:"right", 
            type:"currency"
        },
        {
            headerName: ("Status"),
            field: "status",
            description: "Status",
            type: "state"
        },
        {
            headerName: ("Paid Date"),
            field: "act_payment_date",
            description: "Paid Date",
            type: "date"
        },

    ];

    let rows = allotment?.paylist?.map((d) => ({
        ...d,
        status: {
          label: d.status,
          color: d.status == "Paid" ? "success" : "error",
        },
      }))||[];

    return (
        <>
            <Modal
                md={8}
                sm={10}
                xs={12}
                title={("View Payment Details")}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                outsideclick
            >
                <Flex row>
                    <Flex md={12} padding="0 !important">
                    <Flex row>
                            <Flex padding="0!important" md={3}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Project  Name")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={9}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {data?.sub_project_name || "----"}
                                </Typography>
                            </Flex>
                        </Flex>
                    <Flex row>
                            <Flex padding="0!important" md={3}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Customer  Name")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={9}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {data?.fullname || "----"}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={3}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Total Amount")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={9}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {numberWithCommas(allotment?.total_amount||0)} {" Tk"}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={3}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Paid Amount")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={9}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {numberWithCommas(allotment?.paid_amount||0)} {" Tk"}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={3}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Due Amount")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={9}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {":"} {numberWithCommas(allotment?.rem_amount||0)} {" Tk"}
                                </Typography>
                            </Flex>
                        </Flex>
                        
                    </Flex>
                    <Flex md={12} padding="10px 0 !important">
                        <CardBody><DataGrid colums={colums} rows={rows || []} /></CardBody>
                    </Flex> 
                </Flex>
            </Modal>
        </>
    );
};
