"use client"

import AuthLayout from '@/components/auth-layout/auth-layout';
import SignUpForm from '../../../components/form/sign-up-form';

const SignUpPage = () => {
  const imageList = ["/SignUp-1.svg", "/SignUp-2.svg"]

  return (
    <AuthLayout
      // imageSrc={imageList[Math.floor(Math.random() * imageList.length)]}
      imageSrc={imageList[1]}
      imageAlt="Anime character"
      logoSrc="/Logo.svg"
      logoAlt="Logo icon"
    >
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;