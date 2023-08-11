import styled from 'styled-components';

export const BackgroundImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  width: 100vw;
`;

export const HeroContent = styled.div`
  position: relative; 
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  text-align: right;
  height: 80vh;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
`;