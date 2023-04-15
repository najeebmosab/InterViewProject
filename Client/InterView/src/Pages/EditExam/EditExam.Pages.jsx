import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FetchCustom } from "../../Custom/Fetch.Custom";
import "./EditExam.Page.css"
function EditExam() {
  const [exam, setExam] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [newExamName, setNewExamName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getExam = async () => {
      const url = "http://localhost:5000/exam/getExambyId";
      const body = { id };
      const method = "POST";
      const data = await FetchCustom({ method, url, body });
      console.log(data);
      setExam(data.exam);
    };

    getExam();
  }, [id]);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...exam.questions];
    newQuestions[index].questionText = value;
    newQuestions[index].editing = true; // add this line to set editing flag
    setExam((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/exam/${id}`;
    const method = "PUT";
    const body = exam;
    const data = await FetchCustom({ method, url, body })

  };

  if (!exam) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h1>
          {editingName ? (
            <div className="questionUpdate">
              <input
                type="text"
                defaultValue={exam.name}
                onChange={(e) => setNewExamName(e.target.value)}
              />
              <button
                onClick={() => {
                  setEditingName(false);
                  setExam((prevState) => ({
                    ...prevState,
                    name: newExamName,
                  }));
                }}
              >
                Save
              </button>
              <button onClick={() => setEditingName(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              {exam.name}
              <button onClick={() => setEditingName(true)}>Edit Exam Name</button>
            </div>
          )}
        </h1>
        {exam.questions.map((question, questionIndex) => (
          <div key={question._id} className=" questionBorederBottom">
            {question.editing ? ( // render input element if editing flag is true
              <div className="questionUpdate">
                <input
                  type="text"
                  defaultValue={question.question}
                  onChange={(e) =>
                    handleQuestionChange(questionIndex, e.target.value)
                  }
                />

                <button
                  onClick={() => {
                    const newQuestions = [...exam.questions];
                    newQuestions[questionIndex].editing = false;
                    setExam((prevState) => ({
                      ...prevState,
                      questions: newQuestions,
                    }));
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    const newQuestions = [...exam.questions];
                    newQuestions[questionIndex].editing = false;
                    newQuestions[questionIndex].questionText = question.originalText;
                    setExam(prevState => ({
                      ...prevState,
                      questions: newQuestions,
                    }));
                  }}>Cancel</button>
              </div>
            ) : ( // render h2 element if editing flag is false
              <div>
                <h2>{question.question}</h2>
                <button onClick={() => {
                  const newQuestions = [...exam.questions];
                  newQuestions[questionIndex].editing = true;
                  newQuestions[questionIndex].originalText = question.questionText;
                  setExam(prevState => ({
                    ...prevState,
                    questions: newQuestions,
                  }));
                }}>Edit Question</button>
              </div>
            )}
          </div>
        ))}
      </form>
    </div>
  )
}

export { EditExam }
