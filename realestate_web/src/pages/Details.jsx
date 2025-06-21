import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../features/page/page_slice";
import { Container } from "../components/style/Container_styled";
import { theme } from "../styles/theme";
import styled from "styled-components";
import { Toast } from "../components/Toast";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { Flex } from "../components/style/Flex_styled";
import { Loader } from "../components/style/Loader_styled";
import { Card, CardBody, CardHeaderButton, InfoCard, ShadowCard } from "../components/style/Card_styled";
import { Typography } from "../components/style/Typography_styled";

import { AlertButton, DownloadButton, PrimaryButton, SecondaryButton } from "../components/Button";
import { Img } from "../components/style/Img_Styled";
import product from "../assets/img/avatar.jpg";
import { Select } from "../components/style/Select_styled";
import { Input } from "../components/style/Input_styled";
import { ErrLabel, Label } from "../components/style/Label";
import { TextArea } from "../components/style/TextArea";
import { Fade } from "react-slideshow-image";
import { Chip, HLChip } from "../components/Chip";
import ScrollToTop, { formatGridDate, numberWithCommas } from "../utils/helper";
import { Formik } from "formik";
import { DateTime } from "luxon";
import { initLoader, saveHomeFeedback } from "../features/homeFeedback/homeFeedback_slice";
import { Loading } from "../components/Loading";
import { Checkbox } from "../components/Checkbox";
import { useLocation, useNavigate } from "react-router-dom"; 
import { loadSubProjectDetails } from "../features/homepage/homepage_search_slice";
import { SubProjectDetailsModal } from "../features/homepage/SubProjectDetailsModal";
import { EmptyBox } from "../components/EmptyBox";

