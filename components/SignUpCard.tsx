import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js";
import { User } from "../types/User";

interface FormValues {
    username: string;
    email: string;
    password: string;
    conf_password: string;
}

const initialValues: FormValues = {
    username: "",
    email: "",
    password: "",
    conf_password: ""
};

const SignUpScheme = Yup.object().shape({
    username: Yup.string().trim().required("Username is required"),
    email: Yup.string().email().trim().required("Email is required"),
    password: Yup.string().trim().required("Password is required").matches(/[a-zA-Z0-9!@#$%^&*]/),
    conf_password: Yup.string().trim().required("Confirm password is required").matches(/[a-zA-Z0-9!@#$%^&*]/)
});

const SignUpCard: React.FC = () => {
    const [exists, setExists] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<User | null>(null);
    
    const checkExists = async (username: string) => {
        await fetch(`/api/users/find?username=${username}`, { method: 'GET' })
        .then(response => { if(response.status === 200) setExists(true); })
        .catch(err => console.log(err));
    }

    const checkPassword = (password: string, conf_password: string) => {
        if(password !== conf_password)
            return false;
        return true;
    }

    const createUser = async (values: FormValues) => {
        const { username, email, password } = values;
        const encrypted = CryptoJS.AES.encrypt(password, process.env.NEXT_PUBLIC_CRYPTO_KEY!).toString();
        await fetch('/api/users/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, email: email, password: encrypted })
        })
        .then(response => { return response.json();})
        .then(data => { console.log(data); })
        .catch(err => console.log(err));
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
        .catch(err => { console.log(err); });
        setUser(user);
        console.log(user);
        
    }

    return (
        <div id="sign-up-card" className="card flex flex-col items-center">
            <Formik validationSchema={SignUpScheme} initialValues={initialValues} validateOnBlur={false} validateOnChange={false} onSubmit={async (values, actions) => {
                setExists(false);
                await checkExists(values.username);
                if(exists) {
                    actions.setStatus("Username already exists");
                    alert("Username already exists");
                    actions.setSubmitting(false);
                } else if (!checkPassword(values.password, values.conf_password)) {
                    actions.setStatus("Passwords do not match");
                    alert("Passwords do not match");
                    actions.setSubmitting(false);
                } else {
                    await createUser(values);
                    await getToken(values.username, values.password);
                    actions.setSubmitting(false);
                }
            }}>
                {({ errors, isSubmitting }) => (
                    <>
                        <h2 className="font-bold p-2">Sign Up</h2>
                        <Form className="flex flex-col items-center justify-center mx-auto my-auto w-fit">
                            <label id="form-elt" htmlFor="username">Username</label>
                            <Field id="username" name="username" type="text" placeholder="Username" autoComplete="off"/>
                            <label id="form-elt" htmlFor="email">Email</label>
                            <Field id="email" name="email" type="text" placeholder="Email" autoComplete="off"/>
                            <label id="form-elt" htmlFor="password">Password</label>
                            <Field id="password" name="password" type="password" placeholder="Password" autoComplete="off"/>
                            <label id="form-elt" htmlFor="conf_pass">Confirm Password</label>
                            <Field id="conf_password" name="conf_password" type="password" placeholder="Confirm Password" autoComplete="off"/>
                            <button className="border-2 w-auto p-1 rounded-md m-2 font-semibold" type="submit">Sign Up</button>
                            {errors.username ? <div className="text-red-600">{errors.username}</div> : null}
                            {errors.email ? <div className="text-red-600">{errors.email}</div> : null}
                            {errors.password ? <div className="text-red-600">{errors.password}</div> : null}
                            {errors.conf_password ? <div className="text-red-600">{errors.conf_password}</div> : null}
                            {isSubmitting ? (<div className="animate-pulse font-semibold text-lg">Loading...</div>) : null}
                        </Form>
                    </>
                )}
            </Formik>
        </div>
    );
}

export default SignUpCard;