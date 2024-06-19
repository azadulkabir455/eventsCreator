import React from 'react';
import SignUpForm from "../component/SignUpForm";
import SignInSignUpContainer from '../component/SignInSignUpContainer';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <SignInSignUpContainer title="Sign up">
      <SignUpForm />
      <p className='text-center mt-5'>You already have account please <Link to="/signin">Sign in</Link></p>
    </SignInSignUpContainer>
  );
}
