import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EnterCodeForm from '../enter-code-form';
import { verifyConfirmationOtp } from '@/features/authentication/verify-confirmation-otp.action';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the verifyConfirmationOtp function
jest.mock('@/features/authentication/verify-confirmation-otp.action', () => ({
  verifyConfirmationOtp: jest.fn(),
}));

describe('EnterCodeForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Default mock implementation for verifyConfirmationOtp
    (verifyConfirmationOtp as jest.Mock).mockResolvedValue({
      data: { user: { id: 'test-user-id' } },
      error: null
    });
  });

  it('renders the verification code form correctly', () => {
    render(<EnterCodeForm onSubmit={mockOnSubmit} />);

    // Check if the form title is rendered
    expect(screen.getByText('Check your email')).toBeInTheDocument();

    // Check if the email text is rendered
    expect(screen.getByText(/We sent a verification link to/)).toBeInTheDocument();

    // Check if all 6 input fields are rendered
    for (let i = 0; i < 6; i++) {
      expect(screen.getByTestId(`code-input-${i}`)).toBeInTheDocument();
    }

    // Check if the submit button is rendered and disabled initially
    const submitButton = screen.getByRole('button', { name: /Verify Email/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('enables the submit button when all fields are filled', async () => {
    render(<EnterCodeForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /Verify Email/i });
    expect(submitButton).toBeDisabled();

    // Fill in all 6 input fields
    for (let i = 0; i < 6; i++) {
      const input = screen.getByTestId(`code-input-${i}`);
      fireEvent.change(input, { target: { value: `${i}` } });
    }

    // Check if the submit button is enabled
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('calls verifyConfirmationOtp and onSubmit when the form is submitted with complete code', async () => {
    const testEmail = "test@example.com";
    render(<EnterCodeForm onSubmit={mockOnSubmit} email={testEmail} />);

    // Fill in all 6 input fields
    for (let i = 0; i < 6; i++) {
      const input = screen.getByTestId(`code-input-${i}`);
      fireEvent.change(input, { target: { value: `${i}` } });
    }

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Verify Email/i });
    fireEvent.click(submitButton);

    // Check if verifyConfirmationOtp was called with correct parameters
    await waitFor(() => {
      expect(verifyConfirmationOtp).toHaveBeenCalledWith({
        email: testEmail,
        token: "012345"
      });
    });

    // Check if onSubmit was called
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('displays error message when verification fails', async () => {
    // Mock verification failure
    const errorMessage = "Invalid verification code";
    (verifyConfirmationOtp as jest.Mock).mockResolvedValue({
      data: null,
      error: { message: errorMessage }
    });

    render(<EnterCodeForm onSubmit={mockOnSubmit} />);

    // Fill in all 6 input fields
    for (let i = 0; i < 6; i++) {
      const input = screen.getByTestId(`code-input-${i}`);
      fireEvent.change(input, { target: { value: `${i}` } });
    }

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Verify Email/i });
    fireEvent.click(submitButton);

    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    // Check that onSubmit was not called
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('auto-focuses the next input when a digit is entered', () => {
    render(<EnterCodeForm onSubmit={mockOnSubmit} />);

    // Get the first input and enter a digit
    const firstInput = screen.getByTestId('code-input-0');
    fireEvent.change(firstInput, { target: { value: '1' } });

    // Check if the second input is focused
    const secondInput = screen.getByTestId('code-input-1');
    expect(document.activeElement).toBe(secondInput);
  });

  it('handles paste functionality correctly', async () => {
    render(<EnterCodeForm onSubmit={mockOnSubmit} />);

    // Get the first input
    const firstInput = screen.getByTestId('code-input-0');

    // Create a paste event with a 6-digit code
    const pasteEvent = {
      clipboardData: {
        getData: () => '123456',
      },
      preventDefault: jest.fn(),
    };

    // Trigger paste event on the first input
    fireEvent.paste(firstInput, pasteEvent);

    // Check if all inputs are filled correctly
    for (let i = 0; i < 6; i++) {
      const input = screen.getByTestId(`code-input-${i}`);
      expect(input).toHaveValue(`${i + 1}`);
    }

    // Check if the submit button is enabled
    const submitButton = screen.getByRole('button', { name: /Verify Email/i });
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('handles paste with non-numeric characters correctly', async () => {
    render(<EnterCodeForm onSubmit={mockOnSubmit} />);

    // Get the first input
    const firstInput = screen.getByTestId('code-input-0');

    // Create a paste event with mixed characters
    const pasteEvent = {
      clipboardData: {
        getData: () => 'A1B2C3',
      },
      preventDefault: jest.fn(),
    };

    // Trigger paste event on the first input
    fireEvent.paste(firstInput, pasteEvent);

    // Check if only numeric values are extracted and filled
    expect(screen.getByTestId('code-input-0')).toHaveValue('1');
    expect(screen.getByTestId('code-input-1')).toHaveValue('2');
    expect(screen.getByTestId('code-input-2')).toHaveValue('3');

    // Check if the remaining inputs are empty
    expect(screen.getByTestId('code-input-3')).toHaveValue('');
    expect(screen.getByTestId('code-input-4')).toHaveValue('');
    expect(screen.getByTestId('code-input-5')).toHaveValue('');
  });

  it('handles backspace key to navigate to previous input', () => {
    render(<EnterCodeForm onSubmit={mockOnSubmit} />);

    // Fill the first two inputs
    const firstInput = screen.getByTestId('code-input-0');
    const secondInput = screen.getByTestId('code-input-1');

    fireEvent.change(firstInput, { target: { value: '1' } });
    fireEvent.change(secondInput, { target: { value: '2' } });

    // Clear the second input and press backspace
    fireEvent.change(secondInput, { target: { value: '' } });
    fireEvent.keyDown(secondInput, { key: 'Backspace' });

    // Check if focus moved back to the first input
    expect(document.activeElement).toBe(firstInput);
  });

  it('accepts a custom email prop', () => {
    const customEmail = 'test@example.com';
    render(<EnterCodeForm onSubmit={mockOnSubmit} email={customEmail} />);

    // Check if the custom email is displayed
    expect(screen.getByText(`We sent a verification link to ${customEmail}`)).toBeInTheDocument();
  });
});
