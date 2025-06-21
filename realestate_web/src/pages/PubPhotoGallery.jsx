import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import { Container } from "../components/style/Container_styled";
import "react-slideshow-image/dist/styles.css";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useSelector } from "react-redux";
import { useRef } from "react";
import { Typography } from "../components/style/Typography_styled";
import { Loading } from "../components/Loading";
import styled from "styled-components";
import { loadPubPhotoData } from "../features/bmdPortal/pub_photo_gallery_slice";
import { Card, InfoCard, ShadowCard } from "../components/style/Card_styled";
import { formatGridDate } from "../utils/helper";
const GallerImg = styled.img`  
     height: 300px; 
     width:300px;
`;
const DivImg = styled.div`  
     
     margin:10px 8px;

`;
export const PubPhotoGallery = () => {

    const [radius, setRadius] = useState(5000);
    const galleryData = useSelector((state) => state.pubphotoGallery);
    const [isAdd, setIsAdd] = useState(false);
    const [imgData, setImgData] = useState([]);
    const [photoData, setPhotoData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const imgRef = useRef();
    const [photoName, setPhotoName] = useState("");
    const [photoIndex, setPhotoIndex] = useState(0);
    const dispatch = useDispatch();


    useEffect(() => {
        setIsLoading(true);
        dispatch(loadPubPhotoData());
        dispatch(
            loadPage({
                title: "Photo Gallery",
                button: false,
            })
        );
    }, []);
    useEffect(() => {
        galleryData.loading != "pending" && setTimeout(() => setIsLoading(false), 2000);
    }, [galleryData.loading]);

    useEffect(() => {
        var data = galleryData?.galleryData?.map((d, i) => Object.assign({ ...d, "index": i }));
        setImgData(data);
    }, [galleryData]);

    function handleonchange(e) {
        var data = imgData?.filter(
            (b) => b.photo_id == e.target.value
        );
        setPhotoIndex(data[0].index);
        setPhotoData(data[0].photo_date);
    }

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 4 },
    };


    let items = galleryData?.galleryData?.map((slideImage, index) => (
        <DivImg key={index}>
            <ShadowCard >
                <Flex row >
                    <Flex padding={"5px 0 !important"} md={12}>
                        <GallerImg src={slideImage.photo_url} alt="Preview Photo" height="300px !important" />
                    </Flex>
                    <Flex padding={"0 !important"} md={12}>
                        <Typography
                            color={'font'}
                            textAlign="left"
                            fontSize={"smFont"}
                            fontFamily={"--dashboard-font"}
                            notResize >
                            {slideImage.photo_desc}
                        </Typography>
                        <Typography
                            color={'font'}
                            textAlign="left"
                            fontFamily={"--dashboard-font"}
                            fontSize={"footerFont"}
                            notResize >
                            {formatGridDate(slideImage.photo_date)}
                        </Typography>
                    </Flex>
                </Flex>

            </ShadowCard>
        </DivImg>

    ));
    return (
        <>
            <Container border="none">
                <Flex row>
                    <Flex padding={"0"} md={12}>
                        <Typography
                            margin="1rem"
                            fontSize="bodyTitleFontSize"
                            textAlign="center"
                            fontWeight="bold"
                        >
                            Photo Gallery
                        </Typography>
                    </Flex>

                    <Flex padding={"0 !important"} md={12}>
                        <AliceCarousel
                            disableButtonsControls={true}
                            disableDotsControls={true}
                            disableSlideInfo={true}
                            touchMoveDefaultEvents={false}
                            responsive={responsive}
                            autoPlay={true}
                            infinite={true}
                            mouseTracking={true}
                            autoPlayInterval={5000}
                            items={items}
                        >
                        </AliceCarousel>


                    </Flex>
                </Flex>
            </Container>
            <Loading open={isLoading} />
        </>
    );
};
