"use client";

import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 64px;
`;

export const PaginationButton = styled.button`
  width: 80px;
  height: 60px;
  font-family: "SangSangRock";
  font-size: 2rem;
  font-weight: 700;
  background-color: #ff9baa;
  border: 2px solid #000000;
  cursor: pointer;

  &.selected {
    background-color: #b40a0a;
    color: #ffffff;
  }

  &:hover:not(.selected) {
    color: #888888;
  }
`;
