import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js";

interface FormValues {
    username: string;
    email: string;
    password: string;
    conf_password: string;
}
// Send status === "signup" in the body of token request
// Encrypt password before sending to the token or create endpoints
const SignUpCard: React.FC = () => {
    return (
        <></>
    );
}

export default SignUpCard;