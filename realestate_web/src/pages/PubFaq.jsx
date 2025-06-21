import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardHeaderButton, ModalCard } from "../components/style/Card_styled";
import { Container, ContainerBody } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled";
import { Loader } from "../components/style/Loader_styled";
import { FAQ } from "../components/FAQs";
import { Typography } from "../components/style/Typography_styled";
import { loadPage } from "../features/page/page_slice";
import { FaqForm } from "../components/style/FAQ_Style";
import { Input } from "../components/style/Input_styled";
import { Loading } from "../components/Loading";
import * as feather from "feather-icons/dist/feather.min";
import { loadPubFaq } from "../features/faqConfig/pub_faq_slice";

export const PubFaqPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();
    const pubFaqData = useSelector((state) => state.pubFaqData);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const searchTextChange = (e) => {
        setSearchText(e.target.value);
    };
    useEffect(() => {
        const results = pubFaqData?.list?.filter((item) => item.question.toLowerCase().includes(searchText));
        setSearchResults(results);
    }, [pubFaqData, searchText]);

    useEffect(() => {
        setIsLoading(true);
        // feather.replace();
        setTimeout(()=>{ setIsLoading(false)}, 2000)
        dispatch(loadPage({ title: "faq", button: false }));
        dispatch(loadPubFaq());
    }, []);
    useEffect(() => {
        pubFaqData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
      }, [pubFaqData.loading]);
  
    return (
        <>    
            <Container border="none"   >
                <Suspense fallback={<Loader />}>
                    <ContainerBody>
                        <ModalCard padding="1rem">
                       
                            <Flex row>
                                <Flex padding={"0"} md={12}>
                                    <Typography
                                        margin="1rem"
                                        fontSize="bodySubTitleFontSize"
                                        textAlign="center"
                                        fontWeight="bold"
                                    >
                                        Frequently Asked Questions (FAQ)
                                    </Typography>
                                </Flex>
                                <Flex padding={"0"} md={12}>
                                    <CardHeaderButton>
                                        <FaqForm>   
                                            <Input
                                                type="text"
                                                name={'searchText'}
                                                id={'searchText'}
                                                placeholder="Search..."
                                                onChange={searchTextChange}
                                                value={searchText}
                                            />
                                        </FaqForm>
                                    </CardHeaderButton>
                                </Flex>
                                <Flex padding={"0"} md={12}>
                                    {searchResults?.map((item, i) => (
                                        <FAQ key={i} data={item}></FAQ>
                                    ))}
                                </Flex>
                            </Flex>
                        </ModalCard>
                    </ContainerBody>
                </Suspense>
            </Container>
            <Loading open={isLoading}/>
        </>
    );
};
