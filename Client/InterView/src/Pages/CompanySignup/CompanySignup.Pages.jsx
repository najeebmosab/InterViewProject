import React, { useState } from 'react';
import { FormInput } from '../../Components/Input/FormInput.Component';
import { FetchCustom } from "../../Custom/Fetch.Custom";
import { useNavigate } from "react-router-dom";
import { ModalView } from '../../Custom/Modal.Custom';

const CompanySignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [errorMessageData, setErrorMessageData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFileChange = (e) => {
    debugger
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPhoto({
        name: e.target.files[0].name,
        data: reader.result,
      });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ...your code to handle form submission
      const url = "http://localhost:5000/company";
      const body = {
        name,
        email,
        password,
        photo
      };
      const method = "POST";
      const data = await FetchCustom({ url, method, body });
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
    <form onSubmit={handleSubmit} className="signup-form-container">
      <h2>Sign up for a new account</h2>
      <FormInput
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        className="form-input"
      />
      <FormInput
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        className="form-input"
      />
      <FormInput
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={handleNameChange}
        className="form-input"
      />
      <FormInput
        type="file"
        placeholder="Photo"
        name="photo"
        onChange={handleFileChange}
        className="form-input"
      />
      <button type="submit" className="form-submit-button">
        Sign up
      </button>
      <ModalView showModal={showModal} onClose={closeModal} errorMessage={errorMessageData} />
    </form>
  );
};

export { CompanySignupForm };
