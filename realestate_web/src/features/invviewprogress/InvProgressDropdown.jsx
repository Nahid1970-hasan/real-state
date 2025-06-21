import { useRef, useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DownloadButton } from "../../components/Button"
import { Flex } from "../../components/style/Flex_styled"
import { Select } from "../../components/style/Select_styled"

import { Label } from "../../components/style/Label"
import { initProgresslist, loadInvViewprgs, submitConfig } from "./inv_progs_drop_Slice"
import { InvProgressGrid } from "./InvProgressGrid"
import { Loading } from "../../components/Loading"
import { SubItemData } from "../progress/SubItemData"
import { InfoCard } from "../../components/style/Card_styled"
import { Typography } from "../../components/style/Typography_styled"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import { EmptyBox } from "../../components/EmptyBox"

const ScrollDiv = styled.div`
    height: 60vh;
    overflow: hidden scroll;
`;
const CustFlex = styled(Flex)`
  padding: 0 10px 0 0;
`;

const CustDiv = styled.div`
  display: flex;
  margin-top: 0.15rem;
  justify-content:${({ end }) => (end ? 'flex-end' : 'flex-start')}; 
  & button:first-child {
      margin: 0 0 2px 0;
    }
  
`;
export const InvProgressDropdown = () => {
    const invviewprgs = useSelector(state => state.invviewprgs);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [pro_type_id, set_pro_type_id] = useState(1);
    const dropDownRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [project_id, set_project_id] = useState(0);
    const [get_value, set_value] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
        if (isvalid) {
            dispatch(initProgresslist());
            dispatch(loadInvViewprgs());
        }
    }, [location]);

    function submitExternal(e) {
        e.preventDefault();
        setOpen(true);
        let data = {
            project_id: dropDownRef.current.value,
        };
        dispatch(submitConfig(data));
    }

    function handleOnchange() {
        set_value(dropDownRef.current.value);
    }
    useEffect(() => {
        invviewprgs.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [invviewprgs.loading]);

    useEffect(() => {
        invviewprgs.detailLoading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [invviewprgs.detailLoading]);

    return (
        <>
            <Flex row>
                <CustFlex md={1.2} sm={6} xs={12}>
                    <Label color="font">Select Project</Label>
                </CustFlex>

                <CustFlex md={3} sm={6} xs={12}>
                    <Select
                        app
                        ref={dropDownRef}
                        onChange={handleOnchange}
                        value={get_value}
                    >
                        <option disabled value=""> {("select project name")}</option>
                        {invviewprgs.list?.map((d, i) => (
                            <option key={i} value={d.project_id}>
                                {d.project_name}
                            </option>
                        ))}
                    </Select>
                </CustFlex>
                <CustFlex md={3} sm={12} xs={12}>
                    <CustDiv>
                        <DownloadButton disabled={!get_value} onClick={submitExternal}>{("Submit")}</DownloadButton>
                    </CustDiv>
                </CustFlex>
                {/* <Flex padding={"0 !important"} md={12}>
                    {invviewprgs?.progresslist?.length ? invviewprgs?.progresslist?.map((item, i) => (
                        <SubItemData key={i} item={item} serial={i} />
                    )) : <Flex row><Flex md={12} padding="0 !important"><Typography fontSize="bodyContentFontSize" >
                        {<InfoCard background={"gridRowEven"}>{invviewprgs.detailLoading == "pending" ? "----" : "No Data Found"}</InfoCard>}
                    </Typography></Flex></Flex>}
                </Flex> */}
                <Flex row>
                    {invviewprgs?.progresslist?.length ?
                        <Flex row><Flex md={12} padding="0 !important">
                            <ScrollDiv>
                                {invviewprgs?.progresslist?.map((item, i) => (
                                    <SubItemData key={i} item={item} serial={i} />
                                ))}
                            </ScrollDiv> </Flex></Flex> : <Flex row><Flex md={12} padding="0 !important"><Typography fontSize="bodyContentFontSize" >
                                {invviewprgs.detailLoading == "pending" ? <EmptyBox msg="-----" height="50px" /> : <EmptyBox msg="There is not data to show" />}
                            </Typography></Flex></Flex>}
                </Flex>
            </Flex>


            <Loading open={isLoading} />
        </>
    )

}
