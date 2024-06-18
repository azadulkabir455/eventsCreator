import React from 'react';
import SignUpForm from "../component/SignUpForm";
import SignInSignUpContainer from '../component/SignInSignUpContainer';

export default function SignUp() {
  return (
    <SignInSignUpContainer title="Sign up">
      <SignUpForm />
    </SignInSignUpContainer>
  );
}
