import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useOutsideClicker } from "../utils/helper";
import { Menu } from "./Menu";
import { MenuItem } from "./style/MenuItem_styled";
import { Typography } from "./style/Typography_styled";
import { useTranslation } from "react-i18next";

export const TriMenu = ({ item, setSubMod }) => {
  const [subTMod, setSubTMod] = useState(false);
  const subModTRef = useRef(null);
  const { t, i18n } = useTranslation();

  useOutsideClicker(subModTRef, () => { setSubTMod(false) });

  return (
    <li>
            <div ref={subModTRef}>
              <a
                onClick={() => (
                  setSubTMod(!subTMod) 
                )}
              >
                <Typography
                  textAlign="left" 
                >{t(i18n.resolvedLanguage == 'en' ? t(item.sub_module_name_en) : t(item.sub_module_name_bn))}</Typography>
              </a>
              <Menu open={subTMod} top={"55%"}>
                {
                  item?.sub_module?.map((j, k) => (
                    <MenuItem
                      key={k}
                      onClick={() => (
                        setSubTMod(!subTMod),
                        setSubMod(false)
                      )}
                    >
                      <NavLink to={j.page_name}>
                        <Typography
                          textAlign="left"
                        >
                          {t(i18n.resolvedLanguage == 'en' ? t(j.sub_module_name_en) : t(j.sub_module_name_bn))}
                        </Typography>
                      </NavLink>
                    </MenuItem>
                  ))
                }

              </Menu>
            </div>
          </li>
  );
};
