import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import VerifyEmailPage from '../verify-email/page';

// Mock the next/navigation module
const mockRouterPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

// Mock the Supabase client
const mockGetSession = jest.fn(() => Promise.resolve({
  data: { session: null },
}));

jest.mock('@/utils/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getSession: mockGetSession,
    },
  })),
}));

// Mock the components
jest.mock('@/components/auth-layout/auth-layout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="auth-layout">{children}</div>,
}));

jest.mock('@/components/form/enter-code-form', () => ({
  __esModule: true,
  default: ({ email, onSubmit }: { email: string, onSubmit: () => void }) => (
    <div data-testid="enter-code-form" data-email={email}>
      <button onClick={onSubmit}>Submit</button>
    </div>
  ),
}));

// No longer need to mock VerifiedEmail component as it's not used anymore

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

describe('VerifyEmailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSessionStorage.clear();
  });

  it('renders the enter code form initially', () => {
    render(<VerifyEmailPage />);
    expect(screen.getByTestId('enter-code-form')).toBeInTheDocument();
  });

  it('gets email from sessionStorage if available', async () => {
    // Set email in sessionStorage
    const testEmail = 'test@example.com';
    mockSessionStorage.setItem('userEmail', testEmail);

    render(<VerifyEmailPage />);

    // Wait for useEffect to run
    await waitFor(() => {
      const enterCodeForm = screen.getByTestId('enter-code-form');
      expect(enterCodeForm).toHaveAttribute('data-email', testEmail);
    });
  });

  it('clears email from sessionStorage after successful verification', async () => {
    // Set email in sessionStorage
    const testEmail = 'test@example.com';
    mockSessionStorage.setItem('userEmail', testEmail);

    render(<VerifyEmailPage />);

    // Submit the form
    screen.getByText('Submit').click();

    // Check if email was removed from sessionStorage
    expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('userEmail');
  });

  it('shows loading state and redirects to sign-in page after successful verification', async () => {
    // Mock setTimeout
    jest.useFakeTimers();

    render(<VerifyEmailPage />);

    // Submit the form
    screen.getByText('Submit').click();

    // Check if loading state is shown
    expect(screen.getByText('Verification successful!')).toBeInTheDocument();
    expect(screen.getByText('Redirecting to sign in...')).toBeInTheDocument();

    // Fast-forward timers
    jest.runAllTimers();

    // Check if router.push was called with the correct path
    expect(mockRouterPush).toHaveBeenCalledWith('/sign-in');

    // Restore timers
    jest.useRealTimers();
  });

  it('attempts to get email from Supabase session if sessionStorage is empty', async () => {
    // We'll just verify that getSession is called, since mocking the full session object is complex
    render(<VerifyEmailPage />);

    // Wait for useEffect to run
    await waitFor(() => {
      // Verify that getSession was called
      expect(mockGetSession).toHaveBeenCalled();
    });
  });
});
