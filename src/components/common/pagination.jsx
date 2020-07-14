import React from "react";
import Protype from "prop-types";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  // nav>ul.pagination>li.page-item>a.page-link
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-tem"}
          >
            <a
              className="page-link"
              onClick={() => onPageChange(page)}
              href="/#"
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: Protype.number.isRequired,
  pageSize: Protype.number.isRequired,
  onPageChange: Protype.func.isRequired,
  currentPage: Protype.number.isRequired,
};

export default Pagination;
