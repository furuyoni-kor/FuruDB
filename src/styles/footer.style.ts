import styled from "styled-components";

export const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  background-color: #ff9baa;
`;

export const FooterContent = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
  row-gap: 8px;
  max-width: 1200px;
`;

export const FooterText = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 1.5rem;

  & > a,
  a:link {
    color: #0275d8;
    text-decoration: none;

    &:hover {
      color: #5bc0de;
    }

    &:visited {
      color: #d9534f;
    }
  }
`;
