import FormInput from "@/components/form-input/form-input"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { Link, Text } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import { Form } from "radix-ui"

const ForgotPasswordForm = () => {
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // Handle login logic here
        console.log("Login submitted")
        router.push('/reset-password')

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
                        <FormInput label="Email Address" type="email" placeHolder='Enter your email address' />
                    </Form.Control>
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