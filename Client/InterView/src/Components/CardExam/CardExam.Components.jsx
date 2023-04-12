import React from 'react';
import "./CardExam.Components.css";
import { useNavigate } from "react-router-dom";


const CardExam = ({ data }) => {  
  const navigate = useNavigate();

  function goExams(id) { 
    console.log(id);
    navigate("Exam/"+id)
  }

  return (
    <div className="card">
      <div className="card-body myCard-body">
        <h5 className="card-title">Exam Name: {data.name}</h5>
        <br />
        <button onClick={() => {
          goExams(data._id)
        }} className="btn btn-primary myBTN">Go Exam</button>
      </div>
    </div>
  );
};

export { CardExam };
