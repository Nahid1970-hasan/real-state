import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Card, CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled"; 
import { Flex } from "../../components/style/Flex_styled";
import { Label } from "../../components/style/Label";
import { Input } from "../../components/style/Input_styled";
import { Typography } from "../../components/style/Typography_styled";
import { numberWithCommas } from "../../utils/helper";


export const InvestmentSumGrid = ({ setViewOpen, setUserData }) => {

    const invsummary = useSelector((state) => state.invsummary);
    const [total_sum, set_total_sum] = useState(0);
 
    const colums = [
        {
            headerName: "ID",
            field: "user_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: ("Date"),
            field: "investment_date",
            description: "Investment Date",
            sortable: true,
            filterable: true,
            type: "date",
        },
        {
            headerName: ("Project Name"),
            field: "project_name",
            description: "Project Name",
        },
        {
            headerName: ("Shares"),
            field: "buy_share",
            description: "Buy Share",
            type:"number",
            width:"100px"
        },
        {
            headerName: ("Amount"),
            field: "total_amount",
            description: "Total Amount",
            type: "currency",
            width:"130px"
        },


    ];

    let rows = invsummary.investment;

    useEffect(() => {
        set_total_sum(rows?.map((d) => d?.total_amount).reduce((a, b) => a + b, 0))
    }, [rows]);

    return <Suspense fallback={<Loader />}>
        <>
            <Flex row>
                <CardBody> 
                        <DataGrid colums={colums} rows={rows} /> 
                </CardBody>
                <Flex padding="10px  0 !important" md={12}>
                    <Typography textAlign="end" fontWeight="bold" fontSize="bodyContentFontSize" >
                        {"Total"}{":"} {numberWithCommas(total_sum || 0)} {" Tk"}
                    </Typography>
                </Flex>
            </Flex>

        </>

    </Suspense>;
}