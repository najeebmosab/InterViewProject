import React, { useState, useEffect } from 'react';
import { FetchCustom } from '../../Custom/Fetch.Custom';
import { ModalView } from '../../Custom/Modal.Custom';
import { useNavigate } from 'react-router-dom';
function UsersPage(params) {
    const [examResults, setExamResults] = useState([]);
    const [sortBy, setSortBy] = useState('createdAt'); // default sort by createdAt field
    const [sortOrder, setSortOrder] = useState('desc'); // default sort order is descending
    const companyId = JSON.parse(localStorage.getItem("Company"))._id;
    const [errorMessageData, setErrorMessageData] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const getExamResults = async () => {
            const url = "http://localhost:5000/company/getExamResultsByCompanyExams";
            const body = {
                companyId
            };
            const method = "POST"
            const data = await FetchCustom({ url, body, method });
            console.log(data);
            if (data.message) {
                openModal();
                setErrorMessageData(data.message);
                return
            }
            setExamResults(data.examResults)
        }
        getExamResults();
    }, []);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc'); // toggle sort order
        } else {
            setSortBy(field);
            setSortOrder('desc'); // default to descending order for new sort field
        }
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('exam')}>Exam</th>
                        <th onClick={() => handleSort('score')}>Score</th>
                        <th onClick={() => handleSort('passed')}>Passed</th>
                        <th onClick={() => handleSort('createdAt')}>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {examResults.map((result) => (
                        <tr key={result._id}>
                            <td>{result.exam}</td>
                            <td>{result.score}</td>
                            <td>{result.passed.toString()}</td>
                            <td>{new Date(result.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalView showModal={showModal} onClose={closeModal} errorMessage={errorMessageData} />
        </>
    );
}

export { UsersPage };
