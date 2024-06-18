import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Inputs from './formelements/Inputs';
import { Key, Mail, User } from "feather-icons-react";

import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../store/feature/AuthenticationSlice';

function SignUpForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loader} = useSelector((state) => state.auth);

    const initialValues = {
        name: "",
        email: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Passwords must be match')
            .min(6, 'Password must be at least 6 characters')
            .required('Confirm password required')
    });

    const onSubmit = async (values) => {
        const { name, email, password } = values;
        dispatch(signUp({ email, password, name })).then(() => {
            navigate("/signin");
            toast("You are successfully sign up")
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
                            type='text'
                            label='Name'
                            name='name'
                            placeholder="Write your name"
                            icon={<User size={18} color="#60697b" />}
                        />
                        <Inputs
                            type='email'
                            label='Email'
                            name='email'
                            placeholder="Write your email"
                            icon={<Mail size={18} color="#60697b" />}
                        />
                        <Inputs
                            type='password'
                            label='Password'
                            name='password'
                            placeholder="Write your password"
                            icon={<Key size={18} color="#60697b" />}
                        />
                        <Inputs
                            type='password'
                            label='Confirm password'
                            name='confirmPassword'
                            placeholder="Write your confirm password"
                            icon={<Key size={18} color="#60697b" />}
                        />
                        <button className="btn btn-lg btn-secondary text-dark text-capitalize btnText mt-5 w-100 rounded-1" type='submit'>
                            {

                                loader ? <span span className="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></span> : ""
                            }
                            Sign Up
                        </button>
                    </Form>
                );
            }}
        </Formik >
    );
}

export default SignUpForm;