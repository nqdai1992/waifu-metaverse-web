import FormInput from "@/components/form-input/form-input"
import { Link, Text } from "@radix-ui/themes"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Form } from "radix-ui"


const SignUpForm = () => {

    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // Handle login logic here
        console.log("Login submitted")

        router.push('/verify-email')
    }

    return (
        <>
            <div className='flex flex-col gap-3'>
                <Text className="text-3xl text-white">Create an account</Text>
                <Text className="text-base text-[#777E90]">Create an account and be part of something amazing.</Text>
            </div>

            <Form.Root className="flex flex-col gap-11" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                    <div className="flex gap-3">
                        <Form.Field name="first-name">
                            <Form.Control asChild>
                                <FormInput label="First Name" placeHolder='Enter your first name' />
                            </Form.Control>
                        </Form.Field>

                        <Form.Field name="last-name">
                            <Form.Control asChild>
                                <FormInput label="Last Name" placeHolder='Enter your last name' />
                            </Form.Control>
                        </Form.Field>
                    </div>

                    <Form.Field name="email">
                        <Form.Control asChild>
                            <FormInput label="Email Address" type="email" placeHolder="Enter your email address" />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field name="phone">
                        <Form.Control asChild>
                            <FormInput label="Phone Number" type="phone" placeHolder="1-000-000-000" />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field name="password">
                        <Form.Control asChild>
                            <FormInput label="Password" type="password" placeHolder="Enter your password" />
                        </Form.Control>
                    </Form.Field>
                </div>

                <div className="flex flex-col gap-4.5">
                    <Form.Submit asChild>
                        <button className="w-full font-medium bg-[#5bbce3] hover:bg-[#4aa9d0] text-black py-3 rounded-lg transition-colors">
                            Create account
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
                        <Text>Do you have an account?&ensp;</Text>
                        <Link href="/sign-in" className='text-[#4359A9]'>Sign In</Link>
                    </div>
                </div>
            </Form.Root>
        </>
    )
}

export default SignUpForm