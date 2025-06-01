import FormInput from "@/components/form-input/form-input"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { Link, Text } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import { Form } from "radix-ui"
import { useState } from "react"

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // Handle login logic here
        if (email) {
            router.push('/reset-password')
        } else {
            setError("Please enter the correct email.")
        }

    }

    return (
        <>
            <div className='flex flex-col gap-3'>
                <Text className="text-3xl text-white">Forgot Password?</Text>
                <Text className="text-base text-[#777E90]">Lost Your Key? Reset Your Password and Regain Control!</Text>
            </div>

            <Form.Root className="space-y-6" onSubmit={handleSubmit}>
                <Form.Field name="email">
                    <Form.Control asChild>
                        <FormInput label="Email Address" placeHolder='Enter your email address' onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    </Form.Control>
                    {error && <p className="text-[#FF3B30] text-sm mt-3">{error}</p>}
                </Form.Field>
                <Form.Submit asChild>
                    <button className="w-full font-medium bg-[#5bbce3] hover:bg-[#4aa9d0] text-black py-3 rounded-lg transition-colors">
                        Forgot password
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

export default ForgotPasswordForm