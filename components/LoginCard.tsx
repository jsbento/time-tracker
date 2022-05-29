import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js";

interface FormValues {
    username: string;
    password: string;
}

const initialValues: FormValues = {
    username: "",
    password: ""
}

const LoginScheme = Yup.object().shape({
    username: Yup.string().trim().required("Username is required"),
    password: Yup.string().trim().required("Password is required").matches(/[a-zA-Z0-9!@#$%^&*]/)
});

const LoginCard: React.FC = () => {
    return (
        <div id="login-card" className="card flex flex-col items-center">
        </div>
    )
}

export default LoginCard;