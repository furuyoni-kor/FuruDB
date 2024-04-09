import styled, { keyframes } from "styled-components";

const loadingImageAnimation = keyframes`
  from {
    transform: rotate(-15deg);
  }

  to {
    transform: rotate(15deg);
  }
`;

export const LoadingWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 16px;
  align-items: center;
  width: max-content;
  margin: 64px auto 0 auto;
  row-gap: 64px;
`;

export const LoadingImage = styled.img`
  width: 350px;
  height: 350px;
  animation: ${loadingImageAnimation} 1s infinite alternate;
`;

export const LoadingText = styled.div`
  color: #ffffff;
  font-family: "SangSangRock";
  font-size: 3rem;
  font-weight: 700;
  text-shadow: 2px 2px #ff64c9;
  text-align: center;
`;
