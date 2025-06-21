import styled from "styled-components";
import { IconButton } from "../IconButton";
import { StyledIconButton } from "./IcontButton_styled";
import { getBNFont } from "../../utils/helper";
export const StyledDatagrid = styled.div`
  display: table;
  position: relative;
  // min-height: 200px;
  table-layout: fixed;
  width: 100%;
  & > div:first-child {
    display: table-header-group;
    height: 30px;
    background: ${({ theme }) => theme.colors.girdHeader};
    font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : localStorage.i18nextLng=='en'?"var(--dashboard-font)":"var(--bangla-font)")};
    position: sticky;
    z-index: 1;
    top:0;
    & > div {
      display: table-row;
      user-select: none;
      white-space: nowrap;
      & > div {
        color: ${({ theme }) =>theme.colors.girdHeaderFont};  
        // display: table-cell;
        // padding: 10px;
      }
    }
  }

  & > div {
    display: table-row-group;
    background: ${({ theme }) => theme.colors.gridBody};
    color: ${({ theme }) =>theme.colors.gridBodyFont};
    height: 30px;
    & > div {
      display: table-row;
      &:hover {
        background: ${({ theme }) =>
        theme.colors.girdHeader.concat("15") +
        " radial-gradient(circle,transparent 1%, " +
        theme.colors.girdHeader.concat("25") +
        " 1%) center/15000%"};
      }
      & > div {
        & ${StyledIconButton} {
          padding: 6px;
          &:hover {
            background: ${({ theme }) =>
              theme.colors.girdHeader.concat("55") +
              " radial-gradient(circle,transparent 1%, " +
              theme.colors.girdHeader.concat("65") +
              " 1%) center/15000%"};
          }
          &:active {
            background-color: ${({ theme }) =>
              theme.colors.girdHeader.concat("44")};
            background-size: 100%;
            transition: background 0s;
          }
        }
      }
    }
  }
`;

export const CellItem = styled.div`
  display: ${({ hide }) => (hide ? "none" : "table-cell")} !important;
  padding: 2px 8px;
  width:  ${({ width }) => (width ? width+" !important" : "auto")};
  border-bottom: 1px solid #999;
  font-size: ${({fontSize, theme }) =>getBNFont(theme.fontSize[fontSize ? fontSize:'font'])};
  font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : localStorage.i18nextLng=='en'?"var(--dashboard-font)":"var(--bangla-font)")};
  & > div {
    // overflow: hidden;
    display: ${({ action }) => (action ? "none" : "flex")};
    justify-content: ${({ alignment }) => {
      return alignment ? alignment: "flex-start";
    }};
    align-items: center;
    word-wrap: normal;
    word-break: break-word;
    overflow: ${({ overflow }) => {
      return overflow ? overflow: "inherit";
    }};
    flex-direction: ${({ type }) => (type == "number" || type == "currency" ? "row-reverse" : "row")};
  }
  & > div > div > div {
    visibility: hidden;
    &.show {
      visibility: visible;
    }
  }

  &:hover {
    & > div > div > div {
      visibility: visible;
    }
  }
`;
