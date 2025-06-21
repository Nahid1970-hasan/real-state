import styled from "styled-components";

export const Button = styled.button`
  color: ${({ theme, fontColor, disabled, outlined, display }) =>
    disabled
      ? "rgba(0, 0, 0, 0.26)"
      : !!fontColor
        ? theme.colors[fontColor]
        : outlined
          ? theme.colors.font
          : theme.colors.primaryButtonFont};
  display: ${({ display }) => (display ?? "block")};
  padding: 0.495rem 0.75rem;
  background: ${({ theme, color, disabled, outlined }) =>
    disabled
      ? "rgba(0, 0, 0, 0.12)"
      : outlined
        ? "transparent"
        : !!color
          ? theme.colors[color]
          : theme.colors.primaryButton};
  border-style: ${({ outlined }) => (outlined ? "solid" : "none")};
  border-color: ${({ theme, color, disabled }) =>
    disabled
      ? "rgba(0, 0, 0, 0.12)"
      : !!color
        ? theme.colors[color].concat("80")
        : theme.colors.primaryButtonBorder.concat("80")};
  border-width: 1px;
  margin: ${({ margin }) => (margin ? margin : "8px 0px")}; ;
  border-radius: 4px;
  width: ${({ full }) => (full ? "100% !important" : "auto")};
  cursor: pointer;
  font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : localStorage.i18nextLng=='en'?"var(--dashboard-font)":"var(--bangla-font)")};
  font-weight: 400;
  font-size: ${({theme})=> theme.fontSize[localStorage.i18nextLng=='en'?'font':'fontBn']};
  height: ${({ height }) => (height ? height : "auto")};
  &:hover {
    box-shadow: ${({ disabled }) =>
    disabled
      ? "none"
      : "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"};
    background: ${({ theme, color, disabled, outlined }) =>
    disabled
      ? "rgba(0, 0, 0, 0.12)"
      : !!color && outlined
        ? theme.colors[color].concat("70")
        : !!color
          ? theme.colors[color].concat("ee")
          : theme.colors.primaryButton.concat("de")};
  }

  &:active {
    transform: scale(.95);
  }
`;

export const PrimaryButton = styled.button`
  color: ${({ theme, fontColor, disabled, outlined, display }) =>
    disabled
      ? "rgba(0, 0, 0, 0.26)"
      : !!fontColor
        ? theme.colors[fontColor]
        : outlined
          ? theme.colors.secondary
          : theme.colors.primaryButtonFont};
  display: ${({ display }) => (display ?? "block")};
  padding: 0.495rem 0.75rem;
  background: ${({ theme, color, disabled, outlined }) =>
    disabled
      ? "rgba(0, 0, 0, 0.12)"
      : outlined
        ? "transparent"
        : !!color
          ? theme.colors[color]
          : theme.colors.primaryButton};
  border-style: ${({ outlined }) => (outlined ? "solid" : "none")};
  border-color: ${({ theme, color, disabled }) =>
    disabled
      ? "rgba(0, 0, 0, 0.12)"
      : !!color
        ? theme.colors[color].concat("80")
        : theme.colors.primaryButtonBorder.concat("80")};
  border-width: 1px;
  margin: 8px 0px;
  border-radius: 4px;
  width: ${({ full }) => (full ? "100% !important" : "auto")};
  cursor: pointer;
  font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : localStorage.i18nextLng=='en'?"var(--dashboard-font)":"var(--bangla-font)")};
  font-weight: 400; 
  justify-content: center;
  align-items: center;
  height: 34px;
  font-size: ${({theme})=> theme.fontSize[localStorage.i18nextLng=='en'?'font':'fontBn']};

  &:hover {
    box-shadow: ${({ disabled }) =>
    disabled
      ? "none"
      : "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"};
    background: ${({ theme, color, disabled, outlined }) =>
    disabled
      ? "rgba(0, 0, 0, 0.12)"
      : !!color && outlined
        ? theme.colors[color].concat("70")
        : !!color
          ? theme.colors[color].concat("ee")
          : theme.colors.primaryButton.concat("de")};
  }

  &:active {
    transform: scale(.95);
  }
`;

