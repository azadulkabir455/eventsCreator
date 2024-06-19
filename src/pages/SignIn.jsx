import React from 'react';
import SignInForm from "../component/SignInForm";
import SignInSignUpContainer from '../component/SignInSignUpContainer';
import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <SignInSignUpContainer title="Sign in">
      <SignInForm />
      <p className='text-center mt-5'>You don't have account please <Link to="/signup">Sign Up</Link></p>
    </SignInSignUpContainer>
  );
}
