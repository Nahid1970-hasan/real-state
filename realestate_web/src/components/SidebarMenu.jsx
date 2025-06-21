import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadPage } from "../features/page/page_slice";
import { MenuListItem } from "./MenuListItem";
import { useTranslation } from "react-i18next";
import { Typography } from "./style/Typography_styled";
import * as feather from "feather-icons/dist/feather.min";
import styled from "styled-components";
import { MenuIcon } from "./style/IconStyle";
const MenuLabel = styled(Typography)`
    display: flex;
`
export const SidebarMenu = ({ item }) => { 
  const [subMod, setSubMod] = useState(false);
  const { t, i18n } = useTranslation();
 // useEffect(()=>{feather.replace()},[]);
  return (
    <>
      {!item.sub_module ? (

        <MenuListItem title={t(i18n.resolvedLanguage == 'en' ? item.module_name : item.module_name)} icon={item.icon_name} link={item.page_name} />

      ) : (
        <li
          className={!subMod ? "collapsible collapsed" : "collapsible"}
        >
          <a onClick={() => setSubMod(!subMod)}><MenuLabel
            textAlign="left"
            color="primaryFont"
          >
             {/*<Search style={{ marginRight: "10px", verticalAlign: "middle" }} size={18} /> <span className="material-icons md-18">{item.icon_name}</span> */}
             {/* <MenuIcon  data-feather="home" size={20}/> */} 
             <span className="material-icons md-18">{item.icon_name}</span>
            {t(i18n.resolvedLanguage == 'en' ? item.module_name : item.module_name)}
          </MenuLabel></a>
          <ul style={{ display: subMod ? "block" : "none" }}>
            {item.sub_module.map(
              (subMenu, i) =>
                <MenuListItem key={i} title={t(i18n.resolvedLanguage == 'en' ? subMenu.sub_module_name : subMenu.sub_module_name)} link={subMenu.page_name} />
            )}
          </ul>
        </li>
      )}
    </>
  );
};
