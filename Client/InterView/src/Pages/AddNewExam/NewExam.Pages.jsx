import React, { useState } from 'react';
import "./NewExam.Pages.css";
import { FormInput } from "../../Components/Input/FormInput.Component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ModalView } from '../../Custom/Modal.Custom';
import { useNavigate } from 'react-router-dom';
import { FetchCustom } from '../../Custom/Fetch.Custom';

function NewExamForm() {
    const [name, setName] = useState('');
    const [questions, setQuestions] = useState(['']);
    const [errorMessageData, setErrorMessageData] = useState("");
    const [showModal, setShowModal] = useState(false);
    const companyId = JSON.parse(localStorage.getItem("Company"))._id;
    const navigate = useNavigate();

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleQuestionChange = (event, index) => {
        const newQuestions = [...questions];
        newQuestions[index] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        const newQuestions = [...questions];
        newQuestions.push('');
        setQuestions(newQuestions);
    };

    const handleRemoveQuestion = (index) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if exam name is not empty
        if (!name) {
            setErrorMessageData('Exam name is required.');
            openModal();
            return;
        }

        // Check if there is at least one question
        if (questions.length === 0 || !questions[0]) {
            setErrorMessageData('At least one question is required.');
            openModal();
            return;
        }

        // Check that all questions are not empty
        const emptyQuestionIndex = questions.findIndex((q) => !q);
        if (emptyQuestionIndex !== -1) {
            setErrorMessageData(`Question ${emptyQuestionIndex + 1} is empty.`);
            openModal();
            return;
        }

        
        try {
            // Create a new Exam document using the Mongoose model and
            // Save the new exam to the database
            const url = `http://localhost:5000/exam/companies/${companyId}/exams`;
            const body = {
                questions,
                name
            };
            const method = "POST"
            const data = await FetchCustom({url,body,method});
            if (data.message) {
                setErrorMessageData(data.message);
                openModal();
                return;
            }
            // Optionally, clear the form inputs
            setName('');
            setQuestions(['']);
        } catch (error) {
            console.error('Error creating exam:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <FormInput
                    type={"text"}
                    label={"Exam Name"}
                    placeholder={"Exam Name"}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </label>
            {questions.map((question, index) => (
                <div key={index} className='questionDiv'>
                    <label>
                        <textarea
                            placeholder={"Question"}
                            value={question}
                            onChange={(event) => handleQuestionChange(event, index)}
                        />
                    </label>
                    <button type="button" onClick={() => handleRemoveQuestion(index)} className="remove-btn remove-question-btn"><FontAwesomeIcon icon={faMinus} /></button>
                </div>
            ))}
            <button type="button" onClick={handleAddQuestion} className="add-btn add-question-btn">Add Question <FontAwesomeIcon icon={faPlus} /></button>
            <button type="submit">Create Exam</button>
            <ModalView showModal={showModal} onClose={closeModal} errorMessage={errorMessageData} />
        </form>
    );
}

export { NewExamForm };
