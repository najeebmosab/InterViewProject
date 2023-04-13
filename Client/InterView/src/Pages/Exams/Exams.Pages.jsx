import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchCustom } from "../../Custom/Fetch.Custom";
import { Pagination } from "../../Components/Pagination/Pagination.Component";
import { ModalView } from "../../Custom/Modal.Custom";
import { CardExam } from "../../Components/CardExam/CardExam.Components";
import { useNavigate } from "react-router-dom";

function ExamsPage(params) {
    const id = useParams().id;
    const [exams, setExams] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [examsPerPage, setExamsPerPage] = useState(12);
    const [errorMessageData, setErrorMessageData] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    console.log(id);
    useEffect(() => {
        const getExams = async () => {
            const url = "http://localhost:5000/exam/getByCompany/";
            const method = "POST";
            const body = {
                companyId: id
            }
            const data = await FetchCustom({ url, method, body });
            if (data.message) {
                openModal();
                setErrorMessageData(data.message);
                navigate("/")
                return
            }
            setExams(data);
        }
        getExams();
    }, []);

    const indexOfLastExams = currentPage * examsPerPage;
    const indexOfFirstExams = indexOfLastExams - examsPerPage;
    const currentExams = exams.slice(indexOfFirstExams, indexOfLastExams);

    // Change page
    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
        setCurrentExams(company.slice((pageNumber - 1) * examsPerPage, pageNumber * companyPerPage));
    };
    return (
        <>
            <div className="containerCard">
                {currentExams.map(exams => (
                    <CardExam data={exams} key={exams._id} />
                ))}
            </div>
            <Pagination
                companyPerPage={examsPerPage}
                totalCompany={exams.length}
                paginate={paginate}
            />
            <ModalView showModal={showModal} onClose={closeModal} errorMessage={errorMessageData} />
        </>
    );
}

export { ExamsPage }