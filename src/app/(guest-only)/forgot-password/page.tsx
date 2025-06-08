"use client"

import AuthLayout from '@/components/authen-flow/auth-layout/auth-layout';
import ForgotPasswordForm from '../../../components/authen-flow/form/forgot-password-form';

const ForgotPasswordPage = () => {
  return (
    <AuthLayout
      imageSrc='/forgot-password.svg'
      imageAlt="Anime character"
      logoSrc="/logo.svg"
      logoAlt="Logo icon"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;