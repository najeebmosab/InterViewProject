import React from 'react';
import "./Card.Component.css";
import { Link, Outlet, useLocation, useNavigation } from "react-router-dom";


const Card = ({ data }) => {
  const navigate = useNavigation();

  function goChat(data) {
    localStorage.setItem("UserChat", JSON.stringify(data));
    navigation.navigate('ChatPage/'+data._id);
  }


  return (
    <div className="card">
      <img src={data.photo} alt={data.userName} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">User name: {data.userName}</h5>
        <p className="card-text">subject: {data.subject}</p>
        <p className="card-text">experience: {data.experience}</p>
        <br />
        <button onClick={() => {
          goChat(data)
        }} className="btn btn-primary">Contact</button>
      </div>
    </div>
  );
};

export { Card };
