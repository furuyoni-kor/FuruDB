"use client";

import styled from "styled-components";

export const BaseButton = styled.button`
  padding: 16px 32px;
  font-family: "SangSangRock";
  font-size: 2rem;
  font-weight: 700;
  background-color: #b40a0a;
  border-color: transparent;
  border-radius: 4px;
  color: #ffffff;
  cursor: pointer;

  &:disabled {
    background-color: #aaaaaa;
  }
`;
