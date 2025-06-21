 
import { Flex } from "./style/Flex_styled";
import { Typography } from "./style/Typography_styled";
import { useTranslation } from "react-i18next";

export const FAQ = ({ data }) => {
  const [t, i18n] = useTranslation();
  return (
    <div style={{ marginTop: "1rem", padding: '10px', boxShadow: "darkgrey 0px 4px 8px 0px", border: '2px solid darkgrey', borderRadius: "10px" }}>
      <Flex row>
        <Flex padding={'10px 0 0 0'} md={12}>
          <Typography textAlign={'left'} fontWeight={"bold"}>{"Q: "}{data?.question?.length == 0 ? "---" : t(i18n.resolvedLanguage == 'en' ? data.question : data.question)} </Typography>
        </Flex>
        <Flex padding={'0'} md={12}>
          <Typography textAlign={'left'} margin={'5px 0 8px 0'}>{"A: "}{data?.answer?.length == 0 ? "---" : t(i18n.resolvedLanguage == 'en' ? data.answer : data.answer)}</Typography>
        </Flex>
      </Flex>
    </div>

  )
}
