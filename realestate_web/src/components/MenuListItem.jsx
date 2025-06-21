 
import { NavLink } from "react-router-dom";
import { Typography } from "./style/Typography_styled";
import * as Icon from 'react-feather';
import styled from "styled-components";
import { MenuIcon } from "./style/IconStyle";

const MenuLabel = styled(Typography)`
    display: inline-flex;
`
export const MenuListItem = ({ title, link, icon }) => { 
    const Search = Icon[icon] 

    return (
        <li>
            <NavLink to={link} end><MenuLabel
                textAlign="left"
                color="primaryFont"
            >{!!icon && <span className="material-icons md-18">{icon}</span>}{title}</MenuLabel>
            </NavLink>
        </li>);
}