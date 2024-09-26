import React from 'react';
import { useLogin } from '@/hooks/user/mutation';
import Login from '@/pages/auth/login';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('@/hooks/user/mutation');
const mockUseLogin = useLogin as jest.Mock;

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
const mockRouter = useRouter as jest.Mock;

describe('Login Component', () => {
  beforeEach(() => {
    mockUseLogin.mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue({ token: 'fake-token' }),
      isLoading: false,
    });
    mockRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  it('renders the login form', () => {
    render(<Login />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    render(<Login />);
    fireEvent.click(screen.getByText('Login'));
    expect(await screen.findByText('email is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Password1!' },
    });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(mockUseLogin().mutateAsync).toHaveBeenCalledWith({
        body: { email: 'test@example.com', password: 'Password1!' },
      });
    });

    expect(await screen.findByText('Login successfully')).toBeInTheDocument();
  });
});
