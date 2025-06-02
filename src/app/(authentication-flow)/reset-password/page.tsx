"use client"

import AuthLayout from '@/components/authen-flow/auth-layout/auth-layout';
import ResetPasswordForm from '../../../components/authen-flow/form/reset-password-form';

const ResetPasswordPage = () => {
  return (
    <AuthLayout
      imageSrc='/reset-password.svg'
      imageAlt="Anime character"
      logoSrc="/logo.svg"
      logoAlt="Logo icon"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPasswordPage;