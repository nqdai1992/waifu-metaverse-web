/* eslint-disable @typescript-eslint/no-unused-vars */
import { CodeInput } from "@/components/authen-flow/code-input/code-input"
import { verifyConfirmationOtp } from "@/features/authentication/verify-confirmation-otp.action"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { Link, Text } from "@radix-ui/themes"
import { Form } from "radix-ui"
import React, { useState, useCallback } from "react"

// Color constants for consistent styling
const COLORS = {
    PRIMARY: "#5bbce3",
    PRIMARY_HOVER: "#4aa9d0",
    TEXT_SECONDARY: "#777E90",
    INPUT_TEXT: "#5ecef9",
    INPUT_BORDER: "gray-700",
    INPUT_BG: "#0f1117",
    SEPARATOR: "gray-400",
    ERROR: "#FF3B30"
};

interface EnterCodeFormProps {
    onSubmit: () => void;
    email?: string;
}

const EnterCodeForm = ({ onSubmit, email = "" }: EnterCodeFormProps) => {
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    const [inputRefs] = useState(() =>
        Array(6)
            .fill(null)
            .map(() => React.createRef<HTMLInputElement>()),
    );
    const [isComplete, setIsComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Check if code is complete (all fields filled)
    const checkCodeCompletion = useCallback((codeArray: string[]) => {
        const complete = codeArray.every(digit => digit.length === 1);
        setIsComplete(complete);
        return complete;
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isComplete) {
            setIsLoading(true);
            setError(null);

            try {
                // Join the code array into a single string
                const token = code.join('');

                // Call the verification function
                const { data, error } = await verifyConfirmationOtp({
                    email,
                    token
                });

                if (error) {
                    setError(error.message);
                    return;
                }

                // If verification is successful, call the onSubmit callback
                onSubmit();
            } catch (err) {
                setError("An unexpected error occurred. Please try again.");
                console.error("Error verifying OTP:", err);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleCodeChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Check if code is complete
            checkCodeCompletion(newCode);

            // Auto-focus next input
            if (value && index < 5) {
                inputRefs[index + 1].current?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace to go to previous input
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    // Handle paste functionality
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');

        // Extract only digits from pasted text
        const digits = pastedData.replace(/\D/g, '').split('').slice(0, 6);

        if (digits.length > 0) {
            // Create a new code array with pasted digits
            const newCode = [...code];
            digits.forEach((digit, idx) => {
                if (idx < 6) {
                    newCode[idx] = digit;
                }
            });

            setCode(newCode);

            // Focus on the appropriate field after pasting
            const focusIndex = Math.min(digits.length, 5);
            if (focusIndex < 6) {
                inputRefs[focusIndex].current?.focus();
            }

            // Check if code is complete after pasting
            checkCodeCompletion(newCode);
        }
    };

    return (
        <>
            <div className='flex flex-col gap-3'>
                <Text className="text-3xl text-white">Check your email</Text>
                <Text className={`text-base text-[${COLORS.TEXT_SECONDARY}]`}>
                    We sent a verification link to {email}
                </Text>
            </div>

            <Form.Root className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex gap-2 mb-8 justify-center">
                    {code.map((digit, index) => (
                        <React.Fragment key={index}>
                            {index === 3 && (
                                <div className="flex items-center justify-center mx-1">
                                    <span className={`text-2xl text-${COLORS.SEPARATOR}`}>-</span>
                                </div>
                            )}
                            <div className={`w-14 h-14 border border-${COLORS.INPUT_BORDER} rounded-md flex items-center justify-center bg-[${COLORS.INPUT_BG}]`}>
                                <CodeInput
                                    ref={inputRefs[index]}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleCodeChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={index === 0 ? handlePaste : undefined}
                                    className={`w-full h-full text-center bg-transparent text-[${COLORS.INPUT_TEXT}] text-2xl font-bold focus:outline-none`}
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    aria-label={`Verification code digit ${index + 1}`}
                                    data-testid={`code-input-${index}`}
                                />
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                {error && (
                    <div className={`text-[${COLORS.ERROR}] text-sm mb-4`}>
                        {error}
                    </div>
                )}
                <Form.Submit asChild>
                    <button
                        className={`w-full font-medium bg-[${COLORS.PRIMARY}] hover:bg-[${COLORS.PRIMARY_HOVER}] text-black py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                        disabled={!isComplete || isLoading}
                    >
                        {isLoading ? "Verifying..." : "Verify Email"}
                    </button>
                </Form.Submit>
                <div className='flex justify-center'>
                    <Link href="/sign-in" className={`!text-[${COLORS.TEXT_SECONDARY}] !flex`}>
                        <ArrowLeftIcon className="w-5 h-5" />&ensp;Back to login Screen
                    </Link>
                </div>
            </Form.Root>
        </>
    );
};

export default EnterCodeForm;
