import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchCustom } from "../../Custom/Fetch.Custom";
import { ModalView } from "../../Custom/Modal.Custom";
import { FormExam } from "../../Components/FormExam/FormExam.Component";
import "./Exam.Pages.css";
import { Slide } from "react-reveal";

function ExamPages() {
  const [questions, setQuestions] = useState([]);
  const id = useParams().id;
  const [errorMessageData, setErrorMessageData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [examName, setExamName] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const body = {
    id,
  };

  const url = "http://localhost:5000/exam/getExambyId";
  const method = "POST";

  const getExamData = async () => {
    debugger
    const data = await FetchCustom({ url, method, body });
    if (data.message) {
      setErrorMessageData(data.message);
      openModal();
    } else {
      setExamName(data.exam.name);
      setQuestions(data.exam.questions);
    }
  };

  useEffect(() => {
    getExamData();
  }, []);

  return (
    <div className="exam-page-container">
      <ModalView
        showModal={showModal}
        onClose={closeModal}
        errorMessage={errorMessageData}
      />
    
      <Slide left>
        <div className="exam-form-container">
          <FormExam exam={{ name: examName, questions }} />
        </div>
      </Slide>
    </div>
  );
}

export { ExamPages };
