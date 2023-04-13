import React, { useState } from "react";
import "./FormExam.Component.css";
import { ModalView } from "../../Custom/Modal.Custom";
import { FetchCustom } from "../../Custom/Fetch.Custom";
import { useParams } from "react-router-dom";

const FormExam = ({ exam }) => {
  const [answers, setAnswers] = useState([]);
  const examId = useParams().id;
  const [errorMessageData, setErrorMessageData] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAnswerChange = (questionId, answer) => {
    const answerObject = { questionId, answer };
    const existingAnswerIndex = answers.findIndex(
      (answer) => answer.questionId === questionId
    );

    if (existingAnswerIndex !== -1) {
      const newAnswers = [...answers];
      newAnswers[existingAnswerIndex] = answerObject;
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, answerObject]);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Answers:", answers);

    if (answers.length !== exam.questions.length) {
      setErrorMessageData("Please answer all questions.");
      openModal();
      return;
    }
    console.log(answers);
    const url = "http://localhost:5000/users/calculateExamScore";
    const method = "POST";
    const body = {
      examId,
      answers,
    };
    const data = await FetchCustom({ url, body, method });
    if (data.message) {
      setErrorMessageData(data.message);
      openModal();
      return
    }
    // You can submit the answers to the server here
  };

  return (
    <div className="form-exam-container">
    <h1 className="form-exam-header">{exam.name}</h1>
    <form onSubmit={handleSubmit}>
      {exam.questions.map((question) => (
        <div className="form-exam-question" key={question._id}>
          <h2>{question.question}</h2>
          <textarea
            className="form-exam-answer"
            value={
              answers.find((answer) => answer.questionId === question._id)
                ?.answer || ""
            }
            onChange={(event) =>
              handleAnswerChange(question._id, event.target.value)
            }
          />
        </div>
      ))}
      <button className="form-exam-submit" type="submit">
        Submit
      </button>
    </form>
    <ModalView
      showModal={showModal}
      onClose={closeModal}
      errorMessage={errorMessageData}
    />
  </div>
  );
};

export { FormExam };
