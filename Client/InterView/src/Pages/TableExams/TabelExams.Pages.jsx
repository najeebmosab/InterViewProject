import React, { useState, useEffect } from 'react';
import { FetchCustom } from "../../Custom/Fetch.Custom";
import { useNavigate, Link } from "react-router-dom";
import { ModalView } from '../../Custom/Modal.Custom';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import { ButtonComponent } from "../../Components/Button/Button.Components";
import "./TabelExams.Pages.css"

const ExamTable = () => {
    const [exams, setExams] = useState([]);
    const [sortType, setSortType] = useState('desc'); // Default sort type is descending
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
    const isSmallScreen = () => {
        return window.innerWidth < 600;
    };

    useEffect(() => {
        const fetchExams = async () => {
            const url = "http://localhost:5000/exam/getByCompany";
            const body = {
                companyId
            };
            const method = "POST";
            const exams = await FetchCustom({ url, body, method }); // Assuming ExamService is a service that fetches exams from the backend
            if (exams.message) {
                openModal();
                setErrorMessageData(exams.message);
                return
            }
            else {
                console.log("exams", exams);
                setExams(exams);
            }
        };
        fetchExams();
    }, []);

    const handleSort = (event, sortProperty) => {
        event.preventDefault();
        const newSortType = sortType === 'asc' ? 'desc' : 'asc';
        setSortType(newSortType);
        setExams(sortExams(exams, sortProperty, newSortType));
    };

    const sortExams = (exams, sortProperty, sortType) => {
        return exams.sort((a, b) => {
            const valueA = a[sortProperty];
            const valueB = b[sortProperty];
            if (sortType === 'asc') {
                return valueA < valueB ? -1 : 1;
            } else {
                return valueA > valueB ? -1 : 1;
            }
        });
    };

    const handleRemoveExam = async (examId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this exam?');
        if (confirmDelete) {
            // Delete the exam
            const url = "http://localhost:5000/exam";
            const body = {
                examId
            };
            const method = "DELETE"
            const data = await FetchCustom({ url, method, body });

            setErrorMessageData(data.message);
            openModal();
        }
    };

    const handleUpdateExam = async (examId) => { 
        navigate("EditExam/"+examId);
    }

    return (
        <>
            <div className="containerTable">
                <div className='addNewExam'>
                    <Link to="AddNewExam">Add New Exam</Link>
                </div>
                <table>
                    <thead className={isSmallScreen ? 'small-screen' : ''}>
                        <tr>
                            <th onClick={(event) => handleSort(event, 'name')}>Name</th>
                            <th onClick={(event) => handleSort(event, 'createdAt')}>Created At</th>
                            <th onClick={(event) => handleSort(event, 'updatedAt')}>Updated At</th>
                            <th>Controll</th>
                        </tr>
                    </thead>

                    <tbody>
                        {exams.map((exam) => (
                            <tr key={exam._id} className={isSmallScreen() ? 'small-screen' : ''}>
                                <td>{exam.name}</td>
                                <td>{exam.createdAt}</td>
                                <td>{exam.updatedAt}</td>
                                <td>
                                    <ButtonComponent className={"remove-btn"} onClick={() => handleRemoveExam(exam._id)} icon={faTrashAlt} />
                                    <ButtonComponent className={"update-btn"} onClick={() => handleUpdateExam(exam._id)} icon={faEdit} />
                                </td>

                            </tr>
                        ))}
                    </tbody>
                    <ModalView showModal={showModal} onClose={closeModal} errorMessage={errorMessageData} />
                </table>
            </div>
        </>
    );
};

export { ExamTable };
