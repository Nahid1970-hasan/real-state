import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../components/Modal";
import { HLLabel, Label } from "../../components/style/Label";
import { Typography } from "../../components/style/Typography_styled";
import { initLoader, loadStackProperty } from "./stackholder_info_slice";
import { Flex } from "../../components/style/Flex_styled";
import { Select } from "../../components/style/Select_styled";
import { Formik } from "formik";
import { formatGridDate, numberWithCommas } from "../../utils/helper";

export const StackPropertyInfoModal = ({
    open,
    setOpen = () => { }, data,
    newInitValues,
}) => {

    const stackPropertyData = useSelector(state => state.stackInfo);
    const [sub_project_id, set_sub_project_id] = useState("");

    const [rowdata, set_rowdata] = useState({
        popular_loc: "",
        sub_project_id: "",
        user_id: "",
        type_name: "",
        sub_project_name: "",
        floor_no: " ",
        other: " ",
        no_living: " ",
        no_kitchen: " ",
        no_toilets: "",
        down_payment: "",
        no_installment: "",
        no_lobby: " ",
        no_drawing: "",
        size_sqft: "",
        no_balcony: "",
        position_unit: "",
        est_delivery: "",
        no_bedrooms: "",
        installment_amnt: "",
        project_name: "",
    });


    const handleChangeOption = (e) => {
        var pId = e.target.value;
        set_sub_project_id(pId);
        var rwData = stackPropertyData?.project_detail?.find((d) => d.sub_project_id == pId);
        set_rowdata(rwData);
    };

    const dispatch = useDispatch();

    return (
        <>
            <Modal
                md={8}
                sm={10}
                xs={12}
                title={("View Property")}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                outsideclick
            >
                <div>
                    <Flex row>
                        <Flex padding="0 0 0 10px !important" md={2} sm={3} xs ={5}> 
                            <Typography margin="8px 0 0 0" textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Sub-project Name")}
                                    </Typography>
                        </Flex>
                        <Flex padding="0!important" md={3} sm={3} xs={7}>
                            <Select
                                app
                                onChange={handleChangeOption}
                                value={sub_project_id || ""}

                            >
                                <option disabled value={""}>--Select Value</option>
                                {stackPropertyData?.project_detail?.map((d, i) => (
                                    <option key={i} value={d.sub_project_id}>
                                        {" "}
                                        {d.sub_project_name}
                                    </option>
                                ))}
                            </Select>
                        </Flex>
                    </Flex>
                    <Flex padding="0!important" md={12}>
                        <Flex padding="10px 0 10px 0" md={12}>
                            <HLLabel>
                                <Typography color="primaryFont" fontSize="bodySubTitleFontSize" fontWeight="bold" textAlign="left">
                                    Project Detail
                                </Typography>
                            </HLLabel>

                        </Flex>

                        <Flex row>
                            <Flex padding="0!important" md={12}>

                                <Flex row>
                                    <Flex padding="0 0 0 10px !important" md={"2"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Project Name")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="10" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "} {rowdata?.project_name || "----"}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 10px  !important" md={"2"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Project type")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="10" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "}     {rowdata?.type_name || "----"}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0 0 0 10px  !important" md={"2"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Location")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="10" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "}     {rowdata?.popular_loc || "----"}
                                    </Typography>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex padding="10px 0 10px 0" md={12}>
                            <HLLabel>
                                <Typography color="primaryFont" fontSize="bodySubTitleFontSize" fontWeight="bold" textAlign="left">
                                    Property Detail
                                </Typography>
                            </HLLabel>

                        </Flex>

                        <Flex row>
                            <Flex padding="0 10px 0 10px !important" md={6}>

                                <Flex row>
                                    <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Sub-project Name")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "}  {rowdata?.sub_project_name || "----"}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Floor")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "}    {rowdata?.property_detail?.floor_no || "----"}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Position/Unit")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "}    {rowdata?.property_detail?.position_unit || "----"}
                                    </Typography>
                                    </Flex>
                                </Flex>

                                <Flex row>
                                    <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Size (Sqr Ft)")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "}    {rowdata?.property_detail?.size_sqft || "----"}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Down-payment")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "}    {numberWithCommas(rowdata?.property_detail?.down_payment || "0")} {"Tk"}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("No. of Installments")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "}     {rowdata?.property_detail?.no_installment || "0"}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Installment Amount")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "}     {numberWithCommas(rowdata?.property_detail?.installment_amnt || "0")} {"Tk"}
                                    </Typography>
                                    </Flex>
                                </Flex>

                                <Flex row>
                                    <Flex padding="0!important" md={"5"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Est Delivery")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="7" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "} {rowdata?.property_detail?.est_delivery?formatGridDate(rowdata?.property_detail?.est_delivery): "----"}
                                    </Typography>
                                    </Flex>
                                </Flex>
                            </Flex>

                            <Flex padding="0 0 0 10px !important" md={6}>
                                <Flex row>
                                    <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("No. of Bedrooms")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "}   {rowdata?.property_detail?.bedroom_no || "0"}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("No. of Toilets")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "}    {rowdata?.property_detail?.no_toilets || "0"}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("No. of Balcony")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "}  {rowdata?.property_detail?.no_balcony || "0"}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Drawing Room")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "}    {rowdata?.property_detail?.no_drawing || "0"}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Kitchen")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "}    {rowdata?.property_detail?.no_kitchen || "0"}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Living Room")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "}   {rowdata?.property_detail?.no_living || "0"}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Lobby")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "}   {rowdata?.property_detail?.no_lobby || "0"}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={"4"}><Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                        {("Others")}
                                    </Typography></Flex>
                                    <Flex padding="0 !important" md="8" sm="6" xs="12" > <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                        {":"}{" "}{rowdata?.property_detail?.other || "----"}
                                    </Typography>
                                    </Flex>
                                </Flex>


                            </Flex>
                        </Flex>


                    </Flex>
                </div>

            </Modal >
        </>
    );
};
