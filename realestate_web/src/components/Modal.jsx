import { useRef, useState } from "react";
import { useOutsideClicker } from "../utils/helper";
import { IconButton } from "./IconButton";
import { Card, CardBody, CardHeader, InfoCard, ModalCard } from "./style/Card_styled";
import { Flex } from "./style/Flex_styled";
import { StyledModal } from "./style/Modal_styled";
import {theme} from "../styles/theme";

export const Modal = ({ open, onClose, title, children, md, sm, xs, color, outsideclick }) => {
  const wraperRef = useRef(null);
  {outsideclick ?? useOutsideClicker(wraperRef, onClose)}

  return (
    <StyledModal open={open}>
      <Flex row>
        <Flex ref={wraperRef} md={md} sm={sm} xs={xs}>
          <ModalCard margin={"0"}>
            {!!title && (
              <header>
                <CardHeader>{title}</CardHeader>
                {!!onClose && (
                  <IconButton onClick={onClose} padding={"5px"}>
                    <span className="material-icons">close</span>
                  </IconButton>
                )}
              </header>
            )}

            <main>
              <CardBody>{children}</CardBody>
            </main>
          </ModalCard>
        </Flex>
      </Flex>
    </StyledModal>
  );
};
