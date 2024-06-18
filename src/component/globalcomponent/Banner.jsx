import React from 'react';

export default function Banner({ title }) {
    return (
        <div className="banner rounded-1">
            <div className="overlay rounded-1"></div>
            <h3 className='fw-bold text-center'>{title}</h3>
        </div>
    );
}
