import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useOutsideClicker } from "../utils/helper";
import { Menu } from "./Menu";
import { MenuItem } from "./style/MenuItem_styled";
import { Typography } from "./style/Typography_styled";
import { useTranslation } from "react-i18next";
import { TriMenu } from "./TriMenu";

export const PublicMenu = ({ item }) => {
  const [subMod, setSubMod] = useState(false);
  const subModRef = useRef(null);
  const { t, i18n } = useTranslation();
  useOutsideClicker(subModRef, () => { setSubMod(false) }); 
  return (
    <>
      {
        !item?.sub_module ?
          <li><NavLink to={item?.page_name} end> <Typography
            textAlign="left"
            color="primaryFont"
          >
            {t(i18n.resolvedLanguage == 'en' ? t(item.module_name) : t(item.module_name))}
          </Typography></NavLink> </li>
          : (<li>
            <div ref={subModRef}>
              <a
                onClick={() => (
                  setSubMod(!subMod)
                )}
              >
                <Typography
                  textAlign="left"
                  color="primaryFont"
                >{t(i18n.resolvedLanguage == 'en' ? t(item.module_name) : t(item.module_name))}</Typography>
              </a>
              <Menu open={subMod} top={"70%"}>
                {
                  item?.sub_module?.map((j, k)=> (j.sub_module?<TriMenu key={k} item={j} setSubMod={setSubMod} />: <MenuItem
                  key={k}
                  onClick={() => (
                    setSubMod(!subMod)
                  )}
                >
                  <NavLink to={j.page_name}>
                    <Typography
                      textAlign="left"
                    >
                      {t(i18n.resolvedLanguage == 'en' ? t(j.sub_module_name) : t(j.sub_module_name))}
                    </Typography>
                  </NavLink>
                </MenuItem>))
                }

              </Menu>
            </div>
          </li>)
      }
    </>
  );
};
