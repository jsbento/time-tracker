import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js";
import { User } from "../types/User";

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

    const checkToken = async (username: string) => {
        return await fetch(`/api/auth/fetch_token?username=${username}`, { method: 'GET' })
        .then(response => { return response.json(); })
        .then(data => { return data.valid; })
        .catch(err => {
            console.log(err);
            alert(err.message);
        });
    }

    const fetchUser = async (username: string) => {
        const user: User = await fetch(`/api/users/find?username=${username}`, { method: 'GET' })
        .then(response => { return response.json(); })
        .catch(err => {
            console.log(err);
            alert(err.message);
        });
        window.sessionStorage.setItem('user', user.username);
        window.sessionStorage.setItem('user_email', user.email);
    }

    const getToken = async (username: string, password: string) => {
        const encrypted = CryptoJS.AES.encrypt(password, process.env.NEXT_PUBLIC_CRYPTO_KEY!).toString();
        const user: User = await fetch('/api/auth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: encrypted })
        })
        .then(response => { return response.json(); })
        .then(data => { return data.value; })
        .catch(err => {
            console.log(err);
            alert(err.message);
        });
        window.sessionStorage.setItem('user', user.username);
        window.sessionStorage.setItem('user_email', user.email);
    }

    return (
        <div id="login-card" className="card flex flex-col items-center">
            <Formik validationSchema={LoginScheme} initialValues={initialValues} validateOnChange={false} validateOnBlur={false} onSubmit={async (values, actions) => {
                if(await checkToken(values.username)) {
                    await fetchUser(values.username);
                } else {
                    await getToken(values.username, values.password);
                }
                actions.setSubmitting(false);
                window.location.href="/dashboard";
            }}>
                {({ errors, isSubmitting }) => (
                    <>
                        <h2 className="font-bold p-2">Login</h2>
                        <Form className="flex flex-col items-center justify-center mx-auto my-auto w-fit">
                            <label id="form-elt" htmlFor="username">Username</label>
                            <Field id="username" name="username" type="text" placeholder="Username" autoComplete="off"/>
                            <label id="form-elt" htmlFor="password">Password</label>
                            <Field id="password" name="password" type="password" placeholder="Password" autoComplete="off"/>
                            <button className="border-2 w-auto p-1 rounded-md m-2 font-semibold" type="submit">Login</button>
                            <p>Don't have an account? <a href="/signup" className="text-sky-500">Sign Up</a></p>
                            {errors.username ? <div className="text-red-600">{errors.username}</div> : null}
                            {errors.password ? <div className="text-red-600">{errors.password}</div> : null}
                            {isSubmitting ? <div className="animate-pulse font-semibold text-lg">Loading...</div> : null}
                        </Form>
                    </>
                )}
            </Formik>
        </div>
    );
}

export default LoginCard;