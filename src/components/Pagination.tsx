"use client";

import { useMemo } from "react";

import { PaginationButton, PaginationWrapper } from "@/styles/pagination.style";

import type { FC } from "react";

interface PaginationProps {
  page: number;
  totalPage: number;
  per: number;
  onClick: (value: number) => (e: React.MouseEvent) => void;
}

const Pagination: FC<PaginationProps> = ({ page, totalPage, per, onClick }) => {
  const pageArray = useMemo(() => {
    const length =
      Math.floor((page - 1) / per) < Math.floor((totalPage - 1) / per)
        ? per
        : totalPage - Math.floor((totalPage - 1) / per) * per;

    return (
      Array.from({ length }).fill(
        Math.floor((page - 1) / per) * per + 1
      ) as number[]
    ).map((val, index) => val + index);
  }, [page, totalPage, per]);

  return (
    <PaginationWrapper>
      {page > per && (
        <PaginationButton
          style={{
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          }}
          onClick={onClick(pageArray[0] - per)}
        >
          ◀
        </PaginationButton>
      )}
      {pageArray.map((pageNum) => (
        <PaginationButton
          key={`pagination-${pageNum}`}
          className={page === pageNum ? "selected" : ""}
          onClick={onClick(pageNum)}
        >
          {pageNum}
        </PaginationButton>
      ))}
      {page <= Math.floor(totalPage / per) * per && (
        <PaginationButton
          style={{
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          }}
          onClick={onClick(pageArray[0] + per)}
        >
          ▶
        </PaginationButton>
      )}
    </PaginationWrapper>
  );
};

export default Pagination;