export const AlertButton = styled(PrimaryButton)`
  color: ${({ theme, fontColor, disabled, outlined, display }) =>
    disabled
      ? "rgba(0, 0, 0, 0.26)"
      : !!fontColor
        ? theme.colors[fontColor]
        : outlined
          ? theme.colors.bg
          : theme.colors.alertButtonFont};
  display: ${({ display }) => (display ?? "block")};
  padding: 0.495rem 0.75rem;
  background: ${({ theme, color, disabled, outlined }) =>
    disabled
      ? "rgba(0, 0, 0, 0.12)"
      : outlined
        ? "transparent"
        : !!color
          ? theme.colors[color]
          : theme.colors.alertButton};
  border-style: ${({ outlined }) => (outlined ? "solid" : "none")};
  border-color: ${({ theme, color, disabled }) =>
    disabled
      ? "rgba(0, 0, 0, 0.12)"
      : !!color
        ? theme.colors[color].concat("80")
        : theme.colors.alertButtonBorder.concat("80")};
  border-width: 1px;
  margin: ${({margin})=> margin?margin:" 8px 0px"};
  border-radius: 4px;
  width: ${({ full }) => (full ? "100% !important" : "auto")};
  cursor: pointer; 
  font-weight: 400; 
  font-size: ${({theme})=> theme.fontSize[localStorage.i18nextLng=='en'?'font':'fontBn']};
  &:hover {
    box-shadow: ${({ disabled }) =>
    disabled
      ? "none"
      : "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"};
    background: ${({ theme, color, disabled, outlined }) =>
    disabled
      ? "rgba(0, 0, 0, 0.12)"
      : !!color && outlined
        ? theme.colors[color].concat("70")
        : !!color
          ? theme.colors[color].concat("ee")
          : theme.colors.alertButton.concat("de")};
  }

  &:active {
    transform: scale(.95);
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  color: ${({ theme, fontColor, disabled, outlined, display }) =>
    disabled
      ? "rgba(0, 0, 0, 0.26)"
      : !!fontColor
        ? theme.colors[fontColor]
        : outlined
          ? theme.colors.secondary
          : theme.colors.secondaryButtonFont};
  display: ${({ display }) => (display ?? "block")};
  padding: 0.495rem 0.75rem;
  background: ${({ theme, color, disabled, outlined }) =>
    disabled
      ? "rgba(0, 0, 0, 0.12)"
      : outlined
        ? "transparent"
        : !!color
          ? theme.colors[color]
          : theme.colors.secondaryButton};
  border-style: ${({ outlined }) => (outlined ? "solid" : "none")};
  border-color: ${({ theme, color, disabled }) =>
    disabled
      ? "rgba(0, 0, 0, 0.12)"
      : !!color
        ? theme.colors[color].concat("80")
        : theme.colors.secondaryButtonBorder.concat("80")};
  border-width: 1px;
  margin: 8px 0px;
  border-radius: 4px;
  width: ${({ full }) => (full ? "100% !important" : "auto")};
  cursor: pointer;
  font-weight: 400; 
  font-size: ${({theme})=> theme.fontSize[localStorage.i18nextLng=='en'?'font':'fontBn']};
  &:hover {
    box-shadow: ${({ disabled }) =>
    disabled
      ? "none"
      : "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"};
    background: ${({ theme, color, disabled, outlined }) =>
    disabled
      ? "rgba(0, 0, 0, 0.12)"
      : !!color && outlined
        ? theme.colors[color].concat("70")
        : !!color
          ? theme.colors[color].concat("ee")
          : theme.colors.secondaryButton.concat("de")};
  }

  &:active {
    transform: scale(.95);
  }
`; 
export const HeaderButton = styled(Button)`
  border-radius: 10px;
  padding: 6px 12px;
  font-size: ${({theme})=> theme.fontSize[localStorage.i18nextLng=='en'?'font':'fontBn']};
  color: #fff;
  & > span {
    vertical-align: middle;
  }
  & span:first-child{
    margin-right:5px;
  }
`;

export const DownloadButton = styled(PrimaryButton)`
  border-radius: 2px; 
  margin-top: ${({margin})=> margin?margin:"0"};
  font-size: ${({theme})=>theme.fontSize.font};
  height: 32px;
  padding: 0 8px;
  font-size: ${({theme})=> theme.fontSize[localStorage.i18nextLng=='en'?'font':'fontBn']};
  color: ${({ theme, fontColor, disabled, outlined, display }) =>
    disabled
      ? "rgba(0, 0, 0, 0.26)"
      : !!fontColor
        ? theme.colors[fontColor]
        : outlined
          ? theme.colors.font
          : theme.colors.primaryButtonFont};
          background: ${({ theme, color, disabled, outlined }) =>
          disabled
            ? "rgba(0, 0, 0, 0.12)"
            : outlined
              ? "transparent"
              : !!color
                ? theme.colors[color]
                : theme.colors.primaryButton}; 
  & > span { 
    font-size: ${({theme})=> theme.fontSize[localStorage.i18nextLng=='en'?'font':'fontBn']};
    padding-left: 5px;
    vertical-align: middle;
  }
`;

export const ReactButton = styled(PrimaryButton)`
  border-radius: 2px; 
  margin-top: ${({margin})=> margin?margin:"0"}; 
  height: ${({height})=>height?height: "35px"} !important;
  padding: 0 8px;
  font-size: ${({theme})=> theme.fontSize[localStorage.i18nextLng=='en'?'font':'fontBn']};
  background: ${({ theme, color, disabled, outlined }) =>
    disabled
      ? "rgba(0, 0, 0, 0.12)"
      : outlined
        ? "transparent"
        : !!color
          ? theme.colors[color]
          : theme.colors.bg};
  color: ${({ theme, fontColor, disabled, outlined, display }) =>
    disabled
      ? "rgba(0, 0, 0, 0.26)"
      : !!fontColor
        ? theme.colors[fontColor]
        : outlined
          ? theme.colors.font
          : theme.colors.primaryButtonFont};
          background: ${({ theme, color, disabled, outlined }) =>
          disabled
            ? "rgba(0, 0, 0, 0.12)"
            : outlined
              ? "transparent"
              : !!color
                ? theme.colors[color]
                : theme.colors.primaryButton}; 
    &:hover {
      box-shadow: ${({ disabled }) =>
      disabled
        ? "none"
        : "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"};
      background: ${({ theme, disabled, color }) =>
      disabled
        ? "rgba(0, 0, 0, 0.12)"
        : !!color
            ? theme.colors[color]
            : theme.colors.bg};
    }
  & > span { 
    font-size: ${({theme})=> theme.fontSize[localStorage.i18nextLng=='en'?'font':'fontBn']};
    padding-left: 5px;
    vertical-align: middle;
  }
`;
