import React, { useState } from 'react';
import {Eye, EyeOff} from "feather-icons-react"
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

export default function Inputs(props) {
    const[showPassword, setShowPassword] = useState(false)
    const { label, name, type, placeholder, icon } = props;

    const showPasswordHandler = () => {
        setShowPassword(prev => !prev)
    }
    return (
        <>
            <label htmlFor={name} className="form-label mt-3">{label} :</label>
            <div className="input-group input-group-lg rounded-1">
                <span className="input-group-text">{icon}</span>
                <Field type={showPassword?"text":type} placeholder={placeholder} className="form-control" id={name} name={name} />
                {
                    type == "password" ?
                        <span className="input-group-text" role='button' onClick={showPasswordHandler}>
                            {
                                showPassword?
                                <Eye size={18} color="#60697b"/>:
                                <EyeOff size={18} color="#60697b"/>
                            }
                        </span> :
                        ""
                }
            </div>
            <ErrorMessage component={TextError} name={name} />
        </>
    );
}
