import React, { useEffect, useState } from "react";
import "./Main.page.css";
import { ModalView } from "../../Custom/Modal.Custom";
import { Card } from "../../Components/Card/Card.Component";
import { Pagination } from "../../Components/Pagination/Pagination.Component";
import { useNavigate } from "react-router-dom";

function MainPage(params) {
    const [company, setCompany] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [companyPerPage, setCompanyPerPage] = useState(12);
    const [errorMessageData, setErrorMessageData] = useState("");
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const doAfterGetData = (e) => {
        console.log("e",e);
        if (e.message) {
            openModal();
            setErrorMessageData(e.message);
            navigate("/")
            return
        }
        setCompany(e.companies)
        console.log(company);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            // Handle the case where the token is missing, for example:
            window.location.href = "/login";
            return;
        }
        const Url = "http://localhost:5000/company/getAllCompany";
        fetch(Url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Authorization': 'Bearer ' + token
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => doAfterGetData(data));
    }, []);
    // Get current users
    const indexOfLastCompany = currentPage * companyPerPage;
    const indexOfFirstCompany = indexOfLastCompany - companyPerPage;
    const currentCompany = company.slice(indexOfFirstCompany, indexOfLastCompany);

    // Change page
    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
        setCurrentCompany(company.slice((pageNumber - 1) * companyPerPage, pageNumber * companyPerPage));
    };

    return (
        <>
            <div className="containerCard">
                {currentCompany.map(company => (
                    <Card data={company} key={company._id} />
                ))}
            </div>
            <Pagination
                companyPerPage={companyPerPage}
                totalCompany={company.length}
                paginate={paginate}
            />
           <ModalView showModal={showModal} onClose={closeModal} errorMessage={errorMessageData} />
        </>
    );
}

export { MainPage };
