import { useRef, useState } from "react";
import { useOutsideClicker } from "../utils/helper";
import { IconButton } from "./IconButton";
import { Card, CardBody, CardHeader, InfoCard, ModalCard } from "./style/Card_styled";
import { Flex } from "./style/Flex_styled";
import { StyledModal } from "./style/Modal_styled";
import {theme} from "../styles/theme";
import styled from "styled-components";

export const Loading = ({ open, outsideclick }) => {
  const wraperRef = useRef(null);
  {outsideclick ?? useOutsideClicker(wraperRef)}
  const LOADING = styled.main`   
    display:flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70vh;
`;
  return (
    <StyledModal open={open}>
        <LOADING>
            <div className="spinner"> 
                <div className="half-spinner"></div>
            </div>
        </LOADING>
    </StyledModal>
  );
};
