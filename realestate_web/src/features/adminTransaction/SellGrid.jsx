import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Card, CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Flex } from "../../components/style/Flex_styled";
import { Typography } from "../../components/style/Typography_styled";


export const SellGrid = ({ setViewOpen, setUserData }) => {

    // const invsummary = useSelector((state) => state.invsummary);
    // const userReadOnly = useSelector((state) => state.user.read_only);
    // const dispatch = useDispatch();

    // useEffect(() => {

    //     (invsummary.addUpdateLoading == "succeeded") &&
    //         dispatch(loadInvSummaryConfig()); 

    // }, [invsummary.addUpdateLoading]);

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
            headerName: ("Customer Name"),
            field: "cust_name",
            description: "customer name",
        },
        {
            headerName: ("Amount"),
            field: "amount",
            description: "amount",
            type: "number",
        },
        
       
    ];

    // let rows = invsummary.list;
    let rows =[{"user_id":"1","amount":"1254",}]


    return <Suspense fallback={<Loader />}>
        <>
       
                 <Flex row>
            <CardBody>
                {
                    <DataGrid colums={colums} rows={rows} />
                    // invsummary.loading == "succeeded" ? (
                    //     <DataGrid colums={colums} rows={rows} />
                    // ) : (
                    //     <Loader />
                    // )
                }
            </CardBody>
            <Flex md={8}></Flex>
                <Flex padding="10px 0 0 0!important" md={4}>
                    <Flex row>
                        <Flex padding="0!important" md={4}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {"Total"}
                            </Typography>

                        </Flex>
                        <Flex padding="0!important" md={1}>
:
                        </Flex>
                        <Flex padding="0!important" md={7}>
                        <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {}
                                </Typography>
                        </Flex>
                    </Flex>
                </Flex>
        </Flex>
        </>

    </Suspense>;
}