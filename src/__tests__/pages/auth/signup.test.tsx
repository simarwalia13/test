import React from 'react';
import { useSignUp } from '@/hooks/user/mutation';
import Signup from '@/pages/auth/signup';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/user/mutation', () => ({
  useSignUp: jest.fn(),
}));

describe('Signup Page', () => {
  const mockPush = jest.fn();
  const mockMutateAsync = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSignUp as jest.Mock).mockReturnValue({ mutateAsync: mockMutateAsync });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the signup form', () => {
    render(<Signup />);
    expect(screen.getByText('Registration Form')).toBeInTheDocument();
  });

  it('should submit the form successfully', async () => {
    mockMutateAsync.mockResolvedValue({ success: true });

    render(<Signup />);

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'testuser@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Test@1234' },
    });
    fireEvent.change(screen.getByLabelText('First Name'), {
      target: { value: 'Test' },
    });
    fireEvent.change(screen.getByLabelText('Last Name'), {
      target: { value: 'User' },
    });

    fireEvent.click(screen.getByText('SignUp'));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        body: {
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'Test@1234',
          firstName: 'Test',
          lastName: 'User',
        },
      });
      expect(mockPush).toHaveBeenCalledWith('/auth/login');
    });
  });

  it('should show error message on form submission failure', async () => {
    mockMutateAsync.mockRejectedValue({
      response: { data: { message: 'Error occurred' } },
    });

    render(<Signup />);

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'testuser@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Test@1234' },
    });
    fireEvent.change(screen.getByLabelText('First Name'), {
      target: { value: 'Test' },
    });
    fireEvent.change(screen.getByLabelText('Last Name'), {
      target: { value: 'User' },
    });

    fireEvent.click(screen.getByText('SignUp'));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        body: {
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'Test@1234',
          firstName: 'Test',
          lastName: 'User',
        },
      });
      expect(screen.getByText('Error occurred')).toBeInTheDocument();
    });
  });
});
