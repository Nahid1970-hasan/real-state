 
import { useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
import { langs, useOutsideClicker } from "../utils/helper";
import { useRef } from "react"; 
import { StyledNavbar } from "../components/style/navbar_styled";
import { Typography } from "../components/style/Typography_styled";
import styled from "styled-components";
import { Flex } from "./style/Flex_styled";
import { theme  } from "../styles/theme";
import { useSelector } from "react-redux";
import { IconButton } from "./IconButton";
import { useTranslation } from "react-i18next";
import { DateTime } from "luxon";
import { Container } from "./style/Container_styled";
const CustFlex = styled(Flex)`
padding: 5px; 
`;
const CustDiv = styled.div`  
    display: flex;
    width:100%;
    justify-content: space-between;
    padding: 5px 10px; 
    margin: ${({ margin }) => (margin ? margin : "0")};
    & > ul {
        position: relative;
        display: flex;
        & li {
          position: relative;
          list-style: none;
          text-align: left;
          margin: auto 0;
          a {
            text-decoration: none;
            padding: 8px;
          }
        }
        & svg {
          stroke: none;
          fill: ${({ theme }) => theme.colors.primary};
        }
      } 
`;
export const HeaderTop = ({ search }) => {
    const [open, setOpen] = useState(false);

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();       
    const currentDate = useSelector((state) => state.todayData.currentdate);
    const wraperRef = useRef(null);
    const { t,i18n } = useTranslation();
    useOutsideClicker(wraperRef, () => { setOpen(false) });
 
    useEffect(() => { 
        console.log(DateTime.now().toFormat('MMMM dd, yyyy'))
      //  currentDate = new DateTime().toFormat("MMM dd, yyyy");
        if (user.login) { 
           navigate("/app");
          }  
      }, [user]);

    return <>
    <StyledNavbar position={"block"} width={"auto"}>
        <Container border="none">
        <CustDiv>
                        <CustFlex md ={9} >
                            <Typography 
                                color={'primaryFont'}
                                textAlign="left"
                                fontSize={"font"}
                                fontWeight="bold">
                                {t("rec_title")}
                            </Typography>
                        </CustFlex>
                        <CustFlex md ={2} >
                            <Typography 
                                color={'primaryFont'}
                                textAlign="end"
                                fontWeight="bold" 
                                fontSize={"smFont"}
                                width="100%">
                                {DateTime.fromJSDate(new Date(currentDate?.currentdate_en ?? DateTime.now().toFormat('MMMM dd, yyyy'))).setLocale(localStorage.i18nextLng).toLocaleString(DateTime.DATE_HUGE)}
                                {/* {localStorage.i18nextLng=="bn"?currentDate?.currentdate_bn??"":currentDate?.currentdate_en??""} */}
                            </Typography>
                        </CustFlex>
                        <CustFlex md ={1}>
                            <IconButton padding={'0'} alignment={'end'} width={'100%'} display={'block'} nothover color='primaryFont' onClick={(e) => { 
                                        i18n.changeLanguage(localStorage.i18nextLng=="bn"?"en":"bn"); 
                                    }}>
                                 <div style={{fontSize: theme.fontSize[localStorage.i18nextLng=='en'?'fontBn':'font']}}>{langs[localStorage.i18nextLng=="bn"?"en":"bn"].nativeName}</div> 
                            </IconButton>
                        </CustFlex> 
                    </CustDiv> 
        </Container>
    </StyledNavbar>
     

    </>
}
   