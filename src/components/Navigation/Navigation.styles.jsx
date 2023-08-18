import styled from 'styled-components';

export const Nav = styled.nav`
  background-color: white;
  border: 1px solid black;

  /* Desktop styling */
  @media screen and (min-width: 1000px) {
    display: flex;
    flex-grow: 1;
    position: static;
    flex-direction: row;
    justify-content: space-around;
    text-decoration: underline;
    min-width: 50vw;
  }

  /* Mobile styling */
  @media screen and (max-width: 999px) {
    display: ${props => props.display};
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 900;
    min-width: 80vw;

    &:last-child {
      border-bottom: none;
    }

    &:first-child {
      border-top: none;
    }
  }
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: black;
  padding: 15px;
  display: block;
  text-align: left;

  /* Mobile styling */
  @media screen and (max-width: 999px) {
    padding: 10px;
    border-bottom: 1px solid black;
  }

  /* Desktop styling */
  @media screen and (min-width: 1000px) {
    text-align: center;
    padding: 10px;
    text-decoration: underline;
  }
`;

export const MobileNavButton = styled.button`

  align-self: flex-start;
  padding: 10px;
  margin: 10px;
  
  @media screen and (min-width: 1000px) {
    display: none;
  }
`;

export const MobileCloseButton = styled.button`

  align-self: flex-start;
  padding: 10px;
  margin: 10px;

  @media screen and (min-width: 1000px) {
    display: none;
  }
`;

