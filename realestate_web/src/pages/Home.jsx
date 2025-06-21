import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  CardHeaderButton,
  InfoCard,
  ShadowCard,
} from "../components/style/Card_styled";
import { ErrLabel, HLLabel, Label } from "../components/style/Label";
import { Container } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled";
import { Typography } from "../components/style/Typography_styled";
import { theme } from "../styles/theme";
import { AlertButton, Button, PrimaryButton } from "../components/Button";

import { Img } from "../components/style/Img_Styled";
import { useRef, useState } from "react";
import { Input } from "../components/style/Input_styled";
import { getSerialNO } from "../utils/helper";
import { Select } from "../components/style/Select_styled";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { loadPage } from "../features/page/page_slice";
import { loadHomepageData } from "../features/homepage/homepage_slice";
import { useEffect } from "react";

import image1 from "../assets/re-web/image1.jpg"
import image2 from "../assets/re-web/image3.jpg"
import image3 from "../assets/re-web/image2.jpg"

import slider1 from "../assets/re-web/slider1.jpg"
import { SingleProjectSlide } from "../features/homepage/SingleProjectSlide";
import { initLoader, loadProjectByCriteria, loadProjectDetailsByCriteria } from "../features/homepage/homepage_search_slice";
import { HLChip } from "../components/Chip";
import styled from "styled-components";

const VerticalSection = styled.div`
  display: flex;
  align-content: space-between;
  height: 100%;
  flex-wrap: wrap;
`;

