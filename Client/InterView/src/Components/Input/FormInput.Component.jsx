import React from "react";

const FormInput = ({ label, type, id, placeholder, value, onChange, error }) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                className={`form-control ${error && "is-invalid"}`}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
export { FormInput }