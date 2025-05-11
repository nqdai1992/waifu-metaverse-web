"use client"

import AuthLayout from '@/components/auth-layout/auth-layout';
import EnnterCodeForm from '@/components/form/enter-code-form';
import { useState } from 'react';
import VerifyEmailForm from '../../../components/form/verify-email-form';
import VerifiedEmail from '@/components/verified-email/verified-email';

const VerifyEmailPage = () => {
  const [step, setStep] = useState(1);
  const onSubmit = () => {
    setStep(step + 1)
  }

  return (
    <>
      {
        step === 3 ? <VerifiedEmail/> : <AuthLayout
          imageSrc="/VerifyEmail-1.svg"
          imageAlt="Anime character"
          logoSrc="/Logo.svg"
          logoAlt="Logo icon"
        >

          {
            step === 1 ? <VerifyEmailForm onSubmit={onSubmit} /> : <EnnterCodeForm onSubmit={onSubmit} />
          }
        </AuthLayout>
      }
    </>
  );
};

export default VerifyEmailPage;