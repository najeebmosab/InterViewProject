import React from 'react';
import "./Card.Component.css";
import { useNavigate } from "react-router-dom";


const Card = ({ data }) => {  
  const navigate = useNavigate();

  function goExams(id) { 
    console.log(id);
    navigate("Exams/"+id)
  }

  return (
    <div className="card">
      <img src={data.photo} alt={data.name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">Company Name: {data.name}</h5>
        <br />
        <button onClick={() => {
          goExams(data._id)
        }} className="btn btn-primary">Exams Company</button>
      </div>
    </div>
  );
};

export { Card };
