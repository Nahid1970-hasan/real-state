
import { useEffect, useRef, useState } from "react";
import { CardHeaderButton, InfoCard } from "../../components/style/Card_styled";
import { Flex } from "../../components/style/Flex_styled";
import { Typography } from "../../components/style/Typography_styled";
import { PrimaryButton } from "../../components/Button";
import { Img } from "../../components/style/Img_Styled";
import { HLChip } from "../../components/Chip";
import { loadProjectDetailsByCriteria } from "./homepage_search_slice";
import { useDispatch } from "react-redux";

export const SingleProjectSlide = ({ slidedata, size = 0 }) => {
    const dispatch = useDispatch();
    const imgRef = useRef();

    const navigateDetails = (data) => {
        dispatch(loadProjectDetailsByCriteria({ project_id: data }));
    };

    const [url, set_url] = useState("");
    useEffect(() => {
        set_url(slidedata?.projects_files?.length ? slidedata?.projects_files[0] : "")
    }, []);

    useEffect(() => {
        imgRef.current.src = url;
    }, [url]);

    return (

        <>
            {
                slidedata !== null || slidedata !== "" ? <>
                    <InfoCard position="center">
                        <Flex row>
                            <Flex padding={"0 !important"} md={8}>
                                <div style={{ display: "inline-flex" }}>
                                    <span className="material-icons md-18" >location_on</span>
                                    <Typography
                                        textAlign="left"
                                        fontSize={"smFont"}
                                        fontWeight="bold">
                                        {slidedata.address}
                                    </Typography>
                                </div>
                            </Flex>
                            <Flex padding={"0 !important"} md={4}>
                                <Typography
                                    textAlign="right"
                                    fontSize={"smFont"}
                                    fontWeight="bold">
                                    <HLChip label={slidedata.status} background={"primary"} color={"primaryFont"} />
                                </Typography>

                            </Flex>
                            <Flex md={12}>
                                <Img noborder style={{ height: size < 2 ? "500px" : size < 3 ? "250px" : "200px", width: "100%" }} ref={imgRef} alt="Image 1" />
                            </Flex>
                            <Flex padding={"0"} md={12}>
                                <Typography
                                    textAlign="left"
                                    fontSize={"bodySubTitleFontSize"}
                                    fontWeight="bold">
                                    {size < 3 ? slidedata.project_name : slidedata.project_name.length > 30 ? slidedata.project_name.substr(0, 30).concat("...") : slidedata.project_name} {"("} {slidedata.project_shortname} {")"}
                                </Typography>
                                <Typography
                                    textAlign="left"
                                    fontSize="smFont" >
                                    {size < 3 ? slidedata.type_name : slidedata.type_name.length > 45 ? slidedata.type_name.substr(0, 42).concat("...") : slidedata.type_name}
                                </Typography>

                            </Flex>
                            <Flex md={12}>
                                <div style={{ height: "150px" }}>
                                    <Typography textAlign="justify" >
                                        {size > 2 ? slidedata.project_desc.length > 375 ? slidedata.project_desc.substr(0, 372).concat("...") : slidedata.project_desc :
                                            size > 1 ? slidedata.project_desc.length > 630 ? slidedata.project_desc.substr(0, 628).concat("...") : slidedata.project_desc :
                                                slidedata.project_desc.length > 1345 ? slidedata.project_desc.substr(0, 1345).concat("...") : slidedata.project_desc}
                                    </Typography>
                                </div>

                            </Flex>
                            <Flex padding={"0 "} md={12}>
                                <Flex row>
                                    <Flex padding={"0 !important"} md={6}>
                                        <Typography
                                            textAlign="left"
                                            fontSize={"bodySubTitleFontSize"}
                                            fontWeight="bold">
                                            {slidedata.popular_loc || ""}
                                        </Typography>
                                    </Flex>
                                    <Flex padding={"0 !important"} md={6}>
                                        <CardHeaderButton>
                                            <PrimaryButton onClick={() => { navigateDetails(slidedata.project_id) }}>Details</PrimaryButton>
                                        </CardHeaderButton>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </InfoCard>
                </> : <></>
            }
        </>

    );
};
