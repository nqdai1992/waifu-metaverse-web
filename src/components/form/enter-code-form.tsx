import { CodeInput } from "@/components/code-input/code-input"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { Link, Text } from "@radix-ui/themes"
import { Form } from "radix-ui"
import React, { useState } from "react"

interface EnnterCodeFormProps {
    onSubmit: () => void;
}

const EnnterCodeForm = ({onSubmit}: EnnterCodeFormProps) => {
    const [openInput, setOpenInput] = useState(false);
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    const [inputRefs] = useState(() =>
        Array(6)
            .fill(null)
            .map(() => React.createRef<HTMLInputElement>()),
    )

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (openInput) {
            onSubmit()
        } else {
            setOpenInput(true)
        }
    }

    const handleCodeChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newCode = [...code]
            newCode[index] = value
            setCode(newCode)

            // Auto-focus next input
            if (value && index < 5) {
                inputRefs[index + 1].current?.focus()
            }
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace to go to previous input
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs[index - 1].current?.focus()
        }
    }

    return (
        <>
            <div className='flex flex-col gap-3'>
                <Text className="text-3xl text-white">Check your email</Text>
                <Text className="text-base text-[#777E90]">We sent a verification link to elizabethnelson@domain.com</Text>
            </div>

            <Form.Root className="space-y-6" onSubmit={handleSubmit}>
                {
                    openInput && <div className="flex gap-2 mb-8 justify-center">
                        {code.map((digit, index) => (
                            <React.Fragment key={index}>
                                {index === 3 && (
                                    <div className="flex items-center justify-center mx-1">
                                        <span className="text-2xl text-gray-400">-</span>
                                    </div>
                                )}
                                <div className="w-14 h-14 border border-gray-700 rounded-md flex items-center justify-center bg-[#0f1117]">
                                    <CodeInput
                                        ref={inputRefs[index]}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleCodeChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-full h-full text-center bg-transparent text-[#5ecef9] text-2xl font-bold focus:outline-none"
                                    />
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                }
                <Form.Submit asChild>
                    <button className="w-full font-medium bg-[#5bbce3] hover:bg-[#4aa9d0] text-black py-3 rounded-lg transition-colors">
                        {
                            openInput ?  <span>Verify Email</span> : <span>Enter the code manually</span>
                        }
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

export default EnnterCodeForm
