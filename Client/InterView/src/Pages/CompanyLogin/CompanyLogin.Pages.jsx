import React, { useState } from 'react';
import { FormInput } from '../../Components/Input/FormInput.Component';
import { FetchCustom } from "../../Custom/Fetch.Custom";
import { useNavigate } from "react-router-dom";
import { ModalView } from '../../Custom/Modal.Custom';
const CompanyLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessageData, setErrorMessageData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // your login logic here using email and password state variables
      const url = "http://localhost:5000/company/getCompany";
      const method = "POST"
      const body = {
        email, password
      }
      const data = await FetchCustom({ url, body, method });
      if (data.message) {
        openModal();
        setErrorMessageData(data.message);
        return
      } else {
        console.log(data);
        localStorage.setItem("Company", JSON.stringify(data?.company));
        localStorage.setItem("token", JSON.stringify(data?.token));
        navigate("/CompanyMainPage")
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
      <ModalView showModal={showModal} onClose={closeModal} errorMessage={errorMessageData} />
    </div>
  );
};

export { CompanyLoginForm };
