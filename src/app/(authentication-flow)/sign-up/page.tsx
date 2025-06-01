"use client"

import AuthLayout from '@/components/auth-layout/auth-layout';
import SignUpForm from '../../../components/form/sign-up-form';
import { Suspense } from 'react';

// Loading fallback component for SignUpForm
const SignUpFormFallback = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-3">
      <div className="h-9 bg-[#1a1a1a] rounded animate-pulse"></div>
      <div className="h-6 bg-[#1a1a1a] rounded animate-pulse w-3/4"></div>
    </div>
    <div className="space-y-6">
      <div className="h-16 bg-[#1a1a1a] rounded animate-pulse"></div>
      <div className="h-16 bg-[#1a1a1a] rounded animate-pulse"></div>
      <div className="h-16 bg-[#1a1a1a] rounded animate-pulse"></div>
      <div className="h-12 bg-[#1a1a1a] rounded animate-pulse"></div>
      <div className="h-12 bg-[#1a1a1a] rounded animate-pulse"></div>
    </div>
  </div>
);

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
      <Suspense fallback={<SignUpFormFallback />}>
        <SignUpForm />
      </Suspense>
    </AuthLayout>
  );
};

export default SignUpPage;