import styled from "styled-components";

export const AboutPageContainer = styled.div`
  margin: 0 auto;

  h1 {
    text-align: center;
    font-size: 3rem;
    color: #333;
    margin-bottom: 10px;
  }

  h2 {
    text-align: center;
    font-size: 2rem;
    color: #666;
    margin-bottom: 20px;
  }
`;

export const AboutPageContent = styled.div`
  max-width: 100vw;
  margin: 0 auto;
  word-wrap: break-word;

  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
  }

  li {
    margin: 30px 0;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    column-gap: 10px;

    .inner-border {
      grid-column: 1 / -1;
      width: 80%;
      height: 5px;
      background-color: #D3D3D3;
      border-radius: 5px;
      margin: 20px auto;
    }

    h3 {
      margin: auto;
      font-size: 1.5rem;
      text-align: center;
    }

    h4 {
      margin: auto;
      font-size: 1.2rem;
      text-align: center;
      color: #666;
    }

    div {
      p {
        line-height: 1.6;
        margin-bottom: 10px;
        padding: 5px;
      }

      h5 {
        padding: 5px;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 0;
      }
    }

    img {
    }

    ul {
      padding: 5px;
      h5 {
        padding: 0px;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 0;
      }

      li {
        display: flex;
        font-size: 16px;
        margin: 0;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        border-bottom: none;
      }

      em {
        margin-right: 5px;
      }
    }
  }

  li:last-child .inner-border {
    display: none;
  }

  // Mobile styling
  @media (max-width: 1000px) {
    li {
      grid-template-columns: 1fr; // 1 column for mobile screens
    }
  }
`;

export const NameAndImage = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-width: 100%;
  align-items: center;
  justify-content: flex-start;
`;
