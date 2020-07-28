import React, { useState } from "react";
import _ from "lodash";

const Pagination = (props) => {
  const [pagesCount, setPagesCount] = useState(Math.ceil(props.itemsCount / props.pageSize));
  const [pages, setPages] = useState(_.range(1, pagesCount + 1))
  if (pagesCount === 1)
    return null;
  else
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
