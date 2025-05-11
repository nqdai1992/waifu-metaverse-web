"use client"

import AuthLayout from '@/components/auth-layout/auth-layout';
import SignInForm from '../../../components/form/sign-in-form';

const SignInPage = () => {

  return (
    <AuthLayout
      imageSrc="/SignIn.svg"
      imageAlt="Anime character"
      logoSrc="/Logo.svg"
      logoAlt="Logo icon"
    >
      <SignInForm />
    </AuthLayout>
  );
};

export default SignInPage;