import FormInput from "@/components/form-input/form-input"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { Link, Text } from "@radix-ui/themes"
import { Form } from "radix-ui"

const ResetPasswordForm = () => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // Handle login logic here
        console.log("Login submitted")
    }

    return (
        <>
            <div className='flex flex-col gap-3'>
                <Text className="text-3xl text-white">Reset Password?</Text>
                <Text className="text-base text-[#777E90]">Set a new password to regain access to your account.</Text>
            </div>

            <Form.Root className="space-y-6" onSubmit={handleSubmit}>
                <Form.Field name="password">
                    <Form.Control asChild>
                        <FormInput label="Password" type="password" placeHolder="Enter your password" />
                    </Form.Control>
                </Form.Field>
                <Form.Field name="confirm-password">
                    <Form.Control asChild>
                        <FormInput label="Confirm New Password" type="password" placeHolder="Repeat your new password" />
                    </Form.Control>
                </Form.Field>
                <Form.Submit asChild>
                    <button className="w-full font-medium bg-[#5bbce3] hover:bg-[#4aa9d0] text-black py-3 rounded-lg transition-colors">
                        Reset Password
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

export default ResetPasswordForm