import styled from 'styled-components';

export const StyledChip = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({theme, color})=> !!color? theme.colors[color]: theme.colors.primary};
  height: 20px;
  border-radius: 15px;
  vertical-align: middle;
  & > span {
    color: ${({theme, color})=> !!color? theme.colors[color]: theme.colors.primary};
    padding: 0 8px;
  }
`;

export const StyledChipAlt = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: ${({theme, background})=> !!background? theme.colors[background]: theme.colors.bg};
  border: 1px solid ${({theme, color})=> !!color? theme.colors[color]: theme.colors.primary};
  height: 30px;
  border-radius: 15px;
  vertical-align: middle;
  & > span {
    color: ${({theme, color})=> !!color? theme.colors[color]: theme.colors.primary};
    padding: 0 10px;
  }
`;