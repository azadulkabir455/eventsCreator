import React from 'react';
import { AlertCircle } from "feather-icons-react";

function TextError(props) {
    return <div className='text-danger mt-1'>
        <small className='d-flex align-items-center text-capitalize'><AlertCircle size={12} className='me-1' />
            {props.children}
        </small>
    </div>;
}

export default TextError;