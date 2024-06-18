import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import Inputs from './formelements/Inputs';
import { Key, Mail } from "feather-icons-react";

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, setCurrentUser } from '../store/feature/AuthenticationSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase_config';
import { toast } from 'react-toastify';

function SignInForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loader } = useSelector((state) => state.auth);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            dispatch(setCurrentUser(user));
        });
        return () => unsubscribe();
    }, [dispatch]);

    const initialValues = {
        email: 'wick@gmail.com',
        password: '123456'
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email required'),
        password: Yup.string().required('Password required')
    });

    const onSubmit = values => {
        const { email, password } = values;
        dispatch(login({ email, password })).then(() => {
            navigate("/");
            toast("You are successfully logedin");
        });
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {formik => {
                return (
                    <Form>
                        <Inputs
                            type='email'
                            label='Email'
                            name='email'
                            placeholder="Write your email"
                            icon={<Mail size={18} color='#60697b' />}
                        />
                        <Inputs
                            type='password'
                            label='Password'
                            name='password'
                            placeholder="Write your email"
                            icon={<Key size={18} color="#60697b" />}
                        />
                        <button className="btn btn-lg btn-secondary text-dark text-capitalize btnText mt-5 w-100 rounded-1" type='submit'>
                            {

                                loader ? <span span className="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></span> : ""
                            }
                            Sign In
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default SignInForm;