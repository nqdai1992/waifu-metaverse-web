import FormInput from "@/components/form-input/form-input"
import { CheckIcon } from "@radix-ui/react-icons"
import { Link, Text } from "@radix-ui/themes"
import Image from "next/image"
import { Checkbox, Form } from "radix-ui"

const SignInForm = () => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // Handle login logic here
        console.log("Login submitted")
    }

    return (
        <>
            <div className='flex flex-col gap-3'>
                <Text className="text-3xl text-white">Login to your account</Text>
                <Text className="text-base text-[#777E90]">Log in to continue your journey.</Text>
            </div>

            <Form.Root className="space-y-6" onSubmit={handleSubmit}>
                <Form.Field name="email">
                    <Form.Control asChild>
                        <FormInput label="Email Address" type="email" placeHolder='Enter your email address' />
                    </Form.Control>
                </Form.Field>

                <Form.Field name="password">
                    <Form.Control asChild>
                        <FormInput label="Password" type="password" placeHolder="Enter your password" />
                    </Form.Control>
                </Form.Field>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox.Root
                            className="w-5 h-5 border border-[#333] rounded flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#5bbce3] data-[state=checked]:bg-[#5bbce3] data-[state=unchecked]:bg-[#0c0c10]"
                            defaultChecked
                            id="remember"
                        // onCheckedChange={onChange}
                        >
                            <Checkbox.Indicator>
                                <CheckIcon className="text-black w-4 h-4" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label htmlFor="remember" className="text-sm text-[#a0a0a0]">
                            Remember for 30 days
                        </label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-[#5bbce3]">
                        Forgot password
                    </Link>
                </div>

                <Form.Submit asChild>
                    <button className="w-full font-medium bg-[#5bbce3] hover:bg-[#4aa9d0] text-black py-3 rounded-lg transition-colors">
                        Sign In
                    </button>
                </Form.Submit>

                <button
                    type="button"
                    className="w-full flex items-center justify-center bg-transparent border border-[#333] text-white font-medium py-3 rounded-lg hover:bg-[#222] transition-colors gap-2"
                >
                    <Image
                        src="/Google-icon.svg"
                        alt="Google icon"
                        width={24}
                        height={24}
                    />
                    Sign In with Google
                </button>
                <div className='flex justify-center'>
                    <Text>Don’t have an account?&ensp;</Text>
                    <Link href="/sign-up" className='text-[#4359A9]'>Sign Up</Link>
                </div>
            </Form.Root>
        </>
    )
}

export default SignInForm