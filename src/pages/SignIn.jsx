import React from 'react';
import SignInForm from "../component/SignInForm";
import SignInSignUpContainer from '../component/SignInSignUpContainer';

export default function SignIn() {
  return (
    <SignInSignUpContainer title="Sign in">
      <SignInForm />
    </SignInSignUpContainer>
  );
}
