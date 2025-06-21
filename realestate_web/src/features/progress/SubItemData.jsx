import { useState } from "react";
import DataGrid from "../../components/DataGrid";
import { IconButton } from "../../components/IconButton";
import { CardBody, InfoCard } from "../../components/style/Card_styled";
import { Flex } from "../../components/style/Flex_styled";
import { Typography } from "../../components/style/Typography_styled";

export const SubItemData = ({ item , serial}) => { 
    const [commentArea, setCommentArea] = useState(false);
    const [icon, setIcon] = useState(false);
    const colums = [
        {
            headerName: "ID",
            field: "project_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: ("Work Details"),
            field: "works_detail",
            description: "Work Details",
            sortable: false,
            type: "text"
        },
        {
            headerName: ("Works (%)"),
            field: "sub_work_percent",
            description: "Percentage of Work",
            sortable: false,
            width: "110px"
        },

        {
            headerName: ("Completed Date"),
            field: "complete_date",
            description: "Completed Date",
            type: "date",
            sortable: false,
            width: "160px"
        },
 
    ];
    return <>
        <InfoCard height={"auto"} top={serial == 0 ? "0" : "5px"} background={"gridRowEven"} >
            <Flex row>
                <Flex md={9.5} padding="0!important">

                    <Typography textAlign="left" fontSize="bodyContentFontSize" >
                        {item.major_works}
                    </Typography>
                </Flex>
                <Flex md={2} padding="0!important">
                    <Typography textAlign="left" fontSize="bodyContentFontSize"  >
                        {item.work_percent}{"% done"}
                    </Typography>
                </Flex>
                <Flex padding="0 !important" md={.5}>
                    <IconButton
                        padding="0!important"
                        alignment="right"
                        type="button" 
                        bgColor={"bg"}
                        outlined
                        onClick={() => {
                            setCommentArea(!commentArea);
                            setIcon(!icon);
                        }}
                    >
                        <span className="material-icons md-24">
                            {icon ? "expand_less" : "expand_more"}
                        </span>
                    </IconButton>

                </Flex>
            </Flex>
            <Flex row>
                <Flex md={12} padding="5px 0 0 0 !important">
                    {commentArea &&
                        <Flex md={12}>
                            <CardBody><DataGrid colums={colums} rows={item.detail || []} /></CardBody>
                        </Flex>
                    }
                </Flex>
            </Flex>
        </InfoCard>
    </>
}