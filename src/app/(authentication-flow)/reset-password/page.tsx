"use client"

import AuthLayout from '@/components/auth-layout/auth-layout';
import ResetPasswordForm from '../../../components/form/reset-password-form';

const ResetPasswordPage = () => {
  return (
    <AuthLayout
      imageSrc='/ResetPassword.svg'
      imageAlt="Anime character"
      logoSrc="/Logo.svg"
      logoAlt="Logo icon"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPasswordPage;