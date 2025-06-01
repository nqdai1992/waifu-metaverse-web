"use client"

import AuthLayout from '@/components/auth-layout/auth-layout';
import SignInForm from '../../../components/form/sign-in-form';
import { Suspense } from 'react';

// Loading fallback component for SignInForm
const SignInFormFallback = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-3">
      <div className="h-9 bg-[#1a1a1a] rounded animate-pulse"></div>
      <div className="h-6 bg-[#1a1a1a] rounded animate-pulse w-3/4"></div>
    </div>
    <div className="space-y-6">
      <div className="h-16 bg-[#1a1a1a] rounded animate-pulse"></div>
      <div className="h-16 bg-[#1a1a1a] rounded animate-pulse"></div>
      <div className="h-12 bg-[#1a1a1a] rounded animate-pulse"></div>
      <div className="h-12 bg-[#1a1a1a] rounded animate-pulse"></div>
    </div>
  </div>
);

const SignInPage = () => {
  return (
    <AuthLayout
      imageSrc="/sign-in.svg"
      imageAlt="Anime character"
      logoSrc="/logo.svg"
      logoAlt="Logo icon"
    >
      <Suspense fallback={<SignInFormFallback />}>
        <SignInForm />
      </Suspense>
    </AuthLayout>
  );
};

export default SignInPage;