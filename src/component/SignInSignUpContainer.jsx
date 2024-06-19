import React from 'react';

export default function SignInSignUpContainer({ title, children }) {
    return (
        <>
            <div className="container my-4">
                <div className="row mb-2">
                    <div className="col-12 col-lg-7">
                        <div className="signInLeftSideImg rounded-1 "></div>
                    </div>
                    <div className="col-12 col-lg-5 align-self-center">
                        <div className="px-3 px-md-5 py-5 py-lg-0">
                            <h2 className='text-capitalize mb-3'>{title}</h2>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
