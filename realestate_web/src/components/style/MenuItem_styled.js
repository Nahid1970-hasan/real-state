import styled from "styled-components";
import { getBNFont } from "../../utils/helper";

export const MenuItem = styled.li`
  padding: 6px 10px !important;
  font-weight: 400;
  font-family: inherit;
  cursor: pointer;
  background: ${({ theme,active }) => theme.colors[active?'primaryActive':'bg']};
  font-size: ${({ fontSize  , theme}) => getBNFont(theme.fontSize[fontSize ? fontSize:'font'])};
  ${({highlight})=> highlight&& "border-top: 1px solid #ddd;"}
  &:hover {
    text-decoration: none;
    background: ${({ theme }) => theme.colors.primaryHover};
  } 
`;
