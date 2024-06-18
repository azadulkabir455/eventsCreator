import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function Textarea(props) {
    const { label, name, placeholder } = props;
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label} :</label>
            <Field className="form-control" as="textarea" id={name} name={name} rows="3" placeholder={placeholder} />
            <ErrorMessage component={TextError} name={name} />
        </div>
    );
}

export default Textarea;