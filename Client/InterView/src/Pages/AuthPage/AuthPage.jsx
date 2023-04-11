import React, { useState } from "react";
import { SignIn } from "../Signin/SigninPage";
import SignUp from "../Signup/SignupPage";
import "./AuthPage.css";

const AuthPage = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  const toggleForm = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <div className="auth-page">
      <div className={`form-container ${showSignIn ? "sign-in" : "sign-up"}`}>
        {showSignIn ? (
          <SignIn />
        ) : (
          <SignUp />
        )}
        <p>
          {showSignIn
            ? "Don't have an account?"
            : "Already have an account?"}
          <span onClick={toggleForm}>
            {showSignIn ? "Sign up" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
};

export {AuthPage};
