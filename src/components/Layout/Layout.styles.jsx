import styled, { createGlobalStyle } from 'styled-components';

export const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
    flex-grow; 1;
`;

export const ContentContainer = styled.div`
    flex-grow: 1; /* Allow the content to take up available space */
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body.no-scroll {
    @media screen and (max-width: 999px) {
      overflow: hidden;
    }
  }
`;
