import { useTranslation } from "react-i18next"
import { Container } from "./style/Container_styled";
import { Flex } from "./style/Flex_styled"
import { Typography } from "./style/Typography_styled"

export const DoDontItem =({itemData })=>{
    const [t,i18n] = useTranslation();
    return <>
        <Container border={'none'}>
            <Flex row>
                <Flex md={12}>
                    <Typography
                    fontSize="bodySubTitleFontSize"
                    textAlign="left"
                    fontWeight="bold"
                    >
                    {t(
                        i18n.resolvedLanguage == "en"
                        ? itemData?.title_en
                        : itemData?.title_bn
                    )}
                    </Typography>
                </Flex>
                {itemData?.subtitle.length > 0
                    ? itemData?.subtitle.map((p, i) => (
                        <Flex key={i} md={12}>
                        <Typography 
                            textAlign="left"
                            fontWeight="bold"
                        >
                            {t(
                            i18n.resolvedLanguage == "en"
                                ? p?.test_en
                                : p?.test_bn
                            )}
                        </Typography>
                        <div>
                            <ul
                            style={{
                                marginTop: "10px",
                                marginLeft: "30px",
                            }}
                            >
                            {p?.data?.length > 0
                                ? p?.data?.map((b, i) => (
                                    <li key={i}>
                                      <Typography 
                            textAlign="left" 
                        >
{t(
                                        i18n.resolvedLanguage == "en"
                                        ? b.value_en
                                        : b.value_bn
                                    )}
                        </Typography>
                                    
                                    </li>
                                ))
                                : ""}
                            </ul>
                        </div>
                        </Flex>
                    ))
                    : ""}

            </Flex> 
        </Container>
    </>
}