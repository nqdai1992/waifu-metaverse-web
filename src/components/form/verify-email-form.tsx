import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { Link, Text } from "@radix-ui/themes"
import { Form } from "radix-ui"
import React from "react"

interface VerifyEmailFormProps {
    onSubmit: () => void;
}


const VerifyEmailForm = ({onSubmit}: VerifyEmailFormProps) => {
    
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            onSubmit();
        }
    return (
        <>
            <div className='flex flex-col gap-3'>
                <Text className="text-3xl text-white">Check your email</Text>
                <Text className="text-base text-[#777E90]">We sent a verification link to elizabethnelson@domain.com</Text>
            </div>

            <Form.Root className="space-y-6" onSubmit={handleSubmit}>
                <Form.Submit asChild>
                    <button className="w-full font-medium bg-[#5bbce3] hover:bg-[#4aa9d0] text-black py-3 rounded-lg transition-colors">
                        Open Gmail
                    </button>
                </Form.Submit>
                <div className='flex justify-center'>
                    <Link href="/sign-in" className='!text-[#777E90] !flex'>
                        <ArrowLeftIcon className="w-5 h-5" />&ensp;Back to login Screen
                    </Link>
                </div>
            </Form.Root>
        </>
    )
}

export default VerifyEmailForm
