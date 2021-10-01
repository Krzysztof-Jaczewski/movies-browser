import styled, { css } from "styled-components";

export const StyledContainer = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fill, 324px);
  gap: 24px;
  max-width: 1368px;
  margin: 0 auto;
  transition: all 0.5s;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobileMax}) {
    gap: 16px;
    width: 100%;
    grid-template-columns: auto;
  }
  ${({ person }) =>
    person &&
    css`
      border-radius: 5px;
      grid-template-columns: repeat(auto-fill, 208px);

      @media (max-width: ${({ theme }) => theme.breakpoint.mobileMax}) {
        grid-template-columns: repeat(auto-fill, 128px);
        padding: 16px;
      }
    `}
  ${({ details }) =>
    details &&
    css`
      width: 100%;
      grid-template-columns: 1fr;
      grid-template-rows: none;
      gap: 40px;

      @media (max-width: ${({ theme }) => theme.breakpoint.mobileMax}) {
        grid-template-columns: repeat(auto-fill, 128px);
        padding: 16px;
      }
    `}
`;
