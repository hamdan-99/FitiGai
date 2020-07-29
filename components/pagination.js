import React, { useState,useEffect } from "react";
import _ from "lodash";

const Pagination = (props) => {
  console.log('count',props)
  const pagesCount = Math.ceil(props.itemsCount / props.pageSize);
  if (pagesCount === 1) return null;
  const pages= _.range(1, pagesCount + 1);


 
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={page === props.currentPage ? "page-item active" : "page-item"}
            >
              <a className="page-link" onClick={() => props.onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
};

export default Pagination;
