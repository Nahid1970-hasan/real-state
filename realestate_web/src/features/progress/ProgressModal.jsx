import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../components/Modal";
import { Card, CardBody, InfoCard } from "../../components/style/Card_styled";
import { Flex } from "../../components/style/Flex_styled";
import DataGrid from "../../components/DataGrid";
import { Typography } from "../../components/style/Typography_styled";
import { IconButton } from "../../components/IconButton";
import { Center } from "../../components/style/Center_styled";
import { detailDataInit } from "./progress_slice";
import { SubItemData } from "./SubItemData";
import { Label } from "../../components/style/Label";
import { HLChip } from "../../components/Chip";
import { EmptyBox } from "../../components/EmptyBox";
import styled from "styled-components";

const ScrollDiv = styled.div`
    height: 60vh;
    overflow: hidden scroll;
`;
export const ProgressModal = ({ add, open, setOpen = () => { }, data }) => {
    const progress = useSelector((state) => state.progress);
    const page = useSelector((state) => state.page);
    const dispatch = useDispatch();

    return (
        <>
            <Modal
                md={7}
                sm={8}
                xs={12}
                title={("Progress Detail")}
                open={open}
                onClose={() => {
                    dispatch(detailDataInit());
                    setOpen(false);
                }}
                outsideclick
            >
                <Flex md={12} padding="0 !important">
                    <Flex row>
                        <Flex padding="0 0 5px 0!important" md={2} sm={4} xs={6}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {" Project Name"}
                            </Typography>
                        </Flex>
                        <Flex md={10} sm={8} xs={6} padding="0 0 5px 0!important">
                            <Typography textAlign="left" fontSize="bodyContentFontSize"  >
                                {":"}{" "}  {data?.project_name}
                            </Typography>

                        </Flex>

                        <Flex padding="0 0 5px 0!important" md={2} sm={4} xs={6}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {" Type Name"}
                            </Typography>
                        </Flex>
                        <Flex md={10} sm={8} xs={6} padding="0 0 5px 0!important">
                            <Typography textAlign="left" fontSize="bodyContentFontSize"  >
                                {":"}{" "}  {data?.type_name}
                            </Typography>

                        </Flex>

                        <Flex padding="0 0 10px 0!important" md={2} sm={4} xs={6}>
                            <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                {"Address"}
                            </Typography>
                        </Flex>
                        <Flex md={10} sm={8} xs={6} padding="0 0 10px 0!important">
                            <Typography textAlign="left" fontSize="bodyContentFontSize"  >
                                {":"} {data?.address}
                            </Typography>

                        </Flex>

                    </Flex>

                    <Flex row>
                        {progress?.detailList.length ?
                            <Flex row><Flex md={12} padding="0 !important">
                                <ScrollDiv>
                                    {progress?.detailList?.map((item, i) => (
                                        <SubItemData key={i} item={item} serial={i} />
                                    ))}
                                </ScrollDiv> </Flex></Flex> : <Flex row><Flex md={12} padding="0 !important"><Typography fontSize="bodyContentFontSize" >
                                    {progress.detailLoading == "pending" ? <EmptyBox msg="-----" height="50px" /> : <EmptyBox msg="There is not data to show" />}
                                </Typography></Flex></Flex>}
                    </Flex>

                </Flex>
            </Modal>
        </>
    );
};
