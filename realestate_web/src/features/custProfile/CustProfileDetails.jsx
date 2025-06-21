import { useDispatch, useSelector } from "react-redux"
import { Flex } from "../../components/style/Flex_styled"
import { Typography } from "../../components/style/Typography_styled";
import { HLLabel } from "../../components/style/Label";

export const CustProfileDetails = () => {
    const dispatch = useDispatch();
    const CustProfile = useSelector(state => state.custprofile);
    // const user = useSelector((state) => state.invprofile);
    const self = useSelector((state) => state.self);


    // useEffect(() => { dispatch(loadProfile({ "bmd_ind_user_id": localStorage.user_id })) }, []);
   

    return <>
        <Flex row>
            <Flex padding="0 !important" md={"12"}>
                <HLLabel margin="0 0 10px 0">
                    <Typography color="primaryFont" textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                        {("Credential Information")}
                    </Typography>
                </HLLabel>
                <Flex row>
                    <Flex padding="0 !important" md={6}>
                        <Flex row>
                            <Flex padding="0 0 0 5px !important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Mobile Number")}
                                </Typography>
                            </Flex> 
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                   {":"} {CustProfile.user.cm_mobile_no}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 5px !important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Email")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={.2}>:</Flex>
                            <Flex padding="0!important" md={7.8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {CustProfile.user.cm_email}
                                </Typography>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex padding="0 !important" md={6}>
                        <Flex row>
                            <Flex padding="0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Username")}
                                </Typography>
                            </Flex>
                            <Flex padding="0 !important" md={.2}>:</Flex>
                            <Flex padding="0 !important" md={7.8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    {CustProfile.user.username}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Registration Type")}
                                </Typography>
                            </Flex>
                            <Flex padding="0 !important" md={.2}>:</Flex>
                            <Flex padding="0  !important" md={7.8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                    Customer
                                </Typography>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>

                <HLLabel margin="10px 0">
                    <Typography color="primaryFont" textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                        {("Detail Information")}
                    </Typography>
                </HLLabel>
                <Flex row>
                    <Flex padding="0 !important" md={6}>
                        <Flex row>
                            <Flex padding=" 0 0 0 5px !important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Full Name")}
                                </Typography>
                            </Flex>
                            <Flex padding=" 0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {CustProfile.user.fullname}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 5px !important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Father's Name")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}  {CustProfile.user.fathers_name}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 5px !important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Mother's Name")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {CustProfile.user.mothers_name}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 5px !important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Spouse Name")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {CustProfile.user.spouse_name}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 5px !important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("District")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {CustProfile.user.district_name}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0 0 0 5px !important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Thana")}
                                </Typography>
                            </Flex> 
                            <Flex padding="0 !important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {CustProfile.user.thana_name}
                                </Typography>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex padding="0 !important" md={6}>
                        <Flex row>
                            <Flex padding="0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Address")}
                                </Typography>
                            </Flex> 
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}  {CustProfile.user.address}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Mobile Number")}
                                </Typography>
                            </Flex> 
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {CustProfile.user.mobile_no}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Email")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"} {CustProfile.user.email}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding="0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("NID")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}  {CustProfile.user.nid}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding=" 0!important" md={4}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" fontWeight="bold">
                                    {("Nationality")}
                                </Typography>
                            </Flex>
                            <Flex padding="0!important" md={8}>
                                <Typography textAlign="left" fontSize="bodyContentFontSize" >
                                {":"}  {CustProfile.user.nationality}
                                </Typography>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
              
            </Flex>
        </Flex>
    </>

}