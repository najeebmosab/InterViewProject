import React, { useState } from "react";
import { FormInput } from "../../Components/Input/FormInput.Component";
import { ModalView } from "../../Custom/Modal.Custom";
import { FetchCustom } from "../../Custom/Fetch.Custom";
import { useNavigate } from "react-router-dom";
// import "./SigninPage.css"

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessageData, setErrorMessageData] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    const validateEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Test the email against the regex pattern
        const isValid = emailRegex.test(email);

        // Return the result of validation and an error message if it fails
        if (isValid) {
            return { valid: true, error: "" };
        } else {
            return { valid: false, error: "Please enter a valid email address" };
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email
        const emailValidation = validateEmail(email);
        if (!emailValidation.valid) {
            setEmailError(emailValidation.error);
        } else {
            setEmailError("");
        }

        // Validate password
        if (password.trim() === "") {
            setPasswordError("Password is required");
        } else {
            setPasswordError("");
        }

        // Submit form if there are no errors
        if (emailValidation.valid && password.trim() !== "") {
            const login = {
                email: email,
                password: password
            }
            const url = "http://localhost:5000/users/login";
            const body = login;
            const method = "POST"
            const data = await FetchCustom({url, method, body});

            if (data.message) {
                openModal();
                setErrorMessageData(data.message);
                return
            }
            console.log(data);
            localStorage.setItem("User", JSON.stringify(data?.user));
            localStorage.setItem("token", JSON.stringify(data?.token));
            navigate("/MainPage")

        }
    };


    return (
        <>
            <form className="form signin-form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <FormInput
                    label="Email address"
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError}
                />
                <FormInput
                    label="Password"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError}
                />
                <button type="submit" className="btn btn-primary btn-signIn">
                    Sign In
                </button>
            </form>
            <ModalView showModal={showModal} onClose={closeModal} errorMessage={errorMessageData} />
        </>
    );
};

export { SignIn };
