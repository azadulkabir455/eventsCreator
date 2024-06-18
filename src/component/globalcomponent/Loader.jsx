import React from 'react';
import Spinner  from "react-spinkit";

export default function Loader() {
    return (
        <div style={{height:"60vh"}} className='d-flex align-items-center justify-content-center'>
            <Spinner name="ball-scale-multiple" color="#343F52" className='d-block mx-auto'/>
        </div>
    );
}
