import FormInput from "@/components/authen-flow/form-input/form-input"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { Link, Text } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import { Form } from "radix-ui"
import { useState } from "react"

const ResetPasswordForm = () => {

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!password || !confirmPassword) {
            setError("Please provide both password and confirmation password");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        setError("");

        router.push('/sign-in');

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
                        <FormInput
                            label="Password"
                            type="password"
                            value={password}
                            placeHolder="Enter your password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field name="confirm-password">
                    <Form.Control asChild>
                        <FormInput
                            label="Confirm New Password"
                            type="password"
                            value={confirmPassword}
                            placeHolder="Repeat your new password"
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                            }}
                        />
                    </Form.Control>
                    {error && <p className="text-[#FF3B30] text-sm mt-3">{error}</p>}
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