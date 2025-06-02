"use client";

import AuthLayout from "@/components/authen-flow/auth-layout/auth-layout";
import EnterCodeForm from "@/components/authen-flow/form/enter-code-form";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // Try to get email from sessionStorage (from sign-up form)
    try {
      const emailFromStorage = sessionStorage.getItem("userEmail");
      if (emailFromStorage) {
        setEmail(emailFromStorage);
        return;
      }
    } catch (error) {
      console.warn("Could not access sessionStorage:", error);
    }

    // If not in sessionStorage, try to get from Supabase session
    const getEmailFromSession = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();

      if (data.session?.user?.email) {
        setEmail(data.session.user.email);
      }
    };

    getEmailFromSession();
  }, []);

  const onSubmit = () => {
    setIsVerifying(true);

    // Clear the email from sessionStorage after successful verification
    try {
      sessionStorage.removeItem("userEmail");
    } catch (error) {
      console.warn("Could not clear email from sessionStorage:", error);
    }

    // Redirect to sign-in page after a short delay to show verification success
    setTimeout(() => {
      router.push("/sign-in");
    }, 1500);
  };

  return (
    <AuthLayout
      imageSrc="/VerifyEmail-1.svg"
      imageAlt="Anime character"
      logoSrc="/Logo.svg"
      logoAlt="Logo icon"
    >
      {isVerifying ? (
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="w-16 h-16 border-4 border-t-[#5bbce3] border-r-[#5bbce3] border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <p className="text-white text-xl">Verification successful!</p>
          <p className="text-[#777E90]">Redirecting to sign in...</p>
        </div>
      ) : (
        <EnterCodeForm onSubmit={onSubmit} email={email} />
      )}
    </AuthLayout>
  );
};

export default VerifyEmailPage;
