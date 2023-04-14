import React, { useState } from 'react';
import { CompanyLoginForm } from '../CompanyLogin/CompanyLogin.Pages';
import { CompanySignupForm } from '../CompanySignup/CompanySignup.Pages';
import './AuthCompany.pages.css';

const CompanyAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
        {isLogin ? <CompanyLoginForm /> : <CompanySignupForm />}
        <button className="switch-form-btn form-submit-button" onClick={handleSwitchForm}>
          {isLogin
            ? 'Don’t have an account? Sign up here'
            : 'Already have an account? Log in here'}
        </button>
      </div>
    </div>
  );
};

export { CompanyAuthForm };
