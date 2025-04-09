import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

export default function PaginationComp({handlePageChange,paginationValue}) {
  const pageNumbers = [...Array(paginationValue.totalPages + 1).keys()].slice(
    1
  );
  console.log(pageNumbers);

  const nextPage = () => {
    if (paginationValue?.curruntPage !== paginationValue.totalPages)
      handlePageChange(paginationValue?.curruntPage + 1);
  };
  const prevPage = () => {
    if (paginationValue?.curruntPage !== 1)
      handlePageChange(paginationValue?.curruntPage - 1);
  };

  return (
    <div className="mt-3">
      <Pagination className="px-4">
        <li className="page-item">
          <a className="page-link" onClick={prevPage} href="#">
            Previous
          </a>
        </li>
        {pageNumbers.map((_, index) => {
          return (
            <Pagination.Item
              onClick={() => handlePageChange(index + 1)}
              key={index + 1}
              active={index + 1 === paginationValue?.curruntPage}
            >
              {index + 1}
            </Pagination.Item>
          );
        })}
        <li className="page-item">
          <a className="page-link" onClick={nextPage} href="#">
            Next
          </a>
        </li>
      </Pagination>
    </div>
  );
}