const LeftPanel = styled.div`
    height: 100%;
    width: 60%; 
    float: left;
    left:0; 
    margin: 0px;
    padding: 0 10px 0 0; 
`;
const RightPanel = styled.div`
    height: 100%;
    width: 40%;
    margin: 0px;
    float: right; 
    right: 0;  
    position: sticky;
`;
export const DetailsPage = () => {
    const dispatch = useDispatch();
    const formRef = useRef();
    const { t, i18n } = useTranslation();
    const homeSrcData = useSelector((state) => state.homepagesrcdata);
    const homeFeedback = useSelector((state) => state.homefeedback);
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [view, setView] = useState(false);
    const imgRef = useRef();
    const navigate = useNavigate();
    const pathName = useLocation();
  
    useEffect(()=>{pathName && ScrollToTop()},[pathName]);

    useEffect(() => { 
        homeSrcData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
      }, [homeSrcData.loading]);

    useEffect(() => { 
        if(homeSrcData?.projectDetail==undefined || Object.keys(homeSrcData?.projectDetail).length==0){
            navigate("/")
        }
    },[homeSrcData?.projectDetail]);

    useEffect(() => {
        if (homeFeedback.addLoading == "pending") {
            setIsLoading(true);
        } else if (homeFeedback.addLoading == "succeeded") {
            setTimeout(() => { dispatch(initLoader()); formRef.current.resetForm();setIsChecked(false), setIsLoading(false); }, 5000);
        } else if (homeFeedback.addLoading != "idle") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 5000);
        }
    }, [homeFeedback.addLoading]);

    const validate = (values) => {
        let errors = {};

        if (!values.fullname) {
            errors.fullname = "Fullname is required";
        } else if (values.fullname.length > 50) {
            errors.fullname = "Maximum 50 Characters are allowed";
        }

        if (!values.address) {
            errors.address = t("Address is required");
        } else if (values.address.length > 200) {
            errors.address = "Maximum 200 Characters are allowed";
        }

        if (!values.mobile_no) {
            errors.mobile_no = t("Mobile number is required");
        } else if (!/(^(01){1}[3456789]{1}(\d){8})$/i.test(values.mobile_no)) {
            errors.mobile_no = t("Invalid mobile number");
        }

        if (!values.request_detail) {
            errors.request_detail = t("Description is Required.");
        } else if (values.request_detail.length > 500) {
            errors.request_detail = "Maximum 500 Characters are allowed";
        }
        return errors;
    };

    const submitForm = (values) => { 
        dispatch(saveHomeFeedback(values));
    };

    return (
        <> {(homeFeedback.addLoading == "idle" || homeFeedback.addLoading == "pending") ? <></> : (
            homeFeedback.addLoading == "succeeded" ? (
              <Toast msg={homeFeedback.msg} icon="task_alt" color="success" />
            ) : (
              <Toast color="error" msg={homeFeedback.msg} />
            )
          )}
            <Suspense fallback={<Loader />}>
                <Container border="none">
                    <Flex row>
                        <Flex padding={"15px 0 0 0 !important"} md={12}>
                            <Flex row>
                                <Flex padding={"0 !important"} md={10}>
                                    <Typography fontSize="bodyTitleFontSize" textAlign="left" fontWeight="bold">
                                        {homeSrcData?.projectDetail?.project_name || "---"} {homeSrcData?.projectDetail?.project_shortname?<>{"("}{homeSrcData?.projectDetail?.project_shortname}{")"}</>:"---"}
                                    </Typography>

                                </Flex>
                                <Flex padding={"0 !important"} md={2}>
                                    <Typography textAlign="right" fontSize="smFont">
                                        {homeSrcData?.projectDetail?.status? <HLChip label={homeSrcData?.projectDetail?.status} background={"primary"} color={"primaryFont"} />:""}
                                    </Typography>
                                </Flex>
                            </Flex>
                        </Flex>

                        <Flex padding="0 0 10px 0 !important" md={12}>
                            <Typography textAlign="left" >
                                <div style={{ display: "inline-flex" }}>
                                    <span className="material-icons md-18" >location_on</span>
                                    <Typography
                                        textAlign="left" >
                                        {homeSrcData?.projectDetail?.address || "---"}
                                    </Typography>
                                </div>
                            </Typography>
                        </Flex>

                        <Flex padding="0 !important" md="12">
                            <div>
                                <Fade
                                    defaultIndex={0}
                                    duration={2000}
                                    autoplay={true}
                                    ref={imgRef}
                                    arrows={false}
                                >
                                    {homeSrcData?.projectDetail?.projects_files?.map((slideImage, index) => (
                                        <div style={{ display: 'flex', maxHeight: '500px', justifyContent: 'center' }} key={index}>
                                            <Img
                                                noborder
                                                padding="0"
                                                src={slideImage}
                                                alt="Preview Photo"
                                                height={'500px'}
                                                width="100%"
                                            ></Img>
                                        </div>
                                    ))}
                                </Fade>
                            </div>
                        </Flex>
                    </Flex>

                    <Flex row>
                        <LeftPanel>
                            <Flex padding="10px 10px 0 0 !important" md={12}>
                                <ShadowCard>
                                    <Flex row>
                                        <Flex padding="0 !important" md={12}>
                                            <Typography fontSize="bodySubTitleFontSize" fontWeight="bold">Overview</Typography>
                                        </Flex>
                                    </Flex>
                                    <Flex row>
                                        <Flex padding="30px 0 0 0 !important" md={5}>
                                            <Typography fontWeight="bold" >{homeSrcData?.projectDetail?.type_name || "---"}</Typography>
                                            <Typography >Property Type </Typography>
                                        </Flex>
                                        <Flex padding="30px 0 0 0  !important" md={5}>
                                            <Typography fontWeight="bold">{homeSrcData?.projectDetail?.popular_loc || "---"} </Typography>
                                            <Typography >Location</Typography>
                                        </Flex>
                                        <Flex padding="30px 0 0 0  !important" md={2}>
                                            <Typography fontWeight="bold">{homeSrcData?.projectDetail?.total_size || "0"} </Typography>
                                            <Typography >Total Size (Sqft)</Typography>
                                        </Flex>
                                    </Flex>

                                </ShadowCard>
                                <div style={{ height: "10px" }} />
                                <ShadowCard>
                                    <Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                        Description
                                    </Typography><br />
                                    <Typography textAlign="left" fontSize="bodyContentFontSize">
                                        {homeSrcData?.projectDetail?.project_desc || "---"}
                                    </Typography>
                                </ShadowCard>
                                <div style={{ height: "10px" }} />
                                <ShadowCard>
                                    <Flex row>
                                        <Flex md={12} padding="0 !important">
                                            <Typography fontSize="bodySubTitleFontSize" textAlign="left" fontWeight="bold">
                                                Address
                                            </Typography>
                                        </Flex>
                                        {/* <Flex padding="0 !important" md={6}>
                                            <CardHeaderButton>
                                                <SecondaryButton
                                                    type="submit"
                                                >
                                                    {"Open on Google Maps"}
                                                </SecondaryButton>
                                            </CardHeaderButton>
                                        </Flex> */}

                                    </Flex>
                                    <Flex row>
                                        <Flex padding="10px 0 0 0 !important" md={12}>
                                            <Flex row>
                                                <Flex padding="0 !important" md={2}>
                                                    <Typography textAlign="left">
                                                        {"Address"} {":"}
                                                    </Typography>
                                                </Flex>
                                                <Flex padding="0 !important" md={10}>
                                                    <Typography textAlign="left" >
                                                        {homeSrcData?.projectDetail?.address || "---"}
                                                    </Typography>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                        <Flex padding="5px 0 0 0 !important" md={12}>
                                            <Flex row>
                                                <Flex padding="0!important" md={4}>
                                                    <Typography textAlign="left">
                                                        {"Thana"} {":"} {homeSrcData?.projectDetail?.thana_name || "---"}
                                                    </Typography>
                                                </Flex>
                                                <Flex padding="0  0 0 10px !important" md={4}>
                                                    <Typography textAlign="left" >
                                                        {"District"} {":"} {homeSrcData?.projectDetail?.district_name || "---"}
                                                    </Typography>
                                                </Flex>
                                                <Flex padding="0  0 0 10px !important" md={4}>
                                                    <Typography textAlign="left" >
                                                        {"Popular Location"} {":"} {homeSrcData?.projectDetail?.popular_loc || "---"}
                                                    </Typography>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </ShadowCard>
                                <div style={{ height: "10px" }} />
                                <ShadowCard>
                                    <Flex row>
                                        <Flex padding="0 0 10px 0 !important" md={12}>
                                            <Typography fontSize="bodySubTitleFontSize" textAlign="left" fontWeight="bold">
                                                {"Details Information"}
                                            </Typography>
                                        </Flex>
                                        <Flex padding="0 !important" md={6}>
                                            <Typography textAlign="left" >
                                                {"Project Type"} {":"}  {homeSrcData?.projectDetail?.type_name || "---"}
                                            </Typography>
                                        </Flex>
                                        <Flex padding="0 !important" md={6}>
                                            <Typography textAlign="left">
                                                {"Status"} {":"} {homeSrcData?.projectDetail?.status? <Chip label={homeSrcData?.projectDetail?.status} color={"primary"} />:"---"} 
                                            </Typography>
                                        </Flex>
                                        <Flex padding="2px 0 !important" md={6}>
                                            <Typography textAlign="left" >
                                                {"No of Share"} {":"}  {homeSrcData?.projectDetail?.no_share || "---"}
                                            </Typography>
                                        </Flex>
                                        <Flex padding="2px 0 !important" md={6}>
                                            <Typography textAlign="left">
                                                {"Share for Sell"} {":"} {homeSrcData?.projectDetail?.no_share_for_sell ||" 0"}
                                            </Typography>
                                        </Flex>
                                        <Flex padding="2px 0 !important" md={6}>
                                            <Typography textAlign="left" >
                                                {"Total Size (Sqft) "} {":"}  {homeSrcData?.projectDetail?.total_size || "---"}
                                            </Typography>
                                        </Flex>
                                        <Flex padding="2px 0 !important" md={6}>
                                            <Typography textAlign="left">
                                                {"Unit/Price"} {":"} {numberWithCommas(homeSrcData?.projectDetail?.unit_price || "0")} {"Tk"}
                                            </Typography>
                                        </Flex>
                                        <Flex padding="2px 0 !important" md={6}>
                                            <Typography textAlign="left" >
                                                {"Est. Start Date "} {":"}  {homeSrcData?.projectDetail?.est_start_date ? formatGridDate(homeSrcData?.projectDetail?.est_start_date) : "---"}
                                            </Typography>
                                        </Flex>
                                        <Flex padding="2px 0 !important" md={6}>
                                            <Typography textAlign="left" >
                                                {"Est. Completion Date "} {":"}  {homeSrcData?.projectDetail?.est_complete_date ? formatGridDate(homeSrcData?.projectDetail?.est_complete_date) : "---"}
                                            </Typography>
                                        </Flex>

                                    </Flex>
                                </ShadowCard>
                                <div style={{ height: "10px" }} />
                                <ShadowCard>
                                    <Formik
                                        initialValues={{
                                            fullname: "",
                                            address: "",
                                            mobile_no: "",
                                            request_date: DateTime.now().toFormat("yyyy-MM-dd"),
                                            request_detail: "",
                                        }}
                                        validate={validate}
                                        onSubmit={submitForm}
                                        innerRef={formRef}
                                    >
                                        {(formik) => {
                                            const {
                                                values,
                                                handleChange,
                                                handleSubmit,
                                                errors,
                                                touched,
                                                handleBlur,
                                                isValid,
                                                dirty,
                                                resetForm,
                                                setFieldValue
                                            } = formik;

                                            return (
                                                <form onSubmit={handleSubmit}>
                                                    <Flex row>
                                                        <Flex padding="0 0 10px 0!important" md={12}>
                                                            <Typography fontSize="bodyContentFontSize" textAlign="left" fontWeight="bold">
                                                                Contact Information
                                                            </Typography>
                                                        </Flex>
                                                        {/* <Flex padding="0 0 10px 0!important" md={6}>
                                            <CardHeaderButton>
                                                <SecondaryButton
                                                    type="submit">
                                                    {"View Listings"}
                                                </SecondaryButton>
                                            </CardHeaderButton>
                                        </Flex> */}
                                                    </Flex>
                                                    <Flex row>
                                                        <Flex padding="0 5px 0 0!important" md={6}>
                                                            <Label color="font">Full Name</Label>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="fullname"
                                                                value={values.fullname}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder={("type fullname..")}
                                                            />
                                                            {errors.fullname && touched.fullname ? (
                                                                <ErrLabel>{errors.fullname}</ErrLabel>
                                                            ) : null}
                                                        </Flex>
                                                        <Flex padding="0 0 0 5px !important" md={6}>
                                                            <Label color="font">Mobile Number</Label>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="mobile_no"
                                                                value={values.mobile_no}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder={("type contact number..")}
                                                            />
                                                            {errors.mobile_no && touched.mobile_no ? (
                                                                <ErrLabel>{errors.mobile_no}</ErrLabel>
                                                            ) : null}
                                                        </Flex>

                                                    </Flex>
                                                    <Flex row>
                                                        <Flex padding="0 5px 0 0  !important" md={12}>
                                                            <Label color="font">Address</Label>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="address"
                                                                value={values.address}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder={("type address..")}
                                                            />
                                                            {errors.address && touched.address ? (
                                                                <ErrLabel>{errors.address}</ErrLabel>
                                                            ) : null}
                                                        </Flex>

                                                    </Flex>
                                                    <Flex row>
                                                        <Flex padding="0 0 0 0 !important" md={12}>
                                                            <Label color="font">Message</Label>
                                                            <TextArea
                                                                app
                                                                width="100%"
                                                                type="text"
                                                                name="request_detail"
                                                                value={values.request_detail}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder={("type message..")}
                                                            />
                                                            {errors.request_detail && touched.request_detail ? (
                                                                <ErrLabel>{errors.request_detail}</ErrLabel>
                                                            ) : null}
                                                        </Flex>
                                                        <Flex padding={"0 !important"} md={12}>
                                                            
                                                            <div style={{ display: "flex", paddingBottom: "5px", justifyContent: "flex-start", alignItems: "center" }} >
                                                                <Checkbox size={"md"} checked={isChecked} onChange={() => setIsChecked(!isChecked)} hoverColor={"transparent"} />
                                                                <Label margin="0" htmlFor="rememverMe">{('By submitting this form I agree to Terms of Use')}</Label>
                                                            </div>
                                                        </Flex>
                                                        <Flex row>
                                                            <CardHeaderButton start="start">
                                                                <PrimaryButton 
                                                                type="submit" 
                                                                className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                                disabled={!(dirty && isValid) || !isChecked}> 
                                                                {"Send Information"}
                                                                </PrimaryButton>

                                                            </CardHeaderButton>

                                                        </Flex>


                                                    </Flex>

                                                </form>
                                            );
                                        }}

                                    </Formik>

                                </ShadowCard>
                            </Flex>
                        </LeftPanel>
                        <RightPanel>
                            <Flex padding="10px 10px 0 0 !important" md={12}>
                                <ShadowCard>
                                    <Flex row>
                                        <Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                            Sub-project List
                                        </Typography>
                                    </Flex>
                                    {
                                         homeSrcData?.subProjectList.length>0?homeSrcData?.subProjectList?.map((d, i) =>
                                         <Flex key={i} row>
                                             <Flex md={5}>
                                                 <Img
                                                     src={d.sub_projects_files.length > 0 ? d.sub_projects_files[0] : ""}
                                                     alt="Preview Photo"
                                                     height={'150px'}
                                                     width={"100%"}
                                                 ></Img>

                                             </Flex>
                                             <Flex md={7}>
                                                 <Typography textAlign="left">
                                                     {d.sub_project_name}
                                                 </Typography>
                                                 <Typography textAlign="left" fontSize="smFont">
                                                     {d.sub_type_name}
                                                 </Typography>
                                                 <Typography margin="10px 0 0 0" textAlign="left">
                                                     {"Size (Sqft) : "} {d.size_sqft}
                                                 </Typography>
                                                 <Typography textAlign="left">
                                                     {"Floor# : "} {d.floor_no}
                                                 </Typography>
                                                 <Typography margin="0 0 10px 0" textAlign="left">
                                                     {"Position Unit : "} {d.position_unit}
                                                 </Typography>
                                                 <Flex row>
                                                     <Flex padding="0 !important" md={12}>
                                                         <div style={{ display: "inline-flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                                                             <Typography textAlign="left" fontSize="smFont">
                                                                 <HLChip label={d.status} background={"primary"} color={"primaryFont"} />
                                                             </Typography>
                                                             <DownloadButton onClick={() => { setView(true), dispatch(loadSubProjectDetails({"sub_project_id":d.sub_project_id}))}}>Details</DownloadButton>
                                                         </div>
                                                     </Flex>
                                                 </Flex>

                                             </Flex>
                                         </Flex>
                                     ):<EmptyBox msg="There is no sub-project under this project." />
                                    } 
                                </ShadowCard>
                            </Flex>
                        </RightPanel>
                    </Flex>
                </Container>
            </Suspense>
            <SubProjectDetailsModal open={view} setOpen={setView} data={{}}/>
            <Loading open={isLoading} />
        </>
    );
};
