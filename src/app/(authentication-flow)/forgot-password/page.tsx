"use client"

import AuthLayout from '@/components/auth-layout/auth-layout';
import ForgotPasswordForm from '../../../components/form/forgot-password-form';

const ForgotPasswordPage = () => {
  return (
    <AuthLayout
      imageSrc='/ForgotPassword.svg'
      imageAlt="Anime character"
      logoSrc="/Logo.svg"
      logoAlt="Logo icon"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;