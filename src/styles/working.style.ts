import styled, { keyframes } from "styled-components";

const moveLeftAnimation = keyframes`
  0% {
    transform: scaleX(-1) translateX(-500px);
  }

  100% {
    transform: scaleX(-1) translateX(500px);
  }
`;

const moveRightAnimation = keyframes`
  0% {
    transform: translateX(-500px);
  }

  100% {
    transform: translateX(500px);
  }
`;

const workingLeftAnimation = keyframes`
0% {
  transform: scaleX(-1) translateX(500px) rotate(0deg);
}

50% {
  transform: scaleX(-1) translateX(500px) rotate(30deg);
}

100% {
  transform: scaleX(-1) translateX(500px) rotate(0deg);
}
`;

const workingRightAnimation = keyframes`
0% {
  transform: translateX(500px) rotate(0deg);
}

50% {
  transform: translateX(500px) rotate(30deg);
}

100% {
  transform: translateX(500px) rotate(0deg);
}
`;

export const WorkingPageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 16px;
  align-items: center;
  width: max-content;
  margin: 64px auto 0 auto;
  row-gap: 32px;
`;

export const WorkingImage = styled.img`
  width: 416px;
  height: 495px;
  margin-bottom: 64px;

  &.work-left {
    animation: ${workingLeftAnimation} 0.5s infinite alternate;
  }

  &.work-right {
    animation: ${workingRightAnimation} 0.5s infinite alternate;
  }

  &.move-left {
    animation: ${moveLeftAnimation} 1s forwards alternate;
  }

  &.move-right {
    animation: ${moveRightAnimation} 1s forwards alternate;
  }
`;

export const WorkingText = styled.div`
  color: #ffffff;
  font-family: "SangSangRock";
  font-size: 4rem;
  font-weight: 700;
  text-shadow: 2px 2px #ff64c9;
  text-align: center;
`;
