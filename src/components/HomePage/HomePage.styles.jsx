import styled from 'styled-components';

export const BackgroundImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  width: 100%;
  z-index: 0;
  left: 0;
  
`;

export const HeroContent = styled.div`
  box-sizing: border-box;
  position: relative; 
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  flex-grow: 1;
  width: 100%;
  text-align: right;
  height: 100%;
  padding: 0 0.5rem;
`;

export const MainContent = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

export const Footer = styled.footer`
  // Any additional footer styling
`;

export const HomePageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
`;