import styled from "styled-components";

import { BaseButton } from "@/styles/index.style";

export const DeckPageWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 덱 페이지

export const DeckCodeWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const DeckCodeInput = styled.input`
  width: 300px;
  padding: 16px;
  font-size: 2rem;
  border-color: transparent;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  box-sizing: border-box;
  outline: none;

  &:disabled {
    background-color: #555555;
    color: #ffffff;
  }
`;

export const DeckCodeButton = styled(BaseButton)`
  padding: 16px 32px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;

export const DeckMoveToButton = styled(BaseButton)`
  padding: 16px;
  margin-left: 32px;
`;

export const DeckSaveImageButton = styled(BaseButton)`
  padding: 16px 32px;
  margin-left: 32px;
`;

// 덱 생성

export const CharacterSelectContainer = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 36px;
`;

export const StepButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const StepButton = styled(BaseButton)``;

// 캐릭터 선택

export const SelectedCharacterImageContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const SelectedCharacterImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 32px;
  width: 300px;
  min-height: 450px;

  & > img {
    border-radius: 16px;
    cursor: pointer;
  }
`;

export const SelectedCharacterNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "SangSangRock";
  font-size: 3rem;
  font-weight: 700;
  line-height: 48px;

  & > span {
    text-align: center;
  }
`;

export const SelectedCharacterName = styled.span`
  font-size: 3rem;
`;

export const IconListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IconListRow = styled.div`
  disaply: flex;

  & > img {
    border-radius: 30%;
    filter: grayscale(1);
    cursor: pointer;

    &.selected {
      filter: grayscale(0);
    }
  }
`;

// 카드 선택

export const DeckCreateWrapper = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

export const DeckContainer = styled.div`
  display: flex;
  width: 1200px;
  border: 2px solid #000000;
  border-radius: 16px;
  box-sizing: border-box;
`;

export const DeckCharacterWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 236px;
  border-right: 2px solid #000000;
`;

export const DeckCharacterImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const DeckCharacterNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: #000000;
  color: #ffffff;
  border-bottom-left-radius: 12px;
`;

export const DeckCharacterName = styled.span`
  font-family: "SangSangRock";
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

export const DeckCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > div:first-child {
    border-bottom: 2px solid #000000;
  }
`;

export const DeckCardContainer = styled.div`
  display: flex;
  height: 50%;
`;

export const DeckCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 0 32px;
  align-items: center;
  column-gap: 16px;
`;

export const DeckCardListImageWrapper = styled.div`
  display: flex;
  position: relative;

  & > img {
    cursor: pointer;
  }

  & > img + div {
    display: none;
  }

  & > img.selected + div {
    display: flex;
  }
`;

export const DeckCardListImageSelected = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: "SangSangRock";
  font-size: 2rem;
  background-color: #00000080;
  color: #ffffff;
  cursor: pointer;
  z-index: 3;
`;

export const DeckCardTitle = styled.h1`
  display: flex;
  flex-direction: column;
  font-family: "SangSangRock";
  justify-content: center;
  align-items: center;
  width: 80px;
  font-size: 2.5rem;
  font-weight: 700;
  row-gap: 4px;
  background-color: #000000;
  color: #ffffff;
  box-sizing: border-box;
`;

// 덱 완성

export const DeckCompleteWrapper = styled.section`
  display: flex;
  background-color: #fedadd;
  border: 2px solid #000000;
  border-radius: 16px;
  box-sizing: border-box;
`;

export const DeckCompleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 64px;
`;

export const DeckCompleteCharacters = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  border-right: 2px solid #000000;
  box-sizing: border-box;
`;

export const DeckCompleteCharacterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DeckCompleteCharacterImageWrapper = styled.div`
  padding: 24px;
`;

export const DeckCompleteCharacterName = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px 0;
  width: 300px;
  background-color: #000000;
  color: #ffffff;
  font-family: "SangSangRock";
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  box-sizing: border-box;
`;

export const DeckCompleteCardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DeckCompleteCardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 900px;
`;

export const DeckCompleteCardTitle = styled.div`
  padding: 32px;
  background-color: #000000;
  color: #ffffff;
  font-family: "SangSangRock";
  font-size: 2.5rem;
  font-weight: 700;
`;

export const DeckCompleteCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 32px;
  gap: 32px;

  & > a {
    text-decoration: none;
  }
`;

export const DeckCompleteCodeWrapper = styled.div`
  display: flex;
  height: 96px;
  font-size: 2rem;
  font-weight: 700;
  border-top: 2px solid #000000;
  box-sizing: border-box;
  text-align: center;
`;

export const DeckCompleteCodeTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  background-color: #000000;
  color: #ffffff;
  font-family: "SangSangRock";
`;

export const DeckCompleteCodeContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-family: ;
`;
