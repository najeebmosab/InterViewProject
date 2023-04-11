import React, { useState } from "react";
import { FormInput } from "../../Components/Input/FormInput.Component";
import { SignUpHandler } from "../../Custom/SignUpHandler.Custom";
import { Modal } from "../../Components/ModalComponent/Modal.component";
const SignUp = () => {
    const { handleSubmit,showModal,setShowModal,name, setName, nameError, email, emailError, setEmail, password, passwordError, setPassword,errorModal } = SignUpHandler();

    return (
        <div className="signup-page">
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={nameError}
                />
                <FormInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError}
                />
                <FormInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError}
                />

                <button type="submit" className="btn btn-primary btn-signIn">
                    SignUp
                </button>
            </form>
            <Modal show={showModal} onClose={() => setShowModal(false)} children={errorModal}></Modal>
        </div>
    );
};
export default SignUp;
