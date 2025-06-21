import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Flex } from "./style/Flex_styled"
import { Typography } from "./style/Typography_styled"

export const  SopInfoItem = ({itemdata}) =>{
    const { t,i18n } = useTranslation(); 
    return <>
             <Flex row>
                <Flex md ={12}>
                    <Typography  fontSize="bodySubTitleFontSize"  textAlign="left" fontWeight="bold" >
                        {t(i18n.resolvedLanguage == 'en' ? itemdata?.titile_en : itemdata?.titile_bn)} 
                    </Typography> 
                </Flex>
                <Flex padding ={"0"} md={12}>
                    {
                        itemdata?.subtitile_en ? <Typography textAlign="left" fontWeight="bold" >
                         {t(i18n.resolvedLanguage == 'en' ? itemdata?.subtitile_en : itemdata?.subtitile_bn)}  
                    </Typography>:""
                    }
                    <div>
                        <ul style={{marginTop:'10px', marginLeft:'30px'}}>
                            {
                                itemdata?.data?.length>0?itemdata?.data?.map((b,i)=>
                                    <li key={i} > <Typography  textAlign="left" >{t(i18n.resolvedLanguage == 'en' ? b.value_en : b.value_bn)}</Typography></li>
                                ):""
                            } 
                        </ul>
                    </div>
                        
                </Flex>
             </Flex>
    </>
}