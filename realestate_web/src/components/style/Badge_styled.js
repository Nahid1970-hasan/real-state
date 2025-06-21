import styled from "styled-components";

export const StyledBadge = styled.div`
  position: relative; 
  display: inline-flex;
  vertical-align: middle;
  & > div {
    padding: 10px;
    height: 100%; 
    font-size: 36px; 
    background: ${({ iconbackground, theme }) => (iconbackground ? theme.colors[iconbackground] : theme.colors.primary)};
    color: #fff;
    border-radius: 10px;
  }
  & > span:last-child {
    position: absolute;
    padding: 3px 5px;
    top: 2px;
    right: 2px; 
    background: ${({ theme,  background }) => background ? theme.colors[background] : theme.colors.primary};
    color: ${({ theme, color }) => color? theme.colors[color] : theme.colors.primaryFont};
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(1) translate(50%, -50%);
    height: 20px;
    width: auto;
    font-weight: bold;
    border-radius: 10px;
    font-size: 12px;
    cursor: pointer;
  }
`;