export const Home = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const imgRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const homeData = useSelector((state) => state.homePage);
  const homeSrcData = useSelector((state) => state.homepagesrcdata);
  const [keyword, set_keyword] = useState("");
  const [thana_id, set_thana_id] = useState("");
  const [type_id, set_type_id] = useState("");
  const [price_range, set_price_range] = useState("");
  const [status, set_status] = useState("");
  const [err_msg, set_err_msg] = useState(null);
  
  const [enabled, set_enabled] = useState(false);

  const navigate = useNavigate();
  const navigateDetails = (data) => {
    dispatch(loadProjectDetailsByCriteria({ project_id: data }));
  };
  let prjctDat = [
    {
      "popular_loc": "Dhaka",
      "type_name": "Multistoried Residencial Apartment Development",
      "project_id": 2,
      "projects_files": [
        "http://192.168.0.183:8081/realestate_files/files_root/projects/2/image1.jpg",
        "http://192.168.0.183:8081/realestate_files/files_root/projects/1/2-min-min.jpg"
      ],
      "project_name": "KDRL Super Shop",
      "project_shortname": "KS Shop",
      "project_desc": "Description of this project. The new head of cricketing development had left the Punjab franchise in 2016 amid reported differences with co-owner Priety Zinta Description of this project. Description of this project. Description of this project. Description of this project. Description of this project. Description of this project. ",
      "status": "Ongoing"
    },
    {
      "popular_loc": "Khulna",
      "type_name": "Multistoried Residencial Apartment Development Housing Complex",
      "project_id": 1,
      "projects_files": [
        "http://192.168.0.183:8081/realestate_files/files_root/projects/1/2-min-min.jpg",
        "http://192.168.0.183:8081/realestate_files/files_root/projects/2/image1.jpg"

      ],
      "project_name": "KDRL Super Shop MultiStroied Building ",
      "project_shortname": "KSShop",
      "project_desc": "A major problem the economy has been facing lately is that prices for basic things are going up and the ongoing price increase has been influenced by domestic factors, including market distortion caused by a small number of dominant businesses and inadequate monitoring mechanisms, said the CPD. The new head of cricketing development had left the Punjab franchise in 2016 amid reported differences with co-owner Priety Zinta Description of this project. Description of this project. Description of this project. Description of this project. Description of this project. Description of this project. Key external sector performance correlates such as exchange rate stability, the volume of foreign exchange reserves, export performance, the availability of forex for the opening of letters of credit, and remittance flows all suggest that the worrisome developments experienced in the last financial year have continued in the ongoing financial year of 2023-24. A major problem the economy has been facing lately is that prices for basic things are going up and the ongoing price increase has been influenced by domestic factors, including market distortion caused by a small number of dominant businesses and inadequate monitoring mechanisms, said the CPD. The new head of cricketing development had left the Punjab franchise in 2016 amid reported differences with co-owner Priety Zinta Description of this project. Description of this project. Description of this project. Description of this project. Description of this project. Description of this project. Key external sector performance correlates such as exchange rate stability, the volume of foreign exchange reserves, export performance, the availability of forex for the opening of letters of credit, and remittance flows all suggest that the worrisome developments experienced in the last financial year have continued in the ongoing financial year of 2023-24.",
      "status": "Compelete"
    },
    {
      "popular_loc": "Sylhet",
      "type_name": "Multistoried Residencial Apartment Development Housing Complex",
      "project_id": 3,
      "projects_files": [

        "http://192.168.0.183:8081/realestate_files/files_root/projects/1/2-min-min.jpg",
        "http://192.168.0.183:8081/realestate_files/files_root/projects/2/image1.jpg"

      ],
      "project_name": "BDST Super Shop MultiStroied Building ",
      "project_shortname": "KSShop",
      "project_desc": "A major problem the economy has been facing lately is that prices for basic things are going up and the ongoing price increase has been influenced by domestic factors, including market distortion caused by a small number of dominant businesses and inadequate monitoring mechanisms, said the CPD. The new head of cricketing development had left the Punjab franchise in 2016 amid reported differences with co-owner Priety Zinta Description of this project. Description of this project. Description of this project. Description of this project. Description of this project. Description of this project. Key external sector performance correlates such as exchange rate stability, the volume of foreign exchange reserves, export performance, the availability of forex for the opening of letters of credit, and remittance flows all suggest that the worrisome developments experienced in the last financial year have continued in the ongoing financial year of 2023-24. A major problem the economy has been facing lately is that prices for basic things are going up and the ongoing price increase has been influenced by domestic factors, including market distortion caused by a small number of dominant businesses and inadequate monitoring mechanisms, said the CPD. The new head of cricketing development had left the Punjab franchise in 2016 amid reported differences with co-owner Priety Zinta Description of this project. Description of this project. Description of this project. Description of this project. Description of this project. Description of this project. Key external sector performance correlates such as exchange rate stability, the volume of foreign exchange reserves, export performance, the availability of forex for the opening of letters of credit, and remittance flows all suggest that the worrisome developments experienced in the last financial year have continued in the ongoing financial year of 2023-24.",
      "status": "Upcoming"
    }

  ];
  useEffect(() => {
    dispatch(loadPage({ title: "Home", button: false }));
    dispatch(loadHomepageData());
    dispatch(initLoader());
  }, []);

  useEffect(() => {
    homeData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [homeData.loading]);


  useEffect(() => {
    homeSrcData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [homeSrcData.loading]);

  useEffect(() => {
    homeSrcData.detailLoading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [homeSrcData.detailLoading]);

  useEffect(() => {
    if (homeSrcData.detailLoading == "pending") {
      setIsLoading(true)
    } else if (homeSrcData.detailLoading == "succeeded") {
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false); navigate('/details'); }, 1000);
    } else if (homeSrcData.detailLoading != "pending" && homeSrcData.detailLoading != "idle") {
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 1000);
    }
  }, [homeSrcData.detailLoading]);

  useEffect(() => {
    set_enabled(keyword.length>1||thana_id||type_id||price_range||status)
  }, [keyword,thana_id,type_id,price_range,status]);

  function handleSubmit() {
    var data = {};
    if(enabled){
      if( keyword && keyword.length<2){
        set_err_msg("At least 2 characters are required");
      }else{
        set_err_msg(null);
        keyword.length>1 && (data.keyword = keyword);
        thana_id && (data.thana_id = thana_id);
        type_id && (data.type_id = type_id);
        price_range && (data.price_range = price_range);
        status && (data.status = status);  
        dispatch(loadProjectByCriteria(data));
      } 
    }else{
      set_err_msg("Minimum 1 criteria is mandatory");
    } 
  }

  function handleClear() {
    set_err_msg(null);
    set_keyword("");
    set_thana_id("");
    set_type_id("");
    set_price_range("");
    set_status("");
  }

  return (
    <>
      <Flex row>
        <Flex padding="0 !important" md={12}>
          <Img height="500px" width="100%" padding="0" noborder src={slider1} srcSet={` `} />
        </Flex>
      </Flex>
      <Container border="none">
        <div style={{ height: "40px" }} />
        <Flex row>
          <Flex md={12}>
            <Typography
              textAlign="center"
              fontSize={"bodyTitleFontSize"}
              fontWeight="bold">
              {t("Discover your place to live")}
            </Typography>
            <Typography
              textAlign="center"
              fontSize={"bodyContentFontSize"}
              margin="10px 0 0 0" >
              {t("Get starts with few clicks")}
            </Typography>
            <div style={{ height: "40px" }} />
          </Flex>
        </Flex>
        <ShadowCard>
          <Flex row>
            <Flex md={3} padding="0" >
              <Label >{t('Keywords')}</Label>
              <Input
                type="text"
                placeholder={t('Type your keywords..')}
                name="username"
                onChange={(e) =>{
                  set_keyword(e.target.value);
                  e.target.value.length<2? set_err_msg("At least 2 characters are required"):set_err_msg(null);
                  } }
                value={keyword || ""}
              />
            </Flex>
            <Flex md={2} padding="0"  >
              <Label color="font" htmlFor="email">{t('Location')}</Label>
              <Select
                value={thana_id || ""}
                name="thana_id"
                onChange={(e) => set_thana_id(e.target.value)}
              >
                <option disabled value="">
                  {t("Select Location")}
                </option>
                {homeData.thanaList.map((d, i) => <option key={i} value={d.thana_id}>{d.thana_name}</option>)}

              </Select>
            </Flex>
            <Flex md={2} padding="0"  >
              <Label color="font" htmlFor="email">{t('Type')}</Label>
              <Select
                value={type_id || ""}
                name="type_id"
                onChange={(e) => set_type_id(e.target.value)}
              >
                <option disabled value="">
                  {t("Select Type")}
                </option>
                {homeData.projectType.map((d, i) => <option key={i} value={d.type_id}>{d.type_name}</option>)}
              </Select>
            </Flex>
            <Flex md={2} padding="0" >
              <Label color="font" htmlFor="email">{t('Price (BDT)')}</Label>
              <Select
                value={price_range || ""}
                name="price_range"
                onChange={(e) => set_price_range(e.target.value)}
              >
                <option disabled value="">
                  {t("Select Price Range")}
                </option>
                <option value="0L-20L">{"0 < 20Lakhs"}</option>
                <option value="20L-50L">{"20Lakhs < 50Lakhs"}</option>
                <option value="50L-1C">{"50Lakhs < 1Cr."}</option>
                <option value="1C-2C">{"1Cr. < 2Cr."}</option>
                <option value="2C-5C">{"2Cr. < 5Cr."}</option>
                <option value="5C-10C">{"5Cr. < 10Cr."}</option>
                <option value="10C-Above">{"10Cr. - Above"}</option>
              </Select>
            </Flex>
            <Flex md={2} padding="0" >
              <Label color="font" htmlFor="email">{t('Status')}</Label>
              <Select
                value={status || ""}
                name="status"
                onChange={(e) => set_status(e.target.value)}
              >
                <option disabled value="">
                  {t("Select Status")}
                </option>
                <option value="Ongoing">{"Ongoing"}</option>
                <option value="Upcoming">{"Upcoming"}</option>
                <option value="Completed">{"Completed"}</option>
              </Select>
            </Flex>
            <Flex md={1} padding="0" >
              <VerticalSection>
                <AlertButton
                  type="button"
                  full
                  margin="0"
                  disabled={(keyword && keyword <2)||!enabled}
                  onClick={handleClear}
                >
                  {t("Clear")}
                </AlertButton>
                <Button
                  type="button"
                  full
                  margin="0"
                  disabled={!enabled}
                  onClick={handleSubmit}
                >
                  {t("Search")}
                </Button>
              </VerticalSection>
            </Flex>
          </Flex>
          {err_msg && <ErrLabel margin="5px 0 0 10px">{err_msg}</ErrLabel>}
            
        </ShadowCard>
        {
          homeSrcData?.projectList.length > 0 && ( 
            <Flex row>
              <Flex md={12}></Flex>
              {
                homeSrcData?.projectList?.map((d, i) =>
                  <Flex padding="0 0 10px 0" key={i} md={12}>
                    <InfoCard position="center">
                      <Flex row>
                        <Flex padding="0" md={4}>
                          <Img height={"240px"} width={"100%"} srcSet={d.projects_files.length ? d.projects_files[0] : ""} alt="Image 1" />
                        </Flex>
                        <Flex padding={"0"} md={8}>
                          <Flex row>
                            <Flex padding={"0 "} md={12}>
                              <Typography
                                textAlign="left"
                                fontSize={"bodySubTitleFontSize"}
                                fontWeight="bold">
                                {d.project_name.length > 30 ? d.project_name.substr(0, 30).concat("...") : d.project_name} {"("} {d.project_shortname} {")"}
                              </Typography>
                              <Typography
                                textAlign="left"
                                fontSize="smFont" >
                                {d.type_name.length > 30 ? d.type_name.substr(0, 30).concat("...") : d.type_name}
                              </Typography>
                            </Flex>
                            <Flex padding={"5px 0 0 0 !important"} md={12}>
                              <div style={{ display: "inline-flex", height: "100%", alignItems: "center" }}>
                                <span className="material-icons md-18" >location_on</span>
                                <Typography
                                  textAlign="left"
                                  fontSize={"smFont"}>
                                  {d.address}
                                </Typography>
                              </div>
                            </Flex>
                            <Flex md={12}>
                              <div style={{ height: "120px" }}>
                                <Typography textAlign="justify" >
                                  {d.project_desc.length > 650 ? d.project_desc.substr(0, 647).concat("...") : d.project_desc}
                                </Typography>
                              </div>

                            </Flex>
                            <Flex padding={"0 "} md={12}>
                              <Flex row>
                                <Flex padding={"0 !important"} md={6}>
                                  <Typography
                                    textAlign="left"
                                    fontWeight="bold">
                                    <HLChip label={d.status || ""} background={"primary"} color="primaryFont" />
                                  </Typography>
                                </Flex>
                                <Flex padding={"0 !important"} md={6}>
                                  <CardHeaderButton><PrimaryButton onClick={() => { navigateDetails(d.project_id) }}>See More..</PrimaryButton></CardHeaderButton>
                                </Flex>
                              </Flex>
                            </Flex>
                          </Flex>

                        </Flex>
                      </Flex>
                    </InfoCard>
                  </Flex>)
              }
            </Flex>
          )
        }

        <div style={{ height: "40px" }} />
        <Flex md={12}>
          <Typography
            textAlign="center"
            fontSize={"bodyTitleFontSize"}
            fontWeight="bold">
            {t("Our Featured Exclusives​")}
          </Typography>
        </Flex>
        <div style={{ height: "40px" }} />

        <Flex row>
          {
            homeData?.projectList?.map((d, i) => <Flex key={i} md={homeData?.projectList?.length < 2 ? "12" : homeData?.projectList?.length < 3 ? "6" : "4"}>
              <SingleProjectSlide slidedata={d} size={homeData?.projectList?.length} />
              {/* <InfoCard position="center">
                <Flex row>
                  <Flex md={12}>
                    <img srcSet={d.projects_files.length ? d.projects_files[0]:""} alt="Image 1" /> 
                  </Flex>
                  <Flex  padding={"0"} md={12}>
                    <Typography
                      textAlign="left"
                      fontSize={"bodySubTitleFontSize"}
                      fontWeight="bold">
                      {homeData.projectList.length < 3 ? d.project_name : d.project_name.length > 30 ? d.project_name.substr(0, 30).concat("...") : d.project_name} {"("} {d.project_shortname} {")"}
                    </Typography>
                    <Typography
                      textAlign="left"
                      fontSize="smFont" >
                      {homeData.projectList.length < 3 ? d.project_name : d.type_name.length > 45 ? d.type_name.substr(0, 42).concat("...") : d.type_name}
                    </Typography>
                  
                  </Flex>
                  <Flex md={12}>
                  <Typography textAlign="justify" >
                      {d.project_desc}
                    </Typography>
                  </Flex>
                  <Flex padding={"0 "} md={12}>
                    <Flex row>
                      <Flex padding={"0 !important"} md={6}>
                        <Typography
                          textAlign="left"
                          fontSize={"bodySubTitleFontSize"}
                          fontWeight="bold">
                          {d.popular_loc || ""}
                        </Typography>
                      </Flex>
                      <Flex padding={"0 !important"} md={6}>
                        <CardHeaderButton><PrimaryButton onClick={navigateDetails}>Details</PrimaryButton></CardHeaderButton>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </InfoCard> */}
            </Flex>)
          }
        </Flex>

      </Container>
      <Loading open={isLoading} />
    </>
  );
};
