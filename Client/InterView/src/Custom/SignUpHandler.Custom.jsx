import React, { useState } from "react";
import { FetchCustom } from "../Custom/Fetch.Custom";
function SignUpHandler(params) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorModal, setErrorModal] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const url = "http://localhost:5000/users";
    const method = "POST";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() === "") {
            setNameError("Name is required");
            return;
        }else{
            setName("");
        }

        if (email.trim() === "") {
            setEmailError("Email is required");
            return;
        }else{
            setEmail("");
        }

        if (password.trim() === "") {
            setPasswordError("Password is required");
            return;
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return;
        }else{
            setPassword("");
        }

        try {
            const body = {
                name,
                email,
                password
            }
            const data = await FetchCustom({ url, body, method })
            if (data.message) {
                setErrorModal(data.message);
                setShowModal(true);
            }
            localStorage.setItem("User", JSON.stringify(data?.user));
            localStorage.setItem("token", JSON.stringify(data?.token));
            navigate("/MainPage")

            // Do something with the response, such as redirecting to a new page or displaying a success message
        } catch (error) {
            console.error(error);
            // Handle the error, such as displaying an error message
        }
    };

    return {handleSubmit,showModal,setShowModal,name,nameError,setName,setNameError,email,emailError,setEmail,setEmailError,password,setPassword,setPasswordError,passwordError,errorModal};
}

export { SignUpHandler }