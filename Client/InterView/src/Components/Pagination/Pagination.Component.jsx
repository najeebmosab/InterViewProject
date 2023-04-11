import React, { useEffect, useState } from "react";
import "./Pagination.Component.css";
function Pagination({ companyPerPage, totalCompany, paginate }) {
    const pageNumbers = [];
    
    for (let i = 1; i <= Math.ceil(totalCompany / companyPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination">
            {pageNumbers.map(number => (
                <li key={number} className="page-item">
                    <a onClick={() => paginate(number)}  className="page-link">
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export { Pagination }