import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpForm from '../sign-up-form';
import { signup } from '@/features/authentication/sign-up.action';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the signup action
jest.mock('@/features/authentication/sign-up.action', () => ({
  signup: jest.fn(),
}));

// Mock sessionStorage
const mockSessionStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
});

describe('SignUpForm', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    mockSessionStorage.clear();
  });

  it('renders the sign-up form correctly', () => {
    render(<SignUpForm />);

    // Check if the form title is rendered
    expect(screen.getByText('Create an account')).toBeInTheDocument();

    // Check if form fields are rendered
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password')).toBeInTheDocument();

    // Check if the submit button is rendered
    expect(screen.getByRole('button', { name: /Create account/i })).toBeInTheDocument();
  });

  it('submits the form with valid data and stores email in sessionStorage', async () => {
    // Mock successful signup
    (signup as jest.Mock).mockResolvedValue({ error: null });

    render(<SignUpForm />);

    const testEmail = 'test@example.com';

    // Fill in form with valid data
    fireEvent.change(screen.getByPlaceholderText('Enter your email address'), {
      target: { value: testEmail }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), {
      target: { value: 'password123' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));

    // Check if signup was called with correct data
    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith({
        email: testEmail,
        password: 'password123',
        displayName: 'test',
      });
    });

    // Check if email was stored in sessionStorage
    expect(mockSessionStorage.setItem).toHaveBeenCalledWith('userEmail', testEmail);
  });

  it('handles signup error and does not store email in sessionStorage', async () => {
    // Mock signup error
    const errorMessage = 'Email already in use';
    (signup as jest.Mock).mockResolvedValue({
      error: { message: errorMessage }
    });

    render(<SignUpForm />);

    const testEmail = 'test@example.com';

    // Fill in form with valid data
    fireEvent.change(screen.getByPlaceholderText('Enter your email address'), {
      target: { value: testEmail }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), {
      target: { value: 'password123' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));

    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    // Check that email was NOT stored in sessionStorage
    expect(mockSessionStorage.setItem).not.toHaveBeenCalledWith('userEmail', testEmail);
  });
});
