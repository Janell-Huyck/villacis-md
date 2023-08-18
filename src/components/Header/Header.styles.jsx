import styled from 'styled-components';

export const HeaderContainer = styled.header`
    position: sticky;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 75px;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: #fff;
`;

export const LogoContainer = styled.div`
    @media screen and (max-width: 999px) {
        display: none;
    }
`

export const ActionContainer = styled.div`
    display: ${props => (props.menuOpen ? 'none' : 'flex')};
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-between;
    align-items: center;
    width: auto;
    padding: 0 1rem;
    margin: 0 1rem;
    height: 100%;
    background-color: lightblue;
`;